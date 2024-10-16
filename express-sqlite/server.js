import { Sequelize, DataTypes } from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

var db = {}

async function setupDB() {
    try {
        db.Task = sequelize.define('Task', {
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
        });
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error(error);
    }
}

async function startServer() {
    try {
        await setupDB();
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