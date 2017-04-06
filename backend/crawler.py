from selenium import webdriver
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json
import time

f = open('output', 'w')
classes = []
#j = open('../routes/classes.json', 'w')
j = open('./classes.json', 'w')

capabilities = webdriver.DesiredCapabilities().FIREFOX
capabilities['acceptSslCerts'] = True
driver = webdriver.Firefox(capabilities=capabilities)
driver.get('https://compass-ssb.tamu.edu/pls/PROD/bwckschd.p_disp_dyn_sched')
print driver.title

select = Select(driver.find_element_by_name('p_term'))
select.select_by_value('201731')
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
    print option

    select2 = Select(driver.find_element_by_id('subj_id'))
    select2.deselect_all()
    select2.select_by_value(option)
    driver.find_element_by_xpath("/html/body/div[@class='pagebodydiv']/form/input[12]").click()

    try:
        WebDriverWait(driver, 30).until(EC.title_is('Class Schedule Listing'))
    except TimeoutException:
        print "Loading took too much time!"
    time.sleep(1)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    titles = soup.find_all('th', class_="ddtitle")
    class_names = []
    crns = []
    subjects = []
    courses = []
    sections = []
    class_data = {}
    
    for item in titles:
        print(item)
        items = str(item.find('a').get_text()).split(' - ')
        
        if (items[2].isdigit()):
            class_names.append(items[0] + '-' + items[1])
            crns.append(items[2])
            sc = items[3].split(' ')
            subjects.append(sc[0])
            courses.append(sc[1])
            sections.append(items[4])
        elif (items[1].isdigit()):
            class_names.append(items[0])
            crns.append(items[1])
            sc = items[2].split(' ')
            subjects.append(sc[0])
            courses.append(sc[1])
            sections.append(items[3])
        else:
            class_names.append(items[0])
            crns.append(items[2])
            sc = items[3].split(' ')
            subjects.append(sc[0])
            courses.append(sc[1])
            sections.append(items[4])

    infos = soup.find_all('td', class_="dddefault")
    info_list = []
    flag = False
    combined = ''
    instructors = []
    credit = []
    for info in infos:
        for line in info.get_text().split('\n'):
            if line != '':
                if flag == True:
                    combined += line
                    info_list.append(combined)
                    #print(combined)
                    flag = False
                elif line.strip(' ') == 'Instructors:':
                    flag = True
                    combined = line
                else:
                    info_list.append(line)

    for info in info_list:
        if 'Instructors:' in info:
            instructors.append(str(info.replace('Instructors:',''))[1:])
        if 'Credits' in info:
            credit.append(str(info.strip(' '))[:5])
    
    info_list = []
    item_infos = []
    class_infos = []
    infos = soup.find_all('tr')
    for info in infos:
        if info.parent.name == 'tbody' and info.parent.parent.name == 'table' and info.parent.parent.parent.name == 'td':
            for line in info.get_text().encode('utf-8').decode('ascii', 'ignore').split('\n'):
                #print line
                if line == 'Type':
                    if (item_infos != []):
                        class_infos.append(item_infos)
                    item_infos = []
                    break
                elif line != '':
                    info_list.append(str(line))
                elif line == '' and len(info_list) != 0:
                    if info_list[-1] == 'TBA':
                        info_list.append(str(line))
            if info_list != []:
                item_infos.append(info_list)
            info_list = []
    
    for item in zip(subjects,courses,crns,sections,credit,class_names,instructors,class_infos):
        #print(item)
        class_data = {}
        class_data['subject'] = item[0]
        class_data['course'] = item[1]
        class_data['crn'] = item[2]
        class_data['section'] = item[3]
        class_data['credit'] = item[4].strip('.000')
        class_data['title'] = item[5]
        class_data['instructor'] = [i.strip(' ').strip(' (P)') for i in item[6].split(',')]
        date = item[7][0][4].split(' - ')
        if len(date) == 2:
            class_data['date'] = {'start_date':date[0], 'end_date':date[1]}
        else:
            class_data['date'] = 'TBA'
        schedule = []
        for elem in item[7]:
            sch_dict = {}
            sch_dict['days'] = [d for d in elem[2]]
            if elem[1] != 'TBA':
                sch_dict['start_time'] = elem[1].split(' - ')[0]
                sch_dict['end_time'] = elem[1].split(' - ')[1]
            else:
                sch_dict['start_time'] = 'TBA'
                sch_dict['end_time'] = 'TBA'
            sch_dict['location'] = elem[3]
            sch_dict['class_type'] = elem[0]
            sch_dict['date'] = elem[4]
            schedule.append(sch_dict)
        class_data['schedule'] = schedule
        classes.append(class_data)
        print(class_data)
        f.write(json.dumps(class_data))

    print(len(titles))

    driver.back()
    
    try:
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.ID, "subj_id")))
    except TimeoutException:
        print "Loading took too much time!"

j.write(json.dumps(classes))
f.close()
j.close()
driver.close()
