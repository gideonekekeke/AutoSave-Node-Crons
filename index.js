const express = require("express");
const mongoose = require("mongoose");
const port = 6000;
const url = "mongodb://localhost/SavingMoney";
const cron = require("node-cron");
const axios = require("axios");
const app = express();

mongoose.connect(url).then(() => {
	console.log("databse connected");
});

app.use(express.json());
app.use("/api", require("./router"));

// Schedule the daily auto-save job
cron.schedule("0 0 * * *", async () => {
	try {
		// Call the auto-save route internally
		const response = await axios.post(
			"http://localhost:6000/api/autosave-daily",
		);

		console.log("Daily auto-save completed.", response.data);
	} catch (error) {
		console.error("Error triggering auto-save route:", error);
	}
});

app.listen(port, () => {
	console.log("listening....");
});
