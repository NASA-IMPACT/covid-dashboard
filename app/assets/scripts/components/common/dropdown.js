import React from 'react';
import { PropTypes as T } from 'prop-types';
import TetherComponent from 'react-tether';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { rgba, tint } from 'polished';

import { themeVal, stylizeFunction } from '../../styles/utils/general';
import { divide, multiply } from '../../styles/utils/math';
import { headingAlt } from '../../styles/type/heading';
import { surfaceElevatedD } from '../../styles/skins';
import collecticon from '../../styles/collecticons';

const _rgba = stylizeFunction(rgba);
const _tint = stylizeFunction(tint);

// Not reassigned but contents are modified.
/* eslint-disable-next-line prefer-const */
let activeDropdowns = [];

const getClosestInstance = (el) => {
  do {
    // If the click is released outside the view port, the el will be
    // HTMLDocument and won't have hasAttribute method.
    if (el && el.hasAttribute && el.hasAttribute('data-drop-instance')) {
      return el;
    }
    el = el.parentNode;  // eslint-disable-line
  } while (el && el.tagName !== 'BODY' && el.tagName !== 'HTML');

  return null;
};

/*
<Dropdown
  alignment='center'
  direction='down'
  triggerElement={(
    <Button
      variation='base-raised-light'
      title='View options'
    >
      Dropdown options
    </Button>
  )}
>
  <DropTitle>Options</DropTitle>
  <DropMenu role='menu' iconified>
    <li>
      <DropMenuIconified useIcon='circle-exclamation'>
        Action 1
      </DropMenuIconified>
    </li>
    <li>
      <DropMenuIconified useIcon='circle-tick'>
        Action 2
      </DropMenuIconified>
    </li>
  </DropMenu>
  <DropMenu role='menu' iconified>
    <li>
      <DropMenuIconified useIcon='circle-xmark'>
        Action A
      </DropMenuIconified>
    </li>
  </DropMenu>
  <DropMenu role='menu' selectable>
    <li>
      <DropMenuItem active>Selected</DropMenuItem>
    </li>
    <li>
      <DropMenuItem>Not selected</DropMenuItem>
    </li>
  </DropMenu>
</Dropdown>
*/
export default class Dropdown extends React.Component {
  static closeAll () {
    activeDropdowns.forEach(d => d.close());
  }

  constructor (props) {
    super(props);

    this.uuid = Math.random().toString(36).substr(2, 5);

    this.state = {
      open: false
    };

    this._bodyListener = this._bodyListener.bind(this);
    this._toggleDropdown = this._toggleDropdown.bind(this);

    this.tetherRef = React.createRef();
  }

  // Lifecycle method.
  // Called once as soon as the component has a DOM representation.
  componentDidMount () {
    activeDropdowns.push(this);
    window.addEventListener('click', this._bodyListener, true);
  }

  // Lifecycle method.
  componentWillUnmount () {
    activeDropdowns.splice(activeDropdowns.indexOf(this), 1);
    window.removeEventListener('click', this._bodyListener, true);
  }

  _bodyListener (e) {
    // Get the dropdown that is a parent of the clicked element. If any.
    const theSelf = e.target;
    const dataHookVal = theSelf.getAttribute
      ? theSelf.getAttribute('data-dropdown')
      : null;
    const parentDataHookVal = theSelf.parentNode.getAttribute
      ? theSelf.parentNode.getAttribute('data-dropdown')
      : null;

    if (theSelf.tagName === 'BODY' ||
      theSelf.tagName === 'HTML' ||
      dataHookVal === 'click.close' ||
      parentDataHookVal === 'click.close') {
      this.close();
      return;
    }

    // The closest instance is the closest parent element with a
    // data-drop-instance. It also has a data-drop-el which can be trigger
    // or content. Depending on this we know if we're handling a trigger click
    // or a click somewhere else.
    const closestInstance = getClosestInstance(theSelf);
    if (!closestInstance) return this.close();

    const uuid = closestInstance.getAttribute('data-drop-instance');
    if (closestInstance.getAttribute('data-drop-el') === 'trigger' && uuid === this.uuid) {
      // If we're dealing with the trigger for this instance don't do anything.
      // There are other listeners in place.
      return;
    }

    if (closestInstance.getAttribute('data-drop-el') === 'content' && uuid === this.uuid) {
      // If we're dealing with the content for this instance don't do anything.
      // The content elements can use data-dropdown='click.close' if they need to
      // close the dropdown, otherwise a trigger click is needed.
      return;
    }

    // In all other cases close the dropdown.
    this.close();
  }

