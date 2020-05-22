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

import { getDataset } from '../';

class DatasetsSingle extends React.Component {
  render () {
    const { dataset } = this.props;

    if (!dataset || !dataset.LongForm) return <UhOh />;

    return (
      <App pageTitle={dataset.name}>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>{dataset.name}</InpageTitle>
                <InpageSubtitle>Dataset</InpageSubtitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <dataset.LongForm />
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}

DatasetsSingle.propTypes = {
  dataset: T.object
};

function mapStateToProps (state, props) {
  const { datasetId } = props.match.params;
  return {
    dataset: getDataset(datasetId)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetsSingle);
