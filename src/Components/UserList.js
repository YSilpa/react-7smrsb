import react, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const UserList = ({ token }) => {
  let navigator = useNavigate();

  const [users, setUsers] = useState([]);

  const getdata = () => {
    // fetch('data/Users.json', {
    fetch('https://reqres.in/api/unknown', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setUsers(myJson.data);
      });
  };

  const navigateBack = () => {
    navigator('../', { replace: true });
  };

  useEffect(() => {
    if (!token) {
      navigateBack();
    } else {
      getdata();
    }
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Color</th>
            <th>Pantone Value</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>{item.color}</td>
                <td>{item.pantone_value}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={navigateBack}>
        Back
      </Button>
    </>
  );
};

export default UserList;
