import Envelope from './Envelope'

export type Alg = number[][]

export const Algs: Alg[] = [
    [[0], [0], [1], [2]]
]

export interface IPitch {
    freq: number
    trigger: () => () => void
}

export interface IAmplified {
    gain: number
    envelope: Envelope
}

export type IAmplifiedPitch = IPitch & IAmplified

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

export type IFMNodeData = IAmplified & IFMNodeInfo