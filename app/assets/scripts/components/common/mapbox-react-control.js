'use strict';
import { render, unmountComponentAtNode } from 'react-dom';

/**
 * Since it is rendered by Mapbox this component becomes detached from
 * react. To ensure that is becomes reconnected the render method should be
 * called with props and state on componentDidUpdate.
 * The constructor takes a render function with signature (props, state) => {}
 *
 * @example
 * initMap () { // Or wherever the map is initialized
 *   this.mapboxControl = new MapboxControl((props, state) => (
 *     <SomeControl
 *        name={props.name}
 *        active={state.isActive}
 *     />
 *   ));
 *   // If an initial render is needed, uncomment
 *   // this.mapboxControl.render(this.props, this.state);
 * }
 *
 * componentDidUpdate () {
 *   this.mapboxControl.render(this.props, this.state);
 * }
 */
export default class MapboxControl {
  constructor (renderFn) {
    if (!renderFn) throw new Error('Missing render function');

    this.renderFn = renderFn;
    this._container = null;
  }

  render (props, state) {
    render(this.renderFn(props, state), this._container);
  }

  onAdd (map) {
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    return this._container;
  }

  onRemove () {
    unmountComponentAtNode(this._container);
    this._container.parentNode.removeChild(this._container);
  }
}
