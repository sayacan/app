import React, { Component } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradingTimesCard from './TradingTimesCard';
import tradingTimesSelectors from './tradingTimesSelectors';

@connect(tradingTimesSelectors)
export default class TradingTimesContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<TradingTimesCard
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
