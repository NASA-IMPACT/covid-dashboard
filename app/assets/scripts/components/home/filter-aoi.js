import React, { Component } from 'react';
import styled from 'styled-components';
import { PropTypes as T } from 'prop-types';
import bbox from '@turf/bbox';
import featArea from '@turf/area';

import { formatThousands } from '../../utils/format';

import Dropdown, { DropTitle } from '../common/dropdown';
import { FormMainAction } from '../../styles/form/actions';
import Button from '../../styles/button/button';
import BoundsFieldset from './bounds-fieldset';
import { VerticalDivider } from '../../styles/divider';
import { glsp } from '../../styles/utils/theme-values';
import { themeVal } from '../../styles/utils/general';
import { headingAlt } from '../../styles/type/heading';

const btnAttrs = {
  variation: 'base-plain',
  size: 'small',
  hideText: true
};

const ActionBtn = styled(Button).attrs(btnAttrs)`
/* No styled, just attrs */
`;

export const Filter = styled.section`
  display: flex;
  align-items: flex-start;
  padding: ${glsp()};
  box-shadow: inset 0 -1px 0 0 ${themeVal('color.baseAlphaB')};
`;

export const FilterHeadline = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const FilterTitle = styled.h1`
  ${headingAlt()}
  font-size: 0.75rem;
  line-height: 1rem;
  margin: 0;
  order: 2;
`;

export const FilterSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: ${themeVal('type.base.bold')};

  sup {
    top: -0.25em;
  }
`;

export const FilterHeadToolbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;
  padding-left: ${glsp()};
  align-items: flex-start;
`;

export const FilterEditButton = styled(Button).attrs({
  variation: 'base-plain',
  size: 'small',
  useIcon: 'pencil',
  hideText: true
})`
  /* Not styles, just attrs */
`;

const DropdownWide = styled(Dropdown)`
  max-width: 22rem;
`;

const ToolbarDivider = styled(VerticalDivider)`
  height: 1.5rem;
  margin: 0 0.25rem 0 0.125rem;
`;

const boundsFromFeature = (feat) => {
  if (!feat) {
    return { ne: [], sw: [] };
  }

  const b = bbox(feat);
  return {
    ne: [b[2], b[3]],
    sw: [b[0], b[1]]
  };
};

class FilterAoi extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // This is a controlled component and the global onChange method is called
      // when the value should be applied. However, there are cases when the
      // props are updates and we need to update the internal state.
      // With the deprecation of componentWillRecieveProps,
      // the getDerivedStateFromProps is used for this purpose but since this
      // method fires on both prop and state changes, local updates to the
      // controlled value are ignored, because the prop's version always
      // overrides it.
      // One of the solutions is to set a component key which makes the
      // component remount but in doing so, the dropdown closing animation is
      // cancelled. Another solution is to keep track of the "committed" prop
      // value and comparing that with the new prop.
      // Committed props are tracked with a double leading underscore.
      // See getDerivedStateFromProps below.
      // https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops
      __feature: props.aoiState.feature,
      bounds: boundsFromFeature(props.aoiState.feature)
    };

    this.onApplyClick = this.onApplyClick.bind(this);

    this.dropRef = React.createRef();
  }

  static getDerivedStateFromProps (props, state) {
    if (props.aoiState.feature !== state.__feature) {
      return {
        __feature: props.aoiState.feature,
        bounds: boundsFromFeature(props.aoiState.feature)
      };
    }
    return null;
  }

  areBoundsValid () {
    // Check if bounds are valid.
    const { bounds } = this.state;
    return (
      bounds.ne[0] !== undefined && bounds.ne[1] !== undefined &&
      bounds.sw[0] !== undefined && bounds.sw[1] !== undefined
    );
  }

  onBoundsChange (what, value) {
    this.setState(state => ({
      bounds: {
        ...state.bounds,
        [what]: value
      }
    }));
  }

  onApplyClick () {
    if (this.areBoundsValid()) {
      this.props.onAction('aoi.set-bounds', { bounds: this.state.bounds });
      this.dropRef.current.close();
    }
  }

  calcFeatArea () {
    const { feature } = this.props.aoiState;
    if (!feature) return '0';

    // Convert from m2 to km2.
    const km2 = featArea(feature) / 1e6;
    return formatThousands(km2, { decimals: 0, shorten: true });
  }

  render () {
    const { bounds } = this.state;
    const {
      onAction,
      aoiState: {
        selected,
        drawing,
        feature
      }
    } = this.props;

    return (
      <Filter>
        <FilterHeadline>
          <FilterTitle>Area of interest</FilterTitle>
          <FilterSubtitle>
            {this.calcFeatArea()} km<sup>2</sup>
          </FilterSubtitle>
        </FilterHeadline>
        <FilterHeadToolbar>
          <ActionBtn
            title='Clear defined AOI'
            useIcon='trash-bin'
            onClick={() => onAction('aoi.clear')}
            disabled={!feature}
          >
            Clear AOI
          </ActionBtn>
          <ToolbarDivider variation='dark' />
          <ActionBtn
            title='Draw an AOI on map'
            useIcon='draw-rectangle'
            onClick={() => onAction('aoi.draw-click')}
            active={selected || drawing}
          >
            Draw AOI
          </ActionBtn>
          <DropdownWide
            ref={this.dropRef}
            alignment='left'
            direction='down'
            triggerElement={(
              <FilterEditButton
                title='Edit AOI bounds'
              >
                Edit AOI bounds
              </FilterEditButton>
            )}
          >
            <DropTitle>Edit AOI</DropTitle>

            <BoundsFieldset
              id='ne'
              title='Northeast bounds'
              value={bounds.ne || []}
              onChange={this.onBoundsChange.bind(this, 'ne')}
              placeholders={[-8.900, 39.000]}
            />

            <BoundsFieldset
              id='sw'
              title='Southwest bounds'
              value={bounds.sw || []}
              onChange={this.onBoundsChange.bind(this, 'sw')}
              placeholders={[-9.600, 38.600]}
            />

            <FormMainAction>
              <Button
                disabled={!this.areBoundsValid()}
                variation='primary-raised-dark'
                box='block'
                onClick={this.onApplyClick}
              >
                Apply
              </Button>
            </FormMainAction>

          </DropdownWide>
        </FilterHeadToolbar>
      </Filter>
    );
  }
}

FilterAoi.propTypes = {
  onAction: T.func,
  aoiState: T.shape({
    selected: T.bool,
    drawing: T.bool,
    feature: T.object
  })
};

export default FilterAoi;
