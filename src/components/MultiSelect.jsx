import React from 'react';
import Select from 'react-select';

export class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOptions = []) {
    this.props.setItems(selectedOptions.map(el => el.value));
  }

  renderValue(v) {
    return v.label.replace('undefined', '0');
  }

  render() {
    const {
      placeholder,
      clearable = true,
      items,
      selectedItems = [],
      disabled,
      showCount,
      setItems
    } = this.props;

    const options = items.map((option) => {
      let label = option.title || option.label || option.key;
      if (showCount) {
        label += ` (${option.doc_count}) `;
      }
      return {value: option.key, label};
    });

    return (
      <Select multi
              disabled={disabled}
              value={selectedItems}
              placeholder={placeholder}
              options={options}
              valueRenderer={this.renderValue}
              clearable={clearable}
              onChange={this.handleChange}/>
    );
  }
}
