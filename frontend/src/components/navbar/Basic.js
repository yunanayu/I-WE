import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Button from '@mui/material-next/Button';




const Basic = () => {
  return (  
    <AppBar position="static" sx={{ bgcolor: '#FBBBB8'}}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        <Button component={Link} to="/" variant="contained" color="inherit">
          Main
        </Button>
        <Button component={Link} to="/login" variant="contained" color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
 
export default Basic;
