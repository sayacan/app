import { createSelector, createStructuredSelector } from 'reselect';
import singleTradeSelectors from '../trades/singleTradeSelectors';
import { findIfExist } from '../_utils/ObjectUtils';
import { availableAssetsSelector, availableContractsSelector } from '../fulltrade/FullTradeSelectors';

const tickAssetFilter = (assets, contracts) => {
    const tickAssets = Object.keys(assets).reduce((a, b) => {
        const temp = assets[b].filter(s => {
            const assetContract = contracts[s];
            if (!assetContract) {
                return true;
            }
            return findIfExist(assetContract, o => Array.isArray(o) && o.unit === 't');
        });
        return a.concat(temp);
    }, []);

    return tickAssets;
};

export const tickTradesSelector = createSelector(
    singleTradeSelectors,
    trade => {
        const tickAssets = tickAssetFilter(trade.assets, trade.contracts);
        const refTrade = trade;             // not entirely sure if this will create trouble
        refTrade.assets = tickAssets;
        return refTrade;
    }
);

export const tickAssetsSelector = createSelector(
    [availableAssetsSelector, availableContractsSelector],
    (assets, contracts) => tickAssetFilter(assets, contracts)
);


export default createStructuredSelector({
    ...singleTradeSelectors,
    assets: tickAssetsSelector,
});
