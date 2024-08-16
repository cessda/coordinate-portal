#!/bin/bash

# Function to reindex using reindex JSON file
reindex() {
    local reindex_file="$1"
    local api_key=""

    curl -X POST "localhost:9200/_reindex" \
    -H "Authorization: ApiKey $api_key" \
    -H 'Content-Type: application/json' \
    -d @"$reindex_file"
}

# Loop through reindex JSON files and reindex
for reindex_file in reindex/*.json; do
    reindex "$reindex_file"
done
