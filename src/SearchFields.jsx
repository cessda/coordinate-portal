import React, {Component} from 'react';
import * as _ from "lodash";
import { Map } from 'immutable';
import ReactDOM from 'react-dom';
import Button from 'react-button';
import { FaExternalLink } from 'react-icons/lib/fa'
import MultiSelect from "searchkit-multiselect";
import { browserHistory } from 'react-router';
import {Header} from "./Header.jsx";
import {UtilityTopBar} from "./utility-topbar.jsx";
import { Footer } from "./Footer.jsx";
import { Buttons_AdvOptions } from "./Buttons_AdvOptions";
import * as utilityComponents from "./componentUtility";

import { RadioGroup, Radio } from 'react-radio-group'


import { PageSizeSelector, RangeFilter, RangeSliderHistogram, ViewSwitcherHits, ViewSwitcherToggle, HierarchicalMenuFilter, SearchkitComponent, SearchkitManager, SearchkitProvider, SearchBox, RefinementListFilter, MenuFilter, HitItemProps, Hits, HitsStats, QueryString, NoHits, Pagination, SortingSelector, SelectedFilters, ResetFilters, ItemHistogramList, Layout, LayoutBody, ItemList, Toggle, CheckboxItemList, InputFilter, LayoutResults, TopBar, DynamicRangeFilter, SideBar, ActionBar, ActionBarRow } from "searchkit";

import { PieFilterList, DateRangeFilter } from "searchkit-daterangefilter"
require("./css/theme.css");
require("./css/reactselect.css");
require( "./utility.js");
require("./css/override.sass");
require("./css/design.scss");

const type = "dc";

// esURL gets replaced by definePlugin
let elastic= esURL;

/* CESSDA default query to reduce result set to be CESSDA specific */
const searchkit = new SearchkitManager(  "/_search" );
searchkit.addDefaultQuery((query)=> {
    return query.addQuery(
      utilityComponents.CESSDAdefaultQuery
    )
});

// got to be set to all!!
let myLang = "all";
let ops = [
  "OR",
  "AND"
];
let modeForSubjectRadios = [];
ops.forEach( function ( x ) {

  modeForSubjectRadios.push( <Radio key={"subject" + x} value={ x } /> );
  modeForSubjectRadios.push( <span key={"SPsubject" + x} className=''>{ x }</span> );
} );


  let modeForCoverageRadios = [];
  ops.forEach( function ( x ) {

    modeForCoverageRadios.push( <Radio key={"coverage" + x} value={ x } /> );
    modeForCoverageRadios.push( <span key={"SPcoverage" + x} className=''>{ x }</span> );
  } );

    let modeForFormatRadios = [];
    ops.forEach( function ( x ) {

    	modeForFormatRadios .push( <Radio key={"format" + x} value={ x } /> );
    	modeForFormatRadios .push( <span key={"SPformat" + x} className=''>{ x }</span> );
    } );



let modeForCreatorRadios = [];
ops.forEach( function ( x ) {

  modeForCreatorRadios.push( <Radio key={"creator" + x} value={ x } /> );
  modeForCreatorRadios.push( <span key={"SPcreator" + x} className=''>{ x }</span> );
} );

let modeForContributorRadios = [];
ops.forEach( function ( x ) {

  modeForContributorRadios.push( <Radio key={"contributor" + x} value={ x } /> );
  modeForContributorRadios.push( <span key={"SPcontributor" + x} className=''>{ x }</span> );
} );

const DSNHitsListItemDC = (props) => {

  const {bemBlocks, result} = props
  let url = "";
  if ( result._source.dc.identifier && result._source.dc.identifier.nn !== undefined ) {
    url = utilityComponents.makeSourceURL( result._source.dc.identifier.nn );
  }

  let ur2 = elastic + "/" + type + "/_all/" + result._source.esid;

  let urddi = elastic.split( '/dc/' ).join( '/ddi-dara/' ) + "_all/" + result._id.split( '/' ).join( '%2F' );

  let title = utilityComponents.langHandler( result._source.dc.title, myLang );


  let dates = utilityComponents.langHandler( result._source.dc.date, myLang );
  if ( dates ) {
    dates = utilityComponents.makeDates( dates, bemBlocks.item().mix( bemBlocks.container( "meta" ) ) );
  }

  let creators = utilityComponents.langHandler( result._source.dc.creator, myLang );
  if ( creators ) {
    creators = utilityComponents.makeCreators( creators, bemBlocks.item().mix( bemBlocks.container( "meta" ) ) );
  }


  let contributors = utilityComponents.langHandler( result._source.dc.contributor, myLang );
  if ( contributors ) {
    contributors = utilityComponents.makeContributors( contributors, bemBlocks.item().mix( bemBlocks.container( "meta" ) ) );
  }

  let description = utilityComponents.langHandler( result._source.dc.description, myLang );

  if ( description && result._source.dc.identifier && result._source.dc.identifier.nn !== undefined ) {
    if ( result._source.setSpec[ 0 ].trim() == 20 ) {
      description = utilityComponents.makeDescription( description, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), result._source.dc.identifier.nn[ 0 ].trim(), result._id );
    } else {
      description = utilityComponents.makeDescription( description, bemBlocks.item().mix( bemBlocks.container( "desc" ) ), url, result._id );

    }
  } else {

    if ( result._source.setSpec[ 0 ].trim() == 20 ) {
      if ( result._source.dc.identifier && result._source.dc.identifier.nn !== undefined && result._source.dc.identifier.nn[ 0 ] !== '' ) {
        description = utilityComponents.detailLink( bemBlocks.item().mix( bemBlocks.container( "desc" ) ), result._source.dc.identifier.nn[ 0 ].trim(), result._id, result._source.intId );
      } else {
        description = utilityComponents.detailLink( bemBlocks.item().mix( bemBlocks.container( "desc" ) ), result._source.dc.identifier.nn[ 0 ].trim(), undefined, result._source.intId );
      }
    } else {
      if ( result._source.dc.identifier && result._source.dc.identifier.nn !== undefined && result._source.dc.identifier.nn[ 0 ] !== '' ) {
        description = utilityComponents.detailLink( bemBlocks.item().mix( bemBlocks.container( "desc" ) ), url, result._id, result._source.intId );
      } else {
        description = utilityComponents.detailLink( bemBlocks.item().mix( bemBlocks.container( "desc" ) ), url, undefined, result._source.intId );
      }
    }

  }

  // href for url embedded into the title text
  let href = 'detail?q="' + result._id.trim()+ '"&detail=true&sort=identifier_desc"';
  const source:any = _.extend( {}, result._source, result.highlight )
  if(title===undefined){title=["no title"]}

  return (
  <div
       className="list_hit"
       data-qa="hit">
    <h4 className={bemBlocks.item().mix(bemBlocks.container("hith4"))}><a href={href}><span dangerouslySetInnerHTML={{__html:title[0]}}/></a><a                                                                                                                       href={ ur2 }
                                                                                                                          className={ bemBlocks.item().mix( bemBlocks.container( "marginals json" ) ) }
                                                                                                                          target="_blank">&nbsp;[JSON]</a></h4>
    { creators }
    { description }
  </div>
  )
}


export class SearchFields extends Component {
  constructor( props ) {
    super( props );
    this.state = {
    	      operatorFormat: 'OR',
    	      operatorCreator: 'OR',
    	      operatorCoverage: 'OR',
    	      operatorContributor: 'OR',
    	      operatorSubject: 'AND'
    };
    this.handleChangeSubject = this.handleChangeSubject.bind( this );
    this.handleChangeFormat = this.handleChangeFormat.bind( this );
    this.handleChangeCoverage = this.handleChangeCoverage.bind( this );
    this.handleChangeCreator = this.handleChangeCreator.bind( this );
    this.handleChangeContributor = this.handleChangeContributor.bind( this );
  };
  handleChangeSubject( props ) {
	    this.state.operatorSubject = props;
    this.forceUpdate();
  };
  handleChangeCoverage( props ) {
	    this.state.operatorCoverage = props;
  this.forceUpdate();
};
handleChangeContributor( props ) {
    this.state.operatorContributor= props;
this.forceUpdate();
};
handleChangeCreator( props ) {
    this.state.operatorCreator = props;
this.forceUpdate();
};
handleChangeFormat( props ) {
    this.state.operatorFormat = props;
this.forceUpdate();
};



