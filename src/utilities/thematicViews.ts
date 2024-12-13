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
          indexName: 'cmmstudy_nl',
          languageCode: 'nl',
          language: 'Dutch'
        },
        {
          indexName: 'cmmstudy_sk',
          languageCode: 'sk',
          language: 'Slovakian'
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
          indexName: 'coordinate_nl',
          languageCode: 'nl',
          language: 'Dutch'
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
          indexName: 'coordinate_sk',
          languageCode: 'sk',
          language: 'Slovakian'
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
    "defaultIndex": "cmmstudy_en",
    "title": "HumMingBird",
    "longTitle": "HumMingBird",
    "rootClass": "hummingbird",
    "logo": "hummingbird-logo.png",
    "icon": "hummingbird-icon.svg",
    "favicon": "hummingbird-favicon.png",
    "esIndexes":
      [
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
          indexName: 'cmmstudy_nl',
          languageCode: 'nl',
          language: 'Dutch'
        },
        {
          indexName: 'cmmstudy_sk',
          languageCode: 'sk',
          language: 'Slovakian'
        },
        {
          indexName: 'cmmstudy_sv',
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

