import React, { useEffect, useRef } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import TidalButton from "./components/TidalButton";

function App() {
  const mountRef = useRef<HTMLDivElement | null>(null);

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

  const handlePlay = () => {
    console.log("Playing the song...");
  };

  const handleRedirect = () => {
    // I want to redirect in another tab instead of the current one
    window.open("https://tidal.com/browse/playlist/3d95c4f6-dad5-4d7f-a469-8bde01b7771d", "_blank");
  };

  return (
    <div className="container">
      <div className="layout">
        <div className="player">
          <TidalButton onPlay={handlePlay} onRedirect={handleRedirect} />
        </div>
        <div className="primaryNav">
          <a href="https://block.xyz/news">News</a>
          <a href="https://block.xyz/careers">Careers</a>
          <a href="https://block.xyz/investors">Investors</a>
          <div className="personAccesibility">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svgBox">
              <path className="svgPerson" d="M10 2h4v4h-4V2zM3 7h18v2h-6v13h-2v-6h-2v6H9V9H3V7z" fill="#000000"/>
            </svg>
          </div>
        </div>
        <div className="secondaryNav">
          <div className="wrapper">
            <svg focusable="false" width="200" height="28" viewBox="0 0 200 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="blockLogo" role="img"><title id="blockLogo">Block logo</title><path d="M138.735 27.6325C149.321 27.6325 154.146 25.242 155.154 18.2536H147.636C146.703 20.9589 144.532 22.0346 137.464 22.0346H136.005C127.145 22.0346 125.496 20.2179 125.496 14.7196V13.867C125.496 8.34486 127.141 6.52806 136.002 6.52806H137.448C144.516 6.52806 146.687 7.6038 147.619 10.3091H155.137C154.13 3.34068 149.305 0.930237 138.719 0.930237H134.698C122.578 0.930237 118.017 4.15745 118.017 13.349V15.2017C118.017 24.3933 122.578 27.6206 134.698 27.6206L138.735 27.6325Z" fill="black"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M112.638 15.2135C112.638 24.4051 107.924 27.6323 95.4741 27.6323H91.3583C78.9395 27.6323 74.2261 24.4051 74.2261 15.2135V13.3609C74.2261 4.16928 78.9434 0.942046 91.3583 0.942046H95.4741C107.924 0.942046 112.638 4.16928 112.638 13.3609V15.2135ZM92.5535 22.0544H94.3141V22.0345C103.514 21.9946 105.195 20.2177 105.195 14.7195V13.8987C105.195 8.37661 103.514 6.59566 94.3141 6.55981H92.5535C83.3022 6.59566 81.7085 8.37661 81.7085 13.8987V14.7514C81.7085 20.2376 83.3181 22.0145 92.5535 22.0544Z" fill="black"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M34.8303 19.6244V20.1821C34.8303 25.4055 31.866 27.2621 23.527 27.27H0.0400391V1.32086H22.7501C30.866 1.32086 34.0812 2.76713 34.0812 7.54819V7.91075C34.0812 11.8113 32.2485 13.405 29.2205 13.8034V13.9907C32.5473 14.2497 34.7545 15.6959 34.8303 19.6244ZM21.9652 6.79916H7.37898V11.3969H22.1485C25.6625 11.3969 26.7463 10.879 26.7463 9.20961V9.06219C26.7463 7.3171 25.6665 6.79916 21.9652 6.79916ZM27.5033 19.1064C27.5033 16.9828 26.2283 16.5844 21.9253 16.5844L7.37898 16.5924V21.7719H21.9253C26.2681 21.7719 27.5033 21.2938 27.5033 19.2539V19.1064Z" fill="black"></path><path d="M69.8557 27.262V21.2538H48.5362V1.33267H41.2092V27.2819L69.8557 27.262Z" fill="black"></path><path d="M168.683 27.2618V19.1021L174.629 15.6557H174.852L189.139 27.2578H200L181.114 11.9863L199.478 1.3086H188.278L168.871 12.6875H168.683V1.31256H161.353V27.2618H168.683Z" fill="black"></path></svg>
            <nav className="secondaryNavHrefs">
              <a href="https://squareup.com">Square</a>
              <a href="https://cash.app">Cash App</a>
              <a href="https://spiral.xyz">Spiral</a>
              <a href="https://tidal.com">Tidal</a>
              <a href="https://tbd.website">TBD</a>
            </nav>
          </div>
        </div>
        <div className="legal">
          <span>© 2024  Block, Inc. BLOCK and the Block Logo are trademarks of Block, Inc.</span>
          <a href="https://block.xyz/legal">Legal</a>
        </div>
      </div>
      <div ref={mountRef} className="cubeAndBackground"></div>
    </div>
  );
}

export default App;
