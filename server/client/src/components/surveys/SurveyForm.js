import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import _ from "lodash";
import SurveyField from "./SurveyField";
import formFields from "./formFields";
import validateEmails from "../../utils/validateEmails";

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	// renderFields() {
	// 	return (
	// 		<div>
	// 			<Field
	// 				label="Survey Titile"
	// 				type="text"
	// 				name="title"
	// 				component={SurveyField}
	// 			/>
	// 			<Field
	// 				label="Subject Line"
	// 				type="text"
	// 				name="subject"
	// 				component={SurveyField}
	// 			/>
	// 			<Field
	// 				label="Email Body"
	// 				type="text"
	// 				name="body"
	// 				component={SurveyField}
	// 			/>
	// 			<Field
	// 				label="Recipient List"
	// 				type="text"
	// 				name="emails"
	// 				component={SurveyField}
	// 			/>
	// 		</div>
	// 	);
	// }

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="grey darken-1 btn-flat white-text">
						<i className="material-icons left">navigate_before</i>
						Cancel
					</Link>
					<button
						type="submit"
						className="blue-grey darken-1 btn-flat right white-text"
					>
						Next
						<i className="material-icons right">navigate_next</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || "");
	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = "You must provide a value";
		}
	});
	return errors;
}

export default reduxForm({
	validate: validate,
	form: "surveyForm",
	destroyOnUnmount: false,
})(SurveyForm);
