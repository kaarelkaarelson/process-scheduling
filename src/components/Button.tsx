import { Button as MuiButton } from "@material-ui/core";
import React, { CSSProperties } from "react";

interface ButtonProps {
  value?: string | number;
  type: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties
}

const Button = ({ value, type, children, onClick, style }: ButtonProps) => {
  return (
    <MuiButton style={style} type="submit" value={value} variant="contained" size="medium" onClick={onClick} color="inherit">
      {children}
    </MuiButton>
  );
};

export { Button };
