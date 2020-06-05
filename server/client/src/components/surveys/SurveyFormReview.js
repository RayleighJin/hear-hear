import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name} style={{ marginBottom: "20px" }}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="grey darken-1 white-text btn-flat"
				onClick={onCancel}
			>
				<i className="material-icons left">navigate_before</i>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="blue-grey darken-1 btn-flat right white-text"
			>
				Send
				<i className="material-icons right">send</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
