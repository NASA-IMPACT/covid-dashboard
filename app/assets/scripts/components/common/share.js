import React from 'react';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Clipboard from 'clipboard';

import Button from '../../styles/button/button';
import Dropdown, {
  DropTitle,
  DropMenu,
  DropInset,
  DropMenuItem
} from './dropdown';
import Form from '../../styles/form/form';
import FormInput from '../../styles/form/input';
import collecticon from '../../styles/collecticons';

const ShareIconMenu = styled(DropMenuItem)`
  :before {
    ${({ useIcon }) => collecticon(useIcon)}
  }
`;

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

class ShareOptions extends React.Component {
  render () {
    const url = window.location.toString();
    return (
      <Dropdown
        alignment='right'
        direction='down'
        triggerElement={
          <Button
            variation='achromic-plain'
            title='Toggle share options'
            hideText
            useIcon='share-2'
          >
            <span>Share</span>
          </Button>
        }
      >
        <DropTitle>Share</DropTitle>
        <DropMenu role='menu' iconified>
          <li>
            <ShareIconMenu
              useIcon='brand-facebook'
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              title='Share on Facebook'
              target='_blank'
            >
              <span>Facebook</span>
            </ShareIconMenu>
          </li>
          <li>
            <ShareIconMenu
              useIcon='brand-twitter'
              href={`https://twitter.com/intent/tweet?url=${url}`}
              title='Share on Twitter'
              target='_blank'
            >
              <span>Twitter</span>
            </ShareIconMenu>
          </li>
        </DropMenu>
        <DropInset>
          <CopyField value={url} />
        </DropInset>
      </Dropdown>
    );
  }
}

export default withRouter(ShareOptions);

// This needs to be a separate class because of the mount and unmount methods.
// The dropdown unmounts when closed and the refs would be lost otherwise.
class CopyField extends React.Component {
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
            <span>Copy to clipboard</span>
          </Button>
        </FormInputGroup>
      </Form>
    );
  }
}

CopyField.propTypes = {
  value: T.string
};
