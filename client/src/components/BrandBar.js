import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: 'pointer' }}
          border={device.selectedBrand.id === brand.id ? 'warning' : 'secondary'}
          onClick={() => device.setSelectedBrand(brand)}
          className="ml-1 mb-1 p-2"
          key={brand.id}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
