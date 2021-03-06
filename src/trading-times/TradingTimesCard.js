import React, { PropTypes, Component } from 'react';
import InputGroup from '../_common/InputGroup';
import MarketPickerContainer from '../_common/MarketPickerContainer';
import { dateToDateString, todayLocaleString, oneYearAfterStr } from '../_utils/DateUtils';
import TradingTimesTable from './TradingTimesTable';

export default class TradingTimesCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.array.isRequired,
		tradingTimes: PropTypes.array.isRequired,
		tradingTimesFilter: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, tradingTimes, tradingTimesFilter } = this.props;
		const submarket = tradingTimesFilter.submarket;
		const tradingTimesDate = tradingTimesFilter.date;

		const submarketForAsset = symbol =>
			assets.find(x => x.symbol === symbol).submarket;

		return (
			<div>
				<div className="row">
					<MarketPickerContainer
						onChange={x => actions.updateTickTradeSubmarket(x)}
						allOptionShown={false}
						value={submarket}
					/>
					<InputGroup
						type="date"
						defaultValue={dateToDateString(tradingTimesDate)}
						min={todayLocaleString()}
						max={oneYearAfterStr()}
						className="trading-times-date-picker"
						onChange={x => actions.updateTradingTimesDate(x.target.valueAsDate)}
					/>
				</div>
				<TradingTimesTable
					key={submarket}
					times={tradingTimes.filter(a => submarketForAsset(a.symbol) === submarket)}
					{...this.props}
				/>
			</div>
		);
	}
}
