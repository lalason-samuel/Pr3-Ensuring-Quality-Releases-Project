output "network_id" {
  value = azurerm_subnet.my_terraform_subnet.id
}

output "network_interface_id" {
  value = azurerm_network_interface.my_terraform_nic.id
}

output "subnet_id" {
  value = azurerm_subnet.my_terraform_subnet.id
}
