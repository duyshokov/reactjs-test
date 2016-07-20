module.exports = {
	entry:'./src/app.js',
	output: {
		path: './build',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
			}
		]
	}
}
