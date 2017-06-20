import * as React from "react";
import ReactDOM from 'react-dom';
import { SearchkitManager } from "searchkit";

let elasticsearch = require( 'elasticsearch' );

const type = "dc";
const maxLength = 200;
let similarData = [];
let  client =null;

// esURL gets replaced by definePlugin
let elastic= esURL;

let striptags = require( 'striptags' );
export class Similars extends React.Component {
  constructor(props) {
    client = new elasticsearch.Client({
      host: elastic,
      log: 'trace'
    });


    super(props);
    let tob = {};
    tob['dc.title.all'] = this.props.input[0];
    let sob = {};
    sob['dc.subject.all'] = this.props.input.slice(1, this.props.input.length);


    this.state = {
      terms: this.props.input,
      currentEsid: this.props.curEsid,
      ssimilarData: similarData,
      loading: true,
      searchParams: {
        index: type,
        size: 10,
        fields: [
          "dc.title.all",
          "dc.description.all",
          "dc.subject.all",
          "esid"
        ],
        body: {
          query: {
            filtered: {
              query: {
                match: {
                  // match title
                  _all: this.props.input[0]
                }
              }
            }
          }
        }
      }
    };

  };


  componentDidMount() {
    this.t = client.search(this.state.searchParams).then(function (body) {
      setTimeout(function () {
        let hits = body.hits.hits;
        for (var int = 0; int < hits.length; int++) {
          this.state.ssimilarData.push(hits[int]);
        }
        this.setState({
          loading: false
        });
      }.bind(this), 40);
    }.bind(this));
  }


  render() {

    if (this.state.loading == true) {

      return (
        <div>
          Loading...
        </div>
      )
    } else {
      let divStyle = {
        display: 'none'
      };

      let htm = [];
      let datacount = 1; /* Value has to be 1 in order to skip the current dataset in the elasticsearch query, which is always the first result with the highest score*/

      if (this.state.ssimilarData.length !== 0 && (this.state.ssimilarData[2]!== undefined)) { // check whether one similar dataset is found
        let nrToShow = 3;

        for (var int = 0; int < nrToShow; int++) {
          let tit = "test";
            if (this.state.ssimilarData[datacount].fields["dc.description.all"] !== undefined) {
              if (this.state.ssimilarData[datacount].fields["dc.description.all"][0] !== "" || this.state.ssimilarData[datacount].fields["dc.description.all"][0] !== null) {
                tit = this.state.ssimilarData[datacount].fields["dc.description.all"][0];
              }
            } else {
              if(this.state.ssimilarData[datacount].fields["dc.title.all"][0] !== "" || this.state.ssimilarData[datacount].fields["dc.title.all"][0] !== null)
              {
              tit = this.state.ssimilarData[datacount].fields["dc.title.all"][0];
              } else
                tit = "Neither requested title nor description given";
            }


            if (this.state.ssimilarData[datacount]._id != this.state.currentEsid && this.state.ssimilarData.length > datacount) {
              htm.push(React.DOM.div({
                className: "simItem",
                key: 'simItem' + datacount
              }, React.DOM.a({
                href: 'detail?q="' + this.state.ssimilarData[datacount]._id + '"',
                title: tit != null ? tit : ""
              }, this.state.ssimilarData[datacount].fields["dc.title.all"][0])),);
            }

            else if (this.state.ssimilarData[datacount]._id == this.state.currentEsid && this.state.ssimilarData.length > nrToShow) {
              htm.push(React.DOM.div({
                className: "simItem",
                key: 'simItem' + datacount,
                style: divStyle
              }, React.DOM.a({
                href: 'detail?q="' + this.state.ssimilarData[datacount]._id + '"',
                title: tit != null ? tit : ""
              }, this.state.ssimilarData[datacount].fields["dc.title.all"][0])),);

              datacount++;

              htm.push(React.DOM.div({
                className: "simItem",
                key: 'simItem' + datacount
              }, React.DOM.a({
                href: 'detail?q="' + this.state.ssimilarData[datacount]._id + '"',
                title: tit != null ? tit : ""
              }, this.state.ssimilarData[datacount].fields["dc.title.all"][0])),);
            }
            datacount++;
        }
        return (
          <div className="similars" ref="similaires">
            <div className="similars-content">
              <h1 className="dsn-detail-similarHeader">Similar Data</h1>
              { htm }
            </div>
          </div>
        )
      } else {
        return(<div className="similars" ref="similaires">
          <div className="similars-content">
            <h1 className="dsn-detail-similarHeader">Similar Data</h1>
            No similar data found
          </div>
        </div>
        )
      }
    }
  }
}
