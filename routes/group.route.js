import express from 'express';
import groupContronller from '../controllers/group.controller.js';

const router = express.Router();

router.post('/create', groupContronller.createGroup);
router.get('/all', groupContronller.getAllGroups);
router.get('/:id', groupContronller.getGroupById);
router.post('/add-member', groupContronller.addMember);

export default router;
