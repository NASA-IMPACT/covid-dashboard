import React, { useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';

const AccordionFoldSelf = styled.section`
  /* No default styles */
`;

const AccordionFoldBody = styled.div`
  overflow: hidden;
  transition: max-height 320ms ease-in-out, opacity 320ms ease-in-out;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  max-height: ${({ isExpanded }) => (isExpanded ? '400vh' : 0)};
`;

/**
 * Handles state management for the Accordion.
 *
 * @param {array} initialState Initial state for the folds
 * @param {number} foldCount Fold count
 * @param {boolean} allowMultiple Whether or not to allow multiple open folds
 *                  at the same time.
 */
const expandedState = (initialState, foldCount = 0, allowMultiple = false, allowNone = true) => {
  const [expandedState, setExpandedState] = useState(
    initialState || Array(foldCount).fill(false)
  );
  const get = (idx) => expandedState[idx] || false;
  const set = (idx, val) => {
    const state = allowMultiple ? expandedState : [];
    const newState = Object.assign([], state, { [idx]: val });
    const isNone = newState.every(s => !s);
    if (!isNone || (isNone && allowNone)) {
      setExpandedState(newState);
    }
  };

  const canContract = (idx) => {
    if (allowNone) return true;
    // If there is more than one open then anyone can be closed.
    if (expandedState.filter(s => s).length > 1) return true;
    // If there's only one, the current can't be the open one.
    return !expandedState[idx];
  };

  return {
    get,
    set,
    canContract,
    expandAll: () => {
      if (!foldCount || foldCount < 1) {
        throw new Error('To use expandAll() foldCount has to defined');
      }
      setExpandedState(Array(foldCount).fill(true));
    },
    collapseAll: () => {
      if (!foldCount || foldCount < 1) {
        throw new Error('To use collapseAll() foldCount has to defined');
      }
      setExpandedState(Array(foldCount).fill(false));
    }
  };
};
/**
 * React Accordion component.
 * This component does not produce any markup. It only acts as a state manager
 * for the AccordionFolds.
 *
 * @param {function} children Render function for the accordion content.
 * @param {number} foldCount Number of folds to be controlled.
 * @param {bool} allowMultiple Whether or not to allow multiple open folds
 *                  at the same time.
 * @param {array<bool>} initialState Initial state for the folds.
 */
export function Accordion ({
  children,
  foldCount,
  allowMultiple,
  allowNone,
  initialState
}) {
  const { get, set, expandAll, collapseAll, canContract } = expandedState(
    initialState,
    foldCount,
    allowMultiple,
    allowNone
  );
  return children({
    checkExpanded: get,
    setExpanded: set,
    canContract,
    expandAll,
    collapseAll
  });
}

Accordion.propTypes = {
  children: T.func,
  foldCount: T.number,
  allowMultiple: T.bool,
  allowNone: T.bool,
  initialState: T.arrayOf(T.bool)
};

/**
 * React Accordion Fold component.
 *
 * @param {string} id An id for the fold
 * @param {string} className Classname for the fold.
 * @param {string} title Title to use on the fold header. Required unless
 *                 renderHeader is being used.
 * @param {node} content Content for the fold. Required unless
 *               renderBody is being used.
 * @param {bool} isExpanded Whether or not this fold is expanded.
 * @param {function} setFoldExpanded Callback for the fold header. Will be called
 *                   with the a boolean indicating the new fold state.
 * @param {function} renderHeader Overrides the fold header element.
 *                   Anything returned by this function is rendered instead of
 *                   `AccordionFoldHeader`.
 *                   Signature: fn(bag). Bag has the following props:
 *                     {boolean} isExpandedFold Whether or not this fold
 *                               is expanded.
 *                     {function} setFoldExpanded Method to change the fold
 *                                state by passing a boolean with the new state.
 * @param {function} renderBody Overrides the fold body element.
 *                   Anything returned by this function is rendered instead of
 *                   `AccordionFoldBodyInner`.
 *                   Signature: fn(bag). Bag has the following props:
 *                     {boolean} isExpandedFold Whether or not this fold
 *                               is expanded.
 *                     {function} setFoldExpanded Method to change the fold
 *                                state by passing a boolean with the new state.
 *
 */
function AccordionFoldCmp ({
  id,
  className,
  as,
  isFoldExpanded,
  setFoldExpanded,
  renderBody,
  renderHeader
}) {
  const headerContent =
    typeof renderHeader === 'function'
      ? renderHeader({
        isFoldExpanded,
        setFoldExpanded
      })
      : null;
  const bodyContent =
    typeof renderBody === 'function'
      ? renderBody({
        isFoldExpanded,
        setFoldExpanded
      })
      : null;
  return (
    <AccordionFoldSelf className={className} id={id} as={as}>
      {headerContent}
      <AccordionFoldBody isExpanded={isFoldExpanded}>
        {bodyContent}
      </AccordionFoldBody>
    </AccordionFoldSelf>
  );
}
AccordionFoldCmp.propTypes = {
  as: T.any,
  id: T.string,
  className: T.string,
  isFoldExpanded: T.bool,
  setFoldExpanded: T.func,
  renderBody: T.func,
  renderHeader: T.func
};
export const AccordionFold = styled(AccordionFoldCmp)`
  /* No default styles */
`;
