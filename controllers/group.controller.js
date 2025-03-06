import groupService from '../services/group.service.js';

const groupController = {
    createGroup: async function (req, res) {
        try {
            const group = await groupService.createGroup(req.body);
            res.status(201).json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllGroups: async function (req, res) {
        try {
            const groups = await groupService.getAllGroups();
            res.status(200).json(groups);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getGroupById: async function (req, res) {
        try {
            const group = await groupService.getGroupById(req.params.id);
            res.status(200).json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    addMember: async function (req, res) {
        try {
            const { groupId, userId } = req.body;
            const group = await groupService.addMember(groupId, userId);
            res.status(200).json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default groupController;
