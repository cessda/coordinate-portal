import React, {Component} from 'react';
import * as _ from "lodash";
import { Map } from 'immutable';
import MultiSelect from "searchkit-multiselect";
import {browserHistory} from 'react-router';
import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {UtilityTopBar} from "./utility-topbar.jsx";

import {Buttons_AdvOptions} from "./Buttons_AdvOptions";
import * as utilityComponents from "./componentUtility";


import {RangeSliderInput,RangeSliderHistogramInput, PageSizeSelector, RangeFilter, RangeSliderHistogram ,ViewSwitcherHits, ViewSwitcherToggle, HierarchicalMenuFilter, SearchkitComponent, SearchkitManager, SearchkitProvider, SearchBox, RefinementListFilter, MenuFilter, HitItemProps, Hits, HitsStats, QueryString, NoHits, Pagination, SortingSelector, SelectedFilters, ResetFilters, ItemHistogramList, Layout, LayoutBody, ItemList, Toggle, CheckboxItemList, InputFilter, LayoutResults, TopBar, DynamicRangeFilter, SideBar, ActionBar, ActionBarRow, FilteredQuery, BoolShould, BoolMust, TermQuery } from "searchkit";


import { PieFilterList, DateRangeFilter  } from "searchkit-daterangefilter"
require("./css/theme.css");
require("./css/reactselect.css");
require( "./utility.js");
require("./css/override.sass");
require("./css/design.scss");

// esURL gets replaced by definePlugin
let elastic= esURL;


const type = "dc";

/* CESSDA default query to reduce result set to be CESSDA specific */
const searchkit = new SearchkitManager(  "/_search");
searchkit.addDefaultQuery((query)=> {
    return query.addQuery(
      utilityComponents.CESSDAdefaultQuery
    )
});


// got to be set to all!!
let myLang ="all";

const RefinementOption = (props) => (
  <div className={props.bemBlocks.option().state({selected:props.selected}).mix(props.bemBlocks.container("item"))} onClick={props.onClick}>
    <div className={props.bemBlocks.option("text")}>{props.label}</div>
    <div className={props.bemBlocks.option("count")}>{props.count}</div>
  </div>
)

class DSNHitsListItemDC extends Component {
  render() {
  const { hits } = this.props

  const {bemBlocks, result} = this.props
  let url="";
  if(result._source.dc.identifier&& result._source.dc.identifier.nn!==undefined){
    url = utilityComponents.makeSourceURL(result._source.dc.identifier.nn, result._source.intId);
  }

  let ur2 = elastic + "/"+type+"/_all/" + result._source.esid;

  let urddi = elastic.split('/dc/').join('/ddi-dara/') +"_all/"+result._id.split('/').join('%2F');

  let title = undefined;


  title = utilityComponents.langHandler(result._source.dc.title, "en");
  if(title===undefined|| title.length==0){
    title = utilityComponents.langHandler(result._source.dc.title, myLang);
  }

  let dates = utilityComponents.langHandler(result._source.dc.date, myLang);
  if(dates){
    dates = utilityComponents.makeDates(dates, bemBlocks.item().mix(bemBlocks.container("meta")) );
  }

  let creators = utilityComponents.langHandler(result._source.dc.creator, myLang);
  if(creators){
    creators= utilityComponents.makeCreators(creators, bemBlocks.item().mix(bemBlocks.container("meta")));
  }


  let contributors = utilityComponents.langHandler(result._source.dc.contributor, myLang);
  if(contributors){
    contributors = utilityComponents.makeContributors(contributors, bemBlocks.item().mix(bemBlocks.container("meta")) );
  }

  let description= undefined;


  description = utilityComponents.langHandler(result._source.dc.description, "en");
  if(description===undefined){
    description = utilityComponents.langHandler(result._source.dc.description, myLang);
  }

  if(description && result._source.dc.identifier && result._source.dc.identifier.nn!==undefined){
    if(result._source.setSpec[0].trim()==20){
      description = utilityComponents.makeDescription( description, bemBlocks.item().mix(bemBlocks.container("desc")), result._source.dc.identifier.nn[0].trim(), result._id);
    }else{
      description = utilityComponents.makeDescription( description, bemBlocks.item().mix(bemBlocks.container("desc")), url, result._id);
    }
  }else{
    if(result._source.setSpec[0].trim()==20){
      if(result._source.dc.identifier && result._source.dc.identifier.nn!==undefined&& result._source.dc.identifier.nn[0]!=='')
      {
        description = utilityComponents.detailLink(  bemBlocks.item().mix(bemBlocks.container("desc")), result._source.dc.identifier.nn[0].trim(), result._id, result._source.intId);
      }else{
        description = utilityComponents.detailLink(  bemBlocks.item().mix(bemBlocks.container("desc")), result._source.dc.identifier.nn[0].trim(), undefined, result._source.intId);
      }
    }
    else{
      if(result._source.dc.identifier && result._source.dc.identifier.nn!==undefined&& result._source.dc.identifier.nn[0]!=='')
      {
        description = utilityComponents.detailLink(  bemBlocks.item().mix(bemBlocks.container("desc")), url, result._id, result._source.intId);
      }else{
        description = utilityComponents.detailLink(  bemBlocks.item().mix(bemBlocks.container("desc")), url, undefined, result._source.intId);
      }
    }
  }

  let addressTitle = 'detail?q="' + result._id.trim()+ '"&detail=true&sort=identifier_desc"';

  const source:any = _.extend({}, result._source, result.highlight)
  if(title===undefined){title=["no title"]}
  return (  
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} className="list_hit" data-qa="hit" >
      <h4 className={bemBlocks.item().mix(bemBlocks.container("hith4"))}><a href={addressTitle}>
        <span dangerouslySetInnerHTML={{__html:title[0]}}/></a>
        <a href={ur2}  className={bemBlocks.item().mix(bemBlocks.container("marginals json"))} target="_blank">&nbsp;[JSON]</a>
      </h4>
      {creators}
      {description}
    </div>
  )
}
}

export class SearchPageDCText extends React.Component {
  render(){
    let dynlang= this.props.location.query.showlang;
    if(dynlang){
      myLang=dynlang
    }

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l" className="root__search">
          <Header/>
          <UtilityTopBar/>
          <LayoutBody className="columns">
            <SideBar className="is-hidden-mobile column is-3 is-offset-2">
              <h3 className="dsn-list-narrow">Narrow search</h3>
              <ResetFilters component={utilityComponents.RstFltrsDspl} options={{query: false, filter:true, pagination:true}}/><br/>
              <RangeFilter min={1950} max={2017}  field="anydateYear" id="anydateYear" title="Date" rangeComponent={RangeSliderInput} />
              <RefinementListFilter
                id="language"
                title= "Language"
                field={'dc.language.nn'}
                fieldOptions={{type:"nested", options:{path:'dc.language'}}}
                listComponent={<MultiSelect placeholder="Search languages" title={this.props.children}/>}
                size={500} orderKey="_term" orderDirection="asc" />

              <RefinementListFilter
                id="dc.subject"
                title= "Subject"
                field={'dc.subject.'+myLang}
                fieldOptions={{type:'nested', options:{path:'dc.subject'}}}
                listComponent={<MultiSelect placeholder="Search subjects" title={this.props.children}/>}
                size={500}
              />

              <RefinementListFilter
                id="dc.type"
                title= "Type"
                field={'dc.type.'+myLang}
                fieldOptions={{type:"nested", options:{path:'dc.type'}}}
                listComponent={<MultiSelect placeholder="Search types" title={this.props.children} />}
                size={1000}/>

              <RefinementListFilter
                id="dc.creator"
                title= "Creator"
                translations={ { "placeholder": "Show more coverage terms" } }
                field={'dc.creator.all'}
                fieldOptions={{type:'nested', options:{path:'dc.creator',   min_doc_count: 1}}}
                listComponent={<MultiSelect placeholder="Search creators" title={this.props.children} />}
                size={2000}/>

              <RefinementListFilter
                id="dc.contributor"
                title= "Contributor"
                field={'dc.contributor.all'}
                fieldOptions={{type:'nested', options:{path:'dc.contributor',  min_doc_count: 1}}}
                listComponent={<MultiSelect placeholder="Search contributors" title={this.props.children} />}
                size={2000} />

              <RefinementListFilter
                id="metaDataProvider"
                title="Metadata provider"
                field="metaDataProvider"
                operator="OR"
                listComponent={<MultiSelect placeholder="Search metadata providers" title={this.props.children} />}
                size={1000} />


              <RefinementListFilter
                id="dataProvider"
                title="Data provider"
                field="dataProvider"
                operator="OR"
                listComponent={<MultiSelect placeholder="Search data providers" title={this.props.children} />}
                size={1000} />

              <RefinementListFilter
                id="setHuman"
                title="Set "
                field="setHuman"
                operator="OR"
                listComponent={<MultiSelect placeholder="Search sets" backspaceRemoves={false} title={this.props.children} />}
                size={1000} />
            </SideBar>
            <LayoutResults className="column is-6">
              <Hits className="column"
                scrollTo={true} mod="sk-hits-grid" hitsPerPage={10} itemComponent={DSNHitsListItemDC} key={"hitList"} />
              <NoHits/>
            </LayoutResults>
          </LayoutBody>
            <div className="dsn-list-pagination">
              <Pagination  pageScope={5}  showLast={true}  showNumbers={true} translations={{"pagination.previous":"<", "pagination.next":">"}} />
            </div>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    )
  }
}
