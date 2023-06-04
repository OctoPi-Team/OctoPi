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
  # Convert .obj to .glb
  glb_file="${file%.obj}.glb"
  obj2gltf -i "$file" -o "$glb_file"

  # Compress the resulting .glb using gltf-pipeline
  compressed_glb_file="${file%.obj}.glb"
  gltf-pipeline -i "$glb_file" -o "$compressed_glb_file" -d

  echo -e "Compression complete: $compressed_glb_file \\n"
done

