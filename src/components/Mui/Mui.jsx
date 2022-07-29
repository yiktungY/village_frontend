import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "../Posts/CreatePost/CreatePost.scss";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default function ControlledRadioButtonsGroup(props) {
  return (
    <FormControl>
      <FormLabel className="subTitle">Payment</FormLabel>
      <RadioGroup
        aria-labelledby="paymentMethod"
        name="controlled-radio-buttons-group"
        value={props.value}
        onChange={props.handleChange}
      >
        <FormControlLabel
          value="Non-Monetary Payment"
          control={<Radio color="success" />}
          label="Non-Monetary Payment"
        />
        <FormControlLabel
          value="Money"
          control={<Radio color="default" />}
          label="Money"
        />
      </RadioGroup>
    </FormControl>
  );
}
