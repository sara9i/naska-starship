import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Starship } from '../../types';


interface Cube {
  mesh: THREE.Mesh;
  position: THREE.Vector3;
}

interface ThreeViewerProps {
  starships: Starship[];
}

function ThreeViewer({ starships }: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const createCube = (name: string) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    cube.position.z = Math.random() * 10 - 5;
    cube.name = name;
    return cube;
  };

  useEffect(() => {
    if (containerRef.current) {
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      
      // Set renderer pixel ratio to match the device's pixel ratio
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // Set renderer size to match container size
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      
      containerRef.current.appendChild(renderer.domElement);

      const cubes = starships.map((starship) => createCube(starship.name));

      const scene = new THREE.Scene();
      cubes.forEach((cube) => scene.add(cube));

      // Set camera position to center of scene
      camera.position.set(0, 0, 10);

      const animate = () => {
        requestAnimationFrame(animate);
        cubes.forEach((cube) => {
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [starships]);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
}

export default ThreeViewer;