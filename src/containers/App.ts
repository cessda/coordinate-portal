// Copyright CESSDA ERIC 2017-2021
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { initSearchkit } from "../actions/search";
import { initTranslations } from "../actions/language";
import { Dispatch } from "../types";

type Props = {
  initSearchkit: () => void;
  initTranslations: () => void;
  children: JSX.Element;
};

export class App extends Component<Props> {

  constructor(props: Props) {
    super(props);
    props.initSearchkit();
    props.initTranslations();
  }

  render() {
    return this.props.children;
  }
}

export const mapDispatchToProps = (dispatch: Dispatch): {
  [key: string]: any;
} => {
  return {
    initSearchkit: bindActionCreators(initSearchkit, dispatch),
    initTranslations: bindActionCreators(initTranslations, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(App);
