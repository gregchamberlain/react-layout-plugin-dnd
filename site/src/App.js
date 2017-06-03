// @flow
import React, { Component } from 'react';
import { Layout, LayoutState } from 'react-layout-core';
import Refs from 'react-layout-plugin-refs';

import DnD from '../../src'

const getBG = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b}`;
}

const getItem = () => ({
  type: 'div',
  props: {
    style: { backgroundColor: getBG(), minHeight: 30, margin: 10 }
  },
  children: []
})

class App extends Component {

  state: {
    layoutState: LayoutState
  }

  constructor() {
    super();
    let layoutState = new LayoutState('div');
    layoutState = layoutState.insertOrMoveItem('root', 0, getItem());
    const lastItem = layoutState.items.toArray().filter(item => item.id !== 'root')[0].id;
    layoutState = layoutState.insertOrMoveItem(lastItem, 0, getItem());
    this.state = {
      layoutState: layoutState
    };
  }

  change = (layoutState: LayoutState): void => {
    this.setState({ layoutState });
  }

  addItem = () => {
    let layoutState = this.state.layoutState.insertOrMoveItem('root', 0, getItem());
    this.setState({ layoutState });
  }

  render() {
    return (
      <div>
        <button onClick={this.addItem}>Add Item</button>
        <Layout
          layoutState={this.state.layoutState}
          onChange={this.change}
          plugins={[Refs, DnD]}
        />
      </div>
    )
  }
}

export default App;
