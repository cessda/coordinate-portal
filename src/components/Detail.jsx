// @flow

import type {Node} from 'react';
import React from 'react';
import {HitItem} from 'searchkit';
import {connect} from 'react-redux';
import Panel from './Panel';
import * as _ from 'lodash';
import type {State} from '../types';
import {OutboundLink} from 'react-ga';

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

    let creators = [];
    for (let i: number = 0; i < item.creator.length; i++) {
      creators.push(<span key={i}>
        {item.creator[i]}{i < item.creator.length - 1 ? '; ' : ''}
        </span>);
    }
    if (creators.length === 0) {
      creators.push(<span key="0">Not available</span>);
    }

    let description = [];
    if (item.description) {
      for (let i: number = 0; i < item.description.length; i++) {
        description.push(<p key={i} className="has-text-justified mb-10">{item.description[i]}</p>);
      }
    }
    if (description.length === 0) {
      description.push(<p key="0" className="has-text-justified">Not available</p>);
    }

    let subjects = [];
    for (let i: number = 0; i < item.subject.length; i++) {
      subjects.push(<span key={i}>{_.startCase(item.subject[i])}</span>);
    }
    if (subjects.length === 0) {
      subjects.push(<span key="0">Not available</span>);
    }

    return (
      <div className="w-100">
        <strong className="data-label mt-5">Title</strong>
        <p>{item.title || 'Not available'}</p>

        <strong className="data-label">Creator(s)</strong>
        <p>{creators}</p>

        <strong className="data-label">Study persistent identifier</strong>
        <OutboundLink eventLabel="Go to Collection/Study"
                      to={item.sourceUrl}
                      target="_blank">
          {item.identifier}
        </OutboundLink>

        <strong className="data-label">Abstract</strong>
        {description}

        <Panel className="section-header"
               title="Methodology"
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label">Country</strong>
          <p>{item.coverage || 'Not available'}</p>

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
               title="Access"
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label">Publisher</strong>
          <p>{item.publisher || 'Not available'}</p>

          <strong className="data-label">Year of publication</strong>
          <p>{item.date || 'Not available'}</p>

          <strong className="data-label">Availability</strong>
          <p>{item.rights || 'Not available'}</p>

          <strong className="data-label">Terms of data access</strong>
          <p>{item.rights || 'Not available'}</p>

          <strong className="data-label">Archival study number</strong>
          <p>{item.identifier || 'Not available'}</p>

        </Panel>

        <Panel className="section-header"
               title="Topics"
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label"/>
          <p className="topics">{subjects}</p>

        </Panel>

        <Panel className="section-header"
               title="Keywords"
               collapsable={true}
               defaultCollapsed={true}>

          <strong className="data-label"/>
          {/* TODO : Change to separate field when search providers supply it. */}
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
