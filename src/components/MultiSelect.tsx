
// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {AbstractItemList} from 'searchkit';

type Props = {
  placeholder: any;
  clearable: boolean;
  items: any;
  selectedItems: any;
  disabled: any;
  showCount: any;
  setItems: any;
};

export class MultiSelect extends AbstractItemList<Props> {

  constructor(props: Props): void {
    super(props);
    (this as any).handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOptions: {
    [key: string]: any;
  }[] = []): void {
    this.props.setItems(selectedOptions.map(el => el.value));
  }

  renderValue(value: {
    [key: string]: any;
  }): string {
    return value.label.replace('undefined', '0');
  }

  render() {
    const {
      placeholder,
      clearable = true,
      items,
      selectedItems = [],
      disabled,
      showCount
    } = this.props;

    let options: {
      [key: string]: any;
    }[] = items.map((option: {
      [key: string]: any;
    }): {
      [key: string]: any;
    } => {
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
