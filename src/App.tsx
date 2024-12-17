import React, { useEffect, useRef } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation, ScrollRestoration, RouteObject, useMatches } from "react-router-dom";
import SearchPage, { getSortByItems } from "./containers/SearchPage";
import DetailPage, {studyLoader} from "./containers/DetailPage";
import AboutPage, {metricsLoader} from "./containers/AboutPage";
import RestApiPage from "./containers/RestApiPage";
import UserGuidePage from "./containers/UserGuidePage";
import AccessibilityStatementPage from "./containers/AccessibilityStatementPage";
import NotFoundPage from "./containers/NotFoundPage";
import ErrorPage from "./containers/ErrorPage";
import { InstantSearch } from "react-instantsearch";
import Favicon from "react-favicon";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { VirtualRefinementList, VirtualRangeInput, VirtualSortBy } from "./components/VirtualComponents";
import searchClient from "./utilities/searchkit";
import { history } from "instantsearch.js/es/lib/routers";
import { useAppSelector } from "./hooks";
import { useTranslation } from "react-i18next";
import { thematicViews } from "./utilities/thematicViews";
import { languages } from "./utilities/language";


// Use simple router to easily check keys for various instantsearch components
// import { simple } from 'instantsearch.js/es/lib/stateMappings';
 //const routing = {
   // router: history(),
  //stateMapping: simple(),
 //};




