from selenium import webdriver
fp = webdriver.FirefoxProfile("/home/raylex/.mozilla/firefox/6s43w0zc.wikisource")
driver = webdriver.Firefox(firefox_profile=fp)
driver.get('https://ws-export.wmcloud.org/?lang=zh&format=txt&title=%E5%A6%82%E6%84%8F%E5%90%9B%E5%82%B3')
pageElement = driver.find_element_by_name('page')
submitElement = driver.find_element_by_css_selector('input.btn.btn-primary')
pageElement.clear()
pageElement.send_keys('金瓶梅/第98回')
submitElement.click()
print(driver.title)
#driver.quit()

