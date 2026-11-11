// The Astro config reads SITE_URL / BASE_PATH from the environment (set by the Pages workflow).
declare const process: { env: Record<string, string | undefined> };

// The sermon library reads and refreshes its snapshot at build time (src/utils/sermons.ts).
declare module 'node:fs' {
  export function existsSync(path: string): boolean;
  export function readFileSync(path: string, encoding: 'utf8'): string;
  export function writeFileSync(path: string, data: string): void;
}
