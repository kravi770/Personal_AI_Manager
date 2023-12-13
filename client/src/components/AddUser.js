import styled from '@emotion/styled';
import { useState } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { addUser } from '../service/api';
import { useNavigate } from 'react-router-dom';
const defaultValue = {
  name: '',
  username: '',
  email: '',
  phone: '',
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const AddUser = () => {
  const [user, setUser] = useState(defaultValue);
  const navigate = useNavigate();

  const OnValueChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  const adduserdetails = async () => {
    await addUser(user);
    navigate('/all');
  };

  return (
    <Container>
      <Typography variant="h4">Add User</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="name"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="username"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="email"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="password"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="phone"
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => adduserdetails()}>
          Add User
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
