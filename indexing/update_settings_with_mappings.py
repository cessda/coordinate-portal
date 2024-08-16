"""Updates Elasticsearch settings files to have given mappings"""
import json
import os

def update_settings_with_mappings(settings_file, mappings_file, output_file=None):
    """
    Updates a settings JSON file by adding or replacing the "mappings" section
    with the contents of another mappings JSON file.

    Parameters:
    - settings_file (str): Path to the settings JSON file that needs to be updated.
    - mappings_file (str): Path to the mappings JSON file to be inserted into the settings.
    - output_file (str, optional): Path to save the updated settings file. If not provided,
                                   the original settings file will be overwritten.

    Returns:
    - None
    """
    # Load the settings JSON
    with open(settings_file, 'r', encoding='utf-8') as sf:
        settings_data = json.load(sf)

    # Load the mappings JSON
    with open(mappings_file, 'r', encoding='utf-8') as mf:
        mappings_data = json.load(mf)

    # Update the settings with the mappings
    settings_data['mappings'] = mappings_data

    # Define the output file
    if output_file is None:
        output_file = settings_file

    # Save the updated settings back to the file
    with open(output_file, 'w', encoding='utf-8') as of:
        json.dump(settings_data, of, indent=2)

def update_multiple_settings(settings_dir, mappings_file):
    """
    Updates the "mappings" section for all JSON settings files in a given directory.

    Parameters:
    - settings_dir (str): Path to the directory containing multiple settings JSON files.
    - mappings_file (str): Path to the mappings JSON file to be inserted into each settings file.

    Returns:
    - None
    """
    # Iterate over all files in the settings directory
    for filename in os.listdir(settings_dir):
        if filename.endswith('.json'):
            settings_file = os.path.join(settings_dir, filename)
            print(f"Updating {settings_file}...")
            update_settings_with_mappings(settings_file, mappings_file)

# Example usage
SETTINGS_DIRECTORY = 'settings'
MAPPINGS_FILE_PATH = 'mappings_coordinate.json'

update_multiple_settings(SETTINGS_DIRECTORY, MAPPINGS_FILE_PATH)
