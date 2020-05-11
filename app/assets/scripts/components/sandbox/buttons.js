import React from 'react';
import styled, { css } from 'styled-components';

import { themeVal } from '../../styles/utils/general';
import collecticon from '../../styles/collecticons';

import Button from '../../styles/button/button';
import ButtonGroup from '../../styles/button/group';

// Extend the component previously created to change the background
// This is needed to see the achromic buttons.

const Ul = styled.ul`
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;

  > li {
    margin-bottom: 1rem;
  }

  > li:last-child {
    margin-bottom: 0;
  }
`;

const VariationsWrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(4, 1fr);

  ${({ isDark }) => isDark && css`
    padding: 2rem;
    background: ${themeVal('color.base')};
  `}
`;

// Below the different button variations and sizes to render all buttons.

const variations = [
  'base-raised-light',
  'base-raised-semidark',
  'base-raised-dark',
  'base-plain',
  'primary-raised-light',
  'primary-raised-semidark',
  'primary-raised-dark',
  'primary-plain',
  'danger-raised-light',
  'danger-raised-dark',
  'danger-plain',
  'success-raised-light',
  'success-raised-dark',
  'success-plain'
];
const lightVariations = ['achromic-plain', 'achromic-glass'];
const sizes = ['small', 'default', 'large', 'xlarge'];

// Extend a button to add an icon.
// You can also use the useIcon property
const ButtonIconBrand = styled(Button)`
  ::before {
    ${collecticon('plus')}
  }
`;

const BtnExample = () => (
  <React.Fragment>
    <h2>Button Group</h2>
    <ButtonGroup orientation='horizontal'>
      <Button variation='base-raised-light'>First</Button>
      <Button variation='base-raised-light'>Second</Button>
      <Button variation='base-raised-light'>Third</Button>
      <Button variation='base-raised-light'>Last</Button>
    </ButtonGroup>
    <ButtonGroup orientation='vertical'>
      <Button variation='base-raised-light'>First</Button>
      <Button variation='base-raised-light'>Second</Button>
      <Button variation='base-raised-light'>Third</Button>
      <Button variation='base-raised-light'>Last</Button>
    </ButtonGroup>
    <ButtonGroup orientation='horizontal'>
      <ButtonIconBrand variation='base-raised-light'>
        First
      </ButtonIconBrand>
      <ButtonIconBrand variation='base-raised-light'>
        Second
      </ButtonIconBrand>
      <ButtonIconBrand variation='base-raised-light'>
        Third
      </ButtonIconBrand>
    </ButtonGroup>

    <h2>Buttons</h2>
    <p>
      Any button can be visually disabled using the <code>visuallyDisabled</code> prop.<br />
      This results in a button that looks disabled with a not-allowed cursor. Additionally, the pointer events are still active, allowing for events to be attached to it. <br />
      Both buttons have a click event attached:
    </p>

    <Button
      variation='base-raised-light'
      onClick={() => alert('I still work')}
      visuallyDisabled
    >
      Visually disabled
    </Button>

    <Button
      variation='base-raised-light'
      onClick={() => alert('Never triggered')}
      disabled
    >
      Disabled
    </Button>

    <p>The buttons are described by <code>[size] + [variation]</code></p>

    <VariationsWrapper>
      {variations.map(variation => (
        <Ul key={variation}>
          {sizes.map(size => (
            <li key={size}>
              <Button variation={variation} size={size}>
                {size} - {variation}
              </Button>
            </li>
          ))}
        </Ul>
      ))}
    </VariationsWrapper>

    <VariationsWrapper isDark>
      {lightVariations.map(variation => (
        <Ul key={variation}>
          {sizes.map(size => (
            <li key={size}>
              <Button variation={variation} size={size}>
                {size} + {variation}
              </Button>
            </li>
          ))}
        </Ul>
      ))}
    </VariationsWrapper>
  </React.Fragment>
);

export default BtnExample;
