import * as types from '../_constants/ActionTypes';

export function filterMarkets(query) {
    return {
        type: types.FILTER_MARKETS,
        query
    };
}

export function updateMarkets(markets) {
    return {
        type: types.UPDATE_MARKETS,
        markets
    };
}