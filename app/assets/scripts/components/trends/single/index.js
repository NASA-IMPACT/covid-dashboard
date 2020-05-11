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
  InpageBody
} from '../../../styles/inpage';

import { getDataset } from '../../../datasets';

class TrendsSingle extends React.Component {
  render () {
    const { dataset } = this.props;
    return (
      <App pageTitle={dataset.name}>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>{dataset.name}</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <dataset.longFormComponent />
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

TrendsSingle.propTypes = {
  dataset: T.object
};

function mapStateToProps (state, props) {
  const dataset = getDataset(props.match.params.datasetId);

  return {
    dataset
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendsSingle);
