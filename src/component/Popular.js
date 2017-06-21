import React, {Component} from "react";
import "./Popular.css"

export default class Popular extends Component {
	render() {
		const {lang, selected, onClick} = this.props;

		return (
			<li className={selected ? "selected" : ""} key={lang} onClick={onClick}>{lang}</li>
		);
	}
}
