import Sound from './Sound';
import { IFMNodeData, IFMNodeInfo, FMNodeType } from './interfaces';

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

    applyData = (data: IFMNodeData) => {
        this.setGain(data.gain).setEnvelope(data.envelope)
        switch (data.type) {
            case FMNodeType.RATIO:
                this.setRatio(data.ratio)
                break
            case FMNodeType.FIXED:
                this.setFixedFrequency(data.frequency)
        }
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