import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import proposalsReducer from '../ProposalsReducer';
import { SERVER_DATA_PROPOSAL, UPDATE_PROPOSAL_BY_ID } from '../../_constants/ActionTypes';

describe('ProposalsReducer', () => {
    it('should be able to update proposal data with the newly provided server data', () => {
        const beforeState = fromJS({});
        const action = {
            type: SERVER_DATA_PROPOSAL,
            serverResponse: {
                echo_req: {
                    contract_type: 'Call',
                    symbol: 'R_100',
                },
                proposal: 1,
            },
        };
        const expectedState = fromJS({
            R_100: {
                Call: 1,
            },
        });
        const actualState = proposalsReducer(beforeState, action);
        expect(expectedState).to.equal(actualState);
    });

    it.skip('should be able to select proposal by id and update it with new proposal provided', () => {
        const beforeState = fromJS({});
        const action = {
            type: UPDATE_PROPOSAL_BY_ID,
            id: 0,
            proposal: 1,
        };
        const expectedState = fromJS({
            0: 1,
        });
        const actualState = proposalsReducer(beforeState, action);

        expect(actualState).to.deep.equal(expectedState);
    });

    it('should return thesame propsal state when proposal type is not provided', () => {
        const beforeState = fromJS({});
        const action = {
            proposal: 1,
        };
        const actualState = proposalsReducer(beforeState, action);

        expect(actualState).to.equal(beforeState);
    });
});
