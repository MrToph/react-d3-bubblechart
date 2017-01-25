import React, { PropTypes } from 'react'
import './GroupingPicker.css'

export default class GroupingPicker extends React.Component {
  onBtnClick = (event) => {
    this.props.onChanged(event.target.name)
  }
  render() {
    const { active } = this.props
    return (
      <div className="GroupingPicker">
        <button className={`button ${active === 'all' && 'active'}`} name="all" onClick={this.onBtnClick}>All Grants</button>
        <button className={`button ${active === 'year' && 'active'}`} name="year" onClick={this.onBtnClick}>Grants By Year</button>
      </div>
    )
  }
}

GroupingPicker.propTypes = {
  onChanged: PropTypes.func.isRequired,
  active: PropTypes.oneOf(['all', 'year']).isRequired,
}
