import { useEffect, useState } from "react";
import type { Champion } from "../types/Champions";
import { useNavigate, useParams } from "react-router-dom";
import apiClient, { BACKEND_URL } from "../api/apiClient";
import { toast } from "react-toastify";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

const OneChamp = () => {
  const [champ, setChamp] = useState<Champion>();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    apiClient
      .get(`/champions/${id}`)
      .then((response) => setChamp(response.data))
      .catch(() => toast.error("Champ lekérése sikertelen!"));
  }, []);

  const slideItem = (url: string) => {
    return (
      <Carousel.Item>
        <img src={`${BACKEND_URL}/images/${url}`} width="300" height="200" />
      </Carousel.Item>
    );
  };
  return (
    <>
      <Container>
        <Row xs={"auto"} md={"auto"} className="g-4">
          <Col>
            <Card style={{ width: "18rem" }}>
              <Carousel>{champ?.images.map((i) => slideItem(i))}</Carousel>
              <Card.Body>
                <Card.Title>{champ?.name}</Card.Title>
                <Card.Text>{champ?.description}</Card.Text>
                <Card.Text>{champ?.damage_type}</Card.Text>
                <Card.Text>{champ?.difficulty}</Card.Text>
                <Card.Text>{champ?.role}</Card.Text>
                <Card.Text>{champ?.lane}</Card.Text>
                <Card.Text>{champ?.blue_essence}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => navigate(`/editchamp/${champ?.id}`)}
                >
                  Módosítás
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default OneChamp;
