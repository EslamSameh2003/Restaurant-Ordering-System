import  "dotenv/config";
import app from "./app.js";
import sequelize from "./DB/Connection.js";
import "./DB/Models/associations.js"


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection

        console.log("Database connected successfully!");
        await sequelize.sync(); // Synchronize models with the database
        console.log("Database synchronized successfully!");

        app.listen(PORT, () => {
            console.log(`http://127.0.0.1:${PORT}`);
        });

    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
};

startServer();