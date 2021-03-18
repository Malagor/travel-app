import { database } from 'services';

const UKRAIN_ID = 'f12f2c1d-31e8-4750-a103-4724fcebae38';

it('fetches country with a specific id', (done) => {
  expect.assertions(3);
  database.getCountryById(UKRAIN_ID).then((data) => {
    expect(data.id).toEqual(UKRAIN_ID);
    expect(data.name.ru).toEqual('Украина');
    expect(data.currency).toEqual('UAH');
    done();
  });
});