  render() {
    let dynlang = this.props.location.query.showlang;
    if ( dynlang ) {
      myLang = dynlang
    }
    
    const nestedQueryBuilder = (query, options) => {
      let qob = {};
      qob[ options.fullpath ] = query ;
      return {
        nested: {
          path: options.path,
          query: {
            bool: {
              must: {
                match: qob
              }
            }
          }
        }
      }
    }


    return (  <div className="dsn-advanced">
    <SearchkitProvider searchkit={ searchkit }>
      <Layout size="l">
          <Header/>
          <UtilityTopBar/>
        <LayoutBody className="columns root__searchfields">
          <SideBar className="is-hidden-mobile column is-3 is-offset-2">
            <h3 className="dsn-list-narrow">Search in fields</h3>
            <ResetFilters component={ utilityComponents.RstFltrsDspl } options={{query: false, filter:true, pagination:true}} />
            <br/>
            <InputFilter
                         id="description"
                         title="Description"
                         placeholder="Search in descriptions"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.description", fullpath: "dc.description.ac" } }
                         queryBuilder={ nestedQueryBuilder } />
            <InputFilter
                         id="subject"
                         title="Subject"
                         placeholder="Search in subjects"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.subject", fullpath: "dc.subject.ac", default_operator: "AND" } }
                         queryBuilder={ nestedQueryBuilder } />
            <RadioGroup key={"subjectRadio"}
                        name="operatorSubject"
                        selectedValue={ this.state.operatorSubject }
                        onChange={ this.handleChangeSubject }>
              { modeForSubjectRadios }
            </RadioGroup>
            <RefinementListFilter
                                  translations={ { "facets.view_more": "Show more subject terms" } }
                                  id="sub"
                                  title=""
                                  size={ 3 }
                                  operator={ this.state.operatorSubject }
                                  field="dc.subject.nn"
                                  fieldOptions={ { type: 'nested', options: { path: 'dc.subject' } } } />
            <InputFilter
                         id="coverage"
                         title="Coverage"
                         placeholder="Search in coverage"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.coverage", fullpath: "dc.coverage.ac" } }
                         queryBuilder={ nestedQueryBuilder } />
            <RadioGroup key={"coverageRadio"}
                        name="operatorCoverage"
                        selectedValue={ this.state.operatorCoverage }
                        onChange={ this.handleChangeCoverage }>
              { modeForCoverageRadios }
            </RadioGroup>
            <RefinementListFilter
                                  translations={ { "facets.view_more": "Show more coverage terms" } }
                                  id="cov"
                                  title=""
                                  size={ 3 }
                                  operator={ this.state.operatorCoverage }
                                  field="dc.coverage.nn"
                                  fieldOptions={ { type: 'nested', options: { path: 'dc.coverage' } } } />
            <InputFilter
                         id="language"
                         title="Language"
                         placeholder="Search in language"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.language", fullpath: "dc.language.ac" } }
                         queryBuilder={ nestedQueryBuilder } />
            <RefinementListFilter
                                  orderKey="_term"
                                  orderDirection="asc"
                                  translations={ { "facets.view_more": "Show more languages" } }
                                  id="lang"
                                  title=""
                                  size={ 3 }
                                  operator="OR"
                                  field="dc.language.nn"
                                  fieldOptions={ { type: 'nested', options: { path: 'dc.language' } } } />
            <InputFilter
                         id="format"
                         title="Format"
                         placeholder="Search in formats"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.type", fullpath: "dc.type.all" } }
                         queryBuilder={ nestedQueryBuilder } />
            <RadioGroup key={"formatRadio"}
	            name="operatorFormat"
	            selectedValue={ this.state.operatorFormat }
	            onChange={ this.handleChangeFormat }>
            		{ modeForFormatRadios }
            </RadioGroup>
            <RefinementListFilter
                                  translations={ { "facets.view_more": "Show more formats" } }
                                  id="form"
                                  title=""
                                  size={ 3 }
                                  operator="OR"
                                  field="dc.type.all"
                                  fieldOptions={ { type: 'nested', options: { path: 'dc.type' } } } />
            <InputFilter
                         id="creator"
                         title="Creator"
                         placeholder="Search in creators"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.creator", fullpath: "dc.creator.ac" } }
                         queryBuilder={ nestedQueryBuilder } />
            <RadioGroup key={"creatorRadio"}
            name="operatorCreator"
            selectedValue={ this.state.operatorCreator}
            onChange={ this.handleChangeCreator }>
        		{ modeForCreatorRadios }
        </RadioGroup>
            <RefinementListFilter
                                  translations={ { "facets.view_more": "Show more creators" } }
                                  id="creat"
                                  title=""
                                  size={ 3 }
                                  operator="OR"
                                  field="dc.creator.nn"
                                  fieldOptions={ { type: 'nested', options: { path: 'dc.creator' } } } />
            <InputFilter
                         id="contributor"
                         title="Contributor"
                         placeholder="Search in contributors"
                         searchOnChange={ true }
                         queryOptions={ { path: "dc.contributor", fullpath: "dc.contributor.ac" } }
                         queryBuilder={ nestedQueryBuilder } />
            <RadioGroup key={"contributorRadio"}
            name="operatorContributor"
            selectedValue={ this.state.operatorContributor}
            onChange={ this.handleChangeContributor }>
        		{ modeForContributorRadios } </RadioGroup>

            <RefinementListFilter
                                  translations={ { "facets.view_more": "Show more contributors" } }
                                  id="cont"
                                  title=""
                                  size={ 3 }
                                  operator="OR"
                                  field="dc.contributor.nn"
                                  fieldOptions={ { type: 'nested', options: { path: 'dc.contributor' } } } />
            <RefinementListFilter
                                  id="countriesr"
                                  title="Countries"
                                  field="countries_raw"
                                  operator="AND"
                                  size={ 5 } />
          </SideBar>
          <LayoutResults className="column is-6">
            <Hits
                  scrollTo={ true }
                  mod="sk-hits-grid"
                  hitsPerPage={10}
                  itemComponent={ DSNHitsListItemDC } />
            <NoHits/>
          </LayoutResults>
        </LayoutBody>
        <ActionBar>
          <div className="dsn-list-pagination">
            <Pagination
                        showNumbers={ true }
                        translations={ { "pagination.previous": "<", "pagination.next": ">" } } />
          </div>
        </ActionBar>
        <Footer />
      </Layout>
    </SearchkitProvider>
    </div>

    )
  }
}
