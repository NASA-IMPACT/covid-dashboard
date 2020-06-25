import React from 'react';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import { format, isSameYear, isSameMonth } from 'date-fns';

import Dropdown from './dropdown';
import Button from '../../styles/button/button';
import DateRange from './date-range';
import { FormHelper, FormHelperMessage } from '../../styles/form/helper';
import { glsp } from '../../styles/utils/theme-values';

const DATE_FORMAT = 'MMM dd, yyyy';

const DropdownDatePicker = styled(Dropdown)`
  width: auto;
  max-width: none;

  .react-datepicker {
    border: none;
    border-radius: 0;
  }

  .react-datepicker__header {
    background: none;
    border-radius: 0;
  }
`;

const DateRangeSelector = styled(DateRange)`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const PickerFooter = styled.div`
  display: flex;

  & > * {
    margin-right: ${glsp()};
  }
`;

const FormHelperPicker = styled(FormHelper)`
  margin-top: ${glsp()};
  max-width: 17rem;
`;

class DatePicker extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      // This is a controlled component and the global onChange method is called
      // when the value should be applied. However, there are cases when the
      // props are updates and we need to update the internal state.
      // With the deprecation of componentWillReceiveProps,
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
      __range: props.dateState,
      range: props.dateState
    };

    this.onClearClick = this.onClearClick.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.onDateChange = this.onDateChange.bind(this);

    this.dropdownRef = React.createRef();
  }

  static getDerivedStateFromProps (props, state) {
    if (props.dateState !== state.__range) {
      return {
        __range: props.dateState,
        range: props.dateState
      };
    }
    return null;
  }

  onClearClick () {
    this.setState({ range: { start: null, end: null } });
  }

  onDropdownClose () {
    // There must always be a date set.
    // If the date was cleared, reset to original.
    if (!this.state.range.start && !this.state.range.end) {
      this.setState(state => ({
        range: state.__range
      }));
    }
  }

  onApplyClick () {
    // If applying only with start, consider that date start and end.
    this.setState(state => {
      const {
        range: { start, end }
      } = state;

      if (!end) {
        return {
          range: { start, end: start }
        };
      }
    }, () => {
      this.props.onChange(this.state.range);
      this.dropdownRef.current.close();
    });
  }

  onDateChange (range) {
    this.setState({ range });
  }

  getTriggerLabel () {
    const {
      dateState: { start, end }
    } = this.props;

    if (start) {
      const startStr = format(start, DATE_FORMAT);
      if (!end) {
        return `${startStr} — end`;
      }

      const endStr = format(end, DATE_FORMAT);
      if (startStr === endStr) {
        return startStr;
      }

      if (isSameMonth(start, end) && isSameYear(start, end)) {
        return `${format(start, 'MMM dd')}-${format(end, 'dd, yyyy')}`;
      } else if (isSameYear(start, end)) {
        return `${format(start, 'MMM dd')} — ${endStr}`;
      } else {
        return `${startStr} — ${endStr}`;
      }
    }

    return 'From start — end';
  }

  render () {
    const { id, label, dateDomain, validate } = this.props;
    const { range } = this.state;

    const validationError = validate(range);
    const isValidRange = !validationError;

    return (
      <DropdownDatePicker
        ref={this.dropdownRef}
        onChange={(open) => !open && this.onDropdownClose()}
        alignment='right'
        direction='down'
        triggerElement={
          <Button
            variation='base-achromic'
            size='small'
            title='Select a date range'
            hideText
            useIcon='calendar'
          >
            {this.getTriggerLabel()}
          </Button>
        }
      >
        <DateRangeSelector
          id={id}
          label={label}
          value={range}
          min={dateDomain[0]}
          max={dateDomain[1]}
          allowRange
          onChange={this.onDateChange}
          onPickerChange={() => this.dropdownRef.current.reposition()}
        />
        <PickerFooter>
          <Button variation='base-plain' onClick={this.onClearClick}>
            Clear
          </Button>
          <Button
            disabled={!range.start || !isValidRange}
            variation='primary-raised-dark'
            onClick={this.onApplyClick}
          >
            Apply
          </Button>
        </PickerFooter>
        {!isValidRange && (
          <FormHelperPicker>
            <FormHelperMessage invalid>{validationError}</FormHelperMessage>
          </FormHelperPicker>
        )}
      </DropdownDatePicker>
    );
  }
}

DatePicker.propTypes = {
  dateState: T.shape({
    start: T.object,
    end: T.object
  }),
  dateDomain: T.array,
  id: T.string,
  label: T.string,
  onChange: T.func,
  validate: T.func
};

export default DatePicker;
