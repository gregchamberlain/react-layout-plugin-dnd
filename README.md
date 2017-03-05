# React Layout Plugin DnD

A plugin for the [react-layout-core](https://www.github.com/gregchamberlain/react-layout-core) package.
This plugin enables any component to be used as a [react-dnd](https://react-dnd.github.io/react-dnd/) `DragSource`, and wraps the layout with a `DragDropContext`. It supplies `monitor.getItem()` with the `layoutState` item being dragged.

## Usage

```js
import React from 'react';
import { Layout } from 'react-layout-core';
import DnD from 'react-layout-plugin-dnd';

...

<Layout
  layoutState={layoutState}
  components={{...}}
  plugins={[DnD]}
/>

...
```