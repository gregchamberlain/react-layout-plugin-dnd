import React from 'react';
import { connectLayout } from 'react-layout-core';
import { DropTarget } from 'react-dnd';
import { actions, withEditLayoutState } from 'react-layout-plugin-edit';

const target = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      const key = monitor.getItem().key;
      props.onChange(actions.moveItem(props.layoutState, {
        itemKey: key,
        parentKey: props['data-id'],
        index: 0
      }));
    }
  }
}

const Column = ({ connectDropTarget, children, isOver, ...props }) => connectDropTarget(
  <div style={style(props).container}>
    { isOver ? <div style={style(props).overlay}/> : null }
    {children}
  </div>
);

const style = ({ style = {} }) => ({
  container: {
    padding: 15,
    margin: 5,
    backgroundColor: style.backgroundColor,
    position: 'relative'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});

const droppable = DropTarget('Component', target, (conn, monitor) => ({
  connectDropTarget: conn.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
}))(Column);

export default withEditLayoutState(droppable);