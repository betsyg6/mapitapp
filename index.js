/** @format */

const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 3000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./server/db/db');
const path = require('path');
// var LocalStrategy = require('passport-local').Strategy;
// let user;

const sessionStore = new SequelizeStore({ db });
if (process.env.NODE_ENV !== 'production') require('./secrets');

//socket
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

const createApp = () => {
	// Logging middleware
	app.use(morgan('dev'));

	// Body parsing middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Session middleware
	app.use(
		session({
			secret:
				process.env.SESSION_SECRET || 'This is not a very secure secret...',
			resave: false,
			store: sessionStore,
			saveUninitialized: false,
		})
	);

	//***session is not persisting after refresh */
	app.use(passport.initialize());
	app.use(passport.session());

	// // passport config
	// passport.use(new LocalStrategy(user.authenticate()));

	// authentication router
	app.use('/auth', require('./server/auth/auth'));
	//other routes
	app.use('/api', require('./server/api'));

	app.use(express.static(path.join(__dirname, 'client/public')));

	app.get('*', function (req, res, next) {
		res.sendFile(path.join(__dirname, '/client/public/index.html'));
	});
};

async () => {
	await sessionStore.sync();
	await db.sync({ force: true });
	await createApp();
};

// io.on('connection', (socket) => {
// 	console.log('connected!');

// 	socket.on('chat message', (msg) => {
// 		console.log('message: ' + msg);
// 	});

// 	socket.on('updatePoints', () => {
// 		console.log('backend: update points');
// 		io.emit('pointsUpdated');
// 	});

// 	socket.on('disconnect', () => {
// 		console.log('disconnected');
// 	});
// });

const server = app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

createApp();

module.exports = server;
