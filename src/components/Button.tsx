import { Button as MuiButton } from "@mui/material";
import React, { CSSProperties } from "react";

interface ButtonProps {
  value?: string | number;
  type: string;
  color: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties
}

const Button = ({ value, type, color,  children, onClick, style }: ButtonProps) => {
  return (
    <MuiButton style={style} type="submit" value={value} variant="contained" size="medium" onClick={onClick} color='secondary'>
      {children}
    </MuiButton>
  );
};

export { Button };
