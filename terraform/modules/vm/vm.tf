# Create virtual machine
resource "azurerm_linux_virtual_machine" "my_terraform_vm" {
  name = "${var.application_type}-${var.resource_type}"

  location                        = var.location
  resource_group_name             = var.resource_group
  network_interface_ids           = [var.network_interface_ids]
  size                            = "Standard_D2s_v3"
  computer_name                   = "myLinuxVM"
  admin_username                  = "sami"
  admin_password                  = var.password
  disable_password_authentication = false

  os_disk {
    name                 = "${var.application_type}-${var.resource_type}-DISK"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb         = 64
  }


  # source_image_reference {
  #   publisher = "Canonical"
  #   offer     = "UbuntuServer"
  #   sku       = "20.04-LTS"
  #   version   = "latest"
  # }
  # az vm image list --all --publisher="Canonical" --sku="20_04-lts-gen2"
  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }

  # source_image_reference {
  #   publisher = "RedHat"
  #   offer     = "RHEL"
  #   sku       = "86-gen2"
  #   version   = "latest"
  # }

  tags = { environment = "dev" }
}
