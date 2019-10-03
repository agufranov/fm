import { Alg, Algs, IFMNodeData, FMNodeType } from './interfaces'
import FMSound from './FMSound'
import Envelope from './Envelope'

export default class FMPlayer {
    get alg() { return this._alg }
    set alg(value: Alg) {
        this._alg = value
        this._applyAlg()
    }
    private _alg: Alg = Algs[0]

    private _detriggers: { [freq: number]: () => void } = {}
    private _sounds: { [freq: number]: FMSound } = {}
    
    nodesData: IFMNodeData[] = [
        {
            envelope: new Envelope({}),
            gain: 0.2,
            type: FMNodeType.RATIO,
            ratio: 1
        },
        {
            envelope: new Envelope({}),
            gain: 0.2,
            type: FMNodeType.FIXED,
            frequency: 300
        },
        {
            envelope: new Envelope({}),
            gain: 0.2,
            type: FMNodeType.FIXED,
            frequency: 200
        },
        {
            envelope: new Envelope({}),
            gain: 0.2,
            type: FMNodeType.RATIO,
            ratio: 4
        }
    ]

    play = ((freq: number) => {
        if (this._detriggers[freq]) this._detriggers[freq]()
        const sound = new FMSound()
            .applyData(this.nodesData)
            .setFreq(freq)
            .setAlg(this.alg)
        this._sounds[freq] = sound
        this._detriggers[freq] = sound.trigger()
    })

    stop = ((freq: number) => {
        if (!this._detriggers[freq]) return
        this._detriggers[freq]()
        delete this._detriggers[freq]
        delete this._sounds[freq]
    })

    applyData = (data: IFMNodeData[], updateCurrentSounds = true) => {
        this.nodesData = data;
        if (updateCurrentSounds) {
            Object.values(this._sounds).forEach(sound => sound.applyData(data))
        }
    }

    private _applyAlg = () => {
    }
}