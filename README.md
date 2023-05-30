<h1 align="center">Welcome to Operation : Innovation 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.6-blue.svg?cacheSeconds=2592000" />
</p>

> Game to get the attention of customers at an industrial fair 🚀.

### 🏠 [Homepage](https://octopi-team.github.io/OctoPi-Website/index.html#)

### ✨ [Demo](https://frontend-octopi.cfapps.eu10-004.hana.ondemand.com/)

<img src="https://github.com/OctoPi-Team/OctoPi/assets/95755235/7b4790da-8fe3-4468-a97e-5d4c4eeca0d2" alt= “” width="500" >

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

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Run tests

```sh
npm run test
```

## Author

👤 **OctoPi**

## Show your support

Give a ⭐️ if this project helped you!