  _toggleDropdown (e) {
    e.preventDefault();
    this.toggle();
  }

  reposition () {
    if (this.tetherRef.current) {
      this.tetherRef.current.position();
    }
  }

  toggle () {
    this.setState(state => ({ open: !state.open }));
  }

  open () {
    !this.state.open && this.setState({ open: true });
  }

  close () {
    this.state.open && this.setState({ open: false });
  }

  renderTriggerElement (ref) {
    const {
      triggerElement
    } = this.props;

    const { open } = this.state;

    const className = triggerElement.props.className || '';
    return React.cloneElement(triggerElement, {
      ref, // Ref from thether. Must be attached.
      onClick: this._toggleDropdown,
      active: open,
      className: className + (open ? ' active' : ''),
      'data-drop-el': 'trigger',
      'data-drop-instance': this.uuid
    });
  }

  renderContent (ref) {
    const { id, direction, className } = this.props;

    // Base and additional classes for the trigger and the content.
    /* eslint-disable-next-line prefer-const */
    let klasses = ['drop__content', 'drop-trans', `drop-trans--${direction}`];
    /* eslint-disable-next-line prefer-const */
    let dropdownContentProps = {
      'data-drop-instance': this.uuid,
      'data-drop-el': 'content'
    };

    if (className) {
      klasses.push(className);
    }

    dropdownContentProps.direction = direction;
    dropdownContentProps.className = klasses.join(' ');

    if (id) {
      dropdownContentProps.id = id;
    }

    const { open } = this.state;
    const { onChange, children } = this.props;

    return (
      <CSSTransition
        ref={ref}
        in={open}
        unmountOnExit
        appear
        classNames='drop-trans'
        timeout={{
          appear: 300,
          enter: 300,
          exit: 300
        }}
      >

        <TransitionItem
          props={dropdownContentProps}
          onChange={onChange}
        >
          { children }
        </TransitionItem>

      </CSSTransition>
    );
  }

  render () {
    const { alignment, direction } = this.props;

    let allowed;
    if (direction === 'up' || direction === 'down') {
      allowed = ['left', 'center', 'right'];
    } else if (direction === 'left' || direction === 'right') {
      allowed = ['top', 'middle', 'bottom'];
    } else {
      throw new Error(`Dropdown: direction "${direction}" is not supported. Use one of: up, down, left, right`);
    }

    if (allowed.indexOf(alignment) === -1) {
      throw new Error(`Dropdown: alignment "${alignment}" is not supported when direction is ${direction}. Use one of: ${allowed.join(', ')}`);
    }

    let tetherAttachment;
    let tetherTargetAttachment;
    // eslint-disable-next-line default-case
    switch (direction) {
      case 'up':
        tetherAttachment = `bottom ${alignment}`;
        tetherTargetAttachment = `top ${alignment}`;
        break;
      case 'down':
        tetherAttachment = `top ${alignment}`;
        tetherTargetAttachment = `bottom ${alignment}`;
        break;
      case 'right':
        tetherAttachment = `${alignment} left`;
        tetherTargetAttachment = `${alignment} right`;
        break;
      case 'left':
        tetherAttachment = `${alignment} right`;
        tetherTargetAttachment = `${alignment} left`;
        break;
    }

    return (
      <TetherComponent
        ref={this.tetherRef}
        // attachment is the content.
        attachment={tetherAttachment}
        // targetAttachment is the trigger
        targetAttachment={tetherTargetAttachment}
        constraints={[{
          to: 'window',
          attachment: 'both',
          pin: true
        }]}
        renderTarget={ref => this.renderTriggerElement(ref)}
        renderElement={ref => this.renderContent(ref)}
      />
    );
  }
}

