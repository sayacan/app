export default ({ theme, data, markLine, markPoint }) => ({
    name: 'Symbol data',
    type: 'line',
    clickable: false,
    showLegendSymbol: false,
    symbol: 'none',
    data,
    itemStyle: {
        normal: {
            lineStyle: {
                color: theme.line,
                width: 2,
            },
            areaStyle: {
                type: 'default',
                color: theme.fill,
            },
        },
    },
    markLine,
    markPoint,
});
