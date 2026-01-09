# Apex to WWW Redirect on GCP (Terraform)

This Terraform config creates a global HTTPS load balancer that 301-redirects `https://<apex>` to `https://www.<apex>` and updates the apex A record in your existing Cloud DNS zone.

It does NOT touch your existing `www` mapping to Cloud Run.

## What it creates
- Global static IPv4 address for the LB
- Managed SSL certificate for the apex domain (Google-managed)
- URL map that issues `301` to `https://www.<apex>` (and forces HTTPS)
- Target HTTPS/HTTP proxies + forwarding rules (443 and 80)
- Cloud DNS A record for the apex (`@`) pointing to the LB IP

## Prereqs
- Terraform >= 1.5, Google provider >= 5.0
- `gcloud auth application-default login` or other ADC auth configured
- Existing Cloud DNS managed zone that serves your apex domain

## Variables
- `project_id`: GCP project ID
- `base_domain`: Apex domain, e.g. `inuverse.dev`
- `dns_managed_zone_name`: Name of your existing Cloud DNS zone (not the domain). Example: `inuverse-dev`
- `dns_project_id` (optional): Project ID that hosts the Cloud DNS zone (defaults to `project_id`)

## Usage
Quick start（コピペ用）
Important
- サンプル内の `YOUR_PROJECT_ID` / `YOUR_ZONE_NAME` は必ず実プロジェクトID/ゾーン名に置き換えてください。
- `base_domain` は 1 行・改行なしで指定してください（`inuverse.dev`）。改行が混入すると `inuve\\nrse.dev` のようなエラーになります。
```bash
# 認証（ADC）
gcloud auth application-default login

# ディレクトリ移動
cd infra/terraform/apex-redirect

# 初期化
terraform init

# 1行で実行（改行を入れないでください）
terraform plan \
  -var 'project_id=inuverse-portfolio' \
  -var 'base_domain=inuverse.dev' \
  -var 'dns_managed_zone_name= inuverse-dev'

terraform apply \
  -var 'project_id=inuverse-portfolio' \
  -var 'base_domain=inuverse.dev' \
  -var 'dns_managed_zone_name= inuverse-dev'
```

tfvars を使う場合（推奨）
```bash
cd infra/terraform/apex-redirect
cat > terraform.tfvars << 'EOF'
project_id            = "YOUR_PROJECT_ID"     # 例: inuverse-portfolio
base_domain           = "inuverse.dev"
dns_managed_zone_name = "YOUR_ZONE_NAME"      # 例: inuverse-dev
# dns_project_id      = "DNS_ZONE_PROJECT"    # DNSゾーンが別プロジェクトの場合に指定
EOF

terraform init
terraform plan  -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

環境変数で渡す場合
```bash
export TF_VAR_project_id=YOUR_PROJECT_ID
export TF_VAR_base_domain=inuverse.dev
export TF_VAR_dns_managed_zone_name=YOUR_ZONE_NAME
## DNSゾーンが別プロジェクトなら
# export TF_VAR_dns_project_id=DNS_ZONE_PROJECT

cd infra/terraform/apex-redirect
terraform init
terraform plan
terraform apply
```

After apply:
- DNS A record for `inuverse.dev` will point to the LB IP
- The managed SSL certificate will become `ACTIVE` after DNS propagates (typically 5–30 minutes)

If API activation causes the first apply to fail:
- This config auto-enables `compute.googleapis.com` and `dns.googleapis.com`.
- Wait 1–2 minutes and run the same `terraform apply` again.

If an existing apex A record already exists in your zone:
```bash
# Either delete the existing A record manually, or import it before apply
terraform import google_dns_record_set.apex_a YOUR_ZONE_NAME/inuverse.dev./A
# then rerun: terraform apply
```

Find your Cloud DNS zone name
```bash
gcloud dns managed-zones list --project=YOUR_PROJECT_ID
# NAME            DNS_NAME       VISIBILITY
# inuverse-dev    inuverse.dev.  public
```

## Verify
```bash
curl -I http://inuverse.dev     # 301 -> https://www.inuverse.dev/
curl -I https://inuverse.dev    # 301 -> https://www.inuverse.dev/
curl -I https://inuverse.dev/ads.txt  # 301 -> https://www.inuverse.dev/ads.txt (200)
```

Then re-request review in AdSense (site: `inuverse.dev`).

## Notes
- If you already have an apex A record managed outside Terraform, the new record will conflict. Remove it or import it into Terraform before applying.
- The `www` host continues to be served by your existing Cloud Run custom domain mapping.
- You can later extend this LB to also front `www` if you want a single entry point, but it is not required.

AdSense follow-up
- In AdSense, open Sites and select `inuverse.dev`.
- Click “I’ve placed the code” → “Request review”.
- Optionally verify a Search Console Domain property for `inuverse.dev` (DNS TXT) to strengthen ownership signals.

Troubleshooting
- Permission denied on resource project YOUR_PROJECT_ID (CONSUMER_INVALID)
  - 置き換え漏れの可能性が高いです。`YOUR_PROJECT_ID` を実プロジェクトIDに置き換えて再実行してください。
  - Cloud DNS が別プロジェクトなら `-var 'dns_project_id=...'` を追加し、そのプロジェクトで `roles/dns.admin` と `roles/serviceusage.serviceUsageAdmin` を付与。
  - 認証アカウントに対象プロジェクトの権限があるか確認（Compute 側は `roles/compute.admin`、`roles/serviceusage.serviceUsageAdmin`）。
- Invalid domain name specified（`inuve\nrse.dev` など）
  - `base_domain` に改行が混入しています。1 行にして指定、または `terraform.tfvars` を使用してください。
- Compute/DNS API SERVICE_DISABLED/403
  - 本構成は API を自動有効化しますが、反映に数分かかる場合があります。1〜2 分待って同じ `terraform apply` を再実行してください。
