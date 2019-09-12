import ctx from '../ctx'
import { IAmplifiedPitch } from './interfaces'
import BasePitch from './BasePitch'
import Envelope from './Envelope'

export default class Sound extends BasePitch implements IAmplifiedPitch {
    static defaultGain = 1
    static defaultEnvelope = new Envelope({})

    get gain() { return this._gain }
    set gain(value: number) {
        this._gain = value
        this._amp.gain.value = value
    }
    private _gain: number = Sound.defaultGain
    setGain(value: number) {
        this.gain = value
        return this
    }

    envelope: Envelope = Sound.defaultEnvelope
    setEnvelope(value: Envelope) {
        this.envelope = value
        return this
    }

    protected _osc: OscillatorNode
    protected _amp: GainNode

    constructor() {
        super()
        this._osc = new OscillatorNode(ctx)
        this._amp = new GainNode(ctx)
        this.freq = Sound.defaultFreq
        this.gain = Sound.defaultGain
        this._osc.connect(this._amp)
    }

    toMaster = () => {
        this._amp.connect(ctx.destination)
        return this
    }
    
    trigger = () => {
        this.envelope.trigger(this._amp.gain, this.gain)
        this._osc.start()

        return () => this.envelope.untrigger(this._amp.gain, this._destroy)
    }

    protected _updateFreq = () => {
        this._osc.frequency.value = this.freq
    }

    private _destroy = () => {
        this._osc.stop()
        this._amp.disconnect()
    }
}