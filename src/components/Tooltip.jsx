// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FaQuestionCircle} from 'react-icons/lib/fa/index';

type Props = {
  content: any
};

export class Tooltip extends Component<Props> {
  render(): Node {
    const {
      content
    } = this.props;

    return (
      <div className="dropdown is-hoverable is-right">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true">
            <FaQuestionCircle/>
          </button>
        </div>
        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Tooltip);
