const keys = require("../../config/keys");

module.exports = (survey) => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>We'd appreciate your feedback!</h3>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.clickRedirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.clickRedirectDomain}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
