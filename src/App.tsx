import React, { useEffect, useRef } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

function App() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  // const hdrTextureURL = new URL(
  //   "../src/img/illovo_beach_balcony_4k.hdr",
  //   import.meta.url
  // ).toString();

    const hdrTextureURL = new URL(
    "../src/img/blockfondo.hdr",
    import.meta.url
  ).toString();


  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    renderer.setClearColor(0xfefefe);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(6, 8, 14);
    orbit.update();

    // renderer.outputColorSpace = THREE.SRGBColorSpace;

    const loader = new RGBELoader();
    loader.load(hdrTextureURL, function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0,
          metalness: 0.5,
        })
      );

      scene.add(cube);
    });

    function animate() {
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="container">
      <div ref={mountRef} className="cubeAndBackground"></div>
    </div>
  );
}

export default App;
