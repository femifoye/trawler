import React from 'react';
import Car from './Car';
import { collateVendorAvailableCars } from '../lib/collate';

class Vendor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: this.props.vendor,
      vendorVehicles: null,
    };
  }

  componentDidMount() {
    let vehicles = collateVendorAvailableCars(this.props.vendor);
    this.setState({ vendorVehicles: vehicles });
  }

  render() {
    let vendor = this.props.vendor;
    return (
      <div className="ct__vendors">
        <div className="ct__vendor">
          <div className="ct__vendor__name text-center">
            <h1>All Cars By {vendor.Vendor['@Name']}</h1>
          </div>
          <div className="ct__vendor__cars">
            {this.state.vendorVehicles != null ? (
              <div className="cars">
                {' '}
                {this.state.vendorVehicles.map((car) => (
                  <Car key={car.id} car={car} />
                ))}{' '}
              </div>
            ) : (
              <h3>Loading Vendor Vehicles...</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Vendor;
