import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { editUser, getUSer } from '../service/api';
import { useNavigate, useParams } from 'react-router-dom';
const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  name: '',
  username: '',
  email: '',
  phone: '',
};

const EditUser = () => {
  const [user, setUser] = useState(defaultValue);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line
  }, []);

  const loadUserDetails = async () => {
    const response = await getUSer(id);
    setUser(response.data);
  };
  const edituserdetails = async () => {
    await editUser(id, user);
    navigate(`/user/${id}`);
  };
  const OnValueChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    // console.log(user);
  };

  return (
    <Container>
      <Typography variant="h4">Edit User</Typography>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="name"
          value={user.name}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="username"
          value={user.username}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="email"
          value={user.email}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => {
            OnValueChange(e);
          }}
          name="phone"
          value={user.phone}
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={() => edituserdetails()}>
          Edit User
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
