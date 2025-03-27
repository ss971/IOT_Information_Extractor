# Forensic Investigation Automation Project

## Overview
This project is designed to automate forensic investigations by extracting, analyzing, and summarizing data from digital devices. It consists of four phases, each handling a different aspect of data retrieval and reporting.

## Project Phases

### Phase 1: Smart Connectivity via ADB
- Uses ADB (Android Debug Bridge) to extract device information.
- Automates the retrieval of Bluetooth, WiFi connections, account details, and logs using Python scripts.
- Suspicious logs are analyzed and summarized using a pretrained LLM.

### Phase 2: Extracting Data from Amazon Alexa
- Logs into Amazon Alexa automatically using a script.
- Fetches transcripts and audio files for analysis.
- Extracted data is analyzed to identify any potential forensic evidence.

### Phase 3: Automated Forensic Report Generation
- Uses the `docx` module in Python to generate a detailed forensic report.
- The report includes findings from both ADB device logs and Alexa data.

### Phase 4: Web Interface for Case Management
- Develops a website to manage case numbers and details.
- Provides an interface to choose between different device sources.
- Streamlines access to extracted forensic data.

## Requirements
- Python (3.x)
- ADB (Android Debug Bridge)
- Selenium (for automated Alexa login)
- Pretrained LLM for log analysis
- `docx` module for report generation
- Web development framework (Django/Flask)

## Installation
1. Clone the repository:
   ```sh
   git clone <repo_url>
   cd forensic_project
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Set up ADB:
   - Enable ADB debugging on the target device.
   - Connect the device via USB or WiFi.
   - Run `adb devices` to verify connectivity.

4. Run the scripts:
   ```sh
   python samsung_adb.py  # For device data extraction
   node GenerateAmazonCookie.js  #for getting the cookies for the session
   python fetchAlexaTranscript.py  # For Alexa data extraction for transcripts
   python fetchAlexaAudio.py  # For Alexa data extraction for audio files 
   python generate_report.py  # To generate the forensic report
   node backend/server.js
   npm start  # To run the web interface
   ```

## Usage
- Extract logs from an Android device using ADB.
- Retrieve Alexa transcripts and audio files for analysis.
- Generate a forensic report automatically.
- Use the web interface to manage and review case details.

## Future Improvements
- Improve log analysis using advanced AI models.
- Enhance UI/UX for the web interface.
- Expand device compatibility.

## Contributors
- [Sherwin Allen]
- [Shambo Sarkar]
- [Meeran Ahmed]
- [Sathvik S]


