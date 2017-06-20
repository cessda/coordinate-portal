import * as React from "react";
import ReactDOM from 'react-dom';
import { SearchkitManager } from "searchkit";
let elasticsearch = require( 'elasticsearch' );

import { FaTags } from 'react-icons/lib/fa'
const type = "dc";
const maxLength = 200;
let suggestions = [];
let client = null;

// esURL gets replaced by definePlugin
let elastic = esURL;
let striptags = require( 'striptags' );
export class SubjectSuggester extends React.Component {
  constructor( props ) {
    console.log( props );

    client = new elasticsearch.Client( {
      host: elastic
    } );

    super( props );

    this.state = {
      terms: this.props.input,
      ssuggestions: suggestions,
      loading: true
    };

  };
  
  componentDidMount() {
    console.log( this.state.searchParams )
    this.t = client.suggest( {
      index: type,
      body: {
        suggests: {
          text: this.props.input!==undefined?this.props.input:"" ,
          completion: {
            field: 'dc.subject.cc'
          }
        }
      }
    } ).then( function ( body ) {
      setTimeout( function () {
        let options = body.suggests[ 0 ].options;
        for (var int = 0; int < options.length; int++) {
          this.state.ssuggestions.push( options[ int ] );

        }
        this.setState( {
          loading: false
        } );
      }.bind( this ), 40 );
    }.bind( this ) );
  }


  render() {

    if ( this.state.loading == true ) {

      return (
      <div>
        Loading...
      </div>
      )
    } else {

      let htm = [];
      let datacount = 0;
      if ( this.state.ssuggestions.length != 0 ) {
        let nrToShow = 5;

        for (var int = 0; int < nrToShow&&  int < this.state.ssuggestions.length; int++) {
          console.log( int + ":" + this.state.ssuggestions[ datacount ].text );
          htm.push( React.DOM.div( {
            className: "suggestItem"
          }, React.DOM.a( {
            href: "search?q=" + this.state.ssuggestions[ datacount ].text,
            title: this.state.ssuggestions[ datacount ].text
          }, <FaTags/>," "+ this.state.ssuggestions[ datacount ].text.slice(0,28)  )));
          datacount++;
        }
        console.log( htm );
        return (
        <div className="suggestions"
             ref="suggestions">
            { htm }
          </div>
        )
      }
      return (
      <div>
        { htm }
      </div>
      )
    }
  }
}