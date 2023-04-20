import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 2 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={clicked ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Group() {
  let size = 10
  let offset = size / 2
  let boxes = Array()
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      boxes.push(<Box position={[x - offset, y - offset, 0]} />)
      console.log(x, y)
    }
  }
  return boxes
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Group />
      <OrbitControls />
    </Canvas>
  )
}
