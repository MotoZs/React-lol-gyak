import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const submit = () => {
    apiClient
      .post("/login", user)
      .then(() => {
        localStorage.setItem("credentials", JSON.stringify(user));
        toast.success("Sikeres login");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen login"));
  };
  return (
    <>
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Felhasználó név</Form.Label>
          <Form.Control
            type="text"
            placeholder="Felhasználó név"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Jelszó</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submit}>
          Bejelentkezés
        </Button>
      </Form>
    </>
  );
};
export default Login;
