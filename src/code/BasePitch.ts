import { IPitch } from './interfaces';

export default abstract class BasePitch implements IPitch {
    static defaultFreq = 440

    get freq() { return this._freq }
    set freq(value: number) {
        this._freq = value
        this._updateFreq()
    }
    private _freq: number = BasePitch.defaultFreq
    setFreq(value: number) {
        this.freq = value
        return this
    }

    abstract trigger: () => () => void

    protected abstract _updateFreq: () => void
}