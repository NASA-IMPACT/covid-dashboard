import React from 'react';
import styled from 'styled-components';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';

import {
  Fold
} from '../../styles/fold';

import Constrainer from '../../styles/constrainer';

import Prose from '../../styles/type/prose';

const HomeProse = styled(Prose)`
  grid-row: 1;
  grid-column: span 8;
`;

export default class Home extends React.Component {
  render () {
    return (
      <App pageTitle='Home'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>Welcome to COVID-19 Dashboard</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <Fold>
              <Constrainer>
                <HomeProse>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iste ducimus neque sunt voluptatum veritatis totam. Minima aut quisquam ea adipisci velit exercitationem nesciunt quam maiores, deserunt, ex aliquam molestias? Asperiores, nam ab beatae mollitia accusamus quis repudiandae corrupti animi architecto magnam fuga distinctio vitae laborum a, eum quisquam neque omnis, minus suscipit perspiciatis vel. Aspernatur est a tenetur doloremque excepturi possimus omnis repellendus error.
                  </p>
                  <p>
                    Eaque libero numquam, debitis harum corrupti rerum odio assumenda nihil molestiae quibusdam, unde accusantium aperiam laborum blanditiis cumque, non labore maiores. Tempore, dicta ipsa repellendus, obcaecati cumque eos amet in similique voluptate molestiae quos tempora deleniti incidunt, iste quasi illo quidem quibusdam excepturi consequuntur suscipit et facilis enim. Similique sapiente ex corporis. Eius, porro iusto?
                  </p>
                </HomeProse>
              </Constrainer>
            </Fold>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
