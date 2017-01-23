import React from 'react'
import { csv } from 'd3-request'
import BubbleChart from './BubbleChart'
import Bubbles from './Bubbles'
import './App.css'
import { createNodes } from './utils'

const width = 960
const height = 640

export default class App extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    csv('data/gates_money.csv', (err, data) => {
      if (err) {
        console.log(err)
        return
      }
      this.setState({
        data: createNodes(data),
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        <BubbleChart width={width} height={height}>
          <Bubbles data={data} width={width} height={height} forceStrength={0.03} />
        </BubbleChart>
      </div>
    )
  }

}
