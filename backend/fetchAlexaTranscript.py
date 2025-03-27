import os
import json
import re
from playwright.sync_api import sync_playwright

output_file = "alexa_activity_log.txt"

with sync_playwright() as p:
    # Launch the browser (headless mode)
    browser = p.chromium.launch(headless=True)
    
    # Create a new context where we'll add the cookies
    context = browser.new_context()
    
    # Load cookies from the file (ensure the file path is correct)
    cookies_path = "backend/cookies.json"
    if os.path.exists(cookies_path):    
        with open(cookies_path, "r") as f:
            cookies = json.load(f)
        # Add cookies to the context
        context.add_cookies(cookies)
    else:
        print("Cookies file not found. Please run the login script first.")
    
    # Open a new page using the context with loaded cookies
    page = context.new_page()
    page.goto("https://www.amazon.in/alexa-privacy/apd/rvh")
    
    # Wait for the dynamic content to load (adjust the timeout and selector as needed)
    page.wait_for_selector("div.record-summary-preview.customer-transcript", timeout=15000)
    
    # Extract and print the desired elements
    activities = page.query_selector_all("div.apd-content-box.with-activity-page")

    with open(output_file, "w", encoding="utf-8") as f:
        for activity in activities:
            text = activity.inner_text()
            # Insert a space between a letter and a digit (e.g., "Today4:41" -> "Today 4:41")
            formatted_text = re.sub(r'(?<=[A-Za-z])(?=\d)', " ", text)
            # Insert a space after "am"/"pm" if immediately followed by a letter (e.g., "amRajkumar's" -> "am Rajkumar's")
            formatted_text = re.sub(r'(?<=[ap]m)(?=[A-Za-z])', " ", formatted_text, flags=re.IGNORECASE)
            f.write(formatted_text + "\n")  # Write to file
            print(formatted_text)
        
    browser.close()

print(f"Extracted Alexa activity saved to {output_file}")

