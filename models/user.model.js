var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "leader", "admin"], default: "user" },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }], 
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (this.isModified("email")) {
        this.email = this.email.toLowerCase();
    }

    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre("findOneAndUpdate", function(next) {
    var update = this.getUpdate();
    
    if (update.role && this.getQuery()._id) {
        return next(new Error("Cannot change role directly!"));
    }

    next();
});

userSchema.pre("deleteOne", { document: true, query: false }, function(next) {
    if (this.role === "admin") {
        return next(new Error("Cannot delete admin user!"));
    }
    next();
});

userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

var User = mongoose.model("User", userSchema, "Users");

module.exports = User;
