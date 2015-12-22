import React, { PropTypes } from 'react';
import EChart from './EChart';
import SizeProvider from '../_common/SizeProvider';
import chartOptionsTrade from './options/ChartOptionsTrade';

const theme = {
    gridColor: '#eee',
    axisTextColor: 'rgb(64, 68, 72)',
};

export default class TradeChart extends React.Component {

    static propTypes = {
        history: PropTypes.array.isRequired,
        spot: PropTypes.number,
    };

    static defaultProps = {
        history: [],
        spot: 0,
    };

    render() {
        const { history, spot } = this.props;
        const options = chartOptionsTrade({ history, spot: +spot, theme });
        return (
            <SizeProvider style={{ width: '100%', height: '100px' }}>
                <EChart
                    options={options}
                    {...this.props}
                />
            </SizeProvider>
        );
    }
}
