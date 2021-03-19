import { AnyAction, Dispatch } from 'redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore<{}, Dispatch>(middlewares);

let store: MockStore;
let dispatch: (func: unknown) => Promise<AnyAction>;

const countriesListOptions = {
  filter: '',
  count: 3,
  lang: 'be',
  offset: 2,
};

beforeEach(() => {
  store = mockStore({});
  dispatch = store.dispatch as (func: unknown) => Promise<AnyAction>;
});

describe('Async actions', () => {
  it('loadCountryList should load correct data', async () => {
    await dispatch(actions.loadCountryList(countriesListOptions)).then(() => {
      expect(store.getActions()[0].payload).toHaveLength(3);
    });
  });

  it('loadCountry should load correct data', async () => {
    await dispatch(actions.loadCountryList(countriesListOptions));
    const { id } = store.getActions()[0].payload[2];
    await dispatch(actions.loadCountry(id)).then(() => {
      expect(store.getActions()[1].payload.id).toEqual(id);
    });
  });

  it('loadGeo should load correct data', async () => {
    await dispatch(actions.loadGeo()).then(() => {
      expect(store.getActions()[0].payload).toHaveProperty('BLR.coordinates');
    });
  });
});
