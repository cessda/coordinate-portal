export interface esIndex {
  indexName: string;
  languageCode: string;
  language: string;
}

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
          language: 'Dutch'
        },
        {
          indexName: 'cmmstudy_en',
          languageCode: 'en',
          language: 'English'
        },
        {
          indexName: 'cmmstudy_fi',
          languageCode: 'fi',
          language: 'Finnish'
        },
        {
          indexName: 'cmmstudy_fr',
          languageCode: 'fr',
          language: 'French'
        },

        {
          indexName: 'cmmstudy_de',
          languageCode: 'de',
          language: 'German'
        },
        {
          indexName: 'cmmstudy_el',
          languageCode: 'el',
          language: 'Greek'
        },
        {
          indexName: 'cmmstudy_no',
          languageCode: 'no',
          language: 'Norwegian'
        },
        {
          indexName: 'cmmstudy_sl', 
          languageCode: 'sl',
          language: 'Slovenian'
        },
        {
          indexName: 'cmmstudy_sv',
          languageCode: 'sv',
          language: 'Swedish'
        }
      ]
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
          language: 'Dutch'
        },
        {
          indexName: 'coordinate_en',
          languageCode: 'en',
          language: 'English'
        },
        {
          indexName: 'coordinate_fi',
          languageCode: 'fi',
          language: 'Finnish'
        },
        {
          indexName: 'coordinate_fr',
          languageCode: 'fr',
          language: 'French'
        },

        {
          indexName: 'coordinate_de',
          languageCode: 'de',
          language: 'German'
        },
        {
          indexName: 'coordinate_el',
          languageCode: 'el',
          language: 'Greek'
        },
        {
          indexName: 'coordinate_no',
          languageCode: 'no',
          language: 'Norwegian'
        },
        {
          indexName: 'coordinate_sl', 
          languageCode: 'sl',
          language: 'Slovenian'
        },
        {
          indexName: 'coordinate_sv',
          languageCode: 'sv',
          language: 'Swedish'
        }
      ]
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
          language: 'English'
        }
      ]
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
          language: 'English'
        },
        {
          indexName: 'covid_fi',
          languageCode: 'fi',
          language: 'Finnish'
        },
        {
          indexName: 'covid_fr',
          languageCode: 'fr',
          language: 'French'
        },
        {
          indexName: 'covid_de',
          languageCode: 'de',
          language: 'German'
        },
        {
          indexName: 'covid_el',
          languageCode: 'el',
          language: 'Greek'
        },
        {
          indexName: 'covid_no',
          languageCode: 'no',
          language: 'Norwegian'
        },
        {
          indexName: 'covid_sl', 
          languageCode: 'sl',
          language: 'Slovenian'
        },
        {
          indexName: 'covid_sv',
          languageCode: 'sv',
          language: 'Swedish'
        }
      ]
  },
];

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
};

