// "use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

function MeshComponent() {
    const fileUrl = "/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);

    useFrame(() => {
        mesh.current.rotation.y += 0.005;
    });


    return (
      <mesh ref={mesh} scale={[2,2,2]}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }

  export function SketchfabModel() {
    return (
      <div className='justify-center items-center h-80 w-max '>
        <Canvas className='  '>
            <OrbitControls enableZoom={false} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <MeshComponent />
        </Canvas>
      </div>
    );
  }