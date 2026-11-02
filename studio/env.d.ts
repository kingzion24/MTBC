// Sanity inlines SANITY_STUDIO_* variables from .env at build time.
declare const process: { env: Record<string, string | undefined> };
