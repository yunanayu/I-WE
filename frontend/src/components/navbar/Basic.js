import { Link } from "react-router-dom";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material-next/Button';

const Basic = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppBar position="static" sx={{ bgcolor: '#FBBBB8'}}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        {isLoggedIn ? (
          <Button component={Link} to="/" variant="contained" color="inherit">
            Main
          </Button>
        ) : null}
        <Button component={Link} to="/login" variant="contained" color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Basic;
