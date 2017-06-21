import React, {Component} from "react";
import "./PopularList.css"
import Popular from "./Popular";

export default class PopularList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: "ALL"
		}
	}

	updateLanguage = lang => {
		this.setState(prevState => ({
			...prevState,
			selectedLanguage: lang,
		}));
	};

	render() {
		const {languages} = this.props;
		const {selectedLanguage} = this.state;

		return (
			<ul className="languages">
				{languages.map(lang =>
					<Popular lang={lang}
							 key={lang}
							 selected={selectedLanguage === lang}
							 onClick={this.updateLanguage.bind(undefined, lang)} />)
				}
			</ul>
		);
	}
}
