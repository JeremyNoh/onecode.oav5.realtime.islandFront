import React from 'react';
import './App.css';
import { TabNavigation , Tab } from 'evergreen-ui'
import {
  Link
} from 'react-router-dom';

const Tabs = (nickname) => (
  // let tabs =  [{name : 'Docs', url : "docs"}, {name : 'MagicNumber', url : 'MagicNumber'},  {name : 'KeyFast', url : 'KeyFast'}, {name : 'KeyWord', url : 'KeyWord'}]

  <TabNavigation>
      { [{name : 'Home', url : "/"}, {name : 'MagicNumber', url : 'magic'},  {name : 'FastKey', url : 'FastKey'}, {name : 'QuicKey', url : 'QuicKey'}].map((tab, index) => (
        <Tab key={tab.name} is="a" href={tab.url} id={tab.name} isSelected={index === 0}>
        <Link
            to={{
              pathname: `${tab.url}`,
              state: { nickname }
            }}
          > {tab.name}</Link>
    </Tab>
      ))}
    </TabNavigation>
);


export default Tabs;
