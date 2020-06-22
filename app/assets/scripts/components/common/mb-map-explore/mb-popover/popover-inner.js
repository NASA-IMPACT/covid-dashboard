import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes as T } from 'prop-types';

import Button from '../../../../styles/button/button';
import {
  getAnchorTranslate,
  Popover,
  PopoverContents,
  PopoverHeader,
  PopoverHeadline,
  PopoverSubtitle,
  PopoverToolbar,
  PopoverBody,
  PopoverFooter
} from './styled';

/**
 * Mapbox popover inner element.
 * NOT TO BE USED DIRECTLY
 *
 * See documentation on index.js file.
 */
export default class MBPopoverInner extends React.Component {
  constructor (props) {
    super(props);

    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);

    this.state = {
      top: null,
      left: null,
      // isOutside: true,
      anchorPoints: []
    };
  }

  componentDidMount () {
    const { mbMap, closeOnClick, closeOnMove } = this.props;

    if (closeOnClick) {
      mbMap.on('click', this.destroy);
    }
    this.update();
    // Ensure the popover gets repositioned after it has sizes defined.
    setTimeout(() => {
      this.update();
    }, 1);

    if (closeOnMove) {
      mbMap.on('move', this.destroy);
    } else {
      mbMap.on('move', this.update);
    }
  }

  componentDidUpdate (prevProps) {
    if (
      prevProps.lngLat !== this.props.lngLat ||
      prevProps.content !== this.props.content
    ) {
      this.preventNextClick = true;
      setTimeout(() => {
        this.preventNextClick = false;
      }, 1);
      this.update();
    }
  }

  componentWillUnmount () {
    this.offListeners();
  }

  offListeners () {
    const { mbMap } = this.props;
    mbMap.off('click', this.destroy);
    mbMap.off('move', this.update);
    mbMap.off('move', this.destroy);
  }

  destroy () {
    this.offListeners();
    this.props.onClose();
  }

  update () {
    if (!this.popoverEl) return;

    const { mbMap, lngLat, offset: [offsetTop, offsetBottom] } = this.props;

    const { pageYOffset, pageXOffset } = window;
    const {
      width,
      height,
      top,
      left
    } = mbMap.getContainer().getBoundingClientRect();
    const mapTop = pageYOffset + top;
    const mapLeft = pageXOffset + left;
    const mapRight = pageXOffset + left + width;
    const mapBottom = pageYOffset + top + height;

    const pos = mbMap.project(lngLat);

    const anchorPosition = {
      top: mapTop + pos.y,
      left: mapLeft + pos.x
    };

    if (
      // Top bound
      anchorPosition.top < mapTop ||
      // Bottom bound
      anchorPosition.top > mapBottom ||
      // Left bound
      anchorPosition.left < mapLeft ||
      // Right bound
      anchorPosition.left > mapRight
    ) {
      return this.setState({
        top: null,
        left: null,
        // isOutside: true,
        anchorPoints: []
      });
    }

    let anchorPoints = [];

    const popoverDomRect = this.popoverEl.getBoundingClientRect();
    const halfW = popoverDomRect.width / 2;
    if (anchorPosition.top - popoverDomRect.height - offsetTop < pageYOffset) {
      anchorPoints = ['top'];
      anchorPosition.top += offsetBottom;
    } else {
      anchorPoints = ['bottom'];
      anchorPosition.top -= offsetTop;
    }
    if (anchorPosition.left - halfW < mapLeft) {
      anchorPoints.push('left');
    } else if (anchorPosition.left + halfW > mapRight) {
      anchorPoints.push('right');
    }
    this.setState({
      ...anchorPosition,
      // isOutside: false,
      anchorPoints
    });
  }

  renderContents () {
    const { renderContents } = this.props;
    if (typeof renderContents === 'function') {
      return renderContents({ close: this.destroy });
    }

    return (
      <React.Fragment>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </React.Fragment>
    );
  }

  renderHeader () {
    const { renderHeader } = this.props;
    if (typeof renderHeader === 'function') {
      return renderHeader({ close: this.destroy });
    }

    return (
      <PopoverHeader>
        {this.renderHeadline()}
        {this.renderToolbar()}
      </PopoverHeader>
    );
  }

  renderHeadline () {
    const { renderHeadline, title, subtitle, suptitle } = this.props;
    if (typeof renderHeadline === 'function') {
      return renderHeadline({ close: this.destroy });
    }

    return (
      <PopoverHeadline>
        <h1>{title}</h1>
        {(subtitle || suptitle) && (
          <PopoverSubtitle isSup={!subtitle}>
            {subtitle || suptitle}
          </PopoverSubtitle>
        )}
      </PopoverHeadline>
    );
  }

  renderToolbar () {
    const { renderToolbar, closeButton } = this.props;
    if (typeof renderToolbar === 'function') {
      return renderToolbar({ close: this.destroy });
    }

    return (
      closeButton && (
        <PopoverToolbar>
          <Button
            useIcon='xmark--small'
            size='small'
            hideText
            onClick={this.destroy}
          >
            Close
          </Button>
        </PopoverToolbar>
      )
    );
  }

  renderBody () {
    const { renderBody, content } = this.props;
    if (typeof renderBody === 'function') {
      return renderBody({ close: this.destroy });
    }

    return (
      <PopoverBody>
        {content}
      </PopoverBody>
    );
  }

  renderFooter () {
    const { renderFooter, footerContent } = this.props;
    if (typeof renderFooter === 'function') {
      return renderFooter({ close: this.destroy });
    }

    return footerContent ? (
      <PopoverFooter>
        {footerContent}
      </PopoverFooter>
    ) : null;
  }

  render () {
    const { top, left, anchorPoints } = this.state;
    const { className } = this.props;

    const hasPlacement = top !== null && left !== null;
    const anchor = anchorPoints.join('-');

    const popoverStyle = {
      transform: hasPlacement
        ? `${getAnchorTranslate(anchor)} translate(${left}px, ${top}px)`
        : undefined,
      display: !hasPlacement ? 'none' : undefined
    };

    return ReactDOM.createPortal(
      // This wrapper div is needed because it will receive the css classes from
      // CSSTransition.
      <div>
        <Popover
          className={className}
          style={popoverStyle}
          ref={el => {
            this.popoverEl = el;
          }}
        >
          <PopoverContents anchor={anchor} verticalAttachment={anchorPoints[0]}>
            {this.renderContents()}
          </PopoverContents>
        </Popover>
      </div>,
      document.querySelector('body')
    );
  }
}

MBPopoverInner.propTypes = {
  onClose: T.func,
  className: T.string,

  mbMap: T.object,
  lngLat: T.array,
  closeOnClick: T.bool,
  closeOnMove: T.bool,
  closeButton: T.bool,
  title: T.node,
  subtitle: T.string,
  suptitle: T.string,
  offset: T.array,

  renderContents: T.func,
  renderHeader: T.func,
  renderHeadline: T.func,
  renderToolbar: T.func,
  renderBody: T.func,
  content: T.node,
  renderFooter: T.func,
  footerContent: T.node
};

MBPopoverInner.defaultProps = {
  closeOnClick: true,
  closeButton: true,
  offset: [0, 0]
};
