const log = require('./utils/logger');

console.log("Starting backend server test...");

// Trigger the reusable log function
log(
    "backend",
    "info",
    "handler",
    "Server started successfully"
);
