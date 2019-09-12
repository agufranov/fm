import React from 'react'
import './App.css'

import FMPlayer from '../../code/FMPlayer'

interface IState {
}

class App extends React.Component<{}, IState> {
  state: IState = {}

  private _player = new FMPlayer()

  private _getKeyFreq = (e: KeyboardEvent) => {
      const p = [-12, -7, -5, 0, 5, 7, 12]['zxcvbnm'.indexOf(e.key)]
      if (p === undefined) return null
      const freq = 440 * Math.pow(2, p / 12)
      return freq
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      const freq = this._getKeyFreq(e)
      freq !== null && this._player.stop(freq)
    })

    document.addEventListener('keydown', (e) => {
      const freq = this._getKeyFreq(e)
      freq !== null && this._player.play(freq)
    })
  }

  render() {
    return (
      <div>
        App
        {
        }
      </div>
    )
  }
}

export default App