import React, {Component} from "react";
import PropTypes from "prop-types";

const styles = {
	content: {
		textAlign: "center",
		fontSize: "35px",
	},
};

export default class Loading extends Component {
	static propTypes = {
		text: PropTypes.string,
		speed: PropTypes.number,
	};

	static defaultProps = {
		text: "Loading",
		speed: 300,
	};

	constructor(props) {
		super(props);

		this.state = {
			text: props.text,
		};
	}

	componentDidMount() {
		const {text: propText, speed} = this.props;
		const stopper = `${propText}...`;

		this.interval = setInterval(() => {
			if(this.state.text === stopper){
				this.setState(prev => ({...prev, text: propText}));
			} else {
				this.setState(prev => ({...prev, text: `${prev.text}.`}));
			}
		}, speed);
	}
	render() {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
};
