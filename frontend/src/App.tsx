import { useEffect, useState } from 'react';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import ThreeViewer from './components/Viewer';
import { getStarshipData } from "./services/starship.api";
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

  const handleUpdate = (newData: any) => {
    setStarships(newData);
  };

  return (
    <div className="app">
      <div className="content">
        <Header />
        <ThreeViewer starships={starships} handleUpdate={handleUpdate} />
        <SideBar starShipData={starships} />
      </div>
    </div>
  );
}

export default App;
