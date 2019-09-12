import { Alg, Algs } from './interfaces'
import FMSound from './FMSound'

export default class FMPlayer {
    get alg() { return this._alg }
    set alg(value: Alg) {
        this._alg = value
        this._applyAlg()
    }
    private _alg: Alg = Algs[0]

    private _sounds: { [freq: number]: () => void } = {}

    play = ((freq: number) => {
        if (this._sounds[freq]) this._sounds[freq]()
        this._sounds[freq] = new FMSound()
            .withNodeAtIndex(3, node => node.setFixedFrequency(100).setGain(1000))
            .withNodeAtIndex(4, node => node.setRatio(3).setGain(300))
            .setFreq(freq)
            .setAlg(this.alg)
            .trigger()
    })

    stop = ((freq: number) => {
        this._sounds[freq] && this._sounds[freq]()
    })

    private _applyAlg = () => {
    }
}