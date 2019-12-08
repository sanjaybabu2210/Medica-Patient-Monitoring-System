module.exports = {
	'facebookAuth' : {
		'clientID': '1313207795552764',
		'clientSecret': '49b5e7d2dae3b412ea116c7c99e31d49',
		'callbackURL': 'https://vitweb.herokuapp.com/adPost'
	}


}

// export const tryLogin = async (email, password, models, SECRET, SECRET_2) => {
//   const user = await models.User.findOne({ where: { email }, raw: true });
//   if (!user) {
//     // user with provided email not found
//     throw new Error('Invalid login');
//   }

//   if (!user.confirmed) {
//     throw new Error('Please confirm your email to login');
//   }