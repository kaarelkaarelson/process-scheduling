import { Paper, Stack, Typography } from "@mui/material";
import styles from "./Welcome.module.scss";
import variables from "../scss/variables.module.scss";

const fullOpaqueCSS = {
  bgcolor: variables.transparent,
};

const partialOpaqueCSS = {
  bgcolor: variables.transparentPartial,
};

const Welcome = () => {
  return (
    <Paper sx={fullOpaqueCSS} className={styles.wrapper}>
      <Paper sx={partialOpaqueCSS} className={`${styles.glass} ${styles.format}`}>
        <Typography variant="h1">Tere tulemast!</Typography>
      </Paper>
    </Paper>
  );
};

export { Welcome };
