import { AppBar, Toolbar } from "@mui/material";
import { Logo } from ".";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />

        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                to="/chat"
                text="Go to chat"
                textColor="black"
                bg="#00fffc"
              />
              <NavigationLink
                to="/"
                text="Logout"
                textColor="white"
                bg="#51538f"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                to="/login"
                text="Login"
                textColor="black"
                bg="#00fffc"
              />
              <NavigationLink
                to="/signup"
                text="SignUp"
                textColor="white"
                bg="#51538f"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
