import subprocess
import time

def run_adb_command(command):
    """ Run an ADB command and return output. """
    result = subprocess.run(['adb'] + command, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip()


def check_adb_device():
    """ Check if the device is connected. """
    devices, error = run_adb_command(['devices'])
    if error:
        print(f"ADB Error: {error}")
        return False
    if "device" in devices and len(devices.split("\n")) > 1:
        print("Device Connected.")
        return True
    else:
        print("No device found.")
        return False

def collect_device_properties():
    """ Get device properties (useful for forensic profile). """
    print("\n--- Device Properties ---")
    properties, _ = run_adb_command(['shell', 'getprop'])
    for line in properties.split("\n"):
        print(line)
    save_to_file("watch_logs/device_properties.txt", properties)

def get_user_account_details():
    print("\n---- User Accounts ----")

    account_info,_ = run_adb_command([])

def list_watch_files():
    """ List key file system areas - for forensic review. """
    important_dirs = [
        "/sdcard/Android/data",
        "/sdcard/",
        "/data/",
        "/system/",
        "/data/misc/",
        "/data/system/",
        "/data/user/0/"
    ]
    for directory in important_dirs:
        print(f"\n--- Listing: {directory} ---")
        files, _ = run_adb_command(['shell', 'ls', '-l', directory])
        print(files)
        save_to_file(f"file_listing_{directory.replace('/', '_')}.txt", files)

def pull_logs():
    """ Capture device logcat for forensic timeline reconstruction. """
    logcat_data, _ = run_adb_command(['logcat', '-d'])
    print("\n--- Captured Logcat ---")
    print(logcat_data[:500])  # print only the first 500 chars
    save_to_file("watch_logs/logcat_capture.txt", logcat_data)

def collect_account_info():
    acc_info, _ = run_adb_command(['shell', 'dumpsys', 'account'])
    save_to_file("watch_logs/account_information.txt", acc_info)

def ip_addr_info():
    ip_addr_info, _ = run_adb_command(['shell', 'ip', 'addr', 'show'])
    save_to_file("watch_logs/ip_address_information.txt", ip_addr_info)

def wifi_info():
    wifi_info, _ = run_adb_command(['shell', 'dumpsys', 'wifi'])
    save_to_file("watch_logs/wifi_information.txt", wifi_info)

def bluetooth_info():
    bluetooth_info, _ = run_adb_command(['shell', 'dumpsys', 'bluetooth_manager'])
    save_to_file("watch_logs/bluetooth_information.txt", bluetooth_info)

def sensor_data():
    sensor_data, _ = run_adb_command(['shell', 'dumpsys', 'sensorservice'])
    save_to_file("watch_logs/sensor_data.txt", sensor_data)


def save_to_file(filename, data):
    """ Save extracted data to file. """
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(data)

def main():
    print("Samsung Galaxy Watch 4 - Forensic Data Collection\n")

    # Check connection first
    if not check_adb_device():
        print("Ensure the watch is in developer mode and connected via Wi-Fi ADB.")
        return

    # Wait briefly to ensure device is ready
    time.sleep(2)

    # Collect device information
    collect_device_properties()

    # Pull system logs for forensic analysis
    pull_logs()

    # List critical files and directories
    # list_watch_files()

    #extract user/account info
    collect_account_info()

    # #IP Address information
    # ip_addr_info()

    # #Wi-fi information
    # wifi_info()

    #Bluetooth manager info
    bluetooth_info()

    #sensor data
    sensor_data()

    print("\nData collection complete. Check the generated files for evidence.")

if __name__ == "__main__":
    main()