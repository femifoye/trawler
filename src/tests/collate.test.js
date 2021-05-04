import '../setupTest';

const collate = require('../lib/collate');
const util = require('../lib/util');

const carsUtil = util.default();
const fetchData = carsUtil.fetchData(carsUtil.URL);

test('should correctly fetch data', () => {
  return fetchData.then((data) => {
    expect(data.status).toBe(200);
  });
});

test('should correctly collate all cars and create cars object', () => {
  return fetchData.then(({ data }) => {
    let vendors = data[0].VehAvailRSCore.VehVendorAvails;
    let collated = collate.collateCars(vendors);
    // assertions
    expect(collated.length).toEqual(10);
    expect(collated instanceof Array).toBe(true);
    expect(collated[0] instanceof Object).toBe(true);
    expect(collated[0]).toHaveProperty('id');
    expect(collated[0]).toHaveProperty('vendor');
  });
});

test('should correctly group cars by vendors and return a cars object', () => {
  return fetchData.then(({ data }) => {
    let vendors = data[0].VehAvailRSCore.VehVendorAvails;
    let collated = collate.collateCarsByVendors(vendors);
    // assertions
    expect(collated.length).toEqual(3);
    expect(collated instanceof Array).toBe(true);
    expect(collated[0] instanceof Object).toBe(true);
    expect(collated[0]).toHaveProperty('vendor');
    expect(collated[0]).toHaveProperty('vehicles');
  });
});

test('should correctly collate vendors available cars and return a cars object', () => {
  return fetchData.then(({ data }) => {
    let vendors = data[0].VehAvailRSCore.VehVendorAvails;
    let collated = collate.collateVendorAvailableCars(vendors[0]);
    // assertions
    expect(collated instanceof Array).toBe(true);
    expect(collated[0] instanceof Object).toBe(true);
    expect(collated[0]).toHaveProperty('id');
    expect(collated[0]).toHaveProperty('vendor');
  });
});
