
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

import React from "react";
import { Link } from "react-router";
import { connect, Dispatch } from "react-redux";
import Panel from "./Panel";
import Translate from "react-translate-component";
import { FaAngleLeft, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { State } from "../types";
import _ from "lodash";
import moment from "moment";
import { AnyAction, bindActionCreators } from "redux";
import { toggleMetadataPanels, ToggleMetadataPanelsAction } from "../actions/search";
import { CMMStudy, DataCollectionFreeText } from "../utilities/metadata";

interface Props {
  index: number;
  item: CMMStudy;
  expandMetadataPanels: boolean;
  toggleMetadataPanels: () => ToggleMetadataPanelsAction;
};

export class Detail extends React.Component<Props> {

  componentWillUnmount(): void {
    if (this.props.expandMetadataPanels) {
      this.props.toggleMetadataPanels();
    }
  }

  generateElements<T, R>(
    field: T[],
    element: 'p' | 'tag',
    callback?: (args: T) => R
  ) {
    const elements: JSX.Element[] = [];

    for (let i: number = 0; i < field.length; i++) {
      if (field[i]) {
        const value = callback?.(field[i]) ?? field[i];
        if (element === 'tag') {
          elements.push(
            <span className="tag" key={i}>
              {value}
            </span>
          );
        } else {
          elements.push(<div key={i}>{value}</div>);
        }
      }
    }

    if (elements.length === 0) {
      elements.push(<Translate key="0" content="language.notAvailable.field" />);
    }

    return elements;
  }

  formatDate(
    format: string,
    date1?: string,
    date2?: string,
    dateFallback?: DataCollectionFreeText[]
  ): JSX.Element | JSX.Element[] {
    if (!date1 && !date2 && !dateFallback) {
      return <Translate content="language.notAvailable.field" />;
    }
    if (!date1 && !date2 && dateFallback) {
      if (dateFallback.length === 2 && dateFallback[0].event === 'start' && dateFallback[1].event === 'end') {
        // Handle special case where array items are a start/end date range.
        return this.formatDate(format, dateFallback[0].dataCollectionFreeText, dateFallback[1].dataCollectionFreeText);
      }
      // Generate elements for each date in the array.
      return (
          this.generateElements(
            dateFallback,
            'p',
            date => {
              const value = date.dataCollectionFreeText;
              const momentDate = moment(
                value,
                [moment.ISO_8601, 'YYYY-MM-DD', 'YYYY-MM', 'YYYY'],
                true
              );
              // Format array item as date if possible.
              return momentDate.isValid() ? momentDate.format(format) : value;
            }
          )
      );
    }
    let momentDate1 = moment(date1, [moment.ISO_8601, 'YYYY-MM-DD', 'YYYY-MM', 'YYYY'], true);
    if (!date2) {
      // Format single date.
      return <p>{momentDate1.isValid() ? momentDate1.format(format) : date1}</p>;
    }
    let momentDate2 = moment(date2, [moment.ISO_8601, 'YYYY-MM-DD', 'YYYY-MM', 'YYYY'], true);
    // Format two dates as range.
    return (
      <p>
        {momentDate1.isValid() ? momentDate1.format(format) : date1} - {momentDate2.isValid() ? momentDate2.format(format) : date2}
      </p>
    );
  }

  render() {
    const { item } = this.props;

    if (item === undefined) {
      return null;
    }

    return (
      <article className="w-100">
      <div className="summary-header">
Summary information
      </div>
        <Translate
          className="data-label mt-5"
          component="h1"
          content="metadata.studyTitle"
        />

        <p>
          {item.titleStudy || <Translate content="language.notAvailable.field" />}
        </p>

        <section>
          <Translate
            className="data-label"
            component="h2"
            content="metadata.creator"
          />
          {this.generateElements(item.creators, 'p')}
        </section>

        <section>
          <Translate
            className="data-label"
            component="h2"
            content="metadata.studyPersistentIdentifier"
          />
          {this.generateElements(item.pidStudies, 'p', pidStudy => {
            let pidString = pidStudy.pid;

            // The agency field is an optional attribute, only append if present
            if (pidStudy.agency) {
              pidString = `${pidString} (${pidStudy.agency})`;
            }

            return <p>{pidString}</p>;
          })}
        </section>

        <section>
          <Translate
            className="data-label"
            component="h2"
            content="metadata.abstract"
          />
          <div className="data-abstract" dangerouslySetInnerHTML={{ __html: item.abstract }}/>
        </section>

        <Panel
          className="section-header"
          title={<Translate component="h2" content="metadata.methodology.label"/>}
          tooltip={<Translate content="metadata.methodology.tooltip" unsafe/>}
          collapsable={false}
          defaultCollapsed={false}
        >
          <Translate
            className="data-label"
            component="h3"
            content="metadata.dataCollectionPeriod"
          />
          {this.formatDate(
            'DD/MM/Y',
            item.dataCollectionPeriodStartdate,
            item.dataCollectionPeriodEnddate,
            item.dataCollectionFreeTexts
          )}

          <Translate
            className="data-label"
            component="h3"
            content="metadata.country"
          />
          {this.generateElements(item.studyAreaCountries, 'p', country => country.country)}

          <Translate
            className="data-label"
            component="h3"
            content="metadata.timeDimension"
          />
          {this.generateElements(item.typeOfTimeMethods, 'p', time => time.term)}

          <Translate
            className="data-label"
            component="h3"
            content="metadata.analysisUnit"
          />
          {this.generateElements(item.unitTypes, 'p', unit => unit.term)}

          <Translate
            className="data-label"
            component="h3"
            content="metadata.samplingProcedure"
          />
          {this.generateElements(item.samplingProcedureFreeTexts, 'p', text => 
            <div className="data-abstract" dangerouslySetInnerHTML={{__html: text}}/>
          )}

          <Translate
            className="data-label"
            component="h3"
            content="metadata.dataCollectionMethod"
          />
          {this.generateElements(item.typeOfModeOfCollections, 'p', method => method.term)}

          {/* <Translate
            className="data-label"
            component="h3"
            content="metadata.languageOfDataFiles"
          />
          <div className="tags mt-10">
            {this.generateElements(item.fileLanguages, 'tag', term => _.upperCase(term))}
          </div> */}
        </Panel>

        <Panel
          className="section-header"
          title={<Translate component="h2" content='metadata.access'/>}
          collapsable={false}
        >
          <Translate
            className="data-label"
            component="h3"
            content="metadata.publisher"
          />
          <p>
            {item.publisher ? item.publisher.publisher : <Translate content="language.notAvailable.field" />}
          </p>

          <Translate
            className="data-label"
            component="h3"
            content="metadata.yearOfPublication"
          />
          {this.formatDate('YYYY', item.publicationYear)}

          <Translate
            className="data-label"
            component="h3"
            content="metadata.termsOfDataAccess"
          />
          {this.generateElements(item.dataAccessFreeTexts, 'p', text => { 
            return <div className="data-abstract" dangerouslySetInnerHTML={{__html: text}}/>
          })}
        </Panel>

        <Panel
          className="section-header"
          title={<Translate component="h2" content='metadata.topics.label'/>}
          tooltip={<Translate content="metadata.topics.tooltip" unsafe/>}
          collapsable={false}
        >
          <div className="tags">
            {this.generateElements(
              item.classifications,
              'tag',
              classifications => <Link to={"/?classifications.term[0]=" + encodeURI(classifications.term)}>{_.upperFirst(classifications.term)}</Link>
            )}
          </div>
        </Panel>

        <Panel
          className="section-header"
          title={<Translate component="h2" content='metadata.keywords.label'/>}
          tooltip={<Translate content="metadata.keywords.tooltip" unsafe/>}
          collapsable={false}
        >
          <div className="tags">
            {this.generateElements(item.keywords, 'tag', keywords => 
              <Link to={`/?q="${encodeURI(keywords.term)}"`}>{_.upperFirst(keywords.term)}</Link>
            )}
          </div>
        </Panel>
      </article>
    );
  }
}

export const mapStateToProps = (state: State, props: Props) => {
  return {
    item: state.search.displayed[props.index],
    expandMetadataPanels: state.search.expandMetadataPanels
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    toggleMetadataPanels: bindActionCreators(toggleMetadataPanels, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
