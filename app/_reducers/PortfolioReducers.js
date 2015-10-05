import { Map, fromJS } from 'immutable';

import {
    SERVER_DATA_PORTFOLIO,
    SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
    DETAILS_FOR_CONTRACT,
} from '../_constants/ActionTypes';

const initialState = new Map({
    detailsShown: false,
    contractShown: undefined,
    contracts: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SERVER_DATA_PORTFOLIO: {
            return state.set('contracts', fromJS(action.serverResponse.data.contracts));
        }
        case SERVER_DATA_PROPOSAL_OPEN_CONTRACT: {
            window.console.log(action.serverResponse.data);
            return state; // .set('contracts', fromJS(action.serverResponse.data.contracts));
        }
        case DETAILS_FOR_CONTRACT: {
            return state
                .set('areDetailsShown', action.areDetailsShown)
                .set('contractShown', action.contractShown);
        }
        default:
            return state;
    }
};
