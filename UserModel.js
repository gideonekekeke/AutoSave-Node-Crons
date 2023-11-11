const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},

		amount: {
			type: Number,
			default: 0,
		},
		autoSave: {
			type: Boolean,
			default: false,
		},
		autoSaveStartDate: {
			type: Date,
			default: null,
		},

        SaveType : {
            type : String,
            default : ""
        }
	},
	{
		timestamps: true,
	},
);

const UserData = mongoose.model("users", userSchema);

module.exports = UserData;
