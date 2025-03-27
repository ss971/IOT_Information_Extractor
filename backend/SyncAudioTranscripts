import json
import re

def extract_transcripts_with_timestamps(file_path):
    """
    Reads the transcript file line by line and extracts entries.
    An entry is expected to have:
      - A line starting with a double quote (") that contains the transcript.
      - The following line starting with "Today" contains the timestamp.
    This function uses a regex to capture only the base timestamp (e.g. "Today 12:14 am").
    Returns a list of dicts with 'transcript' and 'timestamp' keys.
    """
    transcripts = []
    # Regex to capture timestamp: "Today <hour>:<minute> am/pm"
    timestamp_pattern = re.compile(r"^(Today\s+\d{1,2}:\d{2}\s*(?:am|pm))", re.IGNORECASE)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith('"'):
            # Remove surrounding quotes from the transcript
            transcript = line.strip('"')
            timestamp = ""
            # Look ahead for the next line that starts with "Today"
            j = i + 1
            while j < len(lines):
                next_line = lines[j].strip()
                if next_line.startswith("Today"):
                    m = timestamp_pattern.match(next_line)
                    if m:
                        timestamp = m.group(1)
                    else:
                        timestamp = next_line  # fallback if regex doesn't match
                    break
                j += 1
            transcripts.append({
                "transcript": transcript,
                "timestamp": timestamp
            })
        i += 1
    return transcripts

# Load audio URLs from a JSON file.
with open("C:\\Users\\allen\\VsCode\\CIDECODE\\cidecode\\backend\\audio_urls.json", 'r') as f:
    audio_urls = json.load(f)

# Extract transcripts and timestamps from the transcript file.
transcripts_data = extract_transcripts_with_timestamps('alexa_activity_log.txt')

print("Extracted Transcript Data:")
for idx, entry in enumerate(transcripts_data, 1):
    print(f"{idx}: {entry}")

# Match audio URLs with transcript data in order.
matched = {}
for url, entry in zip(audio_urls, transcripts_data):
    matched[url] = entry

# Output the mapping as JSON.
matched_json = json.dumps(matched, indent=2)
print("\nMatched Audio URLs with Transcripts and Timestamps:")
print(matched_json)

# Write the mapping to a JSON file.
with open("matched_audio_transcripts.json", "w") as f:
    json.dump(matched, f, indent=2)
