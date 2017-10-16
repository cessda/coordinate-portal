import React from 'react';
import {SearchBox} from 'searchkit';
import * as utilityComponents from '../utilities/componentUtility';

export class Header extends React.Component {
  componentDidMount() {
    $('.nav-toggle').on('click', function () {
      if (!$('.nav .nav-toggle').hasClass('is-active')) {
        $('.nav .nav-toggle').addClass('is-active');
        $('.nav .nav-menu').addClass('is-active');
      } else {
        $('.nav .nav-toggle').removeClass('is-active');
        $('.nav .nav-menu').removeClass('is-active');
      }
    });
  }

  render() {
    return (
      <header className="container is-fluid  is-fullwidth">
        <div className="cessda_top"/>
        <nav className="nav">
          <span className="nav-toggle">
            <i className="fa fa-search" aria-hidden="true"/>
          </span>

          <div className="nav-left">
            <div className="nav-item">
              <div className="cessda"><a href="/">cessda</a></div>
              <div className="cessda_beta">Products and Services Catalogue</div>
              <span className="cessda_beta--red">Beta Version</span>
            </div>
          </div>

          <div className="nav-right nav-menu">
            <div className="nav-item">
              <SearchBox
                autofocus={true}
                searchOnChange={true}
                placeholder="Find Social and Economic Research Data"
                prefixQueryFields={['_all^1']}
                queryFields={['_all']}
                queryBuilder={utilityComponents.functionCESSDAQueryBuilder}/>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
