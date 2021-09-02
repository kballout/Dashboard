const express = require('express');
const categories = require('../categories');

const router = express.Router();

router.get('/', (req, res) => res.render('index', {
    subtitle: 'Home'
}));
router.get('/settings', (req, res) => res.render('settings', {
    subtitle: 'settings',
    categories
}));

module.exports = router;