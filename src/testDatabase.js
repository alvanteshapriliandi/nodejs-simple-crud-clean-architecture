const db = require('./config/database');

(async () => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        console.log('Database connected! Solution:', rows[0].solution);
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
})();
