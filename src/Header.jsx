import React, {Component} from 'react';
import {ActionBar, SearchBox} from "searchkit";
import * as utilityComponents from "./componentUtility";


export class Header extends Component {
    componentDidMount(){
            $(".nav-toggle").on("click", function(){
                if(!$(".nav .nav-toggle").hasClass("is-active")){
                    $(".nav .nav-toggle").addClass("is-active");
                    $(".nav .nav-menu").addClass("is-active");
                } else {
                    $(".nav .nav-toggle").removeClass("is-active");
                    $(".nav .nav-menu").removeClass("is-active");
                }
            });
          }
          
      render() {
        return (
            <header className="container is-fluid  is-fullwidth">
              <div className="cessda_top"></div>
                <nav className="nav">
                  <span className="nav-toggle">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>

                  <div className="nav-left">
                    <div className="nav-item">
                      <div className="cessda"><a href="/search">cessda</a></div>
                      <div className="cessda_beta">Products and Services Catalogue </div>
                      <span className="cessda_beta--red">Beta Version</span>
                    </div>
                  </div>


                  <div className="nav-right nav-menu">
                    <div className="nav-item">
                    <SearchBox
                      autofocus={true}
                      searchOnChange={true}
                      placeholder="Find Social and Economic Research Data"
                      prefixQueryFields={ ["_all^1"] }
                      queryFields={ ["_all"] }
                      queryBuilder={utilityComponents.functionCESSDAQueryBuilder}
                    />
                    </div>
                  </div>
                </nav>
                
              </header>
        )
      }
}