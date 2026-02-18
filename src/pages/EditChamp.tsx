import { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import type { Champion } from "../types/Champions";

const EditChamp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [modChamp, setModChamp] = useState<Champion>({
    name: "",
    role: "",
    lane: "",
    difficulty: 0,
    blue_essence: 0,
    damage_type: "",
    images: [],
    description: "",
  });

  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((res) =>setModChamp(res.data))
      .catch(() => toast.error("Sikertelen lekérés!"))
  }, [id])

  const mod = () => {
    const dto = {
      name: modChamp.name,
      role: modChamp.role,
      lane: modChamp.lane,
      difficulty: modChamp.difficulty,
      blue_essence: modChamp.blue_essence,
      damage_type: modChamp.damage_type,
      images: modChamp.images,
      description: modChamp.description,
    };

    apiClient
      .put(`/champions/${id}`, dto)
      .then(() => {
        toast.success("Champion módosítva!");
        navigate("/");
      })
      .catch(() => toast.error("Sikertelen módosítás!"));
  };
  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Név</Form.Label>
            <Form.Control
              onChange={(e) =>
                setModChamp({ ...modChamp, name: e.target.value })
              }
              type="text"
              placeholder="Név"
              value={modChamp.name}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              onChange={(e) =>
                setModChamp({ ...modChamp, description: e.target.value })
              }
              type="text"
              placeholder="Leírás"
              value={modChamp.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Role</Form.Label>
          <Form.Control
            onChange={(e) => setModChamp({ ...modChamp, role: e.target.value })}
            placeholder="mage"
            value={modChamp.role}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Lane</Form.Label>
          <Form.Control
            onChange={(e) => setModChamp({ ...modChamp, lane: e.target.value })}
            placeholder="mid"
            value={modChamp.lane}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Nehézség</Form.Label>
            <Form.Control
              onChange={(e) =>
                setModChamp({ ...modChamp, difficulty: Number(e.target.value) })
              }
              type="number"
              value={modChamp.difficulty}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Blue valami</Form.Label>
            <Form.Control
              onChange={(e) =>
                setModChamp({
                  ...modChamp,
                  blue_essence: Number(e.target.value),
                })
              }
              type="number"
              value={modChamp.blue_essence}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Sebzés típus</Form.Label>
            <Form.Control
              onChange={(e) =>
                setModChamp({ ...modChamp, damage_type: e.target.value })
              }
              value={modChamp.damage_type}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Kép url</Form.Label>
            <Form.Control
              type="text"
              value={modChamp.images.join(", ")}
              onChange={(e) =>
                setModChamp({
                  ...modChamp,
                  images: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" onClick={mod}>
          Submit
        </Button>
      </Form>
    </>
  );
};
export default EditChamp;
