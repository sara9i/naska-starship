import React, { RefObject, useEffect, useState } from 'react';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import ThreeViewer from './components/Viewer';
import { getStarshipData } from "./services/starship.api";
import { Starship } from './types';

function App() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const containerRef: RefObject<HTMLDivElement> = React.createRef();


  useEffect(() => {
    const getStarships = async () => {
      const response = await getStarshipData();
      setStarships(response.results);
    };
    getStarships();
  }, []);

  const handleUpdate = (newData: any) => {
    setStarships(newData);
  };

  return (
    <div className="app">
      <div className="content">
        <Header />
        <ThreeViewer starships={starships} handleUpdate={handleUpdate} containerRef={containerRef} />
        <SideBar starShipData={starships} />
      </div>
    </div>
  );
}

export default App;
