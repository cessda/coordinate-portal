import React, {Component} from 'react';
import {ActionBar, ActionBarRow, SortingSelector, PageSizeSelector, HitsStats, Toggle } from "searchkit";
import * as utilityComponents from "./componentUtility";
import {Buttons_AdvOptions} from "./Buttons_AdvOptions.jsx";


export class UtilityTopBar extends Component {
      render() {
        return (
          <div className="utility-topbar">
            <div className="utility-topbar__statsButton columns is-mobile">
                <HitsStats component={utilityComponents.customHitStats} />
                <Buttons_AdvOptions />
            </div>
            <div className="dsn-list-options columns">
                <div className="dsn-list-rlf column is-3 is-offset-2-tablet">
                  <SortingSelector listComponent={Toggle} options={[
                    {label:"Relevance", field:"_score", order:"desc", defaultOption:true},
                    {label:"Latest", field:"oaiDatestamp", order:"desc"},
                    {label:"First", field:"oaiDatestamp", order:"asc"}
                  ]}/>
                </div>
                <div className="dsn-list-pss column is-2 is-offset-3">
                  <PageSizeSelector options={[10,30,50,150]} listComponent={Toggle} />
                </div>
          </div>
        </div>
          )
        }
      }
