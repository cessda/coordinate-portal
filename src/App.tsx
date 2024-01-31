import React from "react";
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

// Use simple router to easily check keys for various instantsearch components
// import { simple } from 'instantsearch.js/es/lib/stateMappings';
// const routing = {
//   router: history(),
//   stateMapping: simple(),
// };

const Root = () => {
  const { t, i18n } = useTranslation();
  const index = useAppSelector((state) => state.search.index);
  const location = useLocation();

  const routing = {
    router: history({
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
        // const indexState = routeState['instant_search'] || {};
        const queryString = qsModule.stringify(routeState);
  
        // if (!indexState.query) {
        //   return `${origin}${pathname}${hash}`;
        // }
  
        // return `${origin}${pathname}?${queryString}${hash}`;

        // Don't add query params in the address if not on front/search page
        // and don't add ? on front/search page either when there are no actual query params
        if (pathname !== "/" || queryString === '') {
          return `${origin}${pathname}`;
        }
        else {
          return `${origin}${pathname}?${queryString}`;
        }        
      },
      writeDelay: 400
    }),
    stateMapping: {
      stateToRoute(uiState: any) {
        const indexUiState = uiState[index];
        return {
          q: indexUiState.query,
          // categories: indexUiState.menu?.categories,
          topics: indexUiState.refinementList?.classifications,
          keywords: indexUiState.refinementList?.keywords,
          publisher: indexUiState.refinementList?.publisher,
          collectionYear: indexUiState.range?.collectionYear,
          country: indexUiState.refinementList?.country,
          timeMethod: indexUiState.refinementList?.timeMethod,
          resultsPerPage: indexUiState.hitsPerPage,
          page: indexUiState.page,
          sortBy: indexUiState.sortBy,
        };
      },
      routeToState(routeState: any) {
        return {
          [index]: {
            query: routeState.q,
            // menu: {
            //   categories: routeState.categories,
            // },
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
            sortBy: routeState.sortBy,
          },
        };
      },
    },
  };

  return (
    <InstantSearch searchClient={searchClient}
                  indexName={index}
                  routing={routing}
                  // initialUiState={{
                  //   [index]: {
                  //     query: '',
                  //     refinementList: {
                  //       classifications: [],
                  //       keywords: [],
                  //       publisher: [],
                  //       country: [],
                  //       timeMethod: [],
                  //     },
                  //     range: {
                  //       collectionYear: null,
                  //     },
                  //     hitsPerPage: 30,
                  //     page: 1,
                  //     sortBy: index,
                  //   },
                  // }}
                  >
      <Header />
      <div id="stripe" />
      <main id="main" className="container">
        <ScrollRestoration />
        {location.pathname !== '/' &&
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

// import { Component } from "react";
// import { AnyAction, bindActionCreators } from "redux";
// import { connect, Dispatch } from "react-redux";
// import { initSearchkit, updateTotalStudies } from "../actions/search";
// import { initTranslations } from "../actions/language";
// import { initThemes } from "../actions/theme";

// interface Props extends ReturnType<typeof mapDispatchToProps> {
//   children: JSX.Element
// }

// export class App extends Component<Props> {

//   constructor(props: Props) {
//     super(props);
//     this.props.initSearchkit();
//     this.props.initTranslations();
//     this.props.initThemes();
//     this.props.updateTotalStudies();
//   }

//   render() {
//     return this.props.children;
//   }
// }

// export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
//   return {
//     initSearchkit: bindActionCreators(initSearchkit, dispatch),
//     initTranslations: bindActionCreators(initTranslations, dispatch),
//     initThemes: bindActionCreators(initThemes, dispatch),
//     updateTotalStudies: bindActionCreators(updateTotalStudies, dispatch)
//   };
// }

// export default connect(null, mapDispatchToProps)(App);
