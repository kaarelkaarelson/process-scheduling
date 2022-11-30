import { Button as MuiButton } from "@material-ui/core";
import React from "react";

interface ButtonProps {
  value?: string | number
  type: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void 
}

const Button = ({ children, value,  onClick }: ButtonProps) => {

  return (
  <MuiButton type="submit" value={value} variant="contained" size="medium" onClick={onClick} color="inherit">
    {children}
  </MuiButton>
  )
};

export { Button};
