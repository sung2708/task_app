import Group from '../models/group.model.js';
import User from '../models/user.model.js';

const groupService = {
    createGroup: async function (groupData) {
        const { name, description, createdBy, members = [] } = groupData;

        const creator = await User.findById(createdBy);
        if (!creator) throw new Error("Creator not found");

        const leader = { user: createdBy, role: 'leader' };

        if (!Array.isArray(members)) {
            throw new Error("Members list must be an array");
        }

        const memberList = await Promise.all(
            members.map(async (userId) => {
                const user = await User.findById(userId);
                if (!user) throw new Error(`User ${userId} not found`);
                return { user: userId, role: 'member' };
            })
        );

        const group = new Group({
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
        const group = await Group.findById(groupId).populate('members.user', 'name email role');
        if (!group) throw new Error('Group not found');
        return group;
    },

    addMember: async function (groupId, userId) {
        const group = await Group.findById(groupId);
        if (!group) throw new Error('Group not found');

        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const isExist = group.members.some(member => member.user.toString() === userId);
        if (isExist) throw new Error('User already in group');

        group.members.push({ user: userId, role: 'member' });
        await group.save();
        return group;
    }
};

export default groupService;
