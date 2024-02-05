import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to="/">
        <img
          src="openai.png"
          alt="logo"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>

      <Typography sx={{ display: { md: "block", sm: "none", xs: "none" } }}>
        <span style={{ fontSize: "20px" }}>Techie-AI</span>
      </Typography>
    </div>
  );
};

export default Logo;
