# CI/CD

- [setup Github organization secrets to access Cloudflare](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- Github
  - Setup branches rules for main and staging
  - setup Github action to only allow PRs from staging to main and dev to staging
- Cloudflare
  - Setup custom domain for main branch
  - Restrict access only for logged in Cloudflare users for preview domains
  - invite members in cloudflare to access preview environment (staging)
- In astro.config.mjs set the site as env variable
- Github actions upload static files to Cloudflare pages
  - direct upload with wrangler to Cloudflare pages
  - deployments on Github
  - auto delete preview deployment from PR request on PR close
  - cache pnpm install and build output

## Todo

[] Github action setup Cloudflare auto-expire of old deployments
