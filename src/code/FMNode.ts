import Sound from './Sound';

export enum FMNodeType {
    RATIO = 0,
    FIXED = 1
}

interface IFMNodeRatio {
    type: FMNodeType.RATIO
    ratio: number
}

interface IFMNodeFixed {
    type: FMNodeType.FIXED
    frequency: number
}

export type IFMNodeInfo = IFMNodeRatio | IFMNodeFixed

export default class FMNode extends Sound {
    get info() { return this._info }
    set info(value: IFMNodeInfo) {
        this._info = value
        this._updateFreq()
    }
    private _info: IFMNodeInfo = {
        type: FMNodeType.RATIO,
        ratio: 1
    }
    private setInfo = (value: IFMNodeInfo) => {
        this.info = value
        return this
    }

    setRatio = (ratio: number) => {
        return this.setInfo({
            type: FMNodeType.RATIO,
            ratio
        })
    }

    setFixedFrequency = (frequency: number) => {
        return this.setInfo({
            type: FMNodeType.FIXED,
            frequency
        })
    }

    toFMSlave = (node: FMNode) => {
        this._amp.connect(node._osc.frequency)
    }

    disconnect = () => {
        this._amp.disconnect()
    }
    
    protected _updateFreq = () => {
        switch(this.info.type) {
            case FMNodeType.RATIO:
                this._osc.frequency.value = this.freq * this.info.ratio
                break
            case FMNodeType.FIXED:
                this._osc.frequency.value = this.info.frequency
                break
        }
    }
}