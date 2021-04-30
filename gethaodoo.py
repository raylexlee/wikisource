#!/usr/bin/env python
# coding: utf-8
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time


def __GetFromHaoDoo():
   if len(sys.argv) != 4 :
       print("There should be 4 parameters but recieves ", len(sys.argv))
       return 1
   title = sys.argv[1]
   Mtext = sys.argv[2]
   Ptext = sys.argv[3]
   pLink = 'http://www.haodoo.net/?M=' + Mtext + '&P=' + Ptext
   GetEpubFromHaoDoo(pLink, Ptext, title)
   
   return 0

def GetEpubFromHaoDoo(pLink, code, book ):
    options = webdriver.ChromeOptions()
    options.add_argument('user-data-dir=/home/raylex/.config/google-chrome/')
    driver = webdriver.Chrome(chrome_options=options)
    driver.implicitly_wait(10) # seconds
    driver.get(pLink)
    submitElement = driver.find_element_by_xpath("//input[@value='下載 epub 檔']")
    submitElement.click()
    btn_in_modal_locator = (By.ID, 'okButton')
    wait = WebDriverWait(driver, 10)
    btn_in_modal = wait.until(EC.element_to_be_clickable(btn_in_modal_locator))
    btn_in_modal.click()
    file_path = '/home/raylex/epub/japan/' + code + '.epub'
    while not os.path.exists(file_path):
        time.sleep(1)
    os.chdir('/home/raylex/epub/japan')
    os.rename(code + '.epub', book + '.epub')
    driver.quit()
    return

if __name__ == '__main__':
    sys.exit(__GetFromHaoDoo())
