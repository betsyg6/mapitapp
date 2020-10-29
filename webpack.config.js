/** @format */
// const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	// mode: isDev ? 'development' : 'production',
	entry: './client/components/App.js',
	mode: 'development',
	output: {
		path: __dirname + '/client/public/',
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: 'source-map',
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
