# # Azure GUIDS
# variable "subscription_id" {}
# variable "client_id" {}
# variable "client_secret" {}
# variable "tenant_id" {}


# Resource Group/Location
variable "location" {}
variable "resource_group" {}
variable "resource_type" {}
variable "application_type" {}

variable "password" {
  description = "entrer password please"
  sensitive   = true
  default     = "S@miMvola1234"
}

# # Network
# variable virtual_network_name {}
# variable address_prefix_test {}
# variable address_space {}

