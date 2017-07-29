import React, {Component} from "react";
import Popular from "./Popular";
import PropTypes from "prop-types";
import {fetchPopularRepos} from "../utils/api";
import RepoGrid from "./RepoGrid";

export default class PopularList extends Component {
	static propTypes = {
		languages: PropTypes.arrayOf(PropTypes.string.isRequired)
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: "ALL",
			repos: undefined,
		}
	}

	componentDidMount() {
		const {selectedLanguage} = this.state;

		this.updateLanguage(selectedLanguage);
	}

	updateLanguage = lang => {
		this.setState(prevState => ({
			...prevState,
			selectedLanguage: lang,
		}));

		(async () => {
			const repos = await fetchPopularRepos({language: lang});

			this.setState(prevState => ({
				...prevState,
				repos,
			}));
		})();
	};

	render() {
		const {languages} = this.props;
		const {selectedLanguage, repos} = this.state;

		return (
			<div>
				<ul className="languages">
					{languages.map(lang =>
						<Popular lang={lang}
								 key={lang}
								 selected={selectedLanguage === lang}
								 onClick={this.updateLanguage.bind(undefined, lang)}
						/>)
					}
				</ul>
				{repos ?
					<RepoGrid repos={repos}/>
					: <p>LOADING</p>
				}
			</div>
		);
	}
}

