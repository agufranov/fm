import React from 'react'
import './App.css'

import FMSound from '../../code/FMSound'

import FMNodeView from '../FMNodeView'

interface IState {
  _sound?: FMSound
}

class App extends React.Component<{}, IState> {
  state: IState = {}

  private _untriggers: any = {}

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      this._untriggers[e.key] && this._untriggers[e.key]()
      delete this._untriggers[e.key]
    })

    document.addEventListener('keydown', (e) => {
      const p = [-12, -7, -5, 0, 5, 7, 12]['zxcvbnm'.indexOf(e.key)]
      const freq = 440 * Math.pow(2, p/12)
      if (p !== undefined) {
        if (this._untriggers[e.key]) return
        this.setState(state => {
          const _sound = new FMSound()
            .withNodeAtIndex(3, node => node.setFixedFrequency(100).setGain(1000))
            .withNodeAtIndex(4, node => node.setRatio(3).setGain(300))
            .setFreq(freq)
          this._untriggers[e.key] = _sound.trigger()
          return {
            _sound
          }
        })
      }
    })
  }

  render() {
    const { _sound } = this.state
    return (
      <div>
        App
        {
          _sound && _sound.nodes.map((node, i) => (
            <FMNodeView
              node={node}
              key={i}
            />
          ))
        }
      </div>
    )
  }
}

export default App