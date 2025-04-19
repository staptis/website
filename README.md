# CI/CD

- [setup github organization secrets to access cloudflare](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- Setup branches rules for production and staging
- github action for direct upload with wrangler to Cloudflare pages
  - for main, staging and development branches each with their custom domain in cloudflare.
  - In astro.config.mjs set the site as env variable
  - Preview domains for pull request. On close of pull request delete this preview domains.
- Restrict access only on logged in cloudflare users for preview domain.
