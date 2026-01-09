output "apex_redirect_ip" {
  description = "Global IPv4 address for apex redirect LB"
  value       = google_compute_global_address.apex_redirect_ip.address
}

output "managed_ssl_status_note" {
  description = "Note: Managed cert becomes ACTIVE only after apex A record points to LB IP and DNS propagates."
  value       = "See Google Console: Network Services -> Load balancing -> Certificates"
}

