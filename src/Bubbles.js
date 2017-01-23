import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import { fillColor } from './utils'

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props)
    const { forceStrength, width, height } = props
    const center = { x: width / 2, y: height / 2 }
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop()
  }

  state = {
    g: null,
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps, nextProps.data !== this.props.data)
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data)
    }
  }

  onRef = (ref) => {
    this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data))
  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius ** 2.0)
  }

  renderBubbles(data) {
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => fillColor(d.group))
      .attr('stroke', d => d3.rgb(fillColor(d.group)).darker())
      .attr('stroke-width', 2)
    bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
      this.simulation.nodes(data)
      .alpha(1)
      .restart()
    })
  }

  render() {
    const { width, height } = this.props
    return (
      <g ref={this.onRef} className="bubbles" width={width} height={height} />
    )
  }

  // shouldComponentUpdate() {
  //   return false
  // }
}

Bubbles.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  forceStrength: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
}
