import React from 'react';
import * as _ from 'lodash';
import * as utilityComponents from '../utilities/componentUtility';
import {PieFilterList} from 'searchkit-daterangefilter';

let elastic = esURL;
let myLang = 'all';

export class Result extends React.Component {
  render() {
    const {hits} = this.props;

    const {bemBlocks, result} = this.props;
    let url = '';
    if (result._source.dc.identifier && result._source.dc.identifier.nn !== undefined) {
      url = utilityComponents.makeSourceURL(result._source.dc.identifier.nn, result._source.intId);
    }

    let ur2 = elastic + '/dc/_all/' + result._source.esid;

    let urddi = elastic.split('/dc/').join('/ddi-dara/') + '_all/' +
                result._id.split('/').join('%2F');

    let title = undefined;

    title = utilityComponents.langHandler(result._source.dc.title, 'en');
    if (title === undefined || title.length == 0) {
      title = utilityComponents.langHandler(result._source.dc.title, myLang);
    }

    let dates = utilityComponents.langHandler(result._source.dc.date, myLang);
    if (dates) {
      dates = utilityComponents.makeDates(dates, bemBlocks.item().mix(bemBlocks.container('meta')));
    }

    let creators = utilityComponents.langHandler(result._source.dc.creator, myLang);
    if (creators) {
      creators =
        utilityComponents.makeCreators(creators, bemBlocks.item().mix(bemBlocks.container('meta')));
    }

    let contributors = utilityComponents.langHandler(result._source.dc.contributor, myLang);
    if (contributors) {
      contributors = utilityComponents.makeContributors(contributors, bemBlocks.item().mix(
        bemBlocks.container('meta')));
    }

    let description = undefined;

    description = utilityComponents.langHandler(result._source.dc.description, 'en');
    if (description === undefined) {
      description = utilityComponents.langHandler(result._source.dc.description, myLang);
    }

    if (description && result._source.dc.identifier &&
        result._source.dc.identifier.nn !== undefined) {
      if (result._source.setSpec[0].trim() == 20) {
        description = utilityComponents.makeDescription(description, bemBlocks.item().mix(
          bemBlocks.container('desc')), result._source.dc.identifier.nn[0].trim(), result._id);
      } else {
        description = utilityComponents.makeDescription(description, bemBlocks.item().mix(
          bemBlocks.container('desc')), url, result._id);
      }
    } else {
      if (result._source.setSpec[0].trim() == 20) {
        if (result._source.dc.identifier && result._source.dc.identifier.nn !== undefined &&
            result._source.dc.identifier.nn[0] !== '') {
          description =
            utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')),
              result._source.dc.identifier.nn[0].trim(), result._id,
              result._source.intId);
        } else {
          description =
            utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')),
              result._source.dc.identifier.nn[0].trim(), undefined,
              result._source.intId);
        }
      }
      else {
        if (result._source.dc.identifier && result._source.dc.identifier.nn !== undefined &&
            result._source.dc.identifier.nn[0] !== '') {
          description =
            utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')), url,
              result._id, result._source.intId);
        } else {
          description =
            utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')), url,
              undefined, result._source.intId);
        }
      }
    }

    let addressTitle = 'detail?q="' + result._id.trim() + '"&detail=true&sort=identifier_desc"';

    const source = _.extend({}, result._source, result.highlight);
    if (title === undefined) {title = ['no title'];}
    return (
      <div className="list_hit" data-qa="hit">
        <h4 className={bemBlocks.item().mix(bemBlocks.container('hith4'))}>
          <a href={addressTitle}><span dangerouslySetInnerHTML={{__html: title[0]}}/></a>
          <a href={ur2} className={bemBlocks.item().mix(bemBlocks.container('marginals json'))}
             target="_blank">&nbsp;[JSON]</a>
        </h4>
        {creators}
        {description}
      </div>
    );
  }
}
