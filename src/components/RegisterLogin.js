import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import ChatContext from "../store/ChatContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Loader from "./layouts/Loader";
import Helmet from "react-helmet";

const RegisterLoginPage = ({ match: { path }, history }) => {
  const id = path.split("/")[1];

  const chatContext = useContext(ChatContext);
  const { login, registerLogin, loader, setLoading } = chatContext;
  const [data, setData] = useState({
    name: "",
    email: "test1@gmails.com",
    password: "1234567",
  });
  const setUser = () => {
    setLoading(true);
    const { name, email, password } = data;
    registerLogin(id === "login" ? true : false, name, email, password);
    history.push("/");
  };
  return !login ? (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Messager</title>
      </Helmet>
      {loader && <Loader />}
      <Form noValidate autoComplete="off">
        {id !== "login" && (
          <Input
            id="standard-full-width"
            label="Enter Name"
            name="name"
            value={data.name}
            onChange={({ target: { name, value } }) =>
              setData({ ...data, [name]: value })
            }
            placeholder="Enter Your Name"
            fullWidth
            required
          />
        )}
        <Input
          id="standard-full-width"
          label="Enter Email"
          name="email"
          value={data.email}
          onChange={({ target: { name, value } }) =>
            setData({ ...data, [name]: value })
          }
          placeholder="Enter Email"
          fullWidth
        />
        <Input
          id="standard-full-width"
          label="Enter Password"
          name="password"
          value={data.password}
          onChange={({ target: { name, value } }) =>
            setData({ ...data, [name]: value })
          }
          placeholder="Enter Password"
          fullWidth
        />
        <SubmitButton onClick={setUser} color="primary" variant="contained">
          {id === "login" ? "Login" : "Register"}
        </SubmitButton>
      </Form>
      <Footer>
        {id === "login" ? (
          <>
            {" "}
            Not Have an Account ? <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {" "}
            Already Have an Account ? <Link to="/login">Login</Link>
          </>
        )}
      </Footer>
    </Container>
  ) : (
    <Redirect to="/" />
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled(TextField)`
  margin: 15px 0;
`;
const SubmitButton = styled(Button)`
  width: 50%;
  position: relative;
  top: 40px;
`;
const Footer = styled.p`
  margin-top: 50px;
  font-size: small;
`;
export default RegisterLoginPage;
