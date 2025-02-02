import { createSlice } from "@reduxjs/toolkit";
import { ThematicView, thematicViews, esIndex } from "../utilities/thematicViews";


export interface ThematicViewState {
  currentThematicView: ThematicView;
  list: readonly ThematicView[];
  currentIndex: esIndex;
}

// (OC 11.2024) Initialise the Thematic View and language (index) state from URL path (example: datacatalogue.cessda.eu/coordinate).
// For the sake of completeness, default to the root Thematic View (defined in src/utilities/thematicViews.ts using the path "/").
// However, any routes not defined in App.tsx or derived therein from the path config in thematicViews.ts will result in a page not found.

const initialPath = "/" + location.pathname.split('/')[1];
const initialView = thematicViews.find((tv) => tv.path === initialPath ) as ThematicView || thematicViews.find((tv) => tv.path === "/") as ThematicView;
const initialIndex= initialView.esIndexes.find((i) => i.indexName === initialView.defaultIndex ) as esIndex;

// (OC 11.2024) Take the opportunitiy to set the body class for thematic view styling while initialising state.
document.body.className = initialView.rootClass;

const initialState: ThematicViewState = {
  currentThematicView: initialView,
  list: thematicViews,
  currentIndex: initialIndex
};

const thematicViewSlice = createSlice({
  name: "thematicView",
  initialState: initialState,
  reducers: {
    updateThematicView: (state, action) => {
      let path = action.payload.path;
      const thematicView = thematicViews.find(element => element.path === path);
      let title: string;
      let key: string;
      let longTitle: string;
      let rootClass: string;
      let defaultIndex: string;
      let logo: string;
      let icon: string;
      let favicon: string;
      let esIndexes: Array<esIndex>;
            
      if (!thematicView) {
        path = "/";
        title = thematicViews.find(element => element.path === path)?.title || '';
        key = thematicViews.find(element => element.path === path)?.key || '';
        longTitle = thematicViews.find(element => element.path === path)?.longTitle || '';
        rootClass = thematicViews.find(element => element.path === path)?.rootClass || '';
        defaultIndex = thematicViews.find(element => element.path === path)?.defaultIndex || '';
        logo = thematicViews.find(element => element.path === path)?.logo || '';
        icon = thematicViews.find(element => element.path === path)?.icon || '';
        favicon = thematicViews.find(element => element.path === path)?.favicon || '';
        esIndexes = thematicViews.find(element => element.path === path)?.esIndexes || [];           
        
      } else {
        path = thematicView.path;
        title = thematicViews.find(element => element.path === path)?.title || '';
        key = thematicViews.find(element => element.path === path)?.key || '';
        longTitle = thematicViews.find(element => element.path === path)?.longTitle || '';
        rootClass = thematicViews.find(element => element.path === path)?.rootClass || '';
        defaultIndex = thematicViews.find(element => element.path === path)?.defaultIndex || '';
        logo = thematicViews.find(element => element.path === path)?.logo || '';
        icon = thematicViews.find(element => element.path === path)?.icon || '';
        favicon = thematicViews.find(element => element.path === path)?.favicon || '';  
        esIndexes = thematicViews.find(element => element.path === path)?.esIndexes || [];    
      }
      state.currentIndex=action.payload.esIndex;      
      state.currentThematicView = {key: key, title: title, path: path, longTitle: longTitle, rootClass: rootClass, defaultIndex: defaultIndex, logo: logo, icon: icon, favicon: favicon, esIndexes: esIndexes};
            
            
    },
  }
});

export const { updateThematicView } = thematicViewSlice.actions;

export default thematicViewSlice.reducer;

