import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { getStarshipStats } from "../../api/starship.api";

const drawerWidth = 240;

interface Props {
  starShipData: any;
}

interface IStarShip {
  name: string;
  model: string;
  clicks: number;
}

function Sidebar(starships: Props) {
  // Declare a new state variable, which we'll call "count"
  const [updatedStarships, setStarships] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const starshipsData = await getStarshipStats();
      setStarships(starshipsData);
    }
    fetchData();
  }, [starships]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#ffe81f",
          },
        }}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          background: "#ffe81f",
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {updatedStarships && updatedStarships.length ? (
              updatedStarships.map((starship: IStarShip) => (
                <ListItem key={starship.name} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={starship.name} />
                    <ListItemText secondary={starship.clicks} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <></>
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}

export default Sidebar;
