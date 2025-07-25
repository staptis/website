import { IFormContact, IStorageService } from "@/services/serviceTypes";
import { Env } from "@/types";

export class GoogleStorageService implements IStorageService {
  #clientEmail: string;
  #privateKey: string;
  #sheetId: string;
  #sheetName: string;
  constructor(env: Env) {
    console.log("GoogleStorageService initialized");
    if (
      !env.GOOGLE_CLIENT_EMAIL ||
      !env.GOOGLE_PRIVATE_KEY ||
      !env.GOOGLE_SHEET_ID ||
      !env.GOOGLE_SHEET_NAME
    ) {
      throw new Error(
        "GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID, and GOOGLE_SHEET_NAME envs are required",
      );
    }
    this.#clientEmail = env.GOOGLE_CLIENT_EMAIL;
    this.#privateKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
    this.#sheetId = env.GOOGLE_SHEET_ID;
    this.#sheetName = env.GOOGLE_SHEET_NAME;
  }
  async storeContact(data: IFormContact): Promise<boolean> {
    const { email, name, companyName = "" } = data;

    const token = await this.#getAccessToken();
    const emailExists = await this.#emailExists(email, token);

    if (emailExists) {
      console.log(`Email ${email} already exists, skipping append.`);
      return false;
    }

    await this.#appendRow([email, name, companyName], token);
    return true;
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

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to get access token: ${res.status} - ${text}`);
    }

    const json = await res.json<{ access_token: string }>();
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

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Failed to check email: ${res.status}`);
    }

    const json = await res.json<{ values?: string[][] }>();
    const emails = json.values ?? [];
    return emails.some(
      (row) => (row[0] || "").toLowerCase() === email.toLowerCase(),
    );
  }

  async #appendRow(row: (string | number)[], token: string): Promise<void> {
    const range = `${this.#sheetName}!A:C`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.#sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const body = { values: [row], majorDimension: "ROWS" };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to append row: ${res.status} - ${text}`);
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
