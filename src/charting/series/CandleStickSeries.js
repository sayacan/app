// import { ohlcFormatter } from '../formatters';

const testData = [
    ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
    ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
    ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
    ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
    ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
];

export default ({ data = testData }) => ({
    name: 'CandleStick',
    type: 'candlestick',
    data,
});
