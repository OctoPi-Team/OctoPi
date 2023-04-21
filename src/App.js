import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber' //useFrame
import { OrbitControls } from '@react-three/drei'


// makes GET request to save `state` of Block with `id` in database
// and prints out status to console
function saveState(id, state){
  fetch('http://localhost:4004/api/setBlock(id='+id+',state='+state+')',{
      method: 'GET'
  }).then(response => {
      if (response.ok) {
        console.log('Insert request succeeded');
      } else {
        console.log('Insert request failed');
      }
    })
    .catch(error => {
      console.error('Error making insert request:', error);
    });
}

// the object that creates the 3D Box
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // hooks that are used to make changes when the user hovers/clicks the boxes
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(props.block.state)

  const boxSize = 0.5
  //useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      position={props.position}
      ref={ref}
      scale={clicked ? 2 : 1}
      onClick={() => {
        // toogle clicked state
        click(!clicked)
        saveState(props.block.ID, !clicked)
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <boxGeometry args={[boxSize, boxSize, boxSize]} />
      <meshStandardMaterial color={clicked ? 'hotpink' : hovered ? 'green' :'orange'}/>
    </mesh>
  )
}

function Group(props) {
  let size = 10 // must be less than 10 for now (for the database to work properly)
  let offset = size / 2
  let boxes = Array()
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      boxes.push(<Box position={[x - offset, y - offset, 0]} block={props.blocks[x*10 + y]}/>)
    }
  }
  return boxes
}

export default function App() {
  // set Hooks for the data and the fetchstate
  // when the fetch of the blocks is ready the data is stored in blocksData
  // after that the fetchStatus is changed and the 3d Blocks are loaded
  const [blocksData, setBlocksData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('pending');
  useEffect(updateStates, []);

  function updateStates(){
    fetch('http://localhost:4004/api/getBlocks()',{
        method: 'GET',
        mode: 'cors'
      }).then(response => {
        if (response.ok) {
          response.json().then((json_response) => {
            console.log(json_response.value)
            setBlocksData(json_response.value)
            setFetchStatus("done")
          })
        }else{
          throw Error("getBlocks Failed.")
        }
      })
      .catch(error => {
        setFetchStatus("error")
        console.error('Error getting state for Box:', error);
      });
  }
  
  return (<>
      {fetchStatus === 'pending' && <p>Loading...</p>}
      {fetchStatus === 'error' && <p>Error fetching data.</p>}
      {fetchStatus === 'done' && (
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Group blocks={blocksData}/>
          <OrbitControls />
        </Canvas>
      )}
  </>)
}
