from selenium import webdriver
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

f = open('output.txt', 'w')

capabilities = webdriver.DesiredCapabilities().FIREFOX
capabilities['acceptSslCerts'] = True
driver = webdriver.Firefox(capabilities=capabilities)
driver.get('https://compass-ssb.tamu.edu/pls/PROD/bwckschd.p_disp_dyn_sched')
print driver.title

select = Select(driver.find_element_by_name('p_term'))
select.select_by_value('201711')
driver.find_element_by_xpath("/html/body/div[@class='pagebodydiv']/form/input[2]").click()

try:
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "subj_id")))
    #print "Page is ready!"
except TimeoutException:
    print "Loading took too much time!"

select = driver.find_element_by_id('subj_id')
options = select.find_elements_by_tag_name("option")

optionsList = []
for option in options:
    optionsList.append(option.get_attribute("value"))

for option in optionsList:
    select2 = Select(driver.find_element_by_id('subj_id'))
    select2.select_by_value(option)
    driver.find_element_by_xpath("/html/body/div[@class='pagebodydiv']/form/input[12]").click()

    try:
        WebDriverWait(driver, 30).until(EC.title_is('Class Schedule Listing'))
        #print "Page is ready!"
    except TimeoutException:
        print "Loading took too much time!"

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    #f.write(soup.prettify())
    
    driver.back()
    
    try:
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "subj_id")))
        #print "Page is ready!"
    except TimeoutException:
        print "Loading took too much time!"

f.close()
driver.close()
