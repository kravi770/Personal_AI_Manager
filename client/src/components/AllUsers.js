import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { deleteUser, getUSers } from '../service/api';
import styled from '@emotion/styled';
const Styledtable = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
  font-family: 'Cinzel', serif;
  font-weight: 30px;
`;

const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 20px;
  }
`;

const TBody = styled(TableRow)`
  & > td{
    font size: 20px;
  }
`;

const Allusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);
  // const navigate = useNavigate();
  const deleteUserdetails = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };
  const getAllUsers = async () => {
    let response = await getUSers();
    setUsers(response.data);
  };

  return (
    <Styledtable>
      <TableHead>
        <THead>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell></TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TBody>
            <TableCell>{user._id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/admin/edit/${user._id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/user/${user._id}`}
              >
                Get
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteUserdetails(user._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TBody>
        ))}
      </TableBody>
    </Styledtable>
  );
};

export default Allusers;
