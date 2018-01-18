import React from 'react';
import Select from 'react-select';

class DoorsSelect extends React.Component {
  handleChange = (value) => {
    // This is going to call setFieldValue and manually update values.topcis
    this.props.onChange('doors', value);
  };

  handleBlur = () => {
    // This is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('doors', true);
  };

  render() {
    return (
      <div>
        <label htmlFor="doors" className="form-label">
          Doors access
        </label>
        <Select
          id="doors"
          options={this.props.options}
          placeholder="Add doors access"
          closeOnSelect={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          removeSelected
          multi
        />
      </div>
    );
  }
}

export default DoorsSelect;
