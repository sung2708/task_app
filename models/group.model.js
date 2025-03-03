var mongoose = require('mongoose');

var groupTaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['leader', 'member'], default: 'member' }
    }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

var GroupTask = mongoose.model('GroupTask', groupTaskSchema,'GroupTasks');

module.exports = GroupTask;
