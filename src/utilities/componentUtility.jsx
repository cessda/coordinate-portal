import * as React from 'react';
import {FaExternalLink} from 'react-icons/lib/fa';
import counterpart from 'counterpart';

// mind preference of doi and urn
export function makeSourceURL( identifiers, id ) {
  let surl="", rurl="";
  let identifierWorldbank = "api_worldbank";
  identifiers = identifiers.sort();
  for (var i = 0; i < identifiers.length; i++) {
    var curID = identifiers[ i ].trim();
    if ( _.startsWith( curID,"10." ) || _.startsWith(curID, "doi:" ) ) {
      rurl= "http://dx.doi.org/" + identifiers[ i ].trim();
    }
    if ( _.startsWith(curID, "urn:nbn:de:" ) ) {
      rurl= "https://nbn-resolving.org/" + identifiers[ i ].trim();
    }
    if ( _.includes(curID, "hdl" ) ) {
      let handle = curID.replace("hdl:", "");
      rurl = 'https://hdl.handle.net/' + handle.trim()
    }
    if ( _.startsWith( curID, "http" ) ) {
      rurl = curID;
    }
  }
  if(rurl===""){
  }
  return rurl;
}


export function makeContributors(data,sclass) {
  let ds = [];
  ds.push( React.DOM.span({ key: 0 },  "Contributors: " ));
  for (var i=0; i < data.length; i++) {
    if(i<4){
      ds.push( React.DOM.span({ key: i + 1 },  data[i] +" "));
    }
    if(i==4){
      ds.push( React.DOM.span({ key: i + 1 },  (data.length-4) + " more" ));
    }
  }
  return React.DOM.div({ className: sclass },ds);
}

export function makeCreators(data,sclass) {

  let ds = [];
  data = _.uniq( data );
  ds.push( React.DOM.span({ key: 0 },  "" ));
  for (var i=0; i < data.length; i++) {

    if(i<3){
      if(i < data.length-1 && i!=2 ){
        ds.push( React.DOM.span({ key: i + 1 }, data[ i ].trim() + "; " ) );
      }else{
        ds.push( React.DOM.span({ key: i + 1 }, data[ i ].trim() ) );
      }
    }
    if(i==3){
      ds.push( React.DOM.span({ key: i + 1 },  " ( "+ (data.length-3) + " more )" ));
      break;
    }
  }
  return React.DOM.div({ className: sclass },ds );
}




export function makeDates(data,sclass){

  if(data===undefined){
    return "no date";
  }
  let ds = [];
  ds.push( React.DOM.span({ key: 0 },  "Date: " ));
  for (var i=0; i < data.length; i++) {
    if(i<1){
      ds.push( React.DOM.span({ key: i + 1 },  data[i]+" " ));
    }
    if(i==1){
      ds.push( React.DOM.span({ key: i + 1 },  (data.length-4) + " more" ));
    }
  }

  return React.DOM.div({ className: sclass },ds);
}

export function langHandler(container, lang){

  if(container === undefined){
    return undefined;
  }
  let langBag = container[lang];
  if(langBag !== undefined){

    return langBag;
  }
  if(langBag===undefined && lang !=='en'){

    langBag = container.en;
  }
  if(langBag===undefined && lang !=='nn'){

    langBag = container.nn;
  }
  if(langBag===undefined && lang !=='de'){

    langBag = container.de;
  }

  return  langBag;

}

export function detailLink(sclass, more, id, intid){
 let ds = [];
  let striptags = require('striptags');
  if(more!==undefined&& more !=""){
    let identifierWorldbank = "api_worldbank";
    if(id.includes(identifierWorldbank)){

      return React.DOM.a({
          key: 0,
          className: 'button is-small is-white',
          href: more,
          target: '_blank'
        }, React.createElement('span', {
          className: 'icon is-small'
        }, React.createElement(FaExternalLink)),
        React.createElement('span', null, counterpart.translate('goToCollection')));

      // ds.push( React.DOM.a({ key: 0, className:"go-to-collection",href:more, target:"_blank"},  React.createElement(FaExternalLink,null), counterpart.translate('goToCollection')));
    }else {

      return React.DOM.a({
          key: 1,
          className: 'button is-small is-white',
          href: more,
          target: '_blank'
        }, React.createElement('span', {
          className: 'icon is-small'
        }, React.createElement(FaExternalLink)),
        React.createElement('span', null, counterpart.translate('goToStudy')));

      // ds.push( React.DOM.a({ key: 1, className:"go-to-study",href:more, target:"_blank"},  React.createElement(FaExternalLink,null), counterpart.translate('goToStudy')));
    }
  }
  // if(id!==undefined){
  //   ds.push(React.DOM.span( {className:"readMore"},React.DOM.a({ href:'detail?q="'+id.trim()+'"&detail=true&sort=identifier_desc'}, "read more")));
  // }

  return React.DOM.div({ className: sclass },React.DOM.div(null, ds));
}

export function makeDescription(data, sclass, more, id, context){
  let ds = [];
  let identifierWorldbank = "api_worldbank";
  let striptags = require('striptags');

  context.description = '';
  context.readMoreLabel = 'Read more';

  for (var i=0; i < data.length; i++) {
    if (data[i].toLowerCase() !== 'abstract') {
      context.description += ' ' + striptags(data[i]);
    }
    // if(i<1){
    //   if(data[0] === "Abstract"){
    //     context.descriptionLong = striptags(data[1]);
    //     context.descriptionShort = context.descriptionLong.substring(0, 500);
    //     ds.push(<span dangerouslySetInnerHTML={ {__html:(striptags(data[0]))}}></span>, <br />, <span dangerouslySetInnerHTML={ {__html:(striptags(data[1]).substring(0,500) + '...')}}></span>)
    //   }else{
    //     ds.push(<span dangerouslySetInnerHTML={ {__html:(striptags(data[i]).substring(0,500) + '...')}}></span>);
    //   }
    // }
    // ds.push(React.DOM.div());
  }
  context.descriptionShort = context.description.substring(0, 500);
  context.descriptionLong = context.description;

  ds.push(<span dangerouslySetInnerHTML={ {__html:context.description}}></span>);

  if(more!==undefined){
    if(id.includes(identifierWorldbank)){
      ds.push( React.DOM.a({className:"readMore is-pulled-right",href:more, target:"_blank"},  React.createElement(FaExternalLink,null), counterpart.translate('goToCollection')));
    }else {
      ds.push( React.DOM.a({className:"readMore is-pulled-right",href:more, target:"_blank"},  React.createElement(FaExternalLink,null), counterpart.translate('goToStudy')));
    }
  }
  // if(id!==undefined){
  //   context.readMore = function() {
  //     if (context.readMoreLabel === 'Read more') {
  //       console.log('read more');
  //       context.readMoreLabel = 'Read less';
  //       context.description = context.descriptionLong;
  //     } else {
  //       console.log('read less');
  //       context.readMoreLabel = 'Read more';
  //       context.description = context.descriptionShort;
  //     }
  //     context.forceUpdate();
  //   };
  //
  //   ds.push(<a onClick={context.readMore}>{context.readMoreLabel}</a>);
  //
  //   // ds.push(React.DOM.span( {className:"readMore"},React.DOM.a({ href:'detail?q="'+id.trim()+'"&detail=true&sort=identifier_desc'}, "read more")));
  // }

  return React.DOM.div({ className: sclass }, React.DOM.br, React.DOM.div(null, ds));
}
