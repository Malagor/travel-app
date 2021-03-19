import React from 'react';
import { shallow } from 'enzyme';
import { Search } from 'components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { appReducer } from 'store/reducer';

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

it('expect to render the Loader component', () => {
  expect(
    shallow(
      <Provider store={store}>
        <Search />
      </Provider>
    )
  ).toMatchSnapshot();
});
