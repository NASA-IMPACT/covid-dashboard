import React from 'react';
import { PropTypes as T } from 'prop-types';
import DatePicker from 'react-datepicker';

export const timeToDaySeconds = date =>
  Math.floor(date.getTime() / 86400 / 1000);

class DateRange extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      pickerType: 'day',
      openToDate: props.value.start
    };

    this.onDateSelect = this.onDateSelect.bind(this);
    this.onMonthSelect = this.onMonthSelect.bind(this);
    this.onPickerClick = this.onPickerClick.bind(this);
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.pickerType !== this.state.pickerType) {
      this.props.onPickerChange(this.state.pickerType);
    }
  }

  onPickerClick (e) {
    // We're using the calendar header to switch between month picker and day
    // picker, but this is a subversion of the original behavior. Since there's
    // no callback for a click event on these elements we add one ourselves.
    // However instead of adding the click event to the element directly we add
    // it to the a wrapper parent. In this way the listener will persist even
    // when the headers change because of a month change. We then check the
    // target classes to ensure we're clicking the correct one.
    const classes = e.target.classList;
    if (
      classes.contains('react-datepicker-year-header') ||
      classes.contains('react-datepicker__current-month')
    ) {
      this.setState(state => ({
        pickerType: state.pickerType === 'day' ? 'month' : 'day'
      }));
    }
  }

  onMonthSelect (date) {
    this.setState({
      pickerType: 'day',
      openToDate: date
    });
  }

  onDateSelect (date) {
    const {
      value: { start, end },
      onChange,
      allowRange
    } = this.props;

    if (!allowRange) {
      return onChange({
        start: date,
        end: date
      });
    }

    if (start) {
      // If the start and end are already set, start over.
      // If the set date is before the start, set it as the start.
      if (end) {
        return onChange({
          start: date,
          end: null
        });
      } else if (timeToDaySeconds(date) < timeToDaySeconds(start)) {
        return onChange({
          start: date,
          end: start
        });
      } else {
        return onChange({
          start,
          end: date
        });
      }
    } else {
      return onChange({
        start: date,
        end: null
      });
    }
  }

  render () {
    const {
      value: { start, end },
      min,
      max,
      allowRange,
      className
    } = this.props;

    const compProps = allowRange ? {
      selectsStart: !start || !end,
      selectsEnd: !start || !end,
      startDate: start,
      endDate: end || start
    } : {
      startDate: start,
      endDate: start
    };

    return (
      <div className={className} onClick={this.onPickerClick}>
        {this.state.pickerType === 'day' ? (
          <DatePicker
            previousMonthButtonLabel={<span>Previous Month</span>}
            nextMonthButtonLabel={<span>Next Month</span>}
            onChange={this.onDateSelect}
            // selectsStart={!start || !end}
            // selectsEnd={!start || !end}
            monthsShown={1}
            shouldCloseOnSelect={false}
            // startDate={start}
            // endDate={end || start}
            inline
            minDate={min}
            maxDate={max}
            openToDate={this.state.openToDate}
            {...compProps}
          />
        ) : (
          <DatePicker
            previousYearButtonLabel={<span>Previous Year</span>}
            nextYearButtonLabel={<span>Next Year</span>}
            onChange={this.onMonthSelect}
            shouldCloseOnSelect={false}
            inline
            minDate={min}
            maxDate={max}
            openToDate={start}
            showMonthYearPicker
          />
        )}
      </div>
    );
  }
}

DateRange.propTypes = {
  className: T.string,
  value: T.shape({
    start: T.object,
    end: T.object
  }),
  min: T.object,
  max: T.object,
  allowRange: T.bool,
  onChange: T.func,
  onPickerChange: T.func
};

export default DateRange;
