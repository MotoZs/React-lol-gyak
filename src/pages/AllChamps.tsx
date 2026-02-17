import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Champion } from "../types/Champions";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

const AllChamps = () => {
  const [champs, setChamps] = useState<Array<Champion>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    apiClient
      .get("/champions")
      .then((response) => setChamps(response.data))
      .catch(() => toast.error("Champek lekérése sikertelen!"));
  }, []);

const cardItem = (c: Champion) => {
    return (
      <Col>
        <Card style={{ width: "18rem" }}>
          <Carousel>{c.images.map((i) => slideItem(i))}</Carousel>
          <Card.Body>
            <Card.Title>{c.name}</Card.Title>
            <Card.Text>{c.description}</Card.Text>
            <Button variant="success" onClick={() => navigate(`/onechamp/${c.id}`)}>Megtekintés</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const slideItem = (url: string) => {
    return (
      <Carousel.Item>
        <img src={`${BACKEND_URL}/images/${url}`} width="300" height="200" />
      </Carousel.Item>
    );
  };
  return (
    <>
      <h1>Championok</h1>
      <Button variant="success" onClick={() => navigate("/newchamp")}>
        Új autó Hozzáadása
      </Button>
      <Button variant="success" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Container>
        <Row xs={"auto"} md={"auto"} className="g-4">{champs?.map((c) => cardItem(c))}</Row>
      </Container>
    </>
  );
};
export default AllChamps;