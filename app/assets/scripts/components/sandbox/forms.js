import React from 'react';
import styled from 'styled-components';

import collecticon from '../../styles/collecticons';

import Button from '../../styles/button/button';
import Form from '../../styles/form/form';
import {
  FormFieldset,
  FormFieldsetHeader,
  FormFieldsetBody
} from '../../styles/form/fieldset';
import FormLegend from '../../styles/form/legend';
import {
  FormGroup,
  FormGroupHeader,
  FormGroupBody
} from '../../styles/form/group';
import FormLabel from '../../styles/form/label';
import FormInput from '../../styles/form/input';
import { FormSwitch } from '../../styles/form/switch';
import {
  FormCheckable,
  FormCheckableGroup
} from '../../styles/form/checkable';
import FormSelect from '../../styles/form/select';
import FormTextarea from '../../styles/form/textarea';
import FormToolbar from '../../styles/form/toolbar';
import {
  FormHelper,
  FormHelperMessage,
  FormHelperCounter
} from '../../styles/form/helper';

const RemoveButton = styled(Button)`
  ::before {
    ${collecticon('trash-bin')}
  }
`;

const InfoButton = styled(Button)`
  ::before {
    ${collecticon('circle-information')}
  }
`;

const FormsExample = () => (
  <React.Fragment>
    <h2>Form elements</h2>
    <Form>
      <FormFieldset>
        <FormFieldsetHeader>
          <FormLegend>Form legend</FormLegend>
          <RemoveButton variation='base-plain' size='small' hideText>
            Remove fieldset
          </RemoveButton>
        </FormFieldsetHeader>
        <FormFieldsetBody>
          <FormGroup>
            <FormGroupHeader>
              <FormLabel htmlFor='input-text-a'>Form label</FormLabel>
              <FormToolbar>
                <InfoButton
                  variation='base-plain'
                  size='small'
                  hideText
                  data-tip='This is a very helpful tooltip.'
                >
                  Learn more
                </InfoButton>
              </FormToolbar>
            </FormGroupHeader>
            <FormGroupBody>
              <FormInput
                type='text'
                size='large'
                id='input-text-a'
                placeholder='This is a text input'
              />
              <FormHelper>
                <FormHelperMessage>This is some help text.</FormHelperMessage>
                <FormHelperCounter>0 / 80</FormHelperCounter>
              </FormHelper>
            </FormGroupBody>
          </FormGroup>

          <FormGroup>
            <FormGroupHeader>
              <FormLabel>Form label</FormLabel>
            </FormGroupHeader>
            <FormGroupBody>
              <FormCheckableGroup>
                <FormCheckable
                  checked={undefined}
                  type='checkbox'
                  name='checkbox-a'
                  id='checkbox-a'
                >
                  Checkbox A
                </FormCheckable>
                <FormCheckable
                  checked={undefined}
                  type='checkbox'
                  name='checkbox-b'
                  id='checkbox-b'
                >
                  Checkbox B
                </FormCheckable>
              </FormCheckableGroup>
            </FormGroupBody>
          </FormGroup>

          <FormGroup>
            <FormGroupHeader>
              <FormLabel>Form label</FormLabel>
            </FormGroupHeader>
            <FormGroupBody>
              <FormCheckableGroup>
                <FormCheckable
                  textPlacement='right'
                  checked={undefined}
                  type='radio'
                  name='radio-a'
                  id='radio-a1'
                >
                  Radio A
                </FormCheckable>
                <FormCheckable
                  textPlacement='right'
                  checked={undefined}
                  type='radio'
                  name='radio-a'
                  id='radio-a2'
                >
                  Radio B
                </FormCheckable>
                <FormCheckable
                  textPlacement='right'
                  checked={undefined}
                  type='radio'
                  name='radio-a'
                  id='radio-a3'
                >
                  Radio C
                </FormCheckable>
                <FormCheckable
                  textPlacement='right'
                  checked={undefined}
                  type='radio'
                  name='radio-a'
                  id='radio-a4'
                >
                  Radio D
                </FormCheckable>
              </FormCheckableGroup>
            </FormGroupBody>
          </FormGroup>

          <FormGroup>
            <FormGroupHeader>
              <FormLabel>Form label</FormLabel>
            </FormGroupHeader>
            <FormGroupBody>
              <FormCheckableGroup>
                <FormSwitch
                  hideText
                  name='switch-a'
                  id='switch-a'
                  checked={undefined}
                >
                  Switch A
                </FormSwitch>

                <FormSwitch
                  name='switch-b'
                  id='switch-b'
                  checked={undefined}
                >
                  Switch B
                </FormSwitch>
              </FormCheckableGroup>
            </FormGroupBody>
          </FormGroup>

          <FormFieldset>
            <FormFieldsetHeader>
              <FormLegend>Form legend</FormLegend>
              <RemoveButton
                variation='base-plain'
                size='small'
                hideText
                data-tip='This is a super helpful tooltip.'
              >
                Remove fieldset
              </RemoveButton>
            </FormFieldsetHeader>
            <FormFieldsetBody>
              <FormGroup>
                <FormGroupHeader>
                  <FormLabel htmlFor='textarea-b'>Form label</FormLabel>
                </FormGroupHeader>
                <FormGroupBody>
                  <FormTextarea
                    size='large'
                    id='textarea-b'
                    placeholder='This is a textarea'
                  />
                  <FormHelper>
                    <FormHelperMessage invalid>
                      This is an error message.
                    </FormHelperMessage>
                  </FormHelper>
                </FormGroupBody>
              </FormGroup>
            </FormFieldsetBody>
          </FormFieldset>

          <FormGroup>
            <FormGroupHeader>
              <FormLabel htmlFor='select-a' optional>
                Form label
              </FormLabel>
            </FormGroupHeader>
            <FormGroupBody>
              <FormSelect size='large' id='select-a'>
                <option value='option-1'>Option 1</option>
                <option value='option-2'>Option 2</option>
                <option value='option-3'>Option 3</option>
                <option value='option-4'>Option 4</option>
              </FormSelect>
              <FormHelper>
                <FormHelperMessage>This is some help text.</FormHelperMessage>
              </FormHelper>
            </FormGroupBody>
          </FormGroup>

          <FormGroup>
            <FormGroupHeader>
              <FormLabel htmlFor='textarea-a'>Form label</FormLabel>
            </FormGroupHeader>
            <FormGroupBody>
              <FormTextarea
                size='large'
                id='textarea-a'
                placeholder='This is a textarea'
                invalid
              />
              <FormHelper>
                <FormHelperMessage invalid>
                  This is an error message.
                </FormHelperMessage>
              </FormHelper>
            </FormGroupBody>
          </FormGroup>
        </FormFieldsetBody>
      </FormFieldset>
    </Form>
  </React.Fragment>
);

export default FormsExample;
