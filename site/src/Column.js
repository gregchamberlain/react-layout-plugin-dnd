import React from 'react';
import { connectLayout } from 'react-layout-core';
import { DropTarget } from 'react-dnd';
import { insertOrMoveItem } from 'react-layout-core/lib/plugins/Edit/actions';

const target = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      const item = monitor.getItem();
      props.moveItem(props['data-id'], 0, item);
    }
  }
}

const Column = ({ connectDropTarget, children, isOver, ...props }) => connectDropTarget(
  <div style={style(props).container}>
    { isOver ? <div style={style(props).overlay}/> : null }
    {children}
  </div>
);

const style = ({ style }) => ({
  container: {
    padding: 20,
    margin: 20,
    backgroundColor: style.backgroundColor,
    position: 'relative'
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});

const mapDispatchToProps = dispatch => ({
  moveItem: (parent, idx, item) => dispatch(insertOrMoveItem(parent, idx, item))
});

const droppable = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
}))(Column);

export default connectLayout(null, mapDispatchToProps)(droppable);