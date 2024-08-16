# Elasticsearch Settings Updater

This repository contains a Python script and two bash scripts to help manage Elasticsearch settings files. The Python script updates the `mappings` section of multiple Elasticsearch settings files with a specified mappings JSON file. The bash scripts are provided to automate the creation and reindexing of Elasticsearch indices.

## Contents

- `update_mappings.py`: Python script to update settings files with mappings.
- `create_indices.sh`: Bash script to create indices in Elasticsearch using the updated settings files.
- `reindex.sh`: Bash script to reindex data from existing indices to new indices.

## Prerequisites

- Python 3.x
- Elasticsearch running and accessible
- Curl (for the bash scripts)

## Usage

### Step 1: Update Settings Files

Run the Python script to update the settings files.

```bash
python update_settings_with_mappings.py
```

This script will update all the settings files in the directory specified in the Python script (`settings/` by default).

### Step 2: Create Indices

Use the `create_indices.sh` script to create new indices in Elasticsearch with the updated settings files.

1. Add API key to `api_key` in script

2. Run the bash script

    ```bash
    bash create_indices.sh
    ```

Note: This script doesn't handle deletion of already existing indices with the same name before creation so then it will just fail.

### Step 3: Reindex Indices

Use the `reindex.sh` script to add documents from existing indices according to the queries in reindex json files.

1. Add API key to `api_key` in script

2. Run the bash script

    ```bash
    bash reindex.sh
    ```

### Step 4: Check and Delete Empty Indices

1. Check for empty indices

    ```bash
    curl -X GET -H 'Content-Type: application/json' -H "Authorization: ApiKey replacethiswithyourapikey"  "http://localhost:9200/_cat/indices?v"
    ```

2. Delete empty indices, e.g. if sk, nl and sl were empty

    ```bash
    curl -X GET -H 'Content-Type: application/json' -H "Authorization: ApiKey replacethiswithyourapikey"  "localhost:9200/coordinate_sk"
    curl -X GET -H 'Content-Type: application/json' -H "Authorization: ApiKey replacethiswithyourapikey"  "localhost:9200/coordinate_nl"
    curl -X GET -H 'Content-Type: application/json' -H "Authorization: ApiKey replacethiswithyourapikey"  "localhost:9200/coordinate_sl"
    ```

