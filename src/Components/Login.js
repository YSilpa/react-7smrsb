import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login({ getToken, setToken }) {
  let navigator = useNavigate();
  useEffect(() => {
    if (getToken()) {
      navigator('../dashboard');
      return;
    }
  }, []);

  const initialValues = { email: '', password: '' };
  const adminLogin = { email: 'eve.holt@reqres.in', password: 'cityslicka' };

  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const error = {};
    if (!values.email) {
      error.email = 'Email field is required';
    }
    if (!values.password) {
      error.password = 'Password is required';
    }
    return error;
  };

  const aunthenticate = async function (email, password) {
    const bodyData = {
      email,
      password,
      username: email,
    };
    const defaultConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const LOGIN_USER = 'https://reqres.in/api/login';
    const response = await (
      await fetch(LOGIN_USER, {
        ...defaultConfig,
        body: JSON.stringify(bodyData),
      })
    ).json();
    if (response.token) {
      setToken(response.token);
      navigator('../dashboard');
    } else {
      setFormError({ password: response.error });
    }
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      //  navigator("../dashboard")
      aunthenticate(formValues.email, formValues.password);
    }
  }, [formError]);

  return (
    <Form onSubmit={submitHandler}>
      <div className="container">
        <div>
          <img src="https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH"></img>
        </div>
        <div className="login-header">Hello, there, Sign In to Continue</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">{formError.email}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">{formError.password}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="By creating or logging into an account, you are agreeing with our Terms & Conditions and Privacy Policies"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Login;
