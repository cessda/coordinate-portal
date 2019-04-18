// @flow

import type {Node} from 'react';
import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {AbstractItemList} from 'searchkit';

type Props = {
  placeholder: any,
  clearable: boolean,
  items: any,
  selectedItems: any,
  disabled: any,
  showCount: any,
  setItems: any
};

class MultiSelect extends AbstractItemList<Props> {
  constructor(props: Props): void {
    super(props);
    (this: any).handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOptions: Object[] = []): void {
    this.props.setItems(selectedOptions.map(el => el.value));
  }

  renderValue(value: Object): string {
    return value.label.replace('undefined', '0');
  }

  render(): Node {
    const {
      placeholder,
      clearable = true,
      items,
      selectedItems = [],
      disabled,
      showCount,
    } = this.props;

    let options: Object[] = items.map((option: Object): Object => {
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

export default connect()(MultiSelect);
