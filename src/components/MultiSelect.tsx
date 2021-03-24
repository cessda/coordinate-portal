
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
import Select, { HandlerRendererResult } from 'react-select';
import {AbstractItemList, ItemListProps} from 'searchkit';

interface Props extends ItemListProps {
  placeholder?: string | JSX.Element | undefined;
  clearable?: boolean;
};

export default class MultiSelect extends AbstractItemList {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOptions: any): void {
    this.props.setItems(selectedOptions?.map((el: { value: any; }) => el.value));
  }

  renderValue(value: {
    [key: string]: any;
  }): HandlerRendererResult {
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