Dropdown.defaultProps = {
  triggerElement: 'button',
  direction: 'down',
  alignment: 'center'
};

if (process.env.NODE_ENV !== 'production') {
  Dropdown.propTypes = {
    id: T.string,
    onChange: T.func,

    triggerElement: T.node,

    direction: T.oneOf(['up', 'down', 'left', 'right']),
    alignment: T.oneOf(['left', 'center', 'right', 'top', 'middle', 'bottom']),

    className: T.string,
    children: T.node
  };
}

const glbS = themeVal('layout.space');

const transitions = {
  up: {
    start: () => css`
      opacity: 0;
      transform: translate(0, ${glbS});
    `,
    end: () => css`
      opacity: 1;
      transform: translate(0, -${glbS});
    `
  },
  down: {
    start: () => css`
      opacity: 0;
      transform: translate(0, -${glbS});
    `,
    end: () => css`
      opacity: 1;
      transform: translate(0, ${glbS});
    `
  },
  left: {
    start: () => css`
      opacity: 0;
      transform: translate(${glbS}, 0);
    `,
    end: () => css`
      opacity: 1;
      transform: translate(-${glbS}, 0);
    `
  },
  right: {
    start: () => css`
      opacity: 0;
      transform: translate(-${glbS}, 0);
    `,
    end: () => css`
      opacity: 1;
      transform: translate(${glbS}, 0);
    `
  }
};

const DropContent = styled.div`
  ${surfaceElevatedD()}
  color: ${themeVal('type.base.color')};
  border-radius: ${themeVal('shape.rounded')};
  position: relative;
  z-index: 1000;
  width: 100vw;
  max-width: 14rem;
  padding: ${glbS};
  text-align: left;
  font-size: 1rem;
  line-height: 1.5;
  transition: opacity 0.16s ease, transform 0.16s ease;

  .tether-target-attached-top.tether-element-attached-bottom & {
    ${transitions.up.end}
    &.drop-trans-appear,
    &.drop-trans-enter {
      ${transitions.up.start}
    }
    &.drop-trans-appear-active,
    &.drop-trans-enter-active {
      ${transitions.up.end}
    }
    &.drop-trans-exit {
      ${transitions.up.end}
    }

    &.drop-trans-exit-active {
      ${transitions.up.start}
    }
  }

  .tether-target-attached-bottom.tether-element-attached-top & {
    ${transitions.down.end}
    &.drop-trans-appear,
    &.drop-trans-enter {
      ${transitions.down.start}
    }
    &.drop-trans-appear-active,
    &.drop-trans-enter-active {
      ${transitions.down.end}
    }
    &.drop-trans-exit {
      ${transitions.down.end}
    }

    &.drop-trans-exit-active {
      ${transitions.down.start}
    }
  }

  .tether-target-attached-right.tether-element-attached-left & {
    ${transitions.right.end}
    &.drop-trans-appear,
    &.drop-trans-enter {
      ${transitions.right.start}
    }
    &.drop-trans-appear-active,
    &.drop-trans-enter-active {
      ${transitions.right.end}
    }
    &.drop-trans-exit {
      ${transitions.right.end}
    }

    &.drop-trans-exit-active {
      ${transitions.right.start}
    }
  }

  .tether-target-attached-left.tether-element-attached-right & {
    ${transitions.left.end}
    &.drop-trans-appear,
    &.drop-trans-enter {
      ${transitions.left.start}
    }
    &.drop-trans-appear-active,
    &.drop-trans-enter-active {
      ${transitions.left.end}
    }
    &.drop-trans-exit {
      ${transitions.left.end}
    }

    &.drop-trans-exit-active {
      ${transitions.left.start}
    }
  }
`;

