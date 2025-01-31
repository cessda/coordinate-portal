export interface esIndex {
  indexName: string;
  languageCode: string;
  language: string;
  excludeFilters: Array<string>; // Use any of the following:  "topic", "keywords", "publisher", "country", "collectionYear", "timeMethod", "timeMethodCV". See also src/containers/SearchPage.tsx.
}


export type ThematicView = {
  key: string | "cdc";
  path: string | "/";
  defaultIndex: string | "cmmstudy_en";
  title: string | "CESSDA Data Catalogue";
  longTitle: string | "CESSDA Data Catalogue";
  rootClass: string | "cdc";
  logo: string | "cdc.svg";
  icon: string | "cdc-icon.png";
  favicon: string | "cdc-favicon.png";
  esIndexes: Array<esIndex>;
  excludeFields: Array<string>;  // Use any field names as specified in the return statement of getStudyModel() in common/metadata.ts. See also src/components/Detail.tsx.
  excludeFilters: Array<string>; // Use any of the following:  "topic", "keywords", "publisher", "country", "collectionYear", "timeMethod", "timeMethodCV". See also src/containers/SearchPage.tsx.
};


export const thematicViews: readonly ThematicView[] = [
  {
    "key": "cdc",
    "path": "/",
    "defaultIndex": "cmmstudy_en",
    "title": "Data Catalogue",
    "longTitle": "CESSDA Data Catalogue",
    "rootClass": "cdc",
    "logo": "cdc.svg",
    "icon": "cdc-icon.svg",
    "favicon": "cdc-favicon.png",
    "esIndexes":
      [
        {
          indexName: 'cmmstudy_nl',
          languageCode: 'nl',
          language: 'Dutch',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_en',
          languageCode: 'en',
          language: 'English',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_fi',
          languageCode: 'fi',
          language: 'Finnish',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_fr',
          languageCode: 'fr',
          language: 'French',
          excludeFilters: []
        },

        {
          indexName: 'cmmstudy_de',
          languageCode: 'de',
          language: 'German',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_el',
          languageCode: 'el',
          language: 'Greek',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_no',
          languageCode: 'no',
          language: 'Norwegian',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_sl', 
          languageCode: 'sl',
          language: 'Slovenian',
          excludeFilters: []
        },
        {
          indexName: 'cmmstudy_sv',
          languageCode: 'sv',
          language: 'Swedish',
          excludeFilters: []
        }
      ],
      excludeFields: [],
      excludeFilters: []
  },
  {
    "key": "coordinate",
    "path": "/coordinate",
    "defaultIndex": "coordinate_en",
    "title": "COORDINATE",
    "longTitle": "COORDINATE Portal: Child and Youth Wellbeing",
    "rootClass": "coordinate",
    "logo": "coordinate.svg",
    "icon": "coordinate-icon.svg",
    "favicon": "coordinate-favicon.png",
    "esIndexes":
      [
        {
          indexName: 'coordinate_nl',
          languageCode: 'nl',
          language: 'Dutch',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_en',
          languageCode: 'en',
          language: 'English',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_fi',
          languageCode: 'fi',
          language: 'Finnish',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_fr',
          languageCode: 'fr',
          language: 'French',
          excludeFilters: []
        },

        {
          indexName: 'coordinate_de',
          languageCode: 'de',
          language: 'German',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_el',
          languageCode: 'el',
          language: 'Greek',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_no',
          languageCode: 'no',
          language: 'Norwegian',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_sl', 
          languageCode: 'sl',
          language: 'Slovenian',
          excludeFilters: []
        },
        {
          indexName: 'coordinate_sv',
          languageCode: 'sv',
          language: 'Swedish',
          excludeFilters: []
        }
      ],
      excludeFields: [],
      excludeFilters: []
  },
  {
    "key": "hummingbird",
    "path": "/hummingbird",
    "defaultIndex": "hummingbird_en",
    "title": "HumMingBird",
    "longTitle": "HumMingBird",
    "rootClass": "hummingbird",
    "logo": "hummingbird-logo.png",
    "icon": "hummingbird-icon.svg",
    "favicon": "hummingbird-favicon.png",
    "esIndexes":
      [
        {
          indexName: 'hummingbird_en',
          languageCode: 'en',
          language: 'English',
          excludeFilters: []
        }
      ],
      excludeFields: ["publisher"],
      excludeFilters: ["publisher"]
  },
  {
    "key": "covid",
    "path": "/covid",
    "defaultIndex": "covid_en",
    "title": "BY-COVID",
    "longTitle": "BeYond-COVID: open data on SARS-CoV-2 and infections diseases",
    "rootClass": "covid",
    "logo": "covid.svg",
    "icon": "covid-icon.svg",
    "favicon": "covid-favicon.png",
    "esIndexes":
      [
        {
          indexName: 'covid_en',
          languageCode: 'en',
          language: 'English',
          excludeFilters: []
        },
        {
          indexName: 'covid_fi',
          languageCode: 'fi',
          language: 'Finnish',
          excludeFilters: []
        },
        {
          indexName: 'covid_fr',
          languageCode: 'fr',
          language: 'French',
          excludeFilters: []
        },
        {
          indexName: 'covid_de',
          languageCode: 'de',
          language: 'German',
          excludeFilters: []
        },
        {
          indexName: 'covid_el',
          languageCode: 'el',
          language: 'Greek',
          excludeFilters: []
        },
        {
          indexName: 'covid_no',
          languageCode: 'no',
          language: 'Norwegian',
          excludeFilters: []
        },
        {
          indexName: 'covid_sl', 
          languageCode: 'sl',
          language: 'Slovenian',
          excludeFilters: []
        },
        {
          indexName: 'covid_sv',
          languageCode: 'sv',
          language: 'Swedish',
          excludeFilters: []
        }
      ],
      excludeFields: [],
      excludeFilters: []
  },
];

