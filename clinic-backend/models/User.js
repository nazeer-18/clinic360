const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Doctor', 'Patient'],
        required: true,
        default: 'Patient'
    },

    //doctor specific fields
    experience: {
        type: Number,
        required: function () {
            return this.role === 'Doctor';
        }
    },
    specialization: [
        {
            type: String,
            required: function () {
                return this.role === 'Doctor';
            }
        }
    ],
    city: {
        type: String,
        required: function () {
            return this.role === 'Doctor';
        }
    },
    state: {
        type: String,
        required: function () {
            return this.role === 'Doctor';
        }
    },
    locations: {
        type: [
            {
                locationName: {
                    type: String,
                    required: true
                },
                availabilitySlots: [
                    {

                        day: {
                            type: String,
                            enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            required: true
                        },
                        startTime: {
                            type: String,
                            required: true
                        },
                        endTime: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ],
        required: function () {
            return this.role === 'Doctor';
        }
    },
}
    , { timestamps: true, });

//hash passwords before storing to DB
UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);