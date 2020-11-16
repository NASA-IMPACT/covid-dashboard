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

import { getStory } from '../';

const StoriesSingle = (props) => {
  const { story } = props;

  if (!story) return <UhOh />;

  return (
    <App pageTitle={story.name}>
      <Inpage>
        <InpageHeader>
          <InpageHeaderInner>
            <InpageHeadline>
              <InpageTitle>{story.name}</InpageTitle>
              <InpageSubtitle>Story</InpageSubtitle>
            </InpageHeadline>
          </InpageHeaderInner>
        </InpageHeader>
        <InpageBody>
            Hello
        </InpageBody>
      </Inpage>
    </App>
  );
};

StoriesSingle.propTypes = {
  story: T.object
};

function mapStateToProps (state, props) {
  const { storyId } = props.match.params;
  return {
    story: getStory(storyId)
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesSingle);
