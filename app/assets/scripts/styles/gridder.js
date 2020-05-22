import styled from 'styled-components';
import { themeVal } from './utils/general';
import { divide, subtract, val2px } from './utils/math';
import { glsp } from './utils/theme-values';

// Grid:
//   start    1    2    3    4    5    6    7    8    9   10   11   12     end
// |      |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|      |
// |      |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|      |
// |      |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|      |
// |      |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|      |
// |      |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|  |*|      |
//
// The start and end take up 1 fraction and its size is fluid, depending on
// window size.
// Each column takes up a 12th of the max content width (defined in the theme).
// Grid gaps are marked with an asterisk.

// Use all the values defined in pixels.
const layoutMax = val2px(themeVal('layout.max'));
const gridGap = val2px(glsp(2));
// Discard the base padding to ensure that gridded folds have the same size as
// the constrainers.
const layoutMaxNoPadding = subtract(layoutMax, gridGap);
// Each column takes up a 12th of the content block (with is the layoutMaxNoPadding).
const fullColumn = divide(layoutMaxNoPadding, 12);
// To get the usable size of each column we need to account for the gap.
const contentColWidth = subtract(fullColumn, gridGap);

const Gridder = styled.div`
  display: grid;
  grid-gap: ${glsp(2)};
  grid-template-columns:
    [full-start] minmax(0, 1fr) 
    [content-start] minmax(0, ${contentColWidth}) 
    [content-2] minmax(0, ${contentColWidth}) 
    [content-3] minmax(0, ${contentColWidth}) 
    [content-4] minmax(0, ${contentColWidth}) 
    [content-5] minmax(0, ${contentColWidth}) 
    [content-6] minmax(0, ${contentColWidth}) 
    [content-7] minmax(0, ${contentColWidth}) 
    [content-8] minmax(0, ${contentColWidth}) 
    [content-9] minmax(0, ${contentColWidth}) 
    [content-10] minmax(0, ${contentColWidth}) 
    [content-11] minmax(0, ${contentColWidth}) 
    [content-12] minmax(0, ${contentColWidth}) 
    [content-end] minmax(0, 1fr) 
    [full-end]
  ;
`;

export default Gridder;
