import os
import json
import time
from playwright.sync_api import sync_playwright

AUDIO_URLS = []  # List to store actual audio file URLs

def intercept_request(route, request):
    """Intercepts network requests and stores potential audio URLs."""
    url = request.url
    if "audio" in url:
        print(f"Captured Audio URL: {url}")
    route.continue_()

def intercept_response(response):
    """Filters actual audio files based on content type or JSON response."""
    url = response.url
    content_type = response.headers.get("content-type", "")
    try:
        if "audio" in content_type:  # Directly an audio file
            print(f"✅ Audio File Detected: {url}")
            if url not in AUDIO_URLS:
                AUDIO_URLS.append(url)
        elif "application/json" in content_type:  # Check JSON response
            json_response = response.json()
            if isinstance(json_response, list) and json_response:
                for item in json_response:
                    if item.get("audioPlayable", False):  # Only keep playable audio
                        print(f"🔄 Found playable audio in JSON: {url}")
                        # Optionally, you could append here too.
    except Exception as e:
        print(f"Error processing response from {url}: {e}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()

    # Load cookies from the file
    cookies_path = os.path.join("backend", "cookies.json")
    if os.path.exists(cookies_path):    
        with open(cookies_path, "r") as f:
            cookies = json.load(f)
        context.add_cookies(cookies)
    else:
        print("Cookies file not found. Please run the login script first.")
        exit(1)
    
    page = context.new_page()
    
    # Intercept network requests & responses
    page.route("**/*", intercept_request)
    page.on("response", intercept_response)
    
    page.goto("https://www.amazon.in/alexa-privacy/apd/rvh")
    
    # Wait for the dynamic content to load
    page.wait_for_selector("div.record-summary-preview.customer-transcript", timeout=15000)
    
    # Locate all activity containers
    activities = page.locator("div.apd-content-box.with-activity-page")
    activity_count = activities.count()
    print(f"Found {activity_count} activities.")

    for i in range(activity_count):
        activity = activities.nth(i)
        print(f"Processing activity {i}...")
        expand_btn = activity.locator("button.apd-expand-toggle-button.button-clear.fa.fa-chevron-down")
        try:
            if expand_btn.count() > 0:
                expand_btn.first.click()
                page.wait_for_timeout(1000)
                play_btn = activity.locator("button.apd-icon-button-round.play-audio-button.button-clear.fa.fa-play-circle")
                if play_btn.count() > 0:
                    play_btn.first.click()
                    print(f"Activity {i}: Clicked play audio button.")
                    if i == activity_count - 1:
                        # For the final activity, wait for the audio response using Playwright's built-in wait
                        try:
                            page.wait_for_response(
                                lambda response: "audio" in response.url and response.status == 200,
                                timeout=15000
                            )
                            print(f"Activity {i}: Final audio response received.")
                        except Exception as e:
                            print(f"Activity {i}: No audio response received within timeout: {e}")
                    else:
                        time.sleep(5)  # Wait for request to be made for non-final activities
                else:
                    print(f"Activity {i}: Play audio button not found, continuing.")
            else:
                print(f"Activity {i}: Expand toggle button not found, skipping.")
        except Exception as e:
            print(f"Error processing activity {i}: {e}")

    # Write the captured audio URLs to file
    audio_urls_path = os.path.join("backend", "audio_urls.json")
    with open(audio_urls_path, "w") as f:
        json.dump(AUDIO_URLS, f, indent=2)
        
    print(f"Extracted {len(AUDIO_URLS)} actual audio URLs. Saved to {audio_urls_path}.")
    browser.close()
