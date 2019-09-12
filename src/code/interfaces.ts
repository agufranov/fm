import Envelope from './Envelope'

export type Alg = number[][]

export const Algs: Alg[] = [
    [[0], [0], [1], [2]]
]

export interface IPitch {
    freq: number
    trigger: () => () => void
}

export interface IAmplifiedPitch extends IPitch {
    gain: number
    envelope: Envelope
}