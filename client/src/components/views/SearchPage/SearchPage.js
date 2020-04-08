import React from 'react';
import Search from '../RFC/Search/Search';
import WTF from './sections/WTF';

function SearchPage(props) {
  return (
    <div className="app">
      <div className="component_header">
        <Search />
      </div>
      <div
        style={{
          padding: '5vh 0vw  0 2vw',
        }}
      >
        <WTF />
      </div>
    </div>
  );
}
export default SearchPage;
