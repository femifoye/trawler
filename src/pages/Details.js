import React from 'react';
import { withRouter } from 'react-router-dom';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car: null,
    };
  }
  componentDidMount() {
    // get ID of car from pathname
    // parse Cars object in localStorage
    // filter out car with correct ID
    // update state
    let carId = parseInt(this.props.location.pathname.split('/')[2]);
    let savedCars = JSON.parse(localStorage.getItem('cars'));
    let car = savedCars.filter((c) => c.id === carId);
    this.setState({ car: car[0] });
  }

  render() {
    let car = this.state.car;
    return (
      <div className="ct__car__details__wrap container">
        <h2 className="text-center">Car Details</h2>
        {car != null ? (
          <div className="ct__car__details">
            <div className="ct__car__details__info text-center">
              <div className="ct__car__make">
                <h2>{car.VehMakeModel['@Name']}</h2>
              </div>
              <div className="ct__car__price">
                <h2>${car.price}</h2>
              </div>
              <div className="ct__car__vendor">
                <h2>Vendor: {car.vendor}</h2>
              </div>

              <div className="ct__car__status">
                <p>{car.status}</p>
              </div>
              <div className="ct__car__attributes">
                <h2>Other Attributes</h2>
                <div className="ct__car__ac">
                  <p>
                    Air Conditioning: {car['@AirConditionInd'] ? 'Yes' : 'No'}
                  </p>
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
            <div className="ct__car__details__image">
              <img
                src={car.PictureURL}
                alt={'CarTrawler ' + car.VehMakeModel['@Name']}
              />
            </div>
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

export default withRouter(Details);
