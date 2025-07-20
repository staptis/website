#!/bin/bash
set -euo pipefail

# Load required environment variables
CF_API_TOKEN="${CLOUDFLARE_API_TOKEN}"
PROJECT_NAME="${CLOUDFLARE_PROJECT_NAME}"
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID}"

echo "🔍 Using environment:"
echo "  CF_API_TOKEN: ${#CF_API_TOKEN} characters"
echo "  PROJECT_NAME: $PROJECT_NAME"
echo "  ACCOUNT_ID: $ACCOUNT_ID"

# Check if all required env vars are set
if [[ -z "$CF_API_TOKEN" ]]; then
  echo "❌ Error: Missing required environment variables CLOUDFLARE_API_TOKEN"
  exit 1
fi
if [[ -z "$PROJECT_NAME"  ]]; then
  echo "❌ Error: Missing required environment variables CLOUDFLARE_PROJECT_NAME"
  exit 1
fi
if [[ -z "$ACCOUNT_ID" ]]; then
  echo "❌ Error: Missing required environment variables CLOUDFLARE_ACCOUNT_ID"
  exit 1
fi

# Fetch all deployments
echo "📦 Fetching deployments from Cloudflare..."
response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json")

if [[ $? -ne 0 ]]; then
  echo "❌ Error fetching deployments"
  exit 1
fi

# Extract IDs of deployments to delete (older than 3 per branch)
delete_ids=$(echo "$response" | jq -r '
  .result
  | group_by(.deployment_trigger.metadata.branch)
  | map(
      sort_by(.created_on) | reverse | .[3:]  # skip 3 most recent
    )
  | flatten
  | .[].id
')

# Delete deployments
echo "🧹 Deleting old deployments..."
for id in $delete_ids; do
  echo "➡️ Deleting deployment ID: $id"
  curl -s -X DELETE "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$id" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    | jq -r '. | if .success then "✅ Deleted" else "❌ Failed to delete: \(.errors | map(.message) | join(", "))" end'
done
