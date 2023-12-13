import {
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { chatWithGPT3, deleteUser, getUSer } from '../service/api';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
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

const DefaultSearch = '';
const Ask = styled(Typography)`
  color: #ad10f4;
  //   display: flex;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 40px;
`;

const Newdiv = styled('div')`
  margin-top: 20px;
  display: flex;
  justifycontent: center;
  alignitems: center;
`;
const Newbox = styled(TextField)`
  width: 65em;
`;
const Divdiv = styled('div')`
  margin: 0px auto;
  font-size: xx-large;
`;

const Newbutton = styled(Button)`
  margin-left: 40px;
  width: 100px;
  height: 40px;
  margin: auto;
`;
const NewContainer = styled(Container)`
  margin-top: 20px;
  border: 3px solid gray;
  text-alignment: left;
`;

const Userpage = () => {
  const [user, setUser] = useState(defaultValue);
  const { id } = useParams();
  const [search, setSearch] = useState(DefaultSearch);
  const [GPtResponse, setGptResponse] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line
  }, []);
  const loadUserDetails = async () => {
    const response = await getUSer(id);
    setUser(response.data);
  };
  const OnvalueChange = (e) => {
    setSearch(e.target.value);
  };
  const deleteUserdetails = async (id) => {
    await deleteUser(id);
    navigate('/login');
  };

  const findInChatGPT = async () => {
    const response = await chatWithGPT3(search);
    setGptResponse(response);
  };

  // const findInChatGPT = async () => {
  //   const yourPrompt = search;

  //   try {
  //     const response = await openai.createCompletion({
  //       model: 'text-davinci-003',
  //       prompt: yourPrompt,
  //       max_token: 2048,
  //       temperature: 1,
  //     });
  //     const responseData = await response.json();
  //     const generatedText = responseData.choices[0].text;
  //     setGptResponse(generatedText);
  //   } catch (error) {
  //     console.error('Error occurred while fetching response:', error);
  //     // Handle the error or set appropriate error message in state
  //     setGptResponse('Error occurred. Please try again.');
  //   }
  // };
  return (
    <>
      <Newdiv className="flex-container">
        <Divdiv>Hello {user.name} !</Divdiv>
        <Button
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => setOpenDrawer(true)}
        >
          Profile
          <MenuIcon style={{ marginLeft: 4 }} />
        </Button>
      </Newdiv>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem>
            <Link to={`/admin/edit/${user._id}`}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: 10 }}
              >
                Edit <EditIcon style={{ marginLeft: 4 }} />
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={`/login`}>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: 10 }}
              >
                Logout <LogoutIcon style={{ marginLeft: 4 }} />
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="error"
              style={{ marginRight: 10 }}
              onClick={() => deleteUserdetails(user._id)}
            >
              Delete Account <DeleteIcon style={{ marginLeft: 4 }} />
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Divider />
      <Newdiv class="flex-container">
        <Ask variant="h5">
          Ask me anything !<></>
        </Ask>
        <Newbox
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={DefaultSearch}
          autoComplete="off"
          onChange={(e) => {
            OnvalueChange(e);
          }}
        />
        <Newbutton variant="contained" onClick={() => findInChatGPT()}>
          Find <SearchIcon style={{ marginLeft: 5 }} />
        </Newbutton>
      </Newdiv>
      <NewContainer>
        {GPtResponse}Currently this find button above is under development It
        collects your text from search box and send it to open AI , collect
        response and render here. Its backend is ready but Since I don't have
        purchased account for open AI api so it is not in working now !.
      </NewContainer>
    </>
  );
};

export default Userpage;
