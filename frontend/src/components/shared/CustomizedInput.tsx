import { TextField } from "@mui/material";

type InputProps = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = ({ name, type, label }: InputProps) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={name}
      label={label}
      type={type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
