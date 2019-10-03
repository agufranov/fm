import React, { useState } from 'react'
import './style.css'
import FMNode from '../../code/FMNode'
import Slider from '@material-ui/core/Slider'
import { FMNodeType, IFMNodeData, IFMNodeInfo } from '../../code/interfaces'

interface IProps {
    data: IFMNodeData
    onChange: (data: IFMNodeData, on: boolean) => void
}

interface IState {
    value: number
}

const FMNodeView: React.FunctionComponent<IProps> = (props) => {
    const { data } = props
    let value: number
    switch (data.type) {
        case FMNodeType.RATIO:
            value = data.ratio
            break
        case FMNodeType.FIXED:
            value = data.frequency
            break
        default:
            throw new Error
    }

    const toggleType = () => {
        let newData: IFMNodeData
        switch(data.type) {
            case FMNodeType.RATIO:
                newData = {
                    ...data,
                    type: FMNodeType.FIXED,
                    frequency: data.ratio
                }
                break
            case FMNodeType.FIXED:
                newData = {
                    ...data,
                    type: FMNodeType.RATIO,
                    ratio: data.frequency
                }
                break
            default:
                throw new Error
        }
        props.onChange(newData, true)
    }

    return (
        <div className='FMNodeView'>
            <button onClick={toggleType}>
                {data.type === FMNodeType.RATIO ? 'RATIO' : 'FIXED'}
            </button>
            <div>
                {value}
            </div>
            <Slider
                value={value}
                onChange={(e, v) => {
                    v = v as number
                    if (v === value) return
                    switch (data.type) {
                        case FMNodeType.RATIO:
                            props.onChange({
                                ...data,
                                ratio: v
                            }, true)
                            break
                        case FMNodeType.FIXED:
                            props.onChange({
                                ...data,
                                frequency: v
                            }, true)
                            break
                    }
                }}
            />
            <div>
                {data.gain}
            </div>
            <Slider
                value={data.gain}
                min={0}
                max={1}
                step={0.1}
                onChange={(e, v) => {
                    console.log(v)
                    v = v as number
                    props.onChange({
                        ...data,
                        gain: v
                    }, true)
                }}
            />
        </div>
    )
}

export default FMNodeView