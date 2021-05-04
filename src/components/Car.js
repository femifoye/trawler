import React from 'react';
import { Link } from 'react-router-dom';

class Car extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car: this.props.car,
    };
  }

  render() {
    let car = this.state.car;
    return (
      <div className="ct__car text-center">
        <div className="ct__car__image">
          <Link
            to={{
              pathname: `/details/${car.id}`,
              car: JSON.stringify(car),
            }}
          >
            <img
              src={car.PictureURL}
              alt={'CarTrawler ' + car.VehMakeModel['@Name']}
            />
          </Link>
        </div>
        <div className="ct__car__make">
          <h3>{car.VehMakeModel['@Name']}</h3>
        </div>
        <div className="ct__car__price">
          <h3>${car.price}</h3>
        </div>
        <div className="ct__car__vendor">
          <h3>Vendor: {car.vendor}</h3>
        </div>

        <div className="ct__car__status">
          <p>{car.status}</p>
        </div>
        <div className="ct__car__attributes">
          <h2>Other Attributes</h2>
          <div className="ct__car__ac">
            <p>Air Conditioning: {car['@AirConditionInd'] ? 'Yes' : 'No'}</p>
          </div>
          <div className="ct__car__baggage">
            <p>Baggage Quantity: {car['@BaggageQuantity']}</p>
          </div>
          <div className="ct__car__code">
            <p>Car Code: {car['@Code']}</p>
          </div>
          <div className="ct__car__code_context">
            <p>Car Code Context: {car['@CodeContext']}</p>
          </div>
          <div className="ct__car__door_count">
            <p>Door Count: {car['@DoorCount']}</p>
          </div>
          <div className="ct__car__drive_type">
            <p>Drive Type: {car['@DriveType']}</p>
          </div>
          <div className="ct__car__fuel_type">
            <p>Fuel Type: {car['@FuelType']}</p>
          </div>
          <div className="ct__car__passenger_qty">
            <p>Passenger Quantity: {car['@PassengerQuantity']}</p>
          </div>
          <div className="ct__car__transmission_type">
            <p>Transmission Type: {car['@TransmissionType']}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Car;
