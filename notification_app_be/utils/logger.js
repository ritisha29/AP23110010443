const axios = require('axios');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWlyaXRpc2hhX2J1cnVndXBhbGxpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNTE1NCwiaWF0IjoxNzc3NzA0MjU0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDFiZTM2OWMtOTk2OS00MDBhLTgwMDUtM2NlYWVkNGZhYWM2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYnVydWd1cGFsbGkgc2FpIHJpdGlzaGEiLCJzdWIiOiI0Y2QyNWIyNi01ZTNjLTQyOWYtOWI5Ny01YzVjYjZjNjIxYmQifSwiZW1haWwiOiJzYWlyaXRpc2hhX2J1cnVndXBhbGxpQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJidXJ1Z3VwYWxsaSBzYWkgcml0aXNoYSIsInJvbGxObyI6ImFwMjMxMTAwMTA0NDMiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI0Y2QyNWIyNi01ZTNjLTQyOWYtOWI5Ny01YzVjYjZjNjIxYmQiLCJjbGllbnRTZWNyZXQiOiJVRVlNR2N3d1JBR1RYQlJRIn0.GOK-HkFkba78szEqSD6llUG4t0GOcX_Cl_UySwReltA"; // TODO: Replace with your real token!

const log = async (stack, level, packageName, message) => {
    try {
        const response = await axios.post(
            'http://20.207.122.201/evaluation-service/logs',
            {
                stack: stack,
                level: level,
                package: packageName,
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Log created:", response.data);

    } catch (error) {
        console.error("Logging failed:", error.message);
    }
};

module.exports = log;
