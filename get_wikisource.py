#!/usr/bin/env python
import sys
from selenium import webdriver

def __GetFromWikiSource():
   if len(sys.argv) != 2 :
       print("There should be 2 parameters but recieves ", len(sys.argv))
       return 1
   pFile = sys.argv[1]     
   GetTxtFromWikiSource(pFile)
   return 0

def GetTxtFromWikiSource(pFile):
    fp = webdriver.FirefoxProfile("/home/raylex/.mozilla/firefox/6s43w0zc.wikisource")
    driver = webdriver.Firefox(firefox_profile=fp)
    driver.get('https://ws-export.wmcloud.org/?lang=zh&format=txt&title=%E5%A6%82%E6%84%8F%E5%90%9B%E5%82%B3')
    pageElement = driver.find_element_by_name('page')
    submitElement = driver.find_element_by_css_selector('input.btn.btn-primary')
    pageElement.clear()
    pageElement.send_keys(pFile)
    submitElement.click()
    driver.quit()
    return

if __name__ == '__main__':
    sys.exit(__GetFromWikiSource())
