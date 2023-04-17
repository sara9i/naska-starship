import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "#ffe81f",
        color: "black",
      }}
    >
      <Toolbar>
        <img
          src="../../assets/Star_Wars_Logo.png"
          alt="StarWarsLogo"
          style={{
            margin: "auto",
            maxWidth: "5%",
            maxHeight: "5%",
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
