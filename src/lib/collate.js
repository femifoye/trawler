// fn to create a car object
// wuth 'vendor' and 'vehicles' keys
// input: Array
const collateCarsByVendors = (data) => {
  let groupedVendors = [];
  data.forEach((dat) => {
    let carObject = {
      vendor: dat.Vendor['@Name'],
      vehicles: dat.VehAvails,
    };

    groupedVendors.push(carObject);
  });

  return groupedVendors;
};

// fn to create a custom car object
// for all cars in data
// this allows for easier rendering of the data
// input: Array
const collateCars = (data) => {
  let allCars = [];
  let ind = 1;

  data.forEach((dat) => [
    dat.VehAvails.forEach((avail) => {
      // create a custom car object
      let carObject = {
        id: ind++,
        status: avail['@Status'],
        price: avail.TotalCharge['@EstimatedTotalAmount'],
        vendor: dat.Vendor['@Name'],
        ...avail.Vehicle,
      };

      allCars.push(carObject);
    }),
  ]);

  return allCars;
};

//fn to create a custom object for vendor vehicles
// input: Object
const collateVendorAvailableCars = (data) => {
  let allCars = [];
  let ind = 1;
  data.VehAvails.forEach((avail) => {
    // create a custom car object
    let carObject = {
      id: ind++,
      status: avail['@Status'],
      price: avail.TotalCharge['@EstimatedTotalAmount'],
      vendor: data.Vendor['@Name'],
      ...avail.Vehicle,
    };

    allCars.push(carObject);
  });

  return allCars;
};

export { collateCarsByVendors, collateCars, collateVendorAvailableCars };
