resource "azurerm_public_ip" "my_terraform_public_ip" {
  name                = "${var.application_type}-${var.resource_type}"
  location            = var.location
  resource_group_name = var.resource_group
  allocation_method   = "Dynamic"

}
