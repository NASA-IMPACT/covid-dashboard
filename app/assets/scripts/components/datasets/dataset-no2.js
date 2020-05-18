import React from 'react';

import {
  InpageBodyInner
} from '../../styles/inpage';
import Prose from '../../styles/type/prose';

class NO2LongForm extends React.Component {
  render () {
    return (
      <InpageBodyInner>
        <Prose>

          <blockquote>
            <p>The Answer to the Great Question... Of Life, the Universe and Everything... Is... Forty-two, said Deep Thought, with infinite majesty and calm.</p>
            <footer>
              <cite>Douglas Adams, The Hitchhiker&apos;s Guide to the Galaxy </cite>
            </footer>
          </blockquote>

          <img src='https://via.placeholder.com/600x300?text=This is an image' alt='Image' width='600px' />

        </Prose>
      </InpageBodyInner>
    );
  }
}

export default {
  id: 'no2',
  name: 'Nitrous Dioxide',
  LongForm: NO2LongForm
};
