#!/bin/bash

dir="$1"

# Check if directory argument is provided
if [ -z "$dir" ]; then
  echo "Please provide the directory path as an argument."
  exit 1
fi

# Find all .obj files recursively
obj_files=$(find "$dir" -type f -name "*.obj")

# Loop through each .obj file
for file in $obj_files; do
  echo "Converting $file"
  obj2gltf -i "$file" -b
done
