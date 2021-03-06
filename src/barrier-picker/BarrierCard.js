import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BarrierInput from './RelativeBarrierInput';
import CollapsibleFormSnippet from '../containers/CollapsibleFormSnippet';

export default class BarrierCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        barrier: PropTypes.number,
        barrier2: PropTypes.number,
        barrierInfo: PropTypes.object,
        barrierType: PropTypes.oneOf(['relative', 'absolute']),
        isIntraDay: PropTypes.bool,
        onBarrier1Change: PropTypes.func,
        onBarrier2Change: PropTypes.func,
        onBarrierTypeChange: PropTypes.func,
        pipSize: PropTypes.number,
        spot: PropTypes.number,
    };

    render() {
        const {
            barrier,
            barrier2,
            barrierInfo,
            barrierType,
            isIntraDay,
            onBarrier1Change,
            onBarrier2Change,
            onBarrierTypeChange,
            pipSize,
            spot,
            } = this.props;
        const expiryType = isIntraDay ? 'intraday' : 'daily';
        const barrier1Info = barrierInfo[expiryType] && barrierInfo[expiryType][0];
        const barrier2Info = barrierInfo[expiryType] && barrierInfo[expiryType][1];
        const toggleMsg = barrierType === 'relative' ?
            (!isIntraDay && 'Absolute barrier available') :
            'Relative barrier';
        return (
            <div>
                {barrier1Info && <CollapsibleFormSnippet label="Barriers" show>
                    <div>
                        <BarrierInput
                            {...barrier1Info}
                            barrierType={barrierType}
                            expiryType={expiryType}
                            onChange={onBarrier1Change}
                            isIntraDay={isIntraDay}
                            pipSize={pipSize}
                            value={barrier}
                            spot={spot}
                        />
                    </div>
                    {barrier2Info &&
                        <div>
                            <BarrierInput
                                {...barrierInfo[expiryType][1]}
                                barrierType={barrierType}
                                expiryType={expiryType}
                                onChange={onBarrier2Change}
                                pipSize={pipSize}
                                isIntraDay={isIntraDay}
                                value={barrier2}
                                spot={spot}
                            />
                        </div>}
                    {spot &&
                    <a onClick={() => onBarrierTypeChange(barrierType === 'relative' ? 'absolute' : 'relative')}>
                        {toggleMsg}
                    </a>}
                </CollapsibleFormSnippet>}
            </div>
        );
    }
}
