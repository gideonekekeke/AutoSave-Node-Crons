const User = require("./UserModel");
const express = require("express");
const router = express.Router();

router.post("/create-user", async (req, res) => {
	try {
		const { name } = req.body;

		const result = await User.create({
			name,
		});

		return res.status(200).json({
			message: "successful",
			data: result,
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
});

router.get("/user", async (req, res) => {
	try {
		const result = await User.find();

		return res.status(200).json({
			message: "successful",
			data: result,
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
});

router.patch("/updateuserDaily-autosave/:id", async (req, res) => {
	try {
		const result = await User.findByIdAndUpdate(
			req.params.id,
			{
				autoSave: true,
				autoSaveStartDate: new Date(),
				SaveType: "Daily",
			},
			{ new: true },
		);

		// console.log(result);

		return res.status(200).json({
			message: "successful",
			data: result,
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
});

// Auto-save route
router.post("/autosave-daily", async (req, res) => {
	try {
		const dailyAmount = 100;

		// Fetch all users with auto-save enabled
		const users = await User.find({ autoSave: true });

		// Increment the savings for each user by the daily amount
		for (const user of users) {
			// Check if the user has set a start time for auto-saving
			if (user.autoSaveStartDate) {
				const currentDate = new Date();
				const userStartTime = new Date(user.autoSaveStartDate);
				// Extract the hours from autoSaveStartDate
				const userStartHours = userStartTime.getHours();

				// Check if the current time is after the user's auto-save start time
				if (currentDate >= userStartTime) {
					user.amount += dailyAmount;
					await user.save();
				}
			}
		}

		console.log("Daily auto-save completed.");
		return res.status(200).json({ message: "Auto-save successful" });
	} catch (error) {
		console.error("Error during daily auto-save:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
