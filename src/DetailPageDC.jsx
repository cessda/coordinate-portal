import React, {Component} from 'react';
import * as _ from "lodash";
import { FaExchange, FaBookmark, FaQuoteLeft } from 'react-icons/lib/fa'
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import MultiSelect from "searchkit-multiselect"

import { ViewSwitcherHits, ViewSwitcherToggle, HierarchicalMenuFilter, HitItem, SearchkitComponent, SearchkitManager, SearchkitProvider, SearchBox, RefinementListFilter, MenuFilter, HitItemProps, Hits, HitsStats, QueryString, NoHits, Pagination, SortingSelector, SelectedFilters, ResetFilters, ItemHistogramList, Layout, LayoutBody, ItemList, Toggle, CheckboxItemList, InputFilter, LayoutResults, TopBar, DynamicRangeFilter, SideBar, ActionBar, ActionBarRow, FilteredQuery, BoolShould, BoolMust, TermQuery } from "searchkit";


import * as utilityComponents from "./componentUtility";
import {Header} from "./Header.jsx";
import {Detail} from "./Detail";
import {Footer} from "./Footer.jsx";
import {Buttons_AdvOptions} from "./Buttons_AdvOptions";
import {UtilityTopBar} from "./utility-topbar.jsx";


const type = "dc";

/* CESSDA default query to reduce result set to be CESSDA specific */
const searchkit = new SearchkitManager(  "/_search" );
searchkit.addDefaultQuery((query)=> {
    return query.addQuery(
      utilityComponents.CESSDAdefaultQuery
    )
});


require("./css/theme.css");
require("./css/reactselect.css");
require( "./utility.js");
require("./css/override.sass");
require("./css/design.scss");

let myLang = "all";

function redirect() {
  var query = document.getElementById('searchbox_input').value;
  if(query != null && query != ""){
    browserHistory.push("/search?q=" + query);
  }else{
    console.log("Clicked without input");
  }
}

export class DetailPageDC extends Component {
  constructor( props ) {


    super( props );
    this.state = {
      myLang: 'nn',
      deta: this.getDetail( "init getdetail" ),
      simi: [],
      url: []
    };
    this.handleChange = this.handleChange.bind( this );
    this.getDetail = this.getDetail.bind( this );
  };

  handleChange( props ) {
    this.state.myLang = props;
    this.state.deta = this.getDetail();
    myLang = this.state.myLang;
    this.forceUpdate();
  };


  componentDidMount(){
    var mthis = ReactDOM.findDOMNode(this);

    document.getElementsByTagName("input")[0].setAttribute("id", "searchbox_input");

    var searchbox_redirect = document.getElementById('searchbox_input');
    searchbox_redirect.onkeydown=function(e){
      if(e.keyCode==13){
        redirect();
      }
    }
  }

  componentWillMount(){

    setTimeout( function () {
      this.state.simi =  this.refs['detai'];
    }.bind( this ),1000 );
  }

  componentDidUpdate(){
    this.state.index = this.state.index + 1;
  }

  getDetail( x ) {
    let hits = undefined;
    hits= <Hits
      mod="sk-hits-grid"
      hitsPerPage={ 1 }
      itemComponent={< Detail ref="detai" />} ref="hitsComp"/>;
    setTimeout( function () {
      this.state.simi =  this.refs['detai'];
    }.bind( this ),0 );
    return hits;
  }

  render() {
    this.state.deta = this.getDetail();
    this.state.simi =  this.refs['detai'];

    return (
      <SearchkitProvider searchkit={ searchkit }>
        <Layout size="l" className="root__detail">
          <Header/>
          <UtilityTopBar/>
          <div className="dsn-detail-seperatorDetail-2"></div>
          <LayoutBody className="columns">
            <SideBar className="is-hidden-mobile column is-3 is-offset-2">
              <div className="dsn-detail-backToResults">
                <a onClick={browserHistory.goBack}>
                  <div> Back to Results </div>
                </a>
              </div>
              <br/>
              <div className="dsn-detail-buttons">
                <div className="dsn-detail-metaact">
                  <img className="dsn-detail-imgFavorite" src={require("./img/icon-favorite.png")} alt="favorite"/><div className="dsn-detail-favoriteText">Add to favorites</div>
                </div>
              </div>
              <div className="similContainer" ref="similContainer">
                {this.state.simi}
              </div>
            </SideBar>
            <LayoutResults className="column is-6">
              { this.state.deta }
              <NoHits/>
            </LayoutResults>
          </LayoutBody>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    )
  }
}
