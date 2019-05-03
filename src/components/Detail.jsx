// @flow

import type {Node} from 'react';
import React from 'react';
import {HitItem} from 'searchkit';
import {connect} from 'react-redux';
import Panel from './Panel';
import Translate, * as counterpart from 'react-translate-component';
import type { Dispatch, State } from '../types';
import * as _ from 'lodash';
import moment from 'moment';
import { bindActionCreators } from "redux";
import { toggleMetadataPanels } from '../actions/search';

type Props = {
  bemBlocks: Object,
  index: number,
  item: Object,
  expandMetadataPanels: boolean,
  toggleMetadataPanels: () => void
};

class Detail extends HitItem<Props> {
  componentWillUnmount(): void {
    if (this.props.expandMetadataPanels) {
      this.props.toggleMetadataPanels();
    }
  }

  generateElements(field: any[], property?: ?string, element: 'p' | 'tag',
                   callback?: Function): Node[] {
    let elements: Node[] = [];

    for (let i: number = 0; i < field.length; i++) {
      let value: string = property ?
                          (callback ? callback(field[i][property]) : field[i][property]) :
                          (callback ? callback(field[i]) : field[i]);
      if (value.length > 0) {
        if (element === 'tag') {
          elements.push(<span className="tag" key={i}>{value}</span>);
        } else {
          elements.push(<p key={i}>{value}</p>);
        }
      }
    }

    if (field.length === 0 || elements.length === 0) {
      elements.push(<Translate key="0" content="language.notAvailable.field"/>);
    }

    return elements;
  }

  formatDate(format: string, date1: string, date2?: string, dateFallback?: any[],
             dateFallbackProperty?: ?string): Node {
    if (!date1 && !date2 && !dateFallback) {
      return <Translate content="language.notAvailable.field"/>;
    }
    if (!date1 && !date2) {
      if (_.isArray(dateFallback)) {
        return this.generateElements((dateFallback: any), dateFallbackProperty, 'p');
      } else {
        return <p>{dateFallback}</p>;
      }
    }
    let momentDate1 = moment(date1);
    if (!date2) {
      return <p>{momentDate1.isValid() ? momentDate1.format(format) : date1}</p>;
    }
    let momentDate2 = moment(date2);
    return <p>{momentDate1.isValid() ? momentDate1.format(format) :
               date1} - {momentDate2.isValid() ? momentDate2.format(format) : date2}</p>;
  }

  render(): Node {
    const {item} = this.props;

    if (item === undefined) {
      return null;
    }

    let pidStudies: Node[] = [];
    for (let i: number = 0; i < item.pidStudies.length; i++) {
      pidStudies.push(<p key={i}>{item.pidStudies[i].pid} ({item.pidStudies[i].agency})</p>);
    }
    if (pidStudies.length === 0) {
      pidStudies.push(<Translate key="0" content="language.notAvailable.field"/>);
    }

    return (
      <div className="w-100">
        <Translate className="data-label mt-5"
                   component="strong"
                   content="metadata.studyTitle"/>
        <p>{item.titleStudy || <Translate content="language.notAvailable.field"/>}</p>

        <Translate className="data-label"
                   component="strong"
                   content="metadata.creator"/>
        {this.generateElements(item.creators, null, 'p')}

        <Translate className="data-label"
                   component="strong"
                   content="metadata.studyPersistentIdentifier"/>
        {pidStudies}

        <Translate className="data-label" component="strong" content="metadata.abstract"/>
        {item.abstract.split('\n').map(function (item, key) {
          return (
            <div key={key}>{item}<br/></div>
          );
        })}

        <Panel className="section-header"
               title={counterpart.translate('metadata.methodology')}
               collapsable={false}
               defaultCollapsed={false}>

          <Translate className="data-label"
                     component="strong"
                     content="metadata.dataCollectionPeriod"/>
          {this.formatDate('Do MMMM YYYY', item.dataCollectionPeriodStartdate,
            item.dataCollectionPeriodEnddate, item.dataCollectionFreeTexts,
            'dataCollectionFreeText')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.country"/>
          {this.generateElements(item.studyAreaCountries, 'country', 'p')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.timeDimension"/>
          {this.generateElements(item.typeOfTimeMethods, 'term', 'p')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.analysisUnit"/>
          {this.generateElements(item.unitTypes, 'term', 'p')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.samplingProcedure"/>
          {this.generateElements(item.samplingProcedureFreeTexts, null, 'p')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.dataCollectionMethod"/>
          {this.generateElements(item.typeOfModeOfCollections, 'term', 'p')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.languageOfDataFiles"/>
          <div className="tags mt-10">
            {this.generateElements(item.fileLanguages, null, 'tag', (term) => {
              return _.upperCase(term);
            })}
          </div>

        </Panel>

        <Panel className="section-header"
               title={counterpart.translate('metadata.access')}
               collapsable={true}
               defaultCollapsed={true}
               linkCollapsedState={true}>

          <Translate className="data-label"
                     component="strong"
                     content="metadata.publisher"/>
          <p>{item.publisher || <Translate content="language.notAvailable.field"/>}</p>

          <Translate className="data-label"
                     component="strong"
                     content="metadata.yearOfPublication"/>
          {this.formatDate('YYYY', item.publicationYear)}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.termsOfDataAccess"/>
          {this.generateElements(item.dataAccessFreeTexts, null, 'p')}

          <Translate className="data-label"
                     component="strong"
                     content="metadata.studyNumber"/>
          <p>{item.studyNumber || <Translate content="language.notAvailable.field"/>}</p>

        </Panel>

        <Panel className="section-header"
               title={counterpart.translate('metadata.topics')}
               collapsable={true}
               defaultCollapsed={true}
               linkCollapsedState={true}>

          <strong className="data-label"/>
          <div className="tags">
            {this.generateElements(item.classifications, 'term', 'tag', (term) => {
              return _.startCase(term);
            })}
          </div>

        </Panel>

        <Panel className="section-header"
               title={counterpart.translate('metadata.keywords')}
               collapsable={true}
               defaultCollapsed={true}
               linkCollapsedState={true}>

          <strong className="data-label"/>
          <div className="tags">
            {this.generateElements(item.keywords, 'term', 'tag', (term) => {
              return _.startCase(term);
            })}
          </div>

        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state: State, props: Props): Object => {
  return {
    item: state.search.displayed[props.index],
    expandMetadataPanels: state.search.expandMetadataPanels
  };
};

const mapDispatchToProps = (dispatch: Dispatch): Object => {
  return {
    toggleMetadataPanels: bindActionCreators(toggleMetadataPanels, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
