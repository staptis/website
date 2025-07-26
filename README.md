# Website

## TODOS

[] recaptcha for contact from
[] add two columns for leads googl sheeth date added and email sent boolean
[] add the screenshots for the steps in home page
[] add screen recording for hero sections
[] setup the privacy policy and terms of service
[] setup the faq page
[] Redirect user to its preferred language
[] activate login, or rather dashboard, button
[] github actions to create automated releases and tags for main branch

## Local development

- add .dev.vars in root folder, see .dev.vars.template
- hot reloading
  - for frontend only: pnpm dev (in vscode: pnpm dev)
  - for page functions only (with wrangler): pnpm run production (in vscode: pnpm production)
- email template (under functions/src/emailTemplates):
  - create an $name.mjml email
  - run: pnmp run build:email
  - copy the content from the generated html file from build/emails/$name.html to functions/src/emailTemplates/$name.ts and export it as default

## CI/CD setup

### Github

- [setup Github organization secrets to access Cloudflare](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/)
- [setup preview, development, staging and production environment for deployments](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment)
- [Setup branches rules for main and staging](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
- [setup Github action to only allow PRs from staging to main and dev to staging](.github/workflows/enforcer.yaml)
- add PUBLIC_TURNSTILE_SITE_KEY to Github organization secrets

### Cloudflare

- [Setup custom domain for main branch](https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/)
- [Restrict access only for logged in Cloudflare users for preview domains](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [invite members in cloudflare to access preview environment](https://developers.cloudflare.com/fundamentals/setup/manage-members/manage/)
- [setup google login](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/google/), then add login method to application in zero trust
- [Github actions upload static files to Cloudflare pages](.github/workflows/cloudflare-pages-deployment.yaml)
  - direct upload with wrangler to Cloudflare pages
  - deployments on Github
  - auto delete preview deployment from PR request on PR close
  - cache pnpm install and build output

## Deployment

### Cloudflare configuration

- add Resend and Google envs in Cloudfare for the page functions. See .dev.vars.template for all envs
- add Cloudfare rate limiting for page functions api endpoint
- add Cloudfare captcha for contact form
