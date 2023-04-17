import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Starship } from '../../types';


interface ThreeViewerProps {
  starships: Starship[];
  handleUpdate: any;
}

function ThreeViewer({ starships, handleUpdate }: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const onClick = (event: MouseEvent) => {
    if (camera && scene) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (
        intersects.length > 0 &&
        intersects[0].object instanceof THREE.Mesh &&
        intersects[0].object.userData &&
        intersects[0].object.userData.starship
      ) {
        const starship = intersects[0].object.userData.starship;
        updateDb(starship.name);
      }
    }
  };
  
  const createTextMaterial = (text: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    context!.fillStyle = "yellow";
    context!.fillRect(0, 0, 128, 128);

    context!.fillStyle = "black";
    context!.textAlign = "center";
    context!.font = "bold 20px Arial";
    context!.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return new THREE.MeshBasicMaterial({ map: texture });
  };


  const createCube = (starship: Starship, index: number) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = createTextMaterial(starship.name);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (index % 3) * 3 - 3;
    cube.position.y = Math.floor(index / 3) * -3 + 3 / 2;
    cube.position.z = Math.floor(index / 3) * -3 + 3 / 2;
    cube.userData = { starship };
    return cube;
  };

  const updateDb = (name: string) => {
    const url = `${process.env.REACT_APP_API_URL}/click/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleUpdate(data);
      });
  };




  useEffect(() => {
    if (containerRef.current && starships) {
      setCamera(new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      ));
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      
      // Set renderer pixel ratio to match the device's pixel ratio
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // Set renderer size to match container size
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      
      containerRef.current.appendChild(renderer.domElement);

      const cubes = starships.map((starship, index) => createCube(starship, index));

      setScene(new THREE.Scene());
      if(scene){
        cubes.forEach((cube) => scene.add(cube));
      }

      // Set camera position to center of scene
      if(camera && scene){
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


      // add click event listener to window object
      window.addEventListener("click", onClick);
      
      // return cleanup function to remove event listener
      return () => {
        window.removeEventListener("click", onClick);
      };
    }
  }, [starships]);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
}

export default ThreeViewer;