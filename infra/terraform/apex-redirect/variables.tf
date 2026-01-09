variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "base_domain" {
  description = "Apex domain, e.g. inuverse.dev"
  type        = string
  validation {
    condition     = var.base_domain == trimspace(var.base_domain) && !can(regex("\\s", var.base_domain))
    error_message = "base_domain に空白や改行を含めないでください。例: inuverse.dev"
  }
}

variable "dns_managed_zone_name" {
  description = "Existing Cloud DNS managed zone name that serves the base_domain"
  type        = string
}

variable "dns_project_id" {
  description = "GCP project ID that hosts the Cloud DNS zone (defaults to project_id)"
  type        = string
  default     = null
}
