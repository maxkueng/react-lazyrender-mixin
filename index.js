var React = require('react');

var LazyRenderMixin = {

  propTypes: {
    placeholderHeight: React.PropTypes.string,
    placeholderClassName: React.PropTypes.string,
    topTreshold: React.PropTypes.number,
    bottomTreshold: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      inViewport: false
    }
  },

  handleScroll: function () {
    var bounds = this.getDOMNode().getBoundingClientRect();
    var windowTopEdge = window.pageYOffset;
    var windowBottomEdge = windowTopEdge + window.innerHeight;
    var elementHeight = bounds.bottom - bounds.top;
    var elementTopEdge = bounds.top + windowTopEdge;
    var elementBottomEdge = elementTopEdge + elementHeight;
    var topTreshold = this.props.topTreshold || 0;
    var bottomTreshold = this.props.bottomTreshold || 0;

    var inViewport = (elementTopEdge < windowBottomEdge + bottomTreshold &&
                      elementBottomEdge > windowTopEdge - topTreshold);

    if (inViewport) {
      this.setState({ inViewport: true });
      this.handleEnteredViewport();
    }
  },

  handleEnteredViewport: function () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  },

  componentWillMount: function () {
    this.origRender = this.render;
    var origRenderObj = this.origRender();

    var style = null;
    if (this.props.placeholderHeight) {
      style = {
        height: this.props.placeholderHeight
      };
    }

    var newRender = function () {
      if (this.state.inViewport) {
        return this.origRender();
      }

      var classNames = [].concat(this.props.placeholderClassName || [])
        .concat(origRenderObj.props.className)
        .join(' ');

      return React.createElement(origRenderObj.type, {
        style: style,
        className: classNames
      });
    }.bind(this);

    this.render = newRender;
  },

  componentDidMount: function () {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleScroll();
  },

  componentWillUnmount: function () {
    this.handleEnteredViewport();
  },

  componentDidUpdate: function () {
    if (!this.state.inViewport) {
      this.handleScroll();
    }
  }

};

module.exports = LazyRenderMixin;
