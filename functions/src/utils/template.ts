export function template(html: string, data: Record<string, string>): string {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return data[key] ?? "";
  });
}
