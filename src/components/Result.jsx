// @flow

import type {Node} from 'react';
import React, {Component} from 'react';
import {
  FaAngleDown, FaAngleUp, FaExternalLink, FaLanguage, FaLock, FaUnlock
} from 'react-icons/lib/fa/index';
import Translate from 'react-translate-component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleLongAbstract} from '../actions/search';
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
  toggleLongAbstract: any
};

class Result extends Component<Props> {
  render(): Node {
    const {bemBlocks, index, item, push, changeLanguage, toggleLongAbstract} = this.props;

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
    for (let i: number = 0; i < item.creators.length; i++) {
      creators.push(<span key={i}>
        {item.creators[i]}{i < item.creators.length - 1 ? '; ' : ''}
        </span>);
      if (i === 2 && item.creators.length > 3) {
        creators.push(<span key={3}>({item.creators.length - 3} more)</span>);
        break;
      }
    }

    return (
      <div className="list_hit" data-qa="hit">
        <h4 className={bemBlocks.item().mix(bemBlocks.container('hith4'))}>
          <Link to={{
            pathname: 'detail',
            search: '?q="' + item.id + '"'
          }}>{item.titleStudy}</Link>
        </h4>
        <div className={bemBlocks.item().mix(bemBlocks.container('meta'))}>
          {creators}
        </div>
        <div className={bemBlocks.item().mix(bemBlocks.container('desc'))}>
          {item.abstractExpanded &&
           item.abstract.split('\n').map(function(item, key) {
             return (
               <span key={key}>{item}<br/></span>
             )
           })
          }
          {!item.abstractExpanded && item.abstractShort}
        </div>
        <span className="level mt-10 result-actions">
          <span className="level-left is-hidden-touch">
            <div className="field is-grouped">
              <div className="control">
                {item.abstract.length > 500 &&
                 <a className={bemBlocks.item().mix('button is-small is-white')} onClick={() => {
                   toggleLongAbstract(item.titleStudy, index);
                 }}>
                   {item.abstractExpanded &&
                    <span>
                      <span className="icon is-small"><FaAngleUp/></span>
                      <Translate component="span" content="readLess"/>
                    </span>
                   }
                   {!item.abstractExpanded &&
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
                    <span><Translate content="language.label"/>:</span>
                  </span>
                   {languages}
                 </div>
               </div>
              }
              <div className="control">
                {item.studyUrl &&
                 <OutboundLink className="button is-small is-white"
                               eventLabel="Go to study"
                               to={item.studyUrl}
                               target="_blank">
                   <span className="icon is-small"><FaExternalLink/></span>
                   <Translate component="span" content="goToStudy"/>
                 </OutboundLink>
                }
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
    toggleLongAbstract: bindActionCreators(toggleLongAbstract, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
