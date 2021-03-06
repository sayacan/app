import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { Map } from 'immutable';
import { SERVER_DATA_STATES } from '../../_constants/ActionTypes';
import stateReducer from '../StatesReducer';

describe.skip('StatesReducer', () => {
    it('should be able to map each country with its respective states', () => {
        const action = {
            type: SERVER_DATA_STATES,
            country: 'COUNTRY',
            states: ['AY', 'WY'],
        };
        const beforeState = new Map({});
        const expectedState = new Map({ COUNTRY: ['AY', 'WY'] });

        const actualState = stateReducer(beforeState, action);

        expect(expectedState).to.equal(actualState);
    });

    it('should return the default or initial state when action type is wrong or not given', () => {
        const action = {
            type: 'WRONG_ACTION_TYPE',
        };
        const beforeState = new Map({});
        const actualState = stateReducer(beforeState, action);
        expect(actualState).to.equal(beforeState);
    });
});
