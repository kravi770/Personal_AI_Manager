import { AppBar, Toolbar, styled } from '@mui/material';

import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuIcon from '@mui/icons-material/Menu';
const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-left: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;

const NavBar = () => {
  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/">
          <MenuIcon style={{ marginLeft: 3 }} />
        </Tabs>
        <Tabs to="/login">
          <LoginIcon style={{ marginLeft: 3 }} />
        </Tabs>
        {/* <Tabs to="/admin/all">All Users</Tabs> */}
        {/* <Tabs to="add">Add User</Tabs> */}
      </Toolbar>
    </Header>
  );
};

export default NavBar;
