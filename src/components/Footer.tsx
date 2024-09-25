import React from "react";
import { Link } from "react-router-dom";
import { Organization, WithContext } from "schema-dts";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";

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

const Footer = () => {
  const { t } = useTranslation();
  const showMobileFilters = useAppSelector((state) => state.search.showMobileFilters);

  return (
    <footer data-testid="footer" className={'footer' + (showMobileFilters ? ' show-mobile-filters' : '')}>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-2">
            <a href="https://cessda.eu" target="_blank" rel="noreferrer">
              {t("footer.poweredBy")}
            </a>
          </div>

          <div className="column has-text-centered is-8">
            <Link to="/documentation/" className="is-inline-block">{t("documentation.label")}</Link> | {" "}
            <Link to="/about/" className="is-inline-block">{t("about.label")}</Link> | {" "}
            <a href="https://www.cessda.eu/Privacy-policy" target="_blank" rel="noreferrer" className="is-inline-block">{t("footer.privacy")}</a> |  {" "}
            <a href="https://www.cessda.eu/Acceptable-Use-Policy" target="_blank" rel="noreferrer" className="is-inline-block">{t("footer.aup")}</a> | {" "}
            <Link to="/accessibility-statement/" className="is-inline-block">{t("footer.accessibility")}</Link>
          </div>
        </div>
      </div>
      <script type="application/ld+json" data-testid="coordinateJson">{organizationCoordinateJSON}</script>
      <script type="application/ld+json" data-testid="cessdaJson">{organizationCessdaJSON}</script>
    </footer>
  )
}

export default Footer;
