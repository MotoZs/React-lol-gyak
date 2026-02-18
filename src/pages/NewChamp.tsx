import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { Champion } from "../types/Champions";

const NewChamp = () => {
  const navigate = useNavigate();
  const [newChamp, setNewChamp] = useState<Champion>({
    name: "",
    role: "",
    lane: "",
    difficulty: 0,
    blue_essence: 0,
    damage_type: "",
    images: [],
    description: "",
  });

  const submit = () => {
    apiClient
      .post("/champions", newChamp)
      .then(() => {
        toast.success("Új champion hozzáadva!");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen hozzáadás!"));
  };
  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Név</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewChamp({ ...newChamp, name: e.target.value })
              }
              type="text"
              placeholder="Név"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewChamp({ ...newChamp, description: e.target.value })
              }
              type="text"
              placeholder="Leírás"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Role</Form.Label>
          <Form.Control
            onChange={(e) => setNewChamp({ ...newChamp, role: e.target.value })}
            placeholder="mage"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Lane</Form.Label>
          <Form.Control
            onChange={(e) => setNewChamp({ ...newChamp, lane: e.target.value })}
            placeholder="mid"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Nehézség</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewChamp({ ...newChamp, difficulty: Number(e.target.value) })
              }
              type="number"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Blue valami</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewChamp({
                  ...newChamp,
                  blue_essence: Number(e.target.value),
                })
              }
              type="number"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Sebzés típus</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewChamp({ ...newChamp, damage_type: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Kép url</Form.Label>
            <Form.Control type="text"
              onChange={(e) =>
                setNewChamp({
                  ...newChamp,
                  images: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" onClick={submit}>
          Submit
        </Button>
      </Form>
    </>
  );
};
export default NewChamp;
