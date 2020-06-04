import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageSubtitle,
  InpageBody
} from '../../../styles/inpage';
import UhOh from '../../uhoh';

import { getIndicator } from '../';

class IndicatorsSingle extends React.Component {
  render () {
    const { indicator } = this.props;

    if (!indicator || !indicator.LongForm) return <UhOh />;

    return (
      <App pageTitle={indicator.name}>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>{indicator.name}</InpageTitle>
                <InpageSubtitle>Indicator</InpageSubtitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <indicator.LongForm />
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

IndicatorsSingle.propTypes = {
  indicator: T.object
};

function mapStateToProps (state, props) {
  const { indicatorId } = props.match.params;
  return {
    indicator: getIndicator(indicatorId)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsSingle);
