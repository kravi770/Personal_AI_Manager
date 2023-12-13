import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getUSer } from '../service/api';
// import styled from '@emotion/styled';

// import {Configuration,OpenAIApi} from 'openai';

// import OpenAI from 'openai';
// // const { OpenAIApi } = require('openai');
// const openai = new OpenAI({
//   apiKey: 'ZUbH1u8j1uhkmZa55wsfT3BlbkFJSJsDaeaibvsLlcuH0vV7',
//   dangerouslyAllowBrowser: true,
// });

const defaultValue = {
  name: '',
  username: '',
  email: '',
  phone: '',
};

// const DefaultSearch = '';
// const Ask = styled(Typography)`
//   color: #ad10f4;
//   //   display: flex;
//   margin-left: 40px;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   margin-right: 40px;
// `;

// const Newdiv = styled('div')`
//   display: flex;
//   margin-top: 20px;
// `;
// const Newbox = styled(TextField)`
//   width: 65em;
// `;

// const Newbutton = styled(Button)`
//   margin-left: 1em;
//   width: 150px;
//   height: 50px;
//   margin: auto;
// `;
// const NewContainer = styled(Container)`
//   margin-top: 20px;
//   border: 3px solid gray;
//   text-alignment: left;
// `;

const AdminPage = () => {
  const [user, setUser] = useState(defaultValue);
  const { id } = useParams();
  //   const [search, setSearch] = useState(DefaultSearch);
  //   const [GPtResponse, setGptResponse] = useState('');
  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line
  }, []);
  const loadUserDetails = async () => {
    const response = await getUSer(id);
    setUser(response.data);
  };

  return (
    <>
      <Typography variant="h2">Hello {user.name} !</Typography>
      <Button
        variant="contained"
        style={{ marginRight: 10 }}
        component={Link}
        to={`/admin/all`}
      >
        Get All Users
      </Button>
    </>
  );
};

export default AdminPage;
