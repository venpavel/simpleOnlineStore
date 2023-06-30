import { observer } from 'mobx-react-lite';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import star from '../assets/star.jpg';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = observer(({ device }) => {
  const navigate = useNavigate();
  return (
    <Col md={3} className="mt-3" onClick={() => navigate(`${DEVICE_ROUTE}/${device.id} `)}>
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <Image width={150} height={150} src="device.img" />
        <div className="mt-1 d-flex justify-content-between align-items-center text-black-50">
          <div>Samsung...</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={19} height={19} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
});

export default DeviceItem;
