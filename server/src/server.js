const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const connectSocket = require('./socket/socket');

const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware * //
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: false, limit: "3mb" }));
app.use(errorHandler);

// * Connection * //
const server = app.listen(PORT, () => {
    console.log('---------------------');
    console.log(
        'Dev server running at  >'.green,
        `https://localhost:${PORT}`.blue
    );
    connectDB();
    connectSocket(server);
});

// * Routes * //
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/users', require('./routes/usersRouter'));
app.use('/api/friend-requests', require('./routes/friendRequestsRouter'));
app.use('/api/guilds', require('./routes/guildsRouter'));
app.use('/api/messages/user-messages', require('./routes/userMessagesRouter'));
app.use('/api/messages/guild-messages', require('./routes/guildMessagesRouter')); // TODO: Implement guild messages router