class TransitionItem extends React.Component {
  componentDidMount () {
    const { onChange } = this.props;
    onChange && onChange(true);
  }

  componentWillUnmount () {
    const { onChange } = this.props;
    onChange && onChange(false);
  }

  render () {
    const { props, children } = this.props;
    return <DropContent {...props}>{ children }</DropContent>;
  }
}

if (process.env.NODE_ENV !== 'production') {
  TransitionItem.propTypes = {
    onChange: T.func,
    props: T.object,
    children: T.node
  };
}

// Drop content elements.
export const DropTitle = styled.h6`
  ${headingAlt}
  margin: 0 0 ${glbS} 0;
`;

export const DropMenu = styled.ul`
  list-style: none;
  margin: -${glbS} -${glbS} ${glbS} -${glbS};
  box-shadow: 0 ${themeVal('layout.border')} 0 0 ${themeVal('color.baseAlphaA')};
  padding: ${divide(glbS, 2)} 0;
  min-width: 12rem;
  font-family: ${themeVal('type.base.family')};
  font-weight: ${themeVal('type.base.bold')};

  /* Styles when the ul items have icons */
  ${({ iconified }) => iconified && css`
    ${DropMenuItem} {
      padding-left: ${multiply(glbS, 2.75)};

      &::before {
        position: absolute;
        z-index: 1;
        top: ${divide(glbS, 4)};
        left: ${glbS};
        font-size: 1rem;
        line-height: 1.5rem;
        width: 1.5rem;
        text-align: center;
      }
    }
  `}

  /* Styles when the ul items are selectable */
  ${({ selectable }) => selectable && css`
    ${DropMenuItem} { /* stylelint-disable-line */
      padding-right: ${multiply(glbS, 2.5)};
    }
  `}

  &:last-child {
    margin-bottom: -${glbS};
    box-shadow: none;
  }
`;

export const DropMenuItem = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${divide(glbS, 4)} ${glbS};
  color: ${themeVal('type.base.color')};
  transition: all 0.16s ease 0s;

  &:visited {
    color: inherit;
  }

  &:hover,
  &:focus {
    color: ${themeVal('color.link')};
    background-color: ${_rgba(themeVal('color.link'), 0.12)};
    opacity: 1;
  }

  ${({ active }) => active ? '&, &:visited,' : ''}
  &.active, &.active:visited {
    color: ${themeVal('color.primary')};

    &::after {
      ${collecticon('tick--small')}
      position: absolute;
      z-index: 1;
      top: ${divide(glbS, 4)};
      right: ${divide(glbS, 2)};
      font-size: 1rem;
      line-height: 1.5rem;
      width: 1.5rem;
      text-align: center;
    }
  }
`;

export const DropInset = styled.div`
  background: ${_tint(0.96, themeVal('color.base'))};
  color: ${_tint(0.32, themeVal('type.base.color'))};
  box-shadow:
    inset 0 ${themeVal('layout.border')} 0 0 ${themeVal('color.baseAlphaB')},
    inset 0 -${themeVal('layout.border')} 0 0 ${themeVal('color.baseAlphaB')};
  margin: -${glbS} -${glbS} ${glbS} -${glbS};
  padding: ${glbS};

  &:first-child {
    box-shadow: inset 0 -${themeVal('layout.border')} 0 0 ${themeVal('color.baseAlphaB')};
  }

  &:last-child {
    margin-bottom: -${glbS};
    box-shadow: inset 0 ${themeVal('layout.border')} 0 0 ${themeVal('color.baseAlphaB')};
    border-radius: 0 0 ${themeVal('shape.rounded')} ${themeVal('shape.rounded')};
  }

  &:only-child {
    box-shadow: none;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;
