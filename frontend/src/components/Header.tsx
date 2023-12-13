
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';
const Header = () => {
   const auth = useAuth();
  return (
     <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <ToolBar sx={{display:"flex"}}>
            <Logo/>
            <div>
                  {auth?.isLoggedIn? (
                     <>
                     <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" textColor="black" />
                     <NavigationLink bg="#51538f" to="/" text="LogOut" textColor="white" onclick={auth.logout}/>
                     </>
                  ):(
                     <>
                     <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black" />
                     <NavigationLink bg="#51538f" to="/signup" text="SignUp" textColor="white" />
                     </>
                  )}
            </div>
        </ToolBar>
     </AppBar>
  )
}

export default Header