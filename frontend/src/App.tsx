import { useEffect, useState } from 'react';
import { getStarshipData } from "./api/starship.api";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import ThreeViewer from './components/Viewer';
import { Starship } from './types';

function App() {
  const [starships, setStarships] = useState<Starship[]>([]);


  useEffect(() => {
    const getStarships = async () => {
      const response = await getStarshipData();
      setStarships(response.results);
    };
    getStarships();
  }, []);

  return (
    <div className="app">
      <div className="content">
        <Header />
        <ThreeViewer starships={starships} />
        <SideBar starShipData={starships} />
      </div>
    </div>
  );
}

export default App;