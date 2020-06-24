import React from 'react';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import Clipboard from 'clipboard';

import Button from '../../styles/button/button';
import Form from '../../styles/form/form';
import FormInput from '../../styles/form/input';

const FormInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  > :first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > :last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

// This needs to be a separate class because of the mount and unmount methods.
// The dropdown unmounts when closed and the refs would be lost otherwise.
export class CopyField extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      copiedMsg: false
    };
    this.triggerEl = null;
    this.copiedMsgTimeout = null;
  }

  componentDidMount () {
    this.clipboard = new Clipboard(this.triggerEl, {
      text: () => this.props.value
    });

    this.clipboard.on('success', (e) => {
      this.setState({ copiedMsg: true });
      this.copiedMsgTimeout = setTimeout(() => {
        this.setState({ copiedMsg: false });
      }, 2000);
    });
  }

  componentWillUnmount () {
    this.clipboard.destroy();
    if (this.copiedMsgTimeout) clearTimeout(this.copiedMsgTimeout);
  }

  render () {
    const val = this.state.copiedMsg ? 'Copied!' : this.props.value;
    return (
      <Form action='#' className='form'>
        <FormInputGroup>
          <FormInput
            id='site-url'
            name='site-url'
            className='form__control'
            type='text'
            readOnly
            value={val}
          />
          <Button
            variation='primary-raised-dark'
            hideText
            useIcon='clipboard'
            type='button'
            title='Copy to clipboard'
            ref={(el) => {
              this.triggerEl = el;
            }}
          >
            Copy to clipboard
          </Button>
        </FormInputGroup>
      </Form>
    );
  }
}

CopyField.propTypes = {
  value: T.string
};
