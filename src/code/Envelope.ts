import ctx from '../ctx'

interface IEnvelopeParams {
    A: number
    D: number
    S: number
    R: number
}

export default class Envelope implements IEnvelopeParams {
    A: number = 0.1
    D: number = 0.1
    S: number = 0.8
    R: number = 0.8

    constructor(values: Partial<IEnvelopeParams>) {
        Object.assign(this, values)
    }

    trigger(param: AudioParam, maxValue: number) {
        const { A, D, S } = this
        const now = ctx.currentTime
        param.cancelScheduledValues(now)
        param.setValueAtTime(0, now)
        param.linearRampToValueAtTime(maxValue, now + A)
        param.linearRampToValueAtTime(maxValue * S, now + A + D)
    }
    

    untrigger(param: AudioParam, callback?: () => void) {
        const { R } = this
        const now = ctx.currentTime
        param.linearRampToValueAtTime(0, now + R)
        callback && setTimeout(callback, R * 1000)
    }
}