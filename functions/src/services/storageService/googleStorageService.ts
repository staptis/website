import { EnvironmentNotSetError, ServiceRequestError } from "@/services/errors";
import { IProspect, IStorageService, Language } from "@/types";
import { Env } from "@/services/types";

export class GoogleStorageService implements IStorageService {
  name = "GoogleStorageService";
  #clientEmail: string;
  #privateKey: string;
  #sheetId: string;
  #sheetName: string;
  constructor(env: Env) {
    console.info("initializing " + this.name);
    if (
      !env.GOOGLE_CLIENT_EMAIL ||
      !env.GOOGLE_PRIVATE_KEY_BASE64 ||
      !env.GOOGLE_SHEET_ID ||
      !env.GOOGLE_SHEET_NAME
    ) {
      throw new EnvironmentNotSetError([
        "GOOGLE_CLIENT_EMAIL",
        "GOOGLE_PRIVATE_KEY_BASE64",
        "GOOGLE_SHEET_ID",
        "GOOGLE_SHEET_NAME",
      ]);
    }
    this.#clientEmail = env.GOOGLE_CLIENT_EMAIL;
    this.#privateKey = atob(env.GOOGLE_PRIVATE_KEY_BASE64).replace(
      /\\n/g,
      "\n",
    );
    this.#sheetId = env.GOOGLE_SHEET_ID;
    this.#sheetName = env.GOOGLE_SHEET_NAME;
  }
  async storeProspect(data: IProspect, language: Language): Promise<void> {
    const { email, name, companyName = "" } = data;

    const token = await this.#getAccessToken();
    const emailExists = await this.#emailExists(email, token);

    if (emailExists) {
      console.warn(`Email ${email} already exists, skipping append.`);
      return;
    }

    await this.#appendRow([email, name, companyName, language], token);
  }
  async #getAccessToken(): Promise<string> {
    const jwt = await this.#createJWT(
      this.#clientEmail,
      this.#privateKey,
      "https://oauth2.googleapis.com/token",
      ["https://www.googleapis.com/auth/spreadsheets"],
    );

    const body = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    });

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ServiceRequestError(
        this.name,
        `Failed to get access token: ${response.status} - ${text}`,
      );
    }

    const json = await response.json<{ access_token: string }>();
    return json.access_token;
  }

  async #createJWT(
    clientEmail: string,
    privateKey: string,
    aud: string,
    scopes: string[],
  ): Promise<string> {
    const header = { alg: "RS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: clientEmail,
      scope: scopes.join(" "),
      aud,
      exp: now + 3600,
      iat: now,
    };

    const encHeader = this.#base64UrlEncode(JSON.stringify(header));
    const encPayload = this.#base64UrlEncode(JSON.stringify(payload));
    const toSign = `${encHeader}.${encPayload}`;

    const signature = await this.#signRS256(toSign, privateKey);
    return `${toSign}.${signature}`;
  }

  async #signRS256(data: string, pem: string): Promise<string> {
    const keyData = this.#pemToArrayBuffer(pem);
    const key = await crypto.subtle.importKey(
      "pkcs8",
      keyData,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const signature = await crypto.subtle.sign(
      { name: "RSASSA-PKCS1-v1_5" },
      key,
      new TextEncoder().encode(data),
    );

    return this.#arrayBufferToBase64Url(signature);
  }

  async #emailExists(email: string, token: string): Promise<boolean> {
    const range = `${this.#sheetName}!A2:A`; // column A, skip header
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.#sheetId}/values/${encodeURIComponent(range)}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new ServiceRequestError(
        this.name,
        `Failed to check email: ${response.status}`,
      );
    }

    const json = await response.json<{ values?: string[][] }>();
    const emails = json.values ?? [];
    return emails.some(
      (row) => (row[0] || "").toLowerCase() === email.toLowerCase(),
    );
  }

  async #appendRow(row: (string | number)[], token: string): Promise<void> {
    const range = `${this.#sheetName}!A:C`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.#sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const body = { values: [row], majorDimension: "ROWS" };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ServiceRequestError(
        this.name,
        `Failed to append row on Google sheet: ${response.status} - ${text}`,
      );
    }
  }

  #base64UrlEncode(str: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let binary = "";
    for (let i = 0; i < data.length; i++) {
      binary += String.fromCharCode(data[i]);
    }
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  #arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  #pemToArrayBuffer(pem: string): ArrayBuffer {
    const b64 = pem
      .replace(/-----BEGIN PRIVATE KEY-----/g, "")
      .replace(/-----END PRIVATE KEY-----/g, "")
      .replace(/\s+/g, "");
    const raw = atob(b64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      bytes[i] = raw.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
