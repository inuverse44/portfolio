provider "google" {
  project = var.project_id
}

locals {
  base_domain    = lower(replace(trimspace(var.base_domain), "/\\.$/", ""))
  dns_project_id = coalesce(var.dns_project_id, var.project_id)
}

provider "google" {
  alias   = "dns"
  project = local.dns_project_id
}

data "google_dns_managed_zone" "zone" {
  provider = google.dns
  name     = var.dns_managed_zone_name
}

resource "google_project_service" "compute" {
  service            = "compute.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "dns" {
  provider           = google.dns
  service            = "dns.googleapis.com"
  disable_on_destroy = false
}

resource "google_compute_global_address" "apex_redirect_ip" {
  name         = "apex-redirect-ip"
  address_type = "EXTERNAL"
  depends_on   = [google_project_service.compute]
}

# Managed SSL certificate for apex (inuverse.dev)
resource "google_compute_managed_ssl_certificate" "apex_ssl" {
  name = "apex-ssl"
  managed {
    domains = [local.base_domain]
  }
  depends_on = [google_project_service.compute]
}

# URL map that issues 301 redirect to https://www.<base_domain>
resource "google_compute_url_map" "apex_redirect_map" {
  name = "apex-redirect-map"

  default_url_redirect {
    https_redirect         = true
    host_redirect          = "www.${local.base_domain}"
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT" # 301
    strip_query            = false
  }
  depends_on = [google_project_service.compute]
}

resource "google_compute_target_https_proxy" "apex_https_proxy" {
  name             = "apex-https-proxy"
  url_map          = google_compute_url_map.apex_redirect_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.apex_ssl.id]
  depends_on       = [google_project_service.compute]
}

resource "google_compute_global_forwarding_rule" "apex_https_forwarding" {
  name                  = "apex-https-forwarding-rule"
  ip_address            = google_compute_global_address.apex_redirect_ip.address
  port_range            = "443"
  target                = google_compute_target_https_proxy.apex_https_proxy.id
  load_balancing_scheme = "EXTERNAL"
  network_tier          = "PREMIUM"
  depends_on            = [google_project_service.compute]
}

# Optional: HTTP 80 also redirects to HTTPS on www
resource "google_compute_target_http_proxy" "apex_http_proxy" {
  name    = "apex-http-proxy"
  url_map = google_compute_url_map.apex_redirect_map.id
  depends_on = [google_project_service.compute]
}

resource "google_compute_global_forwarding_rule" "apex_http_forwarding" {
  name                  = "apex-http-forwarding-rule"
  ip_address            = google_compute_global_address.apex_redirect_ip.address
  port_range            = "80"
  target                = google_compute_target_http_proxy.apex_http_proxy.id
  load_balancing_scheme = "EXTERNAL"
  network_tier          = "PREMIUM"
  depends_on            = [google_project_service.compute]
}

# Apex A record -> LB IP
resource "google_dns_record_set" "apex_a" {
  provider     = google.dns
  managed_zone = data.google_dns_managed_zone.zone.name
  name         = "${local.base_domain}."
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_global_address.apex_redirect_ip.address]
  depends_on   = [google_project_service.dns]
}
