import React from "react";
import { Link } from "react-router-dom";
import { Organization, WithContext } from "schema-dts";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../hooks";

const organizationCessda: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CESSDA ERIC",
  url: "https://www.cessda.eu",
  sameAs: [
    "https://twitter.com/CESSDA_Data",
    "https://www.linkedin.com/company/9392869",
    "https://www.youtube.com/channel/UCqbZKb1Enh-WcFpg6t86wsA",
  ],
};

const organizationCoordinate: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "COORDINATE",
  url: "https://www.coordinate-network.eu/",
  sameAs: [
    "https://twitter.com/coordinate_eu",
    "https://www.youtube.com/channel/UCjQ4Kv4VPn449d80-CIGJZQ",
  ],
};

const organizationCoordinateJSON = JSON.stringify(organizationCoordinate);
const organizationCessdaJSON = JSON.stringify(organizationCessda);

const DynamicFooter = () => {
  const { t } = useTranslation();
  const showMobileFilters = useAppSelector((state) => state.search.showMobileFilters);
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);
  const logoImg = require('../../../img/icons/' + currentThematicView.icon);
  return (
    <footer data-testid="footer" className="footer">
      <div className="container">
        <div className="columns">
          <div className="column">

            <a href="https://www.cessda.eu" target="_blank">
              <svg id="footerlogo" viewBox="0 0 2386 652" xmlns="http://www.w3.org/2000/svg" aria-label="CESSDA Home Page">
                <path d="M993.333 498.333h-92.5c-52.5 0-95-42.5-95-94.583V249.167c0-52.084 42.5-94.584 95-94.584l92.5-.416c9.584 0 17.5 7.916 17.5 17.5 0 9.583-7.916 17.5-17.5 17.916l-92.5.417c-32.916 0-59.583 26.667-59.583 59.583v154.584c0 32.916 26.667 59.583 59.583 59.583h92.5c9.584 0 17.5 7.917 17.5 17.5.417 9.167-7.5 17.083-17.5 17.083" fill="#3E4C59"></path>
                <path d="M1254.17 498.75h-109.584c-52.5 0-95-42.5-95-95V249.583c0-52.5 42.5-95 95-95h44.167c52.5 0 95 42.5 95 95v85.834h-165c-9.583 0-17.5-7.917-17.5-17.5 0-9.584 7.917-17.5 17.5-17.5h130v-50.834c0-32.916-26.667-59.583-59.583-59.583h-44.167c-32.917 0-59.583 26.667-59.583 59.583v154.584c0 32.916 26.666 59.583 59.583 59.583h109.167c9.583 0 17.5 7.917 17.5 17.5s-7.917 17.5-17.5 17.5M2290.83 497.083h-54.583c-26.25 0-50.833-12.916-68.75-36.25-17.083-22.083-26.25-51.25-26.25-82.083 0-62.5 39.167-106.25 95-106.25h77.917c9.583 0 17.5 7.917 17.5 17.5s-7.917 17.5-17.5 17.5h-77.917c-35.833 0-59.583 28.333-59.583 70.833 0 45.834 26.666 82.917 59.583 82.917h54.583c32.917 0 59.584-26.667 59.584-59.583V247.5c0-32.917-26.667-59.583-59.584-59.583h-102.083c-9.583 0-17.5-7.917-17.5-17.5 0-9.584 7.917-17.5 17.5-17.5h102.083c52.5 0 95 42.5 95 95V402.5c0 52.083-42.5 94.583-95 94.583M1997.92 498.75h-55.834c-52.5 0-95-42.5-95-95V249.167c0-52.5 42.5-95 95-95h79.167c9.583 0 17.5 7.916 17.5 17.5 0 9.583-7.917 17.5-17.5 17.5h-79.167c-32.916 0-59.583 26.666-59.583 59.583v154.583c0 32.917 26.667 59.584 59.583 59.584h55.834c32.916 0 59.583-26.667 59.583-59.584V17.5c0-9.583 7.917-17.5 17.5-17.5s17.5 7.917 17.5 17.5v386.25c0 52.5-42.5 95-94.583 95M1457.08 498.75h-101.25c-9.583 0-17.5-7.917-17.5-17.5s7.917-17.5 17.5-17.5h101.25c31.667 0 57.5-25.833 57.5-57.5 0-27.083-19.166-50.833-45.833-56.25l-49.583-10.417c-7.917-1.25-19.167-4.583-22.5-5.833-35.834-13.75-59.584-48.333-59.584-86.667 0-51.25 41.667-92.5 92.5-92.5h76.25c9.584 0 17.5 7.917 17.5 17.5 0 9.584-7.916 17.5-17.5 17.5h-76.25c-31.666 0-57.5 25.834-57.5 57.5 0 23.75 15 45 36.667 53.75 1.667.834 10.833 3.334 16.25 4.167h.417l49.583 10.417c43.75 8.75 75 47.083 75 90.833 0 50.833-41.667 92.5-92.917 92.5M1704.17 498.75h-101.25c-9.584 0-17.5-7.917-17.5-17.5s7.916-17.5 17.5-17.5h101.25c31.666 0 57.5-25.833 57.5-57.5 0-27.083-19.167-50.833-45.834-56.25l-49.583-10.417c-7.917-1.25-19.167-4.583-22.5-5.833-35.833-13.75-59.583-48.333-59.583-86.667 0-51.25 41.666-92.5 92.5-92.5h76.25c9.583 0 17.5 7.917 17.5 17.5 0 9.584-7.917 17.5-17.5 17.5h-76.25c-31.667 0-57.5 25.834-57.5 57.5 0 23.75 15 45 37.083 53.75 1.667.834 10.833 3.334 16.25 4.167h.417l49.583 10.417c42.917 8.75 74.167 47.083 74.167 90.833.416 50.833-41.25 92.5-92.5 92.5" fill="#3E4C59"></path>
                <circle cx="325.417" cy="323.333" r="54.167" fill="#3E4C59"></circle>
                <path d="M537.5 143.75l-95.417-95C416.25 22.5 383.333 6.25 347.5 1.667 340 .417 332.5 0 325 0c-44.583 0-86.25 17.083-117.5 48.333L48.75 207.5C17.5 238.75 0 280.417 0 325s17.083 86.25 48.75 117.5l95.417 95.833c10 10 23.333 15.417 37.5 15.417 14.166 0 27.5-5.417 37.5-15.417S235 515 235 500.417c0-14.167-5.417-27.917-15.417-37.917l-95-95.833c-11.25-11.25-17.5-25.834-17.5-41.667 0-15.833 5.834-30.417 17.084-41.667l159.166-159.166c11.25-11.25 25.834-17.084 41.667-17.084 15.833 0 30.417 6.25 41.667 17.084l95.416 95c10 10 23.75 15.833 37.917 15.833 14.167 0 27.917-5.417 37.917-15.833 10-10 15.833-23.75 15.833-37.917-.417-13.75-5.833-27.5-16.25-37.5z" fill="#2bb0ed"></path>
                <path d="M602.917 209.583L507.5 113.75c-10-10-23.333-15.417-37.5-15.417-14.167 0-27.5 5.417-37.5 15.417s-15.833 23.333-15.833 37.917c0 14.166 5.416 27.916 15.416 37.916l95 95.834c11.25 11.25 17.5 25.833 17.5 41.666 0 15.834-5.833 30.417-17.083 41.667L368.333 527.917C357.083 539.167 342.5 545 326.667 545c-15.834 0-30.417-6.25-41.667-17.083l-95.417-95c-10-10-23.75-15.834-37.916-15.834-14.167 0-27.917 5.417-37.917 15.834-10 10-15.833 23.75-15.833 37.916 0 14.167 5.416 27.917 15.833 37.917l95.417 95c25.833 25.833 58.75 42.083 95 47.083 7.5.834 15 1.667 22.5 1.667 44.583 0 85.833-17.083 117.5-48.333L603.333 445c31.25-31.25 48.334-72.917 48.334-117.5-.417-45-17.5-86.667-48.75-117.917z" fill="#61d0f7"></path>
                <path d="M181.667 553.333c-2.5 0-5 0-7.084-.416-11.666-1.667-22.5-6.667-30.833-15l-95.417-95C17.5 411.25 0 369.583 0 325s17.083-86.25 48.333-117.5l75.834-75.833 74.583 77.083-74.583 74.583c-11.25 11.25-17.084 25.834-17.084 41.667 0 15.833 6.25 30.417 17.084 41.667l95.416 95c10 10 15.834 23.75 15.834 37.916 0 14.167-5.417 27.917-15.834 37.917-10 10.417-23.333 15.833-37.916 15.833z" fill="#46aef1"></path>
              </svg>
            </a>
            <p className="credit">
              Consortium of European<br />Social Science Data Archives
            </p>
          </div>
          <div className="column has-text-centered">

            <a href="https://www.cessda.eu/Privacy-policy" target="_blank" rel="noreferrer" className="is-inline-block">{t("footer.privacy")}</a> <br />
            <a href="https://www.cessda.eu/Acceptable-Use-Policy" target="_blank" rel="noreferrer" className="is-inline-block">{t("footer.aup")}</a> <br />
            <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/accessibility-statement` : "/accessibility-statement"}
              className="is-inline-block">{t("footer.accessibility")}</Link>


          </div>
          <div className="column columns is-justify-content-flex-end">
            <div className="column is-narrow has-text-right has-text-centered-mobile p-0">

              <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/collections` : "/collections"}>
                Collections
              </Link> <br />
              <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/documentation` : "/documentation"}>
                {t("documentation.label")}
              </Link> <br />
              <Link to={currentThematicView.path !== '/' ? `${currentThematicView.path}/about` : "/about"}>
                {t("about.label")}
              </Link> <br />

            </div>
          </div>
        </div>



        <div className="columns">
          <div className="column columns is-justify-content-center">
            <div className="column is-narrow has-text-centered p-0">

              <svg id="horizonlogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 356.18"><path fill="#039" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" /><path fill="#FC0" d="M237.179 53.246h14.378L256 39.572l4.443 13.674h14.378l-11.633 8.451 4.444 13.673L256 66.919l-11.632 8.451 4.444-13.673-11.633-8.451zm0 237.458h14.378L256 277.03l4.443 13.674h14.378l-11.633 8.451 4.444 13.673L256 304.377l-11.632 8.451 4.444-13.673-11.633-8.451zM118.45 171.975h14.378l4.443-13.674 4.443 13.674h14.378l-11.633 8.451 4.443 13.673-11.631-8.451-11.632 8.451 4.444-13.673-11.633-8.451zm59.363-102.796h14.377l4.443-13.674 4.443 13.674h14.378l-11.632 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.631-8.451zm-43.429 43.429h14.378l4.442-13.673 4.444 13.673h14.377l-11.632 8.451 4.443 13.674-11.632-8.451-11.631 8.451 4.443-13.674-11.632-8.451zm-.032 118.737h14.377l4.443-13.674 4.443 13.674h14.377l-11.631 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.631-8.451zm43.471 43.46h14.378l4.443-13.674 4.443 13.674h14.378l-11.632 8.451 4.443 13.674-11.632-8.451-11.631 8.451 4.443-13.674-11.633-8.451zm178.085-102.83h14.378l4.443-13.674 4.443 13.674h14.378l-11.633 8.451 4.444 13.673-11.632-8.451-11.631 8.451 4.443-13.673-11.633-8.451zM296.546 69.179h14.378l4.443-13.674 4.443 13.674h14.377l-11.631 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.632-8.451zm43.429 43.429h14.377l4.444-13.673 4.442 13.673h14.378l-11.632 8.451 4.443 13.674-11.631-8.451-11.632 8.451 4.443-13.674-11.632-8.451zm.033 118.737h14.377l4.443-13.674 4.443 13.674h14.377l-11.631 8.451 4.443 13.674-11.632-8.451-11.632 8.451 4.443-13.674-11.631-8.451zm-43.473 43.46h14.378l4.443-13.674 4.443 13.674h14.378l-11.633 8.451 4.443 13.674-11.631-8.451-11.632 8.451 4.443-13.674-11.632-8.451z" /></svg>
            </div>
            <div className="column is-narrow credit pl-2 pt-0">
              The COORDINATE project has<br />received funding from the<br />European Union's  Horizon 2020<br />research and  innovation programme<br />under grant agreement No. 101008589.
            </div>
          </div>
        </div>



      </div>
      <script type="application/ld+json" data-testid="coordinateJson">{organizationCoordinateJSON}</script>
      <script type="application/ld+json" data-testid="cessdaJson">{organizationCessdaJSON}</script>
    </footer>
  )
}

export default DynamicFooter;
