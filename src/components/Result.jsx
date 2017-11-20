// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {
  FaAngleDown, FaAngleUp, FaCode, FaExternalLink, FaLock, FaUnlock
} from 'react-icons/lib/fa/index';
import Translate from 'react-translate-component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLongDescription} from '../actions/search';
import {Link} from 'react-router';
import type {Dispatch, State} from '../types';
import {OutboundLink} from 'react-ga';

type Props = {
  bemBlocks: any,
  index: any,
  item: any,
  toggleLongDescription: any
};

class Result extends Component<Props> {
  render(): Node {
    const {bemBlocks, index, item, toggleLongDescription} = this.props;

    if (item === undefined) {
      return null;
    }

    let creators: Node[] = [];
    for (let i: number = 0; i < item.creator.length; i++) {
      creators.push(<span key={i}>
        {item.creator[i]}{i < item.creator.length - 1 ? '; ' : ''}
        </span>);
      if (i === 2) {
        creators.push(<span key={3}>({item.creator.length - 3} more)</span>);
        break;
      }
    }

    let description: Node[] = [],
      length: number = 0;
    if (item.description) {
      for (let i: number = 0; i < item.description.length; i++) {
        description.push(<p key={i}>{item.description[i]}</p>);
        length += item.description[i].length;
      }
    }

    return (
      <div className="list_hit" data-qa="hit">
        <h4 className={bemBlocks.item().mix(bemBlocks.container('hith4'))}>
          <Link to={{
            pathname: 'detail',
            search: '?q="' + item.id + '"'
          }}>{item.title}</Link>
          <div className="tags has-addons ml-a availability">
            <Translate className="tag"
                       component="span"
                       content="filters.availability.label"/>
            {item.restricted &&
             <span className="tag is-danger">
               <FaLock/><span className="ml-5">Restricted</span>
             </span>
            }
            {!item.restricted &&
             <span className="tag is-success">
               <FaUnlock/><span className="ml-5">Open</span>
             </span>
            }
          </div>
        </h4>
        <div className={bemBlocks.item().mix(bemBlocks.container('meta'))}>
          {creators}
        </div>
        <div className={bemBlocks.item().mix(bemBlocks.container('desc'))}>
          {item.descriptionExpanded && description}
          {!item.descriptionExpanded && item.descriptionShort}
        </div>
        <span className="level mt-10 result-actions">
          <span className="level-left">
            <div className="field is-grouped">
              <p className="control">
                {length > 500 &&
                 <a className={bemBlocks.item().mix('button is-small is-white')} onClick={() => {
                   toggleLongDescription(item.title, index);
                 }}>
                   {item.descriptionExpanded &&
                    <span>
                      <span className="icon is-small"><FaAngleUp/></span>
                      <Translate component="span" content="readLess"/>
                    </span>
                   }
                   {!item.descriptionExpanded &&
                    <span>
                      <span className="icon is-small"><FaAngleDown/></span>
                      <Translate component="span" content="readMore"/>
                    </span>
                   }
                 </a>
                }
              </p>
            </div>
          </span>
          <span className="level-right">
            <div className="field is-grouped">
              <p className="control">
                <OutboundLink className="button is-small is-white"
                              eventLabel="View JSON"
                              to={item.jsonUrl}
                              target="_blank">
                  <span className="icon is-small">
                    <FaCode/>
                  </span>
                  <Translate component="span" content="viewJson"/>
                </OutboundLink>
              </p>
              <p className="control">
                <OutboundLink className="button is-small is-white"
                              eventLabel="Go to Collection/Study"
                              to={item.sourceUrl}
                              target="_blank">
                  <span className="icon is-small"><FaExternalLink/></span>
                  {item.sourceIsCollection &&
                   <Translate component="span" content="goToCollection"/>
                  }
                  {!item.sourceIsCollection &&
                   <Translate component="span" content="goToStudy"/>
                  }
                </OutboundLink>
              </p>
            </div>
          </span>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: State, props: Props): Object => {
  return {
    item: state.search.displayed[props.index]
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    toggleLongDescription: bindActionCreators(toggleLongDescription, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
