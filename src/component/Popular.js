import React from "react";
import "./Popular.css";
import PropTypes from  "prop-types";

const Popular = ({lang, selected, onClick}) => (<li className={`popular ${selected ? "selected" : ""}`} key={lang} onClick={onClick}>{lang}</li>);

Popular.propTypes = {
	lang: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	onClick: PropTypes.func,
};

export default Popular;