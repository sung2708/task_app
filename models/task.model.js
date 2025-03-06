import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: false},
    status: { type: String, enum: ['pending', 'in_process', 'completed'], default: 'pending' },
}, {timestamps: true})

taskSchema.pre('save', function (next) {
    console.log(`🔹 Task "${this.name}" is being created with status: ${this.status}`);
    next();
});

taskSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

const Task = mongoose.model("Task", taskSchema, "Tasks");

export default Task;
