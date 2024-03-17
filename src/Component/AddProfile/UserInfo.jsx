import React, {useState} from 'react';
import { Paper, Grid, Avatar, TextField, Box, Typography } from '@mui/material';

const ProfilePage = ({handleInfoChange, showWrongMessage}) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  React.useEffect(() => {
    handleInfoChange({first_name: firstName, last_name: lastName, email: email});
  }, [firstName, lastName, email]);

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <Avatar sx={{ width: 150, height: 150 }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            variant="outlined"
            onChange={(event) => handleFirstNameChange(event)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            variant="outlined"
            onChange={(event) => handleLastNameChange(event)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            variant="outlined"
            onChange={(event) => handleEmailChange(event)}
          />
          {showWrongMessage ? <Typography variant="h6" align="center" sx={{ color: 'red', marginTop: 1 }}>Email miss or already exists</Typography> : ''}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfilePage;
