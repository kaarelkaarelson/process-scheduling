import React from "react";

interface FooterProps {
  text: String;
}

const footerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  marginTop: "500px",
  backgroundColor: "#1976d2",
};

const Footer = ({ text }: FooterProps) => {
  return <div style={footerStyle}>{text}</div>;
};

export { Footer };
