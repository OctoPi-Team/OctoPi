# Start our Application

## Script Commands

### `npm start`

Start the server to run our application.

### `npm run lint`

Check your Code with ESLint. It should print out your errors or warnings.

# Adding 3D Objects Guide

The Goal is to use .glb files as they are optimized for use in browser/WebGL and in comparrison to gltf they are even smaller.
The loading Time as we experienced gets more than cut in half by using glb instead of .obj files. (smaller size + no translation inside the browser)

## If using .obj Files

.obj files can be created and exported with almost every 3D Program. Therefore we use them in oour pipeline.
We use Womb.

The Exported .obj files can be placed anywhere inside the /public folder.
We prefer to place each Model in its own Folder.
Each Model has several Files Associated with it:
.obj - this file holds the geometry definitions
.mtl - this file has references and definitions material, color, nromal map, etc
.png - mutliple pngs store the actual texture data

### renaming

we rename the .obj and .mtl file so that they can be better organised.
renaming the .mtl file means we need to update the reference inside the .obj file.

renaming `00000.mtl` and `00000.obj` -> `object_name.mtl` and `object_name.obj`

object_name.mtl

```
mtllib object_name.mtl
o 00000
usemtl 00000
```

and the .mtl file can stay the same when the pngs aren't renamed

### converting

use the `convert_script.sh` to convert all .obj files inside a given folder to .glb or .gltf
for all files run `convert_script.sh public`
for only a specific file or folder `convert_script.sh public/Folder/object.obj`
