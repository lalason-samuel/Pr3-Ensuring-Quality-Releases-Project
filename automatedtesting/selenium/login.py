from selenium import webdriver
from selenium.webdriver.common.by import By

#datetime.now().strftime("%m-%d-%y %H:%M:%S")

login_url = 'https://www.saucedemo.com/'
inventory_url = 'https://www.saucedemo.com/inventory.html'
cart_url = 'https://www.saucedemo.com/cart.html'

options = webdriver.ChromeOptions()
options.add_argument('--headless')
driver = webdriver.Chrome(".chromedriver",options=options)

driver.get(login_url) 

user = 'standard_user'
password = 'secret_sauce'

print ('Test: login. Navigating to the demo page to login {}'.format(login_url))
driver.get(login_url)
print ('Login attempt, user: {},  password: {}'.format(user, password))
driver.find_element(By.NAME, 'user-name').send_keys(user)
driver.find_element(By.NAME, 'password').send_keys(password)
driver.find_element(By.NAME, 'login-button').click()
#print ('Assert in inventory page. ')
assert inventory_url in driver.current_url
#print ('User successfully logged in.')
print ('Test Login Success.')


items_in_cart = []
print ('Test: adding items to cart')
elements = driver.find_elements(By.CLASS_NAME,"inventory_item")
#print('Total items to add: {}'.format(len(elements)))
for item in elements:
    item_name = item.find_element(By.CLASS_NAME,'inventory_item_name').text
    items_in_cart.append(item_name)
    item.find_element(By.CLASS_NAME,'btn_inventory').click()
    print('Added {} to cart'.format(item_name))
#print ('Assert in cart icon to reflect {} items added.'.format(len(elements)))
cart_element = driver.find_element(By.CLASS_NAME,'shopping_cart_badge')
assert int(cart_element.text) == len(elements)
#print ('Navigate to cart and assert items in cart.')
driver.find_element(By.CLASS_NAME,'shopping_cart_link').click()
#print ('Assert in cart page. ')
assert cart_url in driver.current_url
#print ('Assert items in cart. ')
for item in driver.find_elements(By.CLASS_NAME,'inventory_item_name'):
    assert item.text in items_in_cart
#print ('Asserted items in cart ') 
print ('Test Add Items in cart Success.')



print ('Test: removing items from cart')
#print ('Navigate to cart and assert items in cart.')
driver.find_element(By.CLASS_NAME,'shopping_cart_link').click()
#print ('Assert in cart page.')
assert cart_url in driver.current_url

print("Items in Cart: {}".format(len(driver.find_elements(By.CLASS_NAME,'cart_item'))))

#print('Remove all items from cart.')
for item in driver.find_elements(By.CLASS_NAME,'cart_item'):
    item_name = item.find_element(By.CLASS_NAME,'inventory_item_name').text
    item.find_element(By.CLASS_NAME,'cart_button').click()
    print('Removed {} from cart'.format(item_name))

#print('Assert cart is empy')
#print("Items in Cart: {}".format(len(driver.find_elements(By.CLASS_NAME,'cart_item'))))
assert len(driver.find_elements(By.CLASS_NAME,'cart_item')) == 0
#print('Cart empty.')
print ('Test Remove Items from cart Success.')

print("UI Tests completed.")
driver.quit()