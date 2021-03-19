import React from 'react';
import { VideoPlayer } from 'modules/CountryPage/components/CountryPageView/components/VideoPlayer/VideoPlayer';
import { shallow } from 'enzyme';

it('expect to render the VideoPlayer component', () => {
  expect(
    shallow(
      <VideoPlayer url="https://www.youtube-nocookies.com/embed/TiXOQn7z9Hg" />
    )
  ).toMatchSnapshot();
});

it('expect the video player to have a proper url', () => {
  const wrapper = shallow(
    <VideoPlayer url="https://www.youtube-nocookies.com/embed/TiXOQn7z9Hg" />
  );
  expect(wrapper.find('#player').prop('url')).toEqual(
    'https://www.youtube-nocookies.com/embed/TiXOQn7z9Hg'
  );
});
