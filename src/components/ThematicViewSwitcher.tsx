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

import React from "react";
import { useAppSelector } from "../hooks";
import { ThematicView } from "../utilities/thematicViews";
import { IndexDropdownMenu } from "./ThematicViewDropdownMenu";




  const ThematicViewSwitcher = () => {
      
  const thematicView = useAppSelector((state) => state.thematicView);
    const currentKey =thematicView.currentThematicView.key;

  const navItems=thematicView.list.map((thematicView: ThematicView, i) => (
    {
      title: thematicView.title,
    icon: require('../img/icons/' + thematicView.icon),
    url: thematicView.path,
    key: thematicView.key
    }
    ));
  return (
   
  
    <IndexDropdownMenu
    buttonLabel="Collection" 
    currentKey={currentKey} 
    items={navItems}
  />
      
  );
};

export default ThematicViewSwitcher;
