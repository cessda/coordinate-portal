# Import
from selenium import webdriver
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

# Define Selenium server
SELENIUM_SERVER = "104.155.82.142"


# Test Title and basic usage
def test_basic():
    ''' Load Website and check if there is any error message on the main page '''
    # Load Chromedriver
    #driver = webdriver.Chrome()
    driver = webdriver.Remote(command_executor="http://%s:4444/wd/hub" %SELENIUM_SERVER,desired_capabilities={"browserName": "chrome","chromeOptions" : {"args" : ["--no-sandbox"]}})

    # Load PASC webpage and search for an error message
    driver.get('http://pasc-dev.cessda.eu')
    assert "No results found" not in driver.page_source

    # Close
    driver.quit()

def test_searchbar():
    ''' Enter a search term in the searchbar and check for errors '''
    # Load Chromedriver
    #driver = webdriver.Chrome()
    driver = webdriver.Remote(command_executor="http://%s:4444/wd/hub" %SELENIUM_SERVER,desired_capabilities={"browserName": "chrome","chromeOptions" : {"args" : ["--no-sandbox"]}})

    # Load PASC webpage aand test Title
    driver.get('http://pasc-dev.cessda.eu')

    # Searchbar
    driver.find_element_by_class_name("sk-search-box__text").send_keys("gesis")

    # Check for availables results
    assert "No results found" not in driver.page_source

    # Close
    driver.quit()

def test_advancedsearch():
    ''' Click on the Advanced Search and check for display '''
    # Load Chromedriver
    driver = webdriver.Remote(command_executor="http://%s:4444/wd/hub" %SELENIUM_SERVER,desired_capabilities={"browserName": "chrome","chromeOptions" : {"args" : ["--no-sandbox"]}})

    # Load PASC webpage
    driver.get('http://pasc-dev.cessda.eu')
    # Click on the Advanced Search to make it visible
    driver.find_element_by_link_text('Advanced search').click()

    # Catch is-active balise
    try:
        driver.find_element_by_xpath("//div[@class='modal is-active']")
    except NoSuchElementException:
        assert False
    assert True

    # Close
    driver.quit()

def test_language_german():
    ''' Switch pasc to German and check for german terms '''
    # Load Chromedriver
    driver = webdriver.Remote(command_executor="http://%s:4444/wd/hub" %SELENIUM_SERVER,desired_capabilities={"browserName": "chrome","chromeOptions" : {"args" : ["--no-sandbox"]}})

    # Load PASC webpage aand test Title
    driver.get('http://pasc-dev.cessda.eu')

    # Click on the dropdown menu
    driver.find_element_by_class_name("selected--flag--option").click()

    # Switch to German version by absolute Xpath
    driver.find_element_by_xpath("id(\"root\")/div[1]/header[1]/\
    div[2]/div[1]/div[1]/div[2]/div[2]/span[1]/span[1]/span[1]").click()

    # Check that we switch in German
    assert "Sprache" in driver.page_source
    # Close
    driver.quit()

def test_studies_link():
    ''' Click on the first study and check if redirection works '''
    # Load Chromedriver
    driver = webdriver.Remote(command_executor="http://%s:4444/wd/hub" %SELENIUM_SERVER,desired_capabilities={"browserName": "chrome","chromeOptions" : {"args" : ["--no-sandbox"]}})

    # Load PASC webpage aand test Title
    driver.get('http://pasc-dev.cessda.eu')

    # Wait for results to be loaded
    time.sleep(2)

    # Click on first study in the list
    driver.find_element_by_xpath("id(\"root\")/div[1]/div[1]/div[2]/\
    div[3]/div[1]/h4[1]/a[1]").click()

    # Wait for display
    time.sleep(2)

    # Check that we have the Description view
    assert "View JSON" in driver.page_source

    # Close
    driver.quit()

def test_view_json():
    ''' Click on the first study and check if JSON display works '''
    # Load Chromedriver
    driver = webdriver.Remote(command_executor="http://%s:4444/wd/hub" %SELENIUM_SERVER,desired_capabilities={"browserName": "chrome","chromeOptions" : {"args" : ["--no-sandbox"]}})

    # Load PASC webpage aand test Title
    driver.get('http://pasc-dev.cessda.eu')

    # Wait for results to be loaded
    time.sleep(2)

    # Click on first study in the list
    driver.find_element_by_xpath("id(\"root\")/div[1]/div[1]/div[2]/\
    div[3]/div[1]/h4[1]/a[1]").click()

    # Wait for display
    time.sleep(2)

    # Click on View JSON
    driver.find_element_by_xpath("id(\"root\")/div[1]/div[1]/div[2]/div[1]/a[3]").click()

    # Wait for display
    time.sleep(2)

    # Switch focus to the new tab
    driver.switch_to_window(driver.window_handles[1])

    time.sleep(2)
    # Check that we display a JSON file from our ES instance
    assert '{"dc":{"all":{"cc":["' in driver.page_source

    # close
    driver.quit()
