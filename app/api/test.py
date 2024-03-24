# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import time 

# #selenium
# driver = webdriver.Chrome()
# driver.execute_script("window.location = 'http://localhost:3000/dashboard/loan-application';")

# # Switch to the iframe by index (you can also switch by ID or name)


# iframe = driver.find_element(By.ID,'loan-app')
# driver.switch_to.frame(iframe)

# WebDriverWait(driver,25).until(
#     WebDriverWait(driver, 25).until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div[3]/div[1]/div[2]/div/div/div[2]/div/div[1]/div[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div/textarea")))
# )

# elem = driver.find_element(by=By.XPATH,value="/html/body/div[1]/div[3]/div[1]/div[2]/div/div/div[2]/div/div[1]/div[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div/textarea")
# iframe.send_keys("Ivory Tang")

# # Now you can interact with elements inside the iframe
# # element_inside_iframe = driver.find_element(By.ID,'annotationContainer')
# # Perform actions on the element inside the iframe
# # element_inside_iframe.click()
# # print("2")

# # element_inside_iframe.send_keys("Ivory Tang" + Keys.ENTER)

# # link = driver.find_element(By.PARTIAL_LINK_TEXT,"dogs with hats")
# # link.click()


# time.sleep(20)
# driver.quit()
