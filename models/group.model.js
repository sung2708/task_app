import mongoose from 'mongoose';

const groupTaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['leader', 'member'], default: 'member' }
    }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

const GroupTask = mongoose.model('GroupTask', groupTaskSchema,'GroupTasks');

export default GroupTask;
