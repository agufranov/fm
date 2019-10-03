import { IPitch, Alg, Algs, IFMNodeData } from './interfaces'
import BasePitch from './BasePitch';
import FMNode from './FMNode';

export default class FMSound extends BasePitch implements IPitch {
    get alg() { return this._alg }
    set alg(value: Alg) {
        this._alg = value
        this._applyAlg()
    }
    private _alg: Alg = Algs[0]
    setAlg = (value: Alg) => {
        this.alg = value
        return this
    }

    readonly nodes = [0, 1, 2, 3].map(() => new FMNode())
    getNode = (nodeNumber: number) => { return this.nodes[nodeNumber - 1] }

    withNodes = ((callback: (nodes: FMNode[]) => void) => {
        callback(this.nodes)
        return this
    })

    withNodeAtIndex = ((nodeNumber: number, callback: (node: FMNode) => void) => {
        callback(this.getNode(nodeNumber))
        return this
    })

    constructor() {
        super()
        this.alg = this._alg
    }

    trigger = () => {
        return this.nodes
            .map(node => node.trigger())
            .reduce((untriggerAll, untrigger) => () => {
                untriggerAll()
                untrigger()
            })
    }

    applyData = (data: IFMNodeData[]) => {
        if (data.length !== this.nodes.length) throw new Error('Incompatible data length!')
        this.nodes.forEach((node, i) => node.applyData(data[i]))
        return this
    }

    protected _updateFreq = () => {
        this.nodes.forEach(node => node.freq = this.freq)
    }

    private _applyAlg = () => {
        this.alg.forEach((slaveNumbers, masterIndex) => {
            const masterNumber = masterIndex + 1
            const master = this.getNode(masterNumber)
            master.disconnect()
            slaveNumbers.map(this.getNode).forEach(slave => {
                slave ? master.toFMSlave(slave) : master.toMaster()
            })
        })
    }
}