import React from 'react'
import './App.css'

import FMSound from '../../code/FMSound'

const untriggers: any = {}

document.addEventListener('keydown', (e) => {
  console.log(e)
  const p = [-12, -7, -5, 0, 5, 7, 12]['zxcvbnm'.indexOf(e.key)]
  const freq = 440 * Math.pow(2, p/12)
  if (p !== undefined) {
    if (untriggers[e.key]) return
    const sound = new FMSound()
      .withNodeAtIndex(3, node => node.setFixedFrequency(100).setGain(1000))
      .withNodeAtIndex(4, node => node.setRatio(3).setGain(300))
      .setFreq(freq)
    untriggers[e.key] = sound.trigger()
  }
})

document.addEventListener('keyup', (e) => {
  untriggers[e.key] && untriggers[e.key]()
  delete untriggers[e.key]
})

const App: React.FunctionComponent = () => {
  // setTimeout(untrigger => untrigger(), 1000, new Sound(440).toMaster().trigger())
  return (
    <div>App</div>
  )
}

export default App