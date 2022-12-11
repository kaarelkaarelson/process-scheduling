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
        <Stack spacing={6} pb={3}>
          <Typography variant="h1">Tere tulemast!</Typography>
          <Typography>See veebileht on osati valminud Tartu Ülikooli operatsioonisüsteemide aine materjalide raames.</Typography>
          <Typography variant="body1">
            Iga hetk, mil arvuti töötab, käib selle sees üle 200 erineva protsessi. Et igapäevaseid tegevusi oleks võimalikult
            mugav arvutis teha (ilma, et arvuti hanguks), peab operatsioonisüsteem kõiki sissetulevaid ja käimasolevaid programme
            haldama. Protsessihalduse vaatepunktist on kõige tähtsam, et programmide ooteaeg oleks selles ootejärjekorras
            võimalikult väike. Selle probleemi lahendamiseks on olemas vastavad vastavad algoritmid, lihtsuse mõttes vaatame siin
            ainult ühelõimelisi algorimte. Mõned neist on First Come First Serve, Shortest Job First ja Round Robin.
          </Typography>
          <Typography variant="body2">
            Ülevalt vasakust menüüribast vali{" "}
            <strong>
              <i>Protsessihaldus</i>
            </strong>{" "}
            ja testi vastavaid algoritme etteantud või omaenda mustriga.
          </Typography>
        </Stack>
      </Paper>
    </Paper>
  );
};

export { Welcome };
