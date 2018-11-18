import React from 'react';
import './App.css';
import { TabNavigation , Tab } from 'evergreen-ui'


const Tabs = () => (
  // let tabs =  [{name : 'Docs', url : "docs"}, {name : 'MagicNumber', url : 'MagicNumber'},  {name : 'KeyFast', url : 'KeyFast'}, {name : 'KeyWord', url : 'KeyWord'}]

  <TabNavigation>
      { [{name : 'Docs', url : "docs"}, {name : 'MagicNumber', url : 'magic'},  {name : 'KeyFast', url : 'KeyFast'}, {name : 'QuicKey', url : 'QuicKey'}].map((tab, index) => (
        <Tab key={tab.name} is="a" href={tab.url} id={tab.name} isSelected={index === 0}>
    {tab.name}
    </Tab>
      ))}
    </TabNavigation>
);


export default Tabs;
