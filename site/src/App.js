// @flow
import React, { Component } from 'react';
import { Layout, LayoutState } from 'react-layout-core';
import Refs from 'react-layout-plugin-refs';
import Edit, { actions } from 'react-layout-plugin-edit';

import DnD from '../../src'

import Column from './Column';

const getBG = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b}`;
}

const getItem = () => ({
  type: 'Column',
  props: {
    style: { backgroundColor: getBG(), padding: 15, margin: 10 }
  },
  children: []
})

type Props = {

};

type State = {
  layoutState: LayoutState
};

const components = {
  Column
};

class App extends Component<Props, State> {
  
  constructor() {
    super();
    let layoutState = new LayoutState('Column');
    layoutState = actions.insertItem(layoutState, { item: layoutState.createItem(getItem()), parentKey: LayoutState.ROOT_KEY, index: 0 });
    layoutState = actions.insertItem(layoutState, { item: layoutState.createItem(getItem()), parentKey: LayoutState.ROOT_KEY, index: 0 });
    this.state = {
      layoutState: layoutState
    };
  }

  change = (layoutState: LayoutState): void => {
    this.setState({ layoutState });
  }

  render() {
    return (
      <div>
        <Layout
          layoutState={this.state.layoutState}
          onChange={this.change}
          plugins={[Edit, Refs, DnD]}
          components={components}
        />
      </div>
    )
  }
}

export default App;
