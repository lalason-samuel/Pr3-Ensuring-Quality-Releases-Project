output "pip_id" {
  value = azurerm_public_ip.my_terraform_public_ip.id
}

output "ip_address" {
  value = azurerm_public_ip.my_terraform_public_ip.ip_address
}
