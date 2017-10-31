import React from 'react';
import {FaLock, FaUnlock} from 'react-icons/lib/fa/index';
import PropTypes from 'prop-types';
import Translate from 'react-translate-component';

export class Rights extends React.Component {
  render() {
    let markup = <span className="tag is-info"><FaUnlock/> Unknown</span>;

    if (this.props.rights !== undefined && this.props.rights[0] !== undefined) {
      if (this.props.rights[0].includes('1b')) {
        // Freely available via ordering or SND Online Analysis.
        markup = <span className="tag is-success"><FaUnlock/> Available via ordering or SND Online Analysis</span>;
      } else if (this.props.rights[0].includes('1c')) {
        // Freely available via ordering.
        markup = <span className="tag is-success"><FaUnlock/> Available via ordering</span>;
      } else if (this.props.rights[0].includes('2b')) {
        // Always requires permission from the principal investigator.
        markup = <span className="tag is-warning"><FaLock/> Requires permission from principal investigator</span>;
      }
    }

    return (
      <div className={this.props.bemBlocks.item()
                          .mix([this.props.bemBlocks.container('rights'), 'tag has-addons'])}>
        <Translate className="tag"
                   component="span"
                   content="filters.availability.label"/>
        {markup}
      </div>
    );
  }
}

Rights.propTypes = {
  bemBlocks: PropTypes.object,
  rights: PropTypes.arrayOf(PropTypes.string)
};
