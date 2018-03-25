// @flow

import type {Node} from 'react';
import React from 'react';
import {HitItem} from 'searchkit';
import {connect} from 'react-redux';
import Panel from './Panel';
import * as _ from 'lodash';
import type {State} from '../types';
import {OutboundLink} from 'react-ga';
import * as counterpart from 'react-translate-component';

type Props = {
  bemBlocks: Object,
  index: number,
  item: Object
};

class Detail extends HitItem<Props> {
  render(): Node {
    const {bemBlocks, item} = this.props;

    if (item === undefined) {
      return null;
    }

    let creators: Node[] = [];
    for (let i: number = 0; i < item.creators.length; i++) {
      creators.push(<div key={i}>
        {item.creators[i]}{i < item.creators.length - 1 ? '; ' : ''}
        </div>);
    }
    if (creators.length === 0) {
      creators.push(<div key="0">Not available</div>);
    }

    let pidStudies: Node[] = [];
    for (let i: number = 0; i < item.pidStudies.length; i++) {
      pidStudies.push(<div key={i}>
        {item.pidStudies[i].pid} ({item.pidStudies[i].agency})
        </div>);
    }
    if (pidStudies.length === 0) {
      pidStudies.push(<div key="0">Not available</div>);
    }

    let studyAreaCountries: Node[] = [];
    if (item.studyAreaCountries) {
      for (let i: number = 0; i < item.studyAreaCountries.length; i++) {
        studyAreaCountries.push(<span key={i}>{item.studyAreaCountries[i].country}</span>);
      }
    }
    if (!item.studyAreaCountries || studyAreaCountries.length === 0) {
      studyAreaCountries.push(<span key="0">Not available</span>);
    }

    let subjects = [];
    // for (let i: number = 0; i < item.subject.length; i++) {
    //   subjects.push(<span key={i}>{_.startCase(item.subject[i])}</span>);
    // }
    if (subjects.length === 0) {
      subjects.push(<span key="0">Not available</span>);
    }

    return (
      <div className="w-100">
        <strong className="data-label mt-5">Title</strong>
        <p>{item.titleStudy || 'Not available'}</p>

        <strong className="data-label">Creator(s)</strong>
        <p>{creators}</p>

        <strong className="data-label">Study persistent identifier(s)</strong>
        <p>{pidStudies}</p>

        <strong className="data-label">Abstract</strong>
        {item.abstract.split('\n').map(function(item, key) {
          return (
            <span key={key}>{item}<br/></span>
          )
        })}

        <Panel className="section-header"
               title={counterpart.translate('metadata.methodology')}
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label">Country</strong>
          <p>{studyAreaCountries}</p>

          <strong className="data-label">Time dimension</strong>
          <p>{item.timeDimension || 'Not available'}</p>

          <strong className="data-label">Analysis unit</strong>
          <p>{item.analysisUnit || 'Not available'}</p>

          <strong className="data-label">Data source type</strong>
          <p>{item.dataSourceType || 'Not available'}</p>

          <strong className="data-label">Sampling procedure</strong>
          <p>{item.samplingProcedures || 'Not available'}</p>
          <p>{item.samplingDescription || 'Not available'}</p>

          <strong className="data-label">Data collection method</strong>
          <p>{item.dataCollectionMethod || 'Not available'}</p>

          <strong className="data-label">Collection years</strong>
          <p>{item.collectionYears || 'Not available'}</p>

          <strong className="data-label">Language of data file(s)</strong>
          <p>{item.languageOfDataFiles || 'Not available'}</p>

        </Panel>

        <Panel className="section-header"
               title={counterpart.translate('metadata.access')}
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label">Publisher</strong>
          <p>{item.publisher || 'Not available'}</p>

          <strong className="data-label">Year of publication</strong>
          <p>{item.date || 'Not available'}</p>

          <strong className="data-label">Terms of data access</strong>
          <p>{item.rights || 'Not available'}</p>

          <strong className="data-label">Archival study number</strong>
          <p>{item.identifier || 'Not available'}</p>

        </Panel>

        <Panel className="section-header"
               title={counterpart.translate('metadata.topics')}
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label"/>
          <p className="topics">{subjects}</p>

        </Panel>

        <Panel className="section-header"
               title={counterpart.translate('metadata.keywords')}
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label"/>
          <p className="keywords">{subjects}</p>

        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state: State, props: Props): Object => {
  return {
    item: state.search.displayed[props.index]
  };
};

export default connect(mapStateToProps)(Detail);
