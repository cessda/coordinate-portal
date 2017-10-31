import React from 'react';
import * as _ from 'lodash';
import {trim} from 'lodash';
import * as utilityComponents from '../utilities/componentUtility';
import * as striptags from 'striptags';
import {FaAngleDown, FaAngleUp} from 'react-icons/lib/fa/index';
import {Rights} from './Rights';
import {truncate} from 'lodash';
import Translate from 'react-translate-component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Result extends React.Component {
  constructor(props) {
    super(props);
    // console.log('props');
    // console.log(props);

    let description = this.getDescription(),
        descriptionShort = truncate(description, {
          length: 500
        });

    this.state = {
      elastic: esURL,
      language: 'all',
      description: descriptionShort,
      descriptionShort:  descriptionShort,
      descriptionLong: description,
      readMoreLabel: (<span><FaAngleDown/><Translate component="span" content="readMore"/></span>),
      readMoreExpanded: false
    };

    this.readMore = this.readMore.bind(this);
  };

  getDescription() {
    let descriptionArray = utilityComponents.langHandler(this.props.result._source.dc.description, 'en');
    if (descriptionArray === undefined) {
      descriptionArray = utilityComponents.langHandler(this.props.result._source.dc.description, 'all');
    }
    if (descriptionArray === undefined) {
      return '';
    }
    let description = '';
    for (let i = 0; i < descriptionArray.length; i++) {
      if (descriptionArray[i].toLowerCase() !== 'abstract') {
        description += ' ' + striptags(descriptionArray[i]);
      }
    }
    return trim(description);
  };

  readMore() {
    if (!this.state.readMoreExpanded) {
      this.setState({
        description: this.state.descriptionLong,
        readMoreLabel: (<span><FaAngleUp/><Translate component="span" content="readLess"/></span>),
        readMoreExpanded: true
      });
    } else {
      this.setState({
        description: this.state.descriptionShort,
        readMoreLabel: (<span><FaAngleDown/><Translate component="span" content="readMore"/></span>),
        readMoreExpanded: false
      });
    }
  };

  render() {
    const {bemBlocks, result} = this.props;
    let url = '';
    if (result._source.dc.identifier && result._source.dc.identifier.nn !== undefined) {
      url = utilityComponents.makeSourceURL(result._source.dc.identifier.nn, result._source.intId);
    }

    let ur2 = this.state.elastic + '/dc/_all/' + result._source.esid;

    let urddi = this.state.elastic.split('/dc/').join('/ddi-dara/') + '_all/' +
                result._id.split('/').join('%2F');

    let title = undefined;

    title = utilityComponents.langHandler(result._source.dc.title, 'en');
    if (title === undefined || title.length == 0) {
      title = utilityComponents.langHandler(result._source.dc.title, this.state.language);
    }

    let dates = utilityComponents.langHandler(result._source.dc.date, this.state.language);
    if (dates) {
      dates = utilityComponents.makeDates(dates, bemBlocks.item().mix(bemBlocks.container('meta')));
    }

    let creators = utilityComponents.langHandler(result._source.dc.creator, this.state.language);
    if (creators) {
      creators =
        utilityComponents.makeCreators(creators, bemBlocks.item().mix(bemBlocks.container('meta')));
    }

    let contributors = utilityComponents.langHandler(result._source.dc.contributor, this.state.language);
    if (contributors) {
      contributors = utilityComponents.makeContributors(contributors, bemBlocks.item().mix(
        bemBlocks.container('meta')));
    }

    /*let description = undefined;

    description = utilityComponents.langHandler(result._source.dc.description, 'en');
    if (description === undefined) {
      description = utilityComponents.langHandler(result._source.dc.description, this.state.language);
    }

    if (description && result._source.dc.identifier &&
        result._source.dc.identifier.nn !== undefined) {
      if (result._source.setSpec[0].trim() == 20) {
        description = utilityComponents.makeDescription(description, bemBlocks.item().mix(
          bemBlocks.container('desc')), result._source.dc.identifier.nn[0].trim(), result._id,
          this);
      } else {
        description = utilityComponents.makeDescription(description, bemBlocks.item().mix(
          bemBlocks.container('desc')), url, result._id, this);
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
    }*/

    let detailLink;
    if (result._source.setSpec[0].trim() == 20) {
      if (result._source.dc.identifier && result._source.dc.identifier.nn !== undefined &&
          result._source.dc.identifier.nn[0] !== '') {
        detailLink =
          utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')),
            result._source.dc.identifier.nn[0].trim(), result._id,
            result._source.intId);
      } else {
        detailLink =
          utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')),
            result._source.dc.identifier.nn[0].trim(), undefined,
            result._source.intId);
      }
    }
    else {
      if (result._source.dc.identifier && result._source.dc.identifier.nn !== undefined &&
          result._source.dc.identifier.nn[0] !== '') {
        detailLink =
          utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')), url,
            result._id, result._source.intId);
      } else {
        detailLink =
          utilityComponents.detailLink(bemBlocks.item().mix(bemBlocks.container('desc')), url,
            undefined, result._source.intId);
      }
    }

    let addressTitle = 'detail?q="' + result._id.trim() + '"&detail=true&sort=identifier_desc"';

    const source = _.extend({}, result._source, result.highlight);
    if (title === undefined) {title = ['no title'];}

    let rights = undefined;

    rights = utilityComponents.langHandler(result._source.dc.rights, 'en');
    if (rights === undefined) {
      rights = utilityComponents.langHandler(result._source.dc.rights, this.state.language);
    }
    // console.log(rights);
    return (
      <div className="list_hit" data-qa="hit">
        <h4 className={bemBlocks.item().mix(bemBlocks.container('hith4'))}>
          <a href={addressTitle}><span dangerouslySetInnerHTML={{__html: title[0]}}/></a>
          <a href={ur2} className={bemBlocks.item().mix(bemBlocks.container('marginals json'))}
             target="_blank">&nbsp;[JSON]</a>
        </h4>
        {creators}
        <Rights bemBlocks={bemBlocks} rights={rights}/>
        <span className={bemBlocks.item().mix(bemBlocks.container('desc'))}>{this.state.description}</span>
        <span className="level">
          <span className="level-left">
            {this.state.description.length > 0 &&
             <a className={bemBlocks.item().mix(bemBlocks.container('read-more'))} onClick={this.readMore}>
               {this.state.readMoreLabel}
             </a>
            }
          </span>
          <span className="level-right">
            {detailLink}
          </span>
        </span>
      </div>
    );
  }
}

Result.propTypes = {
  code: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    code: state.language.code
  };
};

export default connect(mapStateToProps)(Result);
