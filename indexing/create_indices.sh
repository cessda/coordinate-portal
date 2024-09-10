#!/bin/bash
set -eux

# Function to create index from settings JSON file
create_index() {
    local index_name="$1"
    local settings_file="$2"
    local api_key=""

    curl -X PUT "localhost:9200/$index_name?pretty" \
    -H "Authorization: ApiKey $api_key" \
    -H 'Content-Type: application/json' \
    -d @"$settings_file"
}

# Loop through settings JSON files and create indices
for settings_file in settings/*.json; do
    filename=$(basename -- "$settings_file")
    lang=$(echo "$filename" | cut -d "_" -f 3 | cut -d "." -f 1)
    create_index "coordinate_$lang" "$settings_file"
done
