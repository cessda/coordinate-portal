import React, { useEffect, useRef } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation, ScrollRestoration } from "react-router-dom";
import SearchPage from "./containers/SearchPage";
import DetailPage, {studyLoader} from "./containers/DetailPage";
import AboutPage, {metricsLoader} from "./containers/AboutPage";
import UserGuidePage from "./containers/UserGuidePage";
import AccessibilityStatementPage from "./containers/AccessibilityStatementPage";
import NotFoundPage from "./containers/NotFoundPage";
import ErrorPage from "./containers/ErrorPage";
import { InstantSearch } from "react-instantsearch";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { VirtualRefinementList, VirtualRangeInput } from "./components/VirtualComponents";
import searchClient from "./utilities/searchkit";
import { history } from "instantsearch.js/es/lib/routers";
import { useAppSelector } from "./hooks";
import { useTranslation } from "react-i18next";
import { languages } from './utilities/language';

// Use simple router to easily check keys for various instantsearch components
// import { simple } from 'instantsearch.js/es/lib/stateMappings';
// const routing = {
//   router: history(),
//   stateMapping: simple(),
// };

const Root = () => {
  const { t } = useTranslation();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const locationHook = useLocation();
  const indices: string[] = languages.map(language => language.index);
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
        const queryTitle = (query !== '' && query !== undefined) ? `${t("datacatalogue")} - ${t("search.title")} "${query}"` :
                                                                  `${t("datacatalogue")} - ${t("search.label")}`;
        return queryTitle;
      },
      createURL({ qsModule, location, routeState }) {
        const { origin, pathname, hash } = location;
        // Get query params from URL
        let queriesFromUrl = qsModule.parse(location.search.slice(1));
        let queryParams = { ...routeState };

        // Remove sortBy if its value is just index (which means default sort)
        // Otherwise just get values from InstantSearch state
        // Not needed if using key param with InstantSearch element
        if(routeState.sortBy && indices.includes(routeState.sortBy as string)){
          const { sortBy, ...rest } = queryParams;
          queryParams = { ...rest };
        }
        // Not sure why it doesn't really handle this correctly by default
        // e.g. entering keywords=lapset%20(ik%C3%A4ryhm%C3%A4) will not work
        // but it will still automatically change keywords[0]=lapset%20(ik%C3%A4ryhm%C3%A4)
        // into it after correctly loading
        if(routeState.keywords && Array.isArray(routeState.keywords)){
          routeState.keywords.forEach((keyword, i) => {
              queryParams[`keywords[${i}]`] = keyword;
          });
          delete queryParams.keywords; // Remove the original keywords parameter
        }
        // Same issue with classifications / topics as there is with keywords above
        if(routeState.topics && Array.isArray(routeState.topics)){
          routeState.topics.forEach((topic, i) => {
              queryParams[`topics[${i}]`] = topic;
          });
          delete queryParams.topics; // Remove the original topics parameter
        }
        // Only keep specific query parameters, e.g. lang, from react-router query parameters
        queriesFromUrl = Object.fromEntries(Object.entries(queriesFromUrl).filter(([key]) =>
          !Object.keys(routeState).includes(key) && key.startsWith('lang'))
        );

        // Create query string with InstantSearch state and other query parameters
        const queryString = qsModule.stringify(
          {
            ...queryParams,
            ...queriesFromUrl,
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
      writeDelay: 400
    }),
    stateMapping: {
      stateToRoute(uiState: any) {
        const indexUiState = uiState[currentLanguage.index] || {};
        return {
          q: indexUiState.query,
          topics: indexUiState.refinementList?.classifications,
          keywords: indexUiState.refinementList?.keywords,
          publisher: indexUiState.refinementList?.publisher,
          collectionYear: indexUiState.range?.collectionYear,
          country: indexUiState.refinementList?.country,
          timeMethod: indexUiState.refinementList?.timeMethod,
          resultsPerPage: indexUiState.hitsPerPage,
          page: indexUiState.page,
          // Could remove the common part of index name but would need to think of a good way to handle it elsewhere
          // e.g. currentRefinement check on the searchPage since that's where sortBy is used
          // and the check here in createURL to see if sortBy query param should be shown or not
          sortBy: indexUiState.sortBy // && indexUiState.sortBy.replace('coordinate_', '')
        };
      },
      routeToState(routeState: any) {
        return {
          [currentLanguage.index]: {
            query: routeState.q,
            refinementList: {
              classifications: routeState.topics,
              keywords: routeState.keywords,
              publisher: routeState.publisher,
              country: routeState.country,
              timeMethod: routeState.timeMethod,
            },
            range: {
              collectionYear: routeState.collectionYear,
            },
            hitsPerPage: routeState.resultsPerPage,
            page: routeState.page,
            // Could remove the common part of index name but would need to think of a good way to handle it elsewhere
            // Currently just the currentRefinement check on the searchPage since that's where sortBy is used
            // and the check here in createURL to see if sortBy query param should be shown or not
            sortBy: routeState.sortBy // && routeState.sortBy.replace('coordinate_', '')
          },
        };
      }
    },
  };

  return (
    <InstantSearch searchClient={searchClient}
                  indexName={currentLanguage.index}
                  // routing can't use updated values from redux store when key is null
                  // Could use index as key to make sure everything is always perfect and store values could be used but
                  // then it re-renders even when not really needed (like switching language on detail page)
                  //key={key}
                  routing={routing}
                  future={{
                    // If false, each widget unmounting will also remove its state, even if multiple widgets read that UI state
                    // If true, each widget unmounting will only remove its state if it's the last of its type
                    preserveSharedStateOnUnmount: true
                  }}>
      <Header />
      <div id="stripe" />
      <main id="main" className="container">
        <ScrollRestoration />
        {locationHook.pathname !== '/' &&
          <>
            <VirtualRefinementList attribute="virtual" />
            <VirtualRangeInput attribute="virtual" />
            {/* <VirtualRefinementList attribute="classifications" />
            <VirtualRefinementList attribute="keywords" />
            <VirtualRefinementList attribute="publisher" />
            <VirtualRefinementList attribute="country" />
            <VirtualRefinementList attribute="timeMethod" />
            <VirtualRangeInput attribute="collectionYear" /> */}
          </>
        }
        <Outlet />
      </main>
      <Footer />
    </InstantSearch>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <SearchPage /> },
      { path: "about", element: <AboutPage />, loader: metricsLoader },
      { path: "detail/:id", element: <DetailPage />, loader: studyLoader},
      { path: "documentation", element: <UserGuidePage /> },
      { path: "accessibility-statement", element: <AccessibilityStatementPage /> },
      { path: "*", element: <NotFoundPage />}
    ],
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
