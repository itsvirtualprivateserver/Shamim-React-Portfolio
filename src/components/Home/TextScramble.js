import React from 'react'
import Scramble from 'react-scramble'

class App extends React.Compoent {
  render() {
    return (
      <Scramble
        autoStart
        text="Scramble me!"
        steps={[
          {
            roll: 10,
            action: '+',
            type: 'all',
          },
          {
            action: '-',
            type: 'forward',
          },
        ]}
      />
    )
  }
}

export default Scramble;