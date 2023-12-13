import { useState } from 'react';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { LoginUser, SignupUser } from '../service/api';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Component = styled(Box)`
  width: 400px;
  margin: 30px auto auto auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.4);
`;
const Error = styled(Typography)`
  color: red;
  font-size: small;
`;

const Image = styled('img')({
  width: 100,
  margin: 'auto',
  display: 'flex',
  // padding: '50px 0 0',
});

const Wrapper = styled(Box)`
  padding: 0px 35px 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 35px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 35px;
  border-radius: 2px;
`;

const Text = styled(Typography)`
  color: 878787;
  font-size: 16px;
`;

const SignupInitialValue = {
  name: '',
  username: '',
  password: '',
  email: '',
  phone: '',
};
const LoginInitialValue = {
  email: '',
  password: '',
};

const Login = () => {
  const [account, setAccount] = useState('login');
  const [signup, setSignupValue] = useState(SignupInitialValue);
  const [login, setLoginValue] = useState(LoginInitialValue);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const imageURL =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU6jiABBBpVc4VzYuD7Igp2tTumISP-YnqPg&usqp=CAU';

  const toggleLogin = (prop) => {
    setAccount(prop);
    setError('');
    if (prop === 'login') {
      setLoginValue(LoginInitialValue);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const OnvalueChange = (e) => {
    setSignupValue({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };
  const OnLoginValueChange = (e) => {
    setLoginValue({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const signupUser = async () => {
    let response = await SignupUser(signup);
    // let isSuccess = await response.data.isSuccess;
    if (response) {
      setError('');
      toggleLogin('login');
    } else {
      setError('All fields are mandatory.');
    }
    // await SignupUser(signup);
  };

  const loginUser = async () => {
    let response = await LoginUser(login);
    // let isSuccess = await response.data.isSuccess;
    // console.log(response);
    if (response) {
      setError('');
      sessionStorage.setItem(
        'accessToken',
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        'refreshToken',
        `Bearer ${response.data.refreshToken}`
      );
      const id = response.data.id;
      const email = response.data.email;
      // console.log(response);
      if (email === 'admin') navigate(`/admin/${id}`);
      else navigate(`/user/${id}`);
    } else {
      setError('Wrong username or password');
    }
    // navigate('/user/:id')
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login"></Image>
        {account === 'signup' ? (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => OnvalueChange(e)}
              label="Name"
              name="name"
              autoComplete="off"
            ></TextField>
            <TextField
              variant="standard"
              onChange={(e) => OnvalueChange(e)}
              label="Username"
              name="username"
              autoComplete="off"
            ></TextField>
            <TextField
              variant="standard"
              onChange={(e) => OnvalueChange(e)}
              label="Email"
              name="email"
              autoComplete="off"
            ></TextField>
            <TextField
              variant="standard"
              onChange={(e) => OnvalueChange(e)}
              label="Password"
              name="password"
              autoComplete="off"
            ></TextField>
            <TextField
              variant="standard"
              onChange={(e) => OnvalueChange(e)}
              label="Phone"
              autoComplete="off"
              name="phone"
            ></TextField>
            {error && <Error>{error}</Error>}
            <SignupButton
              onClick={() => {
                signupUser();
              }}
            >
              Signup
            </SignupButton>
            <Text style={{ textAlign: 'center' }}>Or</Text>
            <LoginButton
              variant="contained"
              onClick={() => toggleLogin('login')}
            >
              Already have an Account ?
            </LoginButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              name="email"
              label="Email"
              autoComplete="off"
              value={login.email}
              onChange={(e) => {
                OnLoginValueChange(e);
              }}
            ></TextField>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
                name="password"
                onChange={(e) => {
                  OnLoginValueChange(e);
                }}
              />
            </FormControl>
            {error && <Error>{error}</Error>}
            <LoginButton
              variant="contained"
              onClick={() => {
                loginUser();
              }}
            >
              Login
            </LoginButton>
            <Text style={{ textAlign: 'center' }}>Or</Text>
            <SignupButton onClick={() => toggleLogin('signup')}>
              Create an Account
            </SignupButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
