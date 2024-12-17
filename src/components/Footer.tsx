import React from "react";
import { useAppSelector } from "../hooks";

const footers = {
  cdc: require('./dynamic/footers/CdcFooter.tsx').default,
  coordinate: require('./dynamic/footers/CoordinateFooter.tsx').default,
  hummingbird: require('./dynamic/footers/HummingbirdFooter.tsx').default
};

const Footer = () => {
  const currentThematicView = useAppSelector((state) => state.thematicView.currentThematicView);

  const DynamicFooter = footers[currentThematicView.key as keyof typeof footers];
  return (

    <DynamicFooter />
  )
}


export default Footer;
