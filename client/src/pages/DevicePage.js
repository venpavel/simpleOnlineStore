import React from 'react';
import { Button, Row, Card, Image, Col, Container } from 'react-bootstrap';
import bigstar from '../assets/bigstar.png';

const DevicePage = () => {
  const device = {
    id: 21,
    name: 'iphone 12 Pro',
    price: 100000,
    rating: 2,
    img: 'https://cdn1.ozone.ru/s3/multimedia-n/6069408023.jpg',
  };
  const deviceIno = [
    { id: 1, title: 'Оперативная память', description: '5гб' },
    { id: 2, title: 'Камера', description: '12 mp' },
    { id: 3, title: 'Процессор', description: 'Snapdr.841' },
    { id: 4, title: 'Кол-во ядер', description: '2' },
    { id: 5, title: 'Аккумулятор', description: '4000' },
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                background: `url(${bigstar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex justify-content-around align-items-center"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>От: {device.price} руб.</h3>

            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column ml-3 mt-5">
        <h2 style={{ fontSize: 20 }}>Технические характеристики:</h2>
        {deviceIno.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
