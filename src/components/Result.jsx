// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {
  FaAngleDown, FaAngleUp, FaExternalLink, FaLanguage, FaLock, FaUnlock
} from 'react-icons/lib/fa/index';
import Translate from 'react-translate-component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLongDescription} from '../actions/search';
import {Link} from 'react-router';
import type {Dispatch, State} from '../types';
import {OutboundLink} from 'react-ga';
import {changeLanguage} from '../actions/language';
import {push} from 'react-router-redux';

type Props = {
  bemBlocks: any,
  index: any,
  item: any,
  push: any,
  changeLanguage: any,
  toggleLongDescription: any
};

class Result extends Component<Props> {
  render(): Node {
    const {bemBlocks, index, item, push, changeLanguage, toggleLongDescription} = this.props;

    if (item === undefined) {
      return null;
    }

    let languages = [];
    if (item) {
      for (let i: number = 0; i < item.languages.length; i++) {
        languages.push(<a key={i} className="button is-small is-white" onClick={() => {
          changeLanguage(item.languages[i]);
          push({
            pathname: 'detail',
            search: '?q="' + item.id + '"'
          });
        }}>{item.languages[i]}</a>);
      }
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
          <span className="level-left is-hidden-touch">
            <div className="field is-grouped">
              <div className="control">
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
              </div>
            </div>
          </span>
          <span className="level-right">
            <div className="field is-grouped is-grouped-multiline">
              {languages.length > 0 &&
               <div className="control">
                 <div className="buttons has-addons">
                  <span className="button is-small is-white bg-w pe-none">
                    <span className="icon is-small">
                      <FaLanguage/>
                    </span>
                    <span>Language:</span>
                  </span>
                   {languages}
                 </div>
               </div>
              }
              <div className="control">
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
              </div>
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
    push: bindActionCreators(push, dispatch),
    changeLanguage: bindActionCreators(changeLanguage, dispatch),
    toggleLongDescription: bindActionCreators(toggleLongDescription, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
