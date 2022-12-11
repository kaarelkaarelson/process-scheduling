import React from "react";
import { Box, Container } from "@mui/material";
import { AppBar, Toolbar, Typography, Grid, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./Footer.module.scss";

interface FooterProps {
  text: String;
}

const Footer = ({ text }: FooterProps) => {
  return (
    <Box
      p={{ mobile: 3, tablet: 5 }}
      pb={{ mobile: 3, tablet: 5 }}
      bgcolor="primary.main"
      color="white"
      className={styles.footer}
    >
      <Container maxWidth="desktop">
        <Grid container spacing={2}>
          <Grid item mobile={12} tablet={12}>
            <Box textAlign="center">
              Kaarel-Richard Kaarelson &reg; {new Date().getFullYear()}
              {/* <Typography>Kaarel-Richard Kaarelson &reg; {new Date().getFullYear()}</Typography> */}
            </Box>
          </Grid>
          <Grid item mobile={12} tablet={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Link
                href="https://www.linkedin.com/in/kaarel-richard-kaarelson-30a820217/"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="none"
              >
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export { Footer };
