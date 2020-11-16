import React from 'react';

import App from '../../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../../styles/inpage';

import Prose from '../../../styles/type/prose';

import { PageConstrainer, HubFold } from '../../../styles/hub-pages';

export default class StoriesHub extends React.Component {
  render() {
    return (
      <App pageTitle='Spotlight areas'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Stories</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <HubFold>
                <Prose>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla vulputate porttitor. Donec feugiat aliquam libero, id finibus risus mattis quis. Morbi ornare sit amet mi ut efficitur. Proin sodales tellus enim, quis feugiat purus facilisis quis. Praesent facilisis, quam et eleifend finibus, erat urna porttitor sem, at suscipit urna libero eu felis. Duis ullamcorper lectus ut tempus interdum. Donec lobortis, ante sit amet euismod sollicitudin, nisi lectus finibus enim, id mollis eros sapien in neque. Aenean fermentum mauris sed nunc posuere venenatis. Vestibulum mi ex, sagittis a semper non, pretium a purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id libero lobortis, scelerisque est vitae, fringilla sapien.
                  </p>
                </Prose>
              </HubFold>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
