import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {
  Hits, Layout, LayoutBody, LayoutResults, NoHits, SearchkitManager, SearchkitProvider, SideBar
} from 'searchkit';
import * as utilityComponents from '../utilities/componentUtility';
import Header from '../components/Header';
import {Detail} from '../components/Detail';
import {Footer} from '../components/Footer.jsx';

const type = 'dc';

/* CESSDA default query to reduce result set to be CESSDA specific */
const searchkit = new SearchkitManager('/_search');
searchkit.addDefaultQuery((query) => {
  return query.addQuery(
    utilityComponents.CESSDAdefaultQuery
  );
});

require('../css/theme.css');
require('../css/reactselect.css');
require('../css/override.sass');
require('../css/design.scss');

let myLang = 'all';

function redirect() {
  var query = document.getElementById('searchbox_input').value;
  if (query != null && query != '') {
    browserHistory.push('/search?q=' + query);
  } else {
    console.log('Clicked without input');
  }
}

export class DetailPage extends Component {
  constructor(props) {

    super(props);
    this.state = {
      myLang: 'nn',
      deta: this.getDetail('init getdetail'),
      simi: [],
      url: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getDetail = this.getDetail.bind(this);
  };

  handleChange(props) {
    this.state.myLang = props;
    this.state.deta = this.getDetail();
    myLang = this.state.myLang;
    this.forceUpdate();
  };

  componentDidMount() {
    var mthis = ReactDOM.findDOMNode(this);

    document.getElementsByTagName('input')[0].setAttribute('id', 'searchbox_input');

    var searchbox_redirect = document.getElementById('searchbox_input');
    searchbox_redirect.onkeydown = function (e) {
      if (e.keyCode == 13) {
        redirect();
      }
    };
  }

  componentWillMount() {

    setTimeout(function () {
      this.state.simi = this.refs['detai'];
    }.bind(this), 1000);
  }

  componentDidUpdate() {
    this.state.index = this.state.index + 1;
  }

  getDetail(x) {
    let hits = undefined;
    hits = <Hits
      mod="sk-hits-grid"
      hitsPerPage={1}
      itemComponent={< Detail ref="detai"/>} ref="hitsComp"/>;
    setTimeout(function () {
      this.state.simi = this.refs['detai'];
    }.bind(this), 0);
    return hits;
  }

  render() {
    this.state.deta = this.getDetail();
    this.state.simi = this.refs['detai'];

    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout size="l" className="root__detail">
          <Header/>
          <LayoutBody className="columns">
            <LayoutResults className="column is-12">
              <div className="dsn-detail-backToResults">
                <a onClick={browserHistory.goBack}>
                  <div> Back to Results</div>
                </a>
              </div>
              {this.state.deta}
              <NoHits/>
            </LayoutResults>
          </LayoutBody>
          <Footer/>
        </Layout>
      </SearchkitProvider>
    );
  }
}
