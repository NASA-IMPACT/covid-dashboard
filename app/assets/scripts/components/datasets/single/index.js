import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
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
import UhOh from '../../uhoh';

import { glsp } from '../../../styles/utils/theme-values';
import { getDataset } from '../';

const DatasetInpageHeaderInner = styled(InpageHeaderInner)`
  padding-left: ${glsp(2)};
`;

class DatasetsSingle extends React.Component {
  render () {
    const { dataset } = this.props;

    if (!dataset || !dataset.LongForm) return <UhOh />;

    return (
      <App pageTitle={dataset.name}>
        <Inpage>
          <InpageHeader>
            <DatasetInpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>{dataset.name}</InpageTitle>
              </InpageHeadline>
            </DatasetInpageHeaderInner>
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
