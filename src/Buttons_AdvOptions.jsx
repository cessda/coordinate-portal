import React, {Component} from 'react';
import Button from 'react-button';

export class Buttons_AdvOptions extends Component {
      render() {
        return (
              <div className="dsn-list-advOpt column is-2 is-offset-4-tablet is-offset-2-mobile">
                <a className="dsn-list-opt" href="./searchfields">Advanced</a><span>|</span>
                <a className="dsn-list-opt--disabled" id="dsn-button-history" disabled>History</a><span>|</span>
                <a className="dsn-list-opt--disabled" id="dsn-button-favorites" disabled>Favorites</a>
              </div>
        )
      }
}
