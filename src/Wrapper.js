import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { withLayoutState, LayoutState } from 'react-layout-core';
import hoistNonReactStatic from 'hoist-non-react-statics';

const source = {
  beginDrag(props) {
    return { key: props['data-id'] };
  }
};

const DnDWrapper = (WrappedComponent, displayName) => {

  class DnD extends PureComponent {
    componentDidMount() {
      if (this.node) {
        const node = findDOMNode(this.node);
        this.display = node.style.display;
      }
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.isDragging !== nextProps.isDragging) {
        if (this.node) {
          const node = findDOMNode(this.node);
          if (nextProps.isDragging) {
            node.style.display = 'none';
          } else {
            node.style.display = this.display;
          }
        }
      }
    }

    render() {
      const { connectDragSource, isDragging, layoutState, pseudoRef, ...props } = this.props;
      return (
        <WrappedComponent {...props} pseudoRef={instance => {
          const node = findDOMNode(instance);
          if (props['data-id'] !== LayoutState.ROOT_KEY) connectDragSource(node);
          this.node = instance;
          (typeof pseudoRef === 'function') && pseudoRef(instance);
        }} />
      );
    }
  }

  DnD.displayName = `DnDWrapper(${displayName})`
  hoistNonReactStatic(DnD, WrappedComponent);

  return withLayoutState(DragSource('Component', source, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging()
  }))(DnD))

};

export default DnDWrapper;