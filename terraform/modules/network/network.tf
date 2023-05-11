# resource "azurerm_virtual_network" "test" {
#   name                 = "${var.application_type}-${var.resource_type}"
#   address_space        = "${var.address_space}"
#   location             = "${var.location}"
#   resource_group_name  = "${var.resource_group}"
# }
# resource "azurerm_subnet" "test" {
#   name                 = "${var.application_type}-${var.resource_type}-sub"
#   resource_group_name  = "${var.resource_group}"
#   virtual_network_name = "${azurerm_virtual_network.test.name}"
#   address_prefix       = "${var.address_prefix_test}"
# }


# Create virtual network
resource "azurerm_virtual_network" "my_terraform_network" {
  name                = "${var.application_type}-${var.resource_type}"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = var.resource_group
}

# Create subnet
resource "azurerm_subnet" "my_terraform_subnet" {
  name                 = "${var.application_type}-${var.resource_type}-sub"
  resource_group_name  = var.resource_group
  virtual_network_name = azurerm_virtual_network.my_terraform_network.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Create network interface
resource "azurerm_network_interface" "my_terraform_nic" {
  name                = "${var.application_type}-${var.resource_type}-nic"
  location            = var.location
  resource_group_name = var.resource_group

  ip_configuration {
    name                          = "my_nic_configuration"
    subnet_id                     = var.subnet_id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = var.public_ip_address_id
  }
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "example" {
  network_interface_id      = azurerm_network_interface.my_terraform_nic.id
  network_security_group_id = var.network_security_group_id
}
