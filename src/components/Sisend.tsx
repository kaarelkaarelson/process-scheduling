import React from "react";
import { Button } from "@material-ui/core";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

interface Props {
  mustrid: Map<number, number[]>;
  järjestus: Map<number, string>;
  funktsioonid: string[];
}
interface JuhisProps {
  tekst: string;
}
interface NupudProps {
  nimed: string[];
}
interface ValikudProps {
  nimed: Map<number, string>;
}
const Juhis: React.FC<JuhisProps> = (props) => <p>{props.tekst}</p>;

const Valikud = ({ nimed }: ValikudProps): JSX.Element => (
  <RadioGroup>
    {Array.from(nimed).map(([võti, nimi]) => (
      <FormControlLabel
        key="male"
        value="male"
        control={<Radio size="small" />}
        label={nimi}
      />
    ))}
  </RadioGroup>
);

const Nupud = ({ nimed }: NupudProps) => (
  <div>
    {nimed.map((nimi) => (
      <Button
        size="large"
        onClick={() => alert("hello")}
        variant="contained"
        color="inherit"
      >
        {nimi}
      </Button>
    ))}
    ;
  </div>
);

export class Sisend extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nupud nimed={this.props.funktsioonid}></Nupud>
        <FormControl>
          <Juhis
            tekst={
              "Vali või sisesta järjend (kujul 0,1;1,11;3,3;4,1;8,6;14,2;25,1)"
            }
          />
          <RadioGroup>
            <Valikud nimed={this.props.järjestus} />
            <Juhis tekst={"Algoritmi käivitamiseks klõpsa nupule"} />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
