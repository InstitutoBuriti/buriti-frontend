// src/components/Hero.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Loader } from "@react-three/drei";

function InteractiveModel({ src }) {
  const { scene } = useGLTF(src);
  const ref = useRef();

  // animação simples de leve rotação
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });

  return <primitive ref={ref} object={scene} />;
}

const Hero = () => {
  return (
    <section className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Html>Carregando 3D...</Html>}>
          {/* Substitua o caminho abaixo pelo seu modelo GLTF/GLB */}
          <InteractiveModel src="/models/educational-scene.glb" />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
      <Loader />
    </section>
  );
};

export default Hero;

