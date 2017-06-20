import * as React from "react";
import * as _ from "lodash";
import { Map } from 'immutable';
import ReactDOM from 'react-dom';
import Button from 'react-button';
import {FaExternalLink} from 'react-icons/lib/fa'
import MultiSelect from "searchkit-multiselect";
import {browserHistory} from 'react-router';
import {Footer} from "./Footer.jsx";
import {Buttons_AdvOptions} from "./Buttons_AdvOptions";
import * as utilityComponents from "./componentUtility";


import {HierarchicalMenuFilter, SearchkitComponent, SearchkitManager, SearchkitProvider, SearchBox, RefinementListFilter, MenuFilter, HitItemProps, Hits, HitsStats, QueryString, NoHits, Pagination, SortingSelector, SelectedFilters, ResetFilters, ItemHistogramList, Layout, LayoutBody, ItemList, Toggle, CheckboxItemList, InputFilter, LayoutResults, TopBar, DynamicRangeFilter, SideBar, ActionBar, ActionBarRow } from "searchkit";


require("./css/theme.css");
require("./css/reactselect.css");
require( "./utility.js");
require("./css/override.sass");
require("./css/design.scss");

const type = "dc";


const searchkit = new SearchkitManager(  "/_search");
searchkit.addDefaultQuery((query)=> {
    return query.addQuery(
      utilityComponents.CESSDAdefaultQuery
    )
});

function redirect() {
  var query = window.location.search;
  if(query != null && query != ""){
    browserHistory.push("/search" + query);
  }else{
    console.log("Clicked without input");
  }
}



export class Start extends React.Component {

  componentDidUpdate() {
  }

  componentDidMount() {
    document.getElementsByTagName("input")[0].setAttribute("id", "searchbox_input");

    var searchbox_redirect = document.getElementById('searchbox_input');
    searchbox_redirect.onkeydown=function(e){
      if(e.keyCode==13){
        redirect();
      }
    }
  }


	render(){

    return (
        <div id="dsn-start">
				<SearchkitProvider searchkit={searchkit}>
			    <Layout size="l" className="root__start">
			      <LayoutBody>
              <div className="container is-fluid cessda_start">
                  <div className="cessda is-pulled-right">cessda</div>
                </div>
                <div className="container is-fluid is-fullwidth columns">
                  <div className="column is-offset-3 is-5 has-text-centered cessda__start-text">
                    Search for social and economic research data across a diverse portfolio of data repositories and metadata services. 
                  </div>
                </div>

                <div className="container is-fluid columns searchbox__container">
                  <div className="column is-6 is-offset-3 searchbox">
                    <SearchBox
                      autofocus={true}
                      searchOnChange={true}
                      placeholder="Find Social and Economic Research Data"
                      prefixQueryFields={["_all^1"]}
                      queryFields={["_all"]}
                    />
                    </div>
                </div>
			      </LayoutBody>
            <Footer/>
			    </Layout>
			  </SearchkitProvider>
        </div>
		)
	}
}

/*
              

*/