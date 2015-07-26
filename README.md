React LazyRender Mixin
======================

A React mixin to lazily render a component when it enters the viewport.

## Installation

```sh
npm install react-lazyrender-mixin
```

## Documentation

The mixin renders a placeholder instead if the actual component of the
component is outside the viewport. The placeholder has the same element type as
the component and will inherit use the component's `className` property.

### Props

 - `placeholderHeight` *(string; optional; default: null)*: The height of the
   placeholder. Can be used if the component's style/class doesn't already have
   a height.
 - `placeholderClassName` *(string; optional; default: null)*: An additional
   class name for the placeholder.


### Example Component

```js
import React from 'react';
import LazyRenderMixin from 'react-lazyrender-mixin';

export default React.createClass({

  mixins: [ LazyRenderMixin ],

  getDefaultProps () {
    return {
      placeholderHeight: 432
    };
  },

  render () {
    return(
      <div className="hello-lazy">
        <img src="http://i.imgur.com/TfM2lF0.gif" />
        <br />I'm so lazy
      </div>
    );
  }

});
```

## License

MIT
