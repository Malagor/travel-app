import { database } from 'services';

it('fetches list of countries', (done) => {
  expect.assertions(3);
  database.getCountriesList().then((data) => {
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].name.en).toEqual('Ukraine');
    expect(data[0].capital.be).toEqual('Кiев');
    done();
  });
});
