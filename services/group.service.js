var Group = require('../models/group.model');
var User = require('../models/user.model');

var groupService = {
    createGroup: async function (groupData) {
        var { name, description, createdBy, members = [] } = groupData;

        // Kiểm tra xem createdBy có tồn tại không
        var creator = await User.findById(createdBy);
        if (!creator) throw new Error("Creator not found");

        var leader = { user: createdBy, role: 'leader' };

        // Kiểm tra `members` có phải là mảng không
        if (!Array.isArray(members)) {
            throw new Error("Members list must be an array");
        }

        var memberList = await Promise.all(
            members.map(async (userId) => {
                var user = await User.findById(userId);
                if (!user) throw new Error(`User ${userId} not found`);
                return { user: userId, role: 'member' };
            })
        );

        var group = new Group({
            name,
            description,
            createdBy,
            members: [leader, ...memberList]
        });

        await group.save();
        return group;
    },

    getAllGroups: async function () {
        return await Group.find().populate('members.user', 'name email role');
    },

    getGroupById: async function (groupId) {
        var group = await Group.findById(groupId).populate('members.user', 'name email role');
        if (!group) throw new Error('Group not found');
        return group;
    },

    addMember: async function (groupId, userId) {
        var group = await Group.findById(groupId);
        if (!group) throw new Error('Group not found');

        var user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        var isExist = group.members.some(member => member.user.toString() === userId);
        if (isExist) throw new Error('User already in group');

        group.members.push({ user: userId, role: 'member' });
        await group.save();
        return group;
    }
};

module.exports = groupService;
