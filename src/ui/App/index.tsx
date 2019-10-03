import React from 'react'
import './App.css'

import FMPlayer from '../../code/FMPlayer'
import FMNodeView from '../FMNodeView'
import { IFMNodeData } from '../../code/interfaces'

interface IState {
  data: IFMNodeData[];
}

class App extends React.Component<{}, IState> {
  private _player = new FMPlayer()

  state: IState = {
    data: this._player.nodesData
  }
  
  setData = (data: IFMNodeData, index: number) => {
    this.setState(state => ({
      data: [
        ...state.data.slice(0, index),
        data,
        ...state.data.slice(index + 1)
      ]
    }), () => {
      this._player.applyData(this.state.data)
    })
  }

  private _getKeyFreq = (e: KeyboardEvent) => {
      const p = [-12, -7, -5, 0, 5, 7, 12]['zxcvbnm'.indexOf(e.key)]
      if (p === undefined) return null
      const freq = 440 * Math.pow(2, p / 12)
      return freq
  }

  private _pressed: { [key: string]: boolean } = {}

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      delete this._pressed[e.key]
      const freq = this._getKeyFreq(e)
      freq !== null && this._player.stop(freq)
    })

    document.addEventListener('keydown', (e) => {
      if (this._pressed[e.key]) return
      this._pressed[e.key] = true
      const freq = this._getKeyFreq(e)
      freq !== null && this._player.play(freq)
    })
  }

  render() {
    return (
      <div>
        {[0,1,2,3].map(i => (
          <FMNodeView
            data={this.state.data[i]}
            onChange={(d) => this.setData(d, i)}
          />
        ))}
      </div>
    )
  }
}

export default App