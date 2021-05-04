import React from 'react';
import carsUtil from '../lib/util';
import Car from './Car';
import Vendor from './Vendor';
import moment from 'moment';
import { collateCarsByVendors, collateCars } from '../lib/collate';

class CarsList extends React.Component {
  constructor() {
    super();

    this.state = {
      vehRentalCore: '',
      vendors: [],
      groupedVendors: [],
      allCars: [],
      loading: true,
      groupByVendors: false,
    };
  }

  componentDidMount() {
    let util = carsUtil();
    let url = util.URL;
    util
      .fetchData(url)
      .then(({ data }) => {
        this.setState({
          vehRentalCore: data[0].VehAvailRSCore.VehRentalCore,
          vendors: data[0].VehAvailRSCore.VehVendorAvails,
        });

        // populate all cars in state
        this.setState({
          allCars: collateCars(this.state.vendors),
          loading: false,
        });

        // save a copy of cars data in localstorage for use later
        localStorage.setItem('cars', JSON.stringify(this.state.allCars));

        // make "price" the default sorting
        this.handleChange({ target: { value: 'price' } });
      })
      .catch((e) => console.error(e));
  }

  handleChange(e) {
    let sortedArray;

    // determine what sort function to
    // use based on user selection

    //sort by price
    if (e.target.value === 'price') {
      let compare = (a, b) => {
        if (parseFloat(a.price) > parseFloat(b.price)) return 1;
        if (parseFloat(b.price) > parseFloat(a.price)) return -1;
        return 0;
      };
      sortedArray = this.sortBy(this.state.allCars, compare);
    }

    // sort by name
    if (e.target.value === 'name') {
      let compare = (a, b) => {
        if (a.VehMakeModel['@Name'] > b.VehMakeModel['@Name']) return 1;
        if (b.VehMakeModel['@Name'] > a.VehMakeModel['@Name']) return -1;
        return 0;
      };
      sortedArray = this.sortBy(this.state.allCars, compare);
    }

    // update state
    this.setState({ allCars: sortedArray });
  }

  // fn to sort data
  sortBy(arr, compare) {
    let sorted = [];
    sorted = arr.sort(compare);
    return sorted;
  }

  // fn to group data by vendors
  groupByVendors() {
    if (this.state.groupByVendors) {
      return this.setState({ groupByVendors: false });
    }
    let vendors = collateCarsByVendors(this.state.vendors);
    this.setState({ groupedVendors: vendors, groupByVendors: true });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Showing All Cars</h2>

        {!this.state.loading ? (
          <div className="legend__sort">
            <div className="legend">
              <div className="pickup__legend">
                <p>
                  Pick Up Location:{' '}
                  {this.state.vehRentalCore.PickUpLocation['@Name']}
                </p>
                <p>
                  Pick Up Time:{' '}
                  {moment(this.state.vehRentalCore['@PickUpDateTime']).format(
                    'MMMM Do YYYY'
                  )}
                </p>
              </div>
              <div className="return__legend">
                <p>
                  Return Location:{' '}
                  {this.state.vehRentalCore.ReturnLocation['@Name']}
                </p>
                <p>
                  Return Time:{' '}
                  {moment(this.state.vehRentalCore['@ReturnDateTime']).format(
                    'MMMM Do YYYY'
                  )}
                </p>
              </div>
            </div>

            <div className="sort__group">
              {!this.state.groupByVendors ? (
                <form className="sort__form">
                  <select onChange={(e) => this.handleChange(e)}>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                  </select>
                </form>
              ) : (
                ''
              )}
              <button onClick={(e) => this.groupByVendors(e)}>
                {!this.state.groupByVendors ? 'Group By Vendors' : 'Ungroup'}
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        {!this.state.loading ? (
          <div>
            {!this.state.groupByVendors ? (
              <div className="cars">
                {this.state.allCars.map((car) => (
                  <Car key={car.id} car={car} />
                ))}{' '}
              </div>
            ) : (
              this.state.vendors.map((vendor) => (
                <Vendor key={vendor.Vendor['@Code']} vendor={vendor} />
              ))
            )}
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default CarsList;
