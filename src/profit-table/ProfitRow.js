import React from 'react';
import { dateTimeStr } from '../_utils/DateUtils';

import { NumberColored, NumberPlain } from '../_common';

const ProfitRow = ({compact, transaction}) => (
    <tr>
        {!compact && <td>{transaction.get('contract_id')}</td>}
        <td>{dateTimeStr(transaction.get('purchase_time'))}</td>
        <td><NumberPlain value={transaction.get('buy_price')} /></td>
        {!compact && <td>{transaction.get('sell_time')}</td>}
        <td><NumberPlain value={transaction.get('sell_price')} /></td>
        <td><NumberColored value={transaction.get('sell_price') - transaction.get('buy_price')} /></td>
    </tr>
);

ProfitRow.propTypes = {
    compact: React.PropTypes.bool,
	transaction: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitRow;
