import { Record } from 'immutable';
import { createSelector, createStructuredSelector } from 'reselect';
import { epochToDate } from '../_utils/DateUtils';
import {
    currencySelector,
    transactionsSelector,
    transactionsFilterSelector,
} from '../_store/directSelectors';
import transactionsFilterFuncs from './transactionsFilters';

const StatementRecord = new Record({
    refN: '',
    date: 0,
    actionType: '',
    amount: 0,
    balanceAfter: 0,
});

export const filteredTransactionsSelector = createSelector(
    [transactionsSelector, transactionsFilterSelector],
    (transactions, filterIdx) =>
        transactions
            .filter(transactionsFilterFuncs[filterIdx])
            .map(t => new StatementRecord({
                refN: t.get('transaction_id'),
                date: epochToDate(t.get('transaction_time')),
                actionType: t.get('action_type'),
                amount: +t.get('amount'),
                balanceAfter: +t.get('balance_after'),
            })),
);

export const transactionsTotalSelector = createSelector(
    filteredTransactionsSelector,
    filteredTransactions =>
        filteredTransactions
            .reduce((acc, v) => acc + v.get('amount'), 0)
);

export default createStructuredSelector({
    currency: currencySelector,
    transactionsFilter: transactionsFilterSelector,
    transactions: filteredTransactionsSelector,
    transactionsTotal: transactionsTotalSelector,
});