const Root = () => {
  const { t } = useTranslation();
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  const currentIndex = useAppSelector((state) => state.thematicView.currentIndex);
  const locationHook = useLocation();
 
  const faviconFolder = require.context('./img/favicons/', true, /\.(jpe?g|png|gif|svg)$/)
  const faviconImg = faviconFolder(`./${currentThematicView.favicon}`);
  
  // Create an array of all the sortBy options for all the languages
  let virtualSortByItems: { value: string, label: string }[] = [];
  languages.forEach(language => {
    const sortByItems = getSortByItems(language.index, t);
    virtualSortByItems = virtualSortByItems.concat(sortByItems);
  });

  const onUpdateRef = useRef(() => {});

  useEffect(() => {
    onUpdateRef.current();
  }, [locationHook.search]);

 const routing = {
    router: history({
      // Synchronize InstantSearch’s router with changes to query params in react-router (location.search)
      start(onUpdate) {
        onUpdateRef.current = onUpdate;
      },
      parseURL({ qsModule, location }) {
        return qsModule.parse(location.search.slice(1));
      },
      windowTitle({ query }) {
        const queryTitle = (query !== '' && query !== undefined) ? `${currentThematicView.title} - ${t("search.title")} "${query}"` :
                                                                  `${currentThematicView.title}  - ${t("search.label")}`;
        return queryTitle;
      },
      createURL({ qsModule, location, routeState }) {
        const { origin, pathname, hash } = location;
        // Combine query params from location and route state while giving preference to route state
        const combinedQueryParams = { ...qsModule.parse(location.search.slice(1)), ...routeState };

        // Not sure why it doesn't really handle this correctly by default
        // e.g. entering a link with ?keywords=youth will not work
        // but it will still automatically change ?keywords[0]=youth into ?keywords=youth and work just fine
        // Add brackets to all values that are in an array
        Object.keys(combinedQueryParams).forEach((key) => {
          const attribute = key as keyof typeof combinedQueryParams;
          const attributeValues = combinedQueryParams[key];
          if (Array.isArray(attributeValues)) {
            attributeValues.forEach((value, i) => {
              combinedQueryParams[`${attribute}[${i}]`] = value;
            });
            delete combinedQueryParams[attribute];
          }
        });

        // Create query string with InstantSearch state and other query parameters
        const queryString = qsModule.stringify(
          {
            ...combinedQueryParams,
          },
          {
            addQueryPrefix: true,
            arrayFormat: 'repeat',
          }
        );

        return `${origin}${pathname}${queryString}${hash}`
      },
      // Whether the URL is cleaned up from active refinements when the router is disposed of
      cleanUrlOnDispose: true,
      // Number of milliseconds the router waits before writing the new URL to the browser
      writeDelay: 100
    }),
    stateMapping: {
      stateToRoute(uiState: any) {
        const indexUiState = uiState[currentIndex] || {};
        return {
          query: indexUiState.query,
          classifications: indexUiState.refinementList?.classifications,
          keywords: indexUiState.refinementList?.keywords,
          publisher: indexUiState.refinementList?.publisher,
          collectionYear: indexUiState.range?.collectionYear,
          country: indexUiState.refinementList?.country,
      //    timeMethod: indexUiState.refinementList?.timeMethod,
          timeMethodCV: indexUiState.refinementList?.timeMethodCV,
          resultsPerPage: indexUiState.hitsPerPage,
          page: indexUiState.page,
          // Could remove the common part of index name but would need to check what else needs to be changed
          // elsewhere, e.g. Header, LanguageSelector, DetailPage, SearchPage, and how it works
          sortBy: indexUiState.sortBy // && indexUiState.sortBy.replace('coordinate_', '')
        };
      },
      routeToState(routeState: any) {
        return {
          [currentIndex]: {
            query: routeState.query,
            refinementList: {
              classifications: routeState.classifications,
              keywords: routeState.keywords,
              publisher: routeState.publisher,
              country: routeState.country,
           //   timeMethod: routeState.timeMethod,
              timeMethodCV: routeState.timeMethodCV
            },
            range: {
              collectionYear: routeState.collectionYear,
            },
            hitsPerPage: routeState.resultsPerPage,
            page: routeState.page,
            // Could remove the common part of index name but would need to check what else needs to be changed
            // elsewhere, e.g. Header, LanguageSelector, DetailPage, SearchPage, and how it works
            sortBy: routeState.sortBy // && routeState.sortBy.replace('coordinate_', '')
          },
        };
      }
    },
  };

  return ( 
    
    <InstantSearch searchClient={searchClient}
                  indexName={currentIndex}
                  // routing can't use updated values from redux store when key is null
                  // Could use index as key to make sure everything is always perfect and store values could be used but
                  // then it re-renders even when not really needed (like switching language on detail page)
                  //key={key}
                  routing={routing}
                 // routing={true}
                  future={{
                    // If false, each widget unmounting will also remove its state, even if multiple widgets read that UI state
                    // If true, each widget unmounting will only remove its state if it's the last of its type
                    preserveSharedStateOnUnmount: true
                  }}>
                   
        <Favicon url={faviconImg} />
       
      <Header />
      
      <main id="main">
      
      <span className="is-size-7">
      {location.search.slice(1)}
      
    Current index: { currentIndex } TV path: { currentThematicView.path }
      
         
         </span>
        <div className="container">
        <ScrollRestoration />
        {locationHook.pathname !== currentThematicView.path &&
          <>
            <VirtualRefinementList attribute="virtual" />
            <VirtualRangeInput attribute="virtual" />
            <VirtualSortBy items={virtualSortByItems} />
          </>
        }
        <Outlet />
        </div>
      </main>
      <Footer />
    </InstantSearch>
  );
};


// (OC 11.2024) Build Thematic View routes from paths in src/utilities/thematicViews.ts

const routes: RouteObject[] = thematicViews.map(thematicView =>  {
  return({
  path: thematicView.path,
  element: <Root />,
  errorElement: <ErrorPage />,
  children: [
    { path: "", element: <SearchPage /> },
    { path: "about", element: <AboutPage />, loader: metricsLoader },
    { path: "detail/:id", element: <DetailPage />, loader: studyLoader},
    { path: "documentation", element: <UserGuidePage /> },
    { path: "rest-api", element: <RestApiPage /> },
    { path: "accessibility-statement", element: <AccessibilityStatementPage /> },
    { path: "*", element: <NotFoundPage />}
  ]
})
}
);
const router = createBrowserRouter(routes);
const App = () => {

  return (
 
  <RouterProvider router={router} />
 
  );
};

export default App;
