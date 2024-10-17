import { createRequire } from 'module';
const require = createRequire(import.meta.url);

async function startServer() {
    try {
        const port = 1337;
        const express = require('express');
        const app = express();
        app.use(express.json());
        app.get("/test", (req, res) => {
            res.status(200).json({ success: true });
        });

        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        });
    } catch (error) {
        console.error(error);
    }
}

startServer()