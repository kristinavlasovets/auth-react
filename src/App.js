import React from "react";
import TextField from '@mui/material/TextField';

export const App = () => {
  return (
    <div className="app">
      <TextField id="standard-basic" label="Username" variant="standard" />
      <TextField id="standard-basic" label="Email" variant="standard" />
      <TextField id="standard-basic" label="Password" variant="standard" />
    </div>
  );
};
