var express = require('express');
var groupContronller = require('../controllers/group.controller');

var router = express.Router();

router.post('/create', groupContronller.createGroup);
router.get('/all', groupContronller.getAllGroups);
router.get('/:id', groupContronller.getGroupById);
router.post('/add-member', groupContronller.addMember);

module.exports = router;
