# Website

## CI/CD setup

- [setup Github organization secrets to access Cloudflare](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- Github
  - [setup preview, development, staging and production environment for deployments](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment)
  - [Setup branches rules for main and staging](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
  - [setup Github action to only allow PRs from staging to main and dev to staging](.github/workflows/enforcer.yaml)
- Cloudflare
  - [Setup custom domain for main branch](https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/)
  - [Restrict access only for logged in Cloudflare users for preview domains](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
  - [invite members in cloudflare to access preview environment](https://developers.cloudflare.com/fundamentals/setup/manage-members/manage/)
  - [setup google login](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/google/), then add login method to application in zero trust
- In astro.config.mjs set the site as env variable
- [Github actions upload static files to Cloudflare pages](.github/workflows/cloudflare-pages-deployment.yaml)
  - direct upload with wrangler to Cloudflare pages
  - deployments on Github
  - auto delete preview deployment from PR request on PR close
  - cache pnpm install and build output
