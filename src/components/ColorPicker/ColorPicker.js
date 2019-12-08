import React from 'react';
import './ColorPicker.scss'
import { CustomPicker } from 'react-color';
const { Hue, Alpha, Saturation } = require('react-color/lib/components/common');

class ColorPicker extends React.Component {
  render() {
    return (
      <div className='sliders'>
        <div className='slider-container'>
          <Hue
            {...this.props}
            onChange={this.handleChange} />
        </div>
        <div className='slider-container'>
          <Saturation
            {...this.props}
            onChange={this.handleChange} />
        </div>
        <div className='slider-container'>
          <Alpha
            {...this.props}
            onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorPicker);