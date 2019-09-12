import React, { useState } from 'react'
import './style.css'
import FMNode, { FMNodeType } from '../../code/FMNode'
import Slider from '@material-ui/core/Slider'

interface IProps {
    node: FMNode
}

interface IState {
    value: number
}

const FMNodeView: React.FunctionComponent<IProps> = (props) => {
    const getNodeValue = (node: FMNode) => {
        switch(node.info.type) {
            case FMNodeType.RATIO:
                return node.info.ratio
            case FMNodeType.FIXED:
                return node.info.frequency
        }
    }

    const [value, setValue] = useState(getNodeValue(props.node))

    const renderNodeInfo = (node: FMNode) => {
        return getNodeValue(node)
    }

    const { node } = props

    return (
        <div>
            {node.info.type}
            {renderNodeInfo(node)}
            <Slider
                value={value}
                onChange={(e, v) => {
                    v = v as number
                    switch(node.info.type) {
                        case FMNodeType.RATIO:
                            node.setRatio(v)
                            setValue(v)
                            break
                        case FMNodeType.FIXED:
                            node.setFixedFrequency(v)
                            setValue(v)
                            break
                    }
                }}
            />
        </div>
    )
}

export default FMNodeView