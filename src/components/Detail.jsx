import * as React from "react";

import * as _ from "lodash";
import ReactDOM from 'react-dom';
import { FaExchange, FaBookmark, FaQuoteLeft } from 'react-icons/lib/fa'
import { FaExternalLink } from 'react-icons/lib/fa'
import Time from 'react-time'
import { ViewSwitcherHits, ViewSwitcherToggle, HierarchicalMenuFilter, HitItem, SearchkitComponent, SearchkitManager, SearchkitProvider, SearchBox, RefinementListFilter, MenuFilter, HitItemProps, Hits, HitsStats, QueryString, NoHits, Pagination, SortingSelector, SelectedFilters, ResetFilters, ItemHistogramList, Layout, LayoutBody, ItemList, Toggle, CheckboxItemList, InputFilter, LayoutResults, TopBar, DynamicRangeFilter, SideBar, ActionBar, ActionBarRow } from "searchkit";

let striptags = require( 'striptags' );
import { RadioGroup, Radio } from 'react-radio-group'
import {Similars} from './Similars';


const type = "dc";
let identifierWorldbank = "api_worldbank";

// esURL gets replaced by definePlugin
let elastic= esURL;

let sims;

function makeSourceURL( identifiers, id ) {
  if(!id.includes(identifierWorldbank)){
    identifiers = identifiers.sort();
  }
  for (var i = 0; i < identifiers.length; i++) {
    var curID = identifiers[ i ].trim();
    if ( _.startsWith(curID, "10." ) || _.startsWith(curID, "doi:" ) ) {
      return "http://dx.doi.org/" + identifiers[ i ].trim();
    }
    if ( _.startsWith(curID,"urn:nbn:de:" ) ) {
      return "https://nbn-resolving.org/" + identifiers[ i ].trim();
    }
    if ( _.includes(curID, "hdl.handle" ) ) {
      return identifiers[ i ].trim();
    }
    if( _.includes(curID, "hdl")){
      return 'https://hdl.handle.net/' + identifiers[i].replace("hdl:", "");
    }
    if (_.startsWith( curID, "http" ) ) {
      return identifiers[ i ].trim();
    }
  }
}

function makeIdentifiers( identifiers, sclass, id ) {
  identifiers = _.uniq(identifiers);
  let result = [];
  let dois = [];
  let urns = [];
  let urls = [];
  let hdl = [];
  let others = [];
  for (var i = 0; i < identifiers.length; i++) {
    var curID = identifiers[ i ].trim().substring( 0, 3 );

    if(id.includes(identifierWorldbank)){
      urls.push( React.DOM.li( null, React.DOM.a( {
        href: identifiers[ i ].trim()
      }, identifiers[ i ] + "  " ) ) )
    }else{
      switch (curID) {
        case "10.":
          dois.push( React.DOM.li( null, React.DOM.a( {
            href: 'http://dx.doi.org/' + identifiers[ i ].trim()
          }, identifiers[ i ] + " " ) ) );
          break;
        case "doi":
          dois.push( React.DOM.li( null, React.DOM.a( {
            href: 'http://dx.doi.org/' + identifiers[ i ].trim()
          }, identifiers[ i ] + " " ) ) );
          break;
        case "urn":
          urns.push( React.DOM.li( null, React.DOM.a( {
            href: 'https://nbn-resolving.org/' + identifiers[ i ].trim()
          }, identifiers[ i ] + " " ) ) );
          break;
        case "htt":
          urls.push( React.DOM.li( null, React.DOM.a( {
            href: identifiers[ i ].trim()
          }, identifiers[ i ] + "  " ) ) );
          break;
        case "hdl":
          let handleFull = identifiers[i].trim();
          let handle = identifiers[i].replace("hdl:", "");
          hdl.push(React.DOM.li( null, React.DOM.a( {
            href: 'https://hdl.handle.net/' + handle.trim()
          }, handleFull + " " ) ));
          break;
        default:
          others.push( React.DOM.li( null, identifiers[ i ] + "  " ) );
          break;
      }
    }
  }

  result.push( dois );
  result.push( urns );
  result.push( urls  );
  result.push( others );
  result.push( hdl );

  return React.DOM.div( {
    className: sclass
  }, React.DOM.span( {
    className: 'sk-hits-grid__detail-label'
  }, "Identifiers: " ), React.DOM.ul( null, result ) );
}



function otherLangsBasedOnTitles( data, sclass ) {
  let ds = [];
  data = _.uniq( data );
  if ( data.length > 1 ) {
    ds.push( React.DOM.h4( null, "Other languages: " ) );
  }
  for (var i = 0; i < data.length; i++) {
    <a
      href={ data[ i ] }
      className={ sclass }
      target="_blank">data[i]</a>

  }
  return React.DOM.div( {
    className: sclass
  }, ds );
}


function makeTitles( data, sclass ) {
  let ds = [];
  data = _.uniq( data );
  for (var i = 1; i < data.length; i++) {
    if ( i < 4 ) {
      ds.push( React.DOM.h4( null, data[ i ] + " " ) );
    }
    if ( i == 4 ) {
      ds.push( React.DOM.h4( null, (data.length - 4) + " more" ) );
    }
  }
  return React.DOM.div( {
    className: sclass
  }, ds );
}



function makeDivSpanAll( data, sclass, prefix, limit ) {
  let ds = [];
  if ( data === undefined ) {
    return "no data";
  }

  ds.push( React.DOM.span( null, prefix ) );
  var i = 0;
  if ( limit === undefined ) {
    limit = 30;
  }
  for (; i < data.length; i++) {
    if ( i < limit ) {
      ds.push( striptags( data[ i ] ) );
    }
    if ( i == limit ) {
      ds.push( React.DOM.span( null, (data.length - limit) + " more" ) );
    }
  }

  return React.DOM.div( {
    className: sclass
  }, ds );
}


function makeDivSpan( data, sclass, prefix, limit ) {
  let ds = [];
  if ( data === undefined ) {
    return "no data";
  }

  ds.push( React.DOM.span( null, prefix ) );
  var i = 0;
  if ( limit === undefined ) {
    limit = 30;
  }
  for (; i < data.length; i++) {
    if ( i < limit ) {
      if ( i < (data.length - 1) ) {
        ds.push( React.DOM.span( null, striptags( data[ i ] ) + "; " ) );
      } else {
        ds.push( React.DOM.span( null, striptags( data[ i ] ) ) );
      }
    }
    if ( i == limit ) {
      ds.push( React.DOM.span( null, (data.length - limit) + " more" ) );
    }
  }

  return React.DOM.div( {
    className: sclass
  }, ds );
}


function allLangHandler( container ) {
  let ds = [];
  let allEmpty = true;
  if ( container === undefined ) {
    return false;
  }
  if ( container.all !== undefined ) {
    let data = container.all;
    for (var i = 0; i < data.length; i++) {
      ds.push( React.DOM.span( {
        className: 'all'
      }, stripTags( data[ i ].trim() ) ) );
      allEmpty = false;
    }
  }

  if ( container.de !== undefined ) {
    let data = container.de;
    for (var i = 0; i < data.length; i++) {
      ds.push( React.DOM.span( {
        className: 'de'
      }, stripTags( data[ i ].trim() ) ) );
      allEmpty = false;
    }
  }

  if ( container.en !== undefined ) {
    let data = container.en;
    for (var i = 0; i < data.length; i++) {
      ds.push( React.DOM.span( {
        className: 'en'
      }, stripTags( data[ i ].trim() ) ) );
      allEmpty = false;
    }
  }

  if ( container.nn !== undefined ) {
    let data = container.nn;
    for (var i = 0; i < data.length; i++) {
      ds.push( React.DOM.span( {
        className: 'nn'
      }, stripTags( data[ i ].trim() ) ) );
      allEmpty = false;
    }
  }
  if ( allEmpty ) {
    return false;
  }
  return ds;
}


function langHandler( container, lang ) {
  if ( container === undefined ) {
    return false;
  }

  let langBag = container[ lang ];
  if ( langBag !== undefined ) {
    return langBag;
  }
  if ( langBag === undefined && lang !== 'en' ) {

    langBag = container.en;
    return langBag;
  }
  if ( langBag === undefined && lang !== 'nn' ) {

    langBag = container.nn;
    return langBag;
  }
  if ( langBag === undefined && lang !== 'de' ) {

    langBag = container.de;
    return langBag;
  }
  return false;
}

function makeUlAll( data, sclass, prefix ) {
  let ds = [];
  if ( data !== undefined ) {
    ds.push( React.DOM.span( null, prefix ) );
  }
  let descs = [];
  for (var i = 0; i < data.length; i++) {
    descs.push( React.DOM.li( {
      className: data[ i ].props.className
    }, data[ i ].props.children ) );
  }

  ds.push( React.DOM.ul( null, descs ) );
  return ds
}

function makeUl( data, sclass, prefix ) {
  let ds = [];
  if ( data !== undefined ) {
    ds.push( React.DOM.span( null, prefix ) );
  }
  let descs = [];
  for (var i = 0; i < data.length; i++) {
    descs.push( React.DOM.li( null, striptags( data[ i ] ) ) );
  }

  ds.push( React.DOM.ul( null, descs ) );
  return React.DOM.div( {
    className: sclass
  }, React.DOM.div( null, ds ) );
}

function makeRelations( data, sclass, prefix ) {
  let ds = [];
  data = _.uniq( data );
  if ( data !== undefined ) {
    ds.push( React.DOM.span( null, prefix ) );
  } else {
    return undefined;
  }
  let descs = [];
  for (var i = 0; i < data.length; i++) {
    var trgt ,
      txt;
    data[ i ].split( ';' ).forEach( function ( x ) {
      x = x.trim().toLowerCase();
      if (_.startsWith( x,"urn:urn:" ) ) {
        x = x.substring( 4 );
      }
      if ( _.startsWith(x,"urn: htt" ) ) {
        txt = React.DOM.a( {
          href: x.substring( 5 ).trim()
        }, x );
        trgt = x.substring( 5 ).trim();
      }
      if ( _.startsWith(x,"urn: urn:nbn" ) ) {
        txt = React.DOM.a( {
          href: "https://nbn-resolving.org/resolver?identifier="+x.substring( 5 ).trim()
        }, x );
        trgt = x.substring( 5 ).trim();
      }

      if ( _.startsWith(x,"urn:nbn" ) ) {
        txt = React.DOM.a( {
          href: "https://nbn-resolving.org/resolver?identifier="+x.trim()
        }, x );
        trgt = x.trim();
      }

      if ( _.startsWith(x,"handle: " ) ) {
        x = x.substring( 8 );
        if ( _.startsWith(x,"http" ) ) {
          trgt = x;
          txt = x;
        }
      }
      if ( !_.startsWith(x,"uri=" ) && !_.startsWith(x,"title=" ) && !_.startsWith(x,"doi:" ) && !_.startsWith(x,"http:" ) && !_.startsWith(x,"https:" ) && !_.startsWith(x,"urn: ht" )&& !_.startsWith(x,"urn: urn:nbn" )&& !_.startsWith(x,"urn:nbn" ) ) {
        trgt = undefined;txt = x;
      }
      if ( _.startsWith(x,"uri=" ) ) {
        trgt = x.substring( 4 );
      }
      if ( _.startsWith(x, "url:" ) ) {
        trgt = x.substring( 4 );
      }
      if ( _.startsWith(x,"title=" ) ) {
        txt = x.substring( 6 );
      }
      if ( _.startsWith(x, "doi:" ) ) {
        txt = React.DOM.a( {
          href: 'http://dx.doi.org/' + x.substring( 4 ).trim()
        }, x.substring( 4 ) );
      }
    } );

    if ( trgt !== undefined ) {
      console.log( "!" );
      descs.push( React.DOM.li( null, React.DOM.a( {
        href: trgt
      }, txt ) ) );
    } else {
      descs.push( React.DOM.li( null, txt ) );
    }

  }
  ds.push( React.DOM.ul( null, descs ) );
  return React.DOM.div( {
    className: sclass
  }, React.DOM.div( null, ds ) );
}

function detailLink( sclass, more, id ) {
  let ds = [];

  if ( id !== undefined ) {
    ds.push( React.DOM.a( {
      href: 'detail?q="' + id.trim() + '"&detail=true&sort=identifier_desc'
    }, "read more" ) );
  }
  if ( more !== undefined ) {
    ds.push( React.DOM.a( {
      href: more,
      target: "_blank"
    }, React.createElement( FaExternalLink, null ), "go to study" ) );
  }
  return React.DOM.div( {
    className: sclass
  }, React.DOM.div( null, ds ) );
}

function makeDescription( data, sclass, more, id, prefix, oaiUrl ) {
  let ds = [];
  if ( data != undefined && data != "") {
    ds.push( React.DOM.span( null, prefix ) );
  }
  for (var i = 0; i < data.length; i++) {
    ds.push(
      <div className='dsn-detail-descspacer' dangerouslySetInnerHTML={ {__html:(striptags(data[i])) }}></div>)
  }

  return React.DOM.div( {
    className: sclass,
    id: 'description_root'
  }, React.DOM.div( null, React.DOM.div( null, ), ds ) );
}

function makeSourceLink(url, id) {
  if(id.includes(identifierWorldbank)){
    return React.DOM.a({
      href: url,
      target: "_blank",
      id: "dsn-detail-sourceLinkGTC"
    }, React.createElement(FaExternalLink, null), " go to collection");
  } else {
    return React.DOM.a({
      href: url,
      target: "_blank"
    }, React.createElement(FaExternalLink, null), " go to study");
  }
}


function getAvailableLangs( dc ) {
  let lang = [];
  Object.keys( dc.title ).forEach( function ( x ) {
    x = x.trim().toLowerCase();
    if ( x !== "all" && x !== "ac") {
      // has subject or descrption?
      if ( (dc.subject && dc.subject[ x ] !== undefined) || (dc.description && dc.description[ x ] !== undefined) ) {
        lang.push( x );
      }
    }
  } );
  console.log("LANGUAGES IN ARRAY: " + lang);
  return lang;
}

export class Detail extends HitItem {
  constructor( props ) {
    super( props );
    this.state = {
      myLang: 'all',
      langs: [],
      sims: []
    };
    this.handleChange = this.handleChange.bind( this );
  };


  componentDidMount() {
    this.state.sims = React.cloneElement( this.refs.similaires.state.ssimilarData );
    this.state.myLang="all";
    console.log(this.state.myLang);
    this.forceUpdate();
  }

  handleChange( props ) {
    this.state.myLang = props;
    this.forceUpdate();
  };

  render() {

    let result = this.props.result;
    let bemBlocks = this.props.bemBlocks;
    let url = "";
    if ( result._source.dc.identifier.nn !== undefined ) {
      console.log(result._source.dc.identifier.nn);
      url = makeSourceURL( result._source.dc.identifier.nn, result._id );
    }
    let ur2 = elastic + "/"+type+"/_all/" + result._source.esid;


    let title = langHandler( result._source.dc.title, this.state.myLang );
    let aTitles = undefined;



    let otherLangs = otherLangsBasedOnTitles( result._source.dc.title, bemBlocks.item().mix( bemBlocks.container( "meta" ) ) )
    if ( title !== undefined ) {
      aTitles = makeTitles( title, bemBlocks.item().mix( bemBlocks.container( "meta" ) ) );
    } else {
      title = [
        "[Title not available in " + this.state.myLang + " ]"
      ]
    }

    let subjects = langHandler( result._source.dc.subject, this.state.myLang );

    if ( subjects && subjects.length != 0 ) {
      subjects = makeUl( subjects, bemBlocks.item().mix( bemBlocks.container( "meta" ) ), "Subject: ", 100 );
    }
    let types = langHandler( result._source.dc.type, this.state.myLang );
    if ( types && types.length != 0 ) {
      types = makeUl( types, bemBlocks.item().mix( bemBlocks.container( "meta" ) ), "Type: " );
    }


    let dates = langHandler( result._source.dc.date, 'nn' );
    if ( dates && dates.length != 0 ) {
      dates = makeUl( dates, bemBlocks.item().mix( bemBlocks.container( "meta" ) ), "Date: " );
    }

    let contributors = langHandler( result._source.dc.contributor, this.state.myLang );
    if ( contributors && contributors.length != 0 ) {
      contributors = makeUl( contributors, bemBlocks.item().mix( bemBlocks.container( "meta" ) ), "Contributor: " );
    }

    let langs = langHandler( result._source.dc.language, this.state.myLang );

    if ( langs && langs.length != 0 ) {
      langs = makeUl( langs, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), "Language:" );
    }


    let creators = langHandler( result._source.dc.creator, this.state.myLang );
    if ( creators && creators.length != 0 ) {
      creators = makeDivSpan( creators, bemBlocks.item().mix( bemBlocks.container( "meta" ) ), "" );
    }

    let coverages = langHandler( result._source.dc.coverage, this.state.myLang );

    if ( coverages && coverages.length != 0 ) {
      coverages = makeUl( coverages, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), "Coverage:" );
    }

    let publishers = langHandler( result._source.dc.publisher, this.state.myLang );

    if ( publishers && publishers.length != 0 ) {
      publishers = makeUl( publishers, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), "Publisher:" );
    }

    let relations = langHandler( result._source.dc.relation, this.state.myLang );

    if ( relations && relations.length != 0 ) {
      relations = _.uniq( relations );
      relations = makeRelations( relations, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), "Relation:" );
    }

    let formats = langHandler( result._source.dc.format, this.state.myLang );

    if ( formats && formats.length != 0 ) {
      formats = makeUl( formats, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), "Format:" );
    }

    let rights = langHandler( result._source.dc.rights, this.state.myLang );

    if ( rights && rights !== undefined && rights.length != 0 ) {
      rights = makeUl( rights, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), "Rights:" );
    }

    let description = langHandler( result._source.dc.description, this.state.myLang );
    if ( description !== undefined && description.length != 0 && result._source.dc.identifier && result._source.dc.identifier.nn !== undefined ) {
      description = makeDescription( description, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), url, result._id, "Description:" );
    } else {
      if ( result._source.dc.identifier && result._source.dc.identifier.nn !== undefined ) {
        description = detailLink( bemBlocks.item().mix( bemBlocks.container( "desc" ) ), url, result._id);
      } else {
        description = detailLink( bemBlocks.item().mix( bemBlocks.container( "desc" ) ), url, undefined);
      }
    }
    let identifiers = makeIdentifiers( result._source.dc.identifier.nn, bemBlocks.item().mix( bemBlocks.container( "meta" ) ), result._id );
    const source = _.extend( {}, result._source, result.highlight )
    let dataProvider = React.DOM.div( {
      /*let indexDates = <span title="date given in OAI record / date of indexing">&nbsp;</span>;*/
      className: bemBlocks.item().mix( bemBlocks.container( "desc" ) )
    }, result._source.dataProvider );
    let metaDataProvider = React.DOM.div( {
      className: bemBlocks.item().mix( bemBlocks.container( "desc" ) )
    }, result._source.metaDataProvider, React.DOM.div( null ) );


    let sourceLink = makeSourceLink(url, result._id);

    let availableLangs = getAvailableLangs( result._source.dc );

    let langRadios = [];
    availableLangs.forEach( function ( x ) {
      switch (x.trim()) {
        case "cc": break;
        case "nn":
          langRadios.push( <Radio value="all" /> );
          langRadios.push( <span
            className=''
            title='check this to show all metadata in all languages'>All languages</span> );
          break;
        default:
          langRadios.push( <Radio value={ x } /> );
          langRadios.push( <span className=''>{ x }</span> );
          break;
      }
    } );

    let langRadioGroup = "";
    if(availableLangs.length>1){
      langRadioGroup = <RadioGroup  className='lang-toggle is-pulled-right' name="myLang"  selectedValue={ this.state.myLang } onChange={ this.handleChange }> { langRadios }    </RadioGroup>;
    }else{
      langRadioGroup = <RadioGroup  className='lang-toggle is-pulled-right'  name="allLang"  selectedValue="all"  onChange={ this.handleChange }> { langRadios }    </RadioGroup>;
    }

    let subjectTerms = "";
    if(result._source.dc.subject!==undefined&& result._source.dc.subject.all!==undefined){
      subjectTerms =result._source.dc.subject.all;
    }
    return (
      <div className="theWholeDetailsWithSimilars">
        <div
          className={ this.props.bemBlocks.item().mix( this.props.bemBlocks.container( "item_detail" ) ) }
          data-qa="hit">
          { langRadioGroup }
          <h2
            className={ this.props.bemBlocks.item().mix( this.props.bemBlocks.container( "hith4_detail" ) ) }
          ><span dangerouslySetInnerHTML={ { __html: title[ 0 ] } }/><a
            href={ ur2 }
            className={ this.props.bemBlocks.item().mix( this.props.bemBlocks.container( "marginals json" ) ) }
            target="_blank">&nbsp;[JSON]</a></h2>
          { aTitles }
          <div className="dsn-detail-title">
            { creators }
          </div>
          { dates }
          { description }
          <div className="dsn-detail-subjects">
            { subjects }
          </div>
          { otherLangs }
          { langs }
          { coverages }
          { formats }
          <div className="dsn-detail-type">
            { types }
          </div>
          <div className="dsn-detail-contributor">
            { contributors }
          </div>
          { relations }
          { rights }
          { publishers }
          { identifiers }
          <div className="dsn-detail-metadataprov">
            Metadata Provider:
          </div>
          <div className="dsn-detail-metadataprov-data">
            <div className="dsn-detail-oaiWrapper">{ metaDataProvider }</div>   <span id="dsn-detail-time1">[last update: <Time id="dsn-detail-time1" value={ result._source.oaiDatestamp } format="YYYY/MM/DD" />]</span>
          </div>
          <div className="dsn-detail-dataprov">
            Data Provider:
          </div>
          <div className="dsn-detail-dataprov-data">
            { dataProvider }
          </div>
          <div className="dsn-detail-harvWrapper"> <span className="dsn-detail-time2_span">Indexed by GESIS at: <Time id="dsn-detail-time2" value={ result._timestamp } format="YYYY/MM/DD" /></span></div>
          <div className="dsn-detail-sourceLINK">
            { sourceLink }
          </div>
        </div>
        <Similars
          input={_.concat( title[0].split("[").join("").split("]").join("").split(",").join("") ,  subjectTerms) }
          ref="similaires"
          curEsid={ result._source.esid } />
      </div>
    )
  }
}
