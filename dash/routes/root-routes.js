const express = require('express');
const categories = require('../categories');
const bot = require('../../bot');
const DB = require('../modules/mongodb');
const { validateGuild } = require('../modules/middleware');
let mongo = new DB()

const router = express.Router();

router.get('/', (req, res) => res.render('index', {
    subtitle: 'Home'
}));

//leaderboards for non logged in users
router.get('/:id/stats', async (req, res) => {
    let guildExists = await mongo.checkIfExists(req.params.id);
    let month = new Date().toLocaleDateString('default', {month : 'long'});
    var users = [];
    let allUserIDs = await mongo.getAllUsers(req.params.id);
    let nextUser = {};
    for(var i = 0; i < allUserIDs.length; i++){
        nextUser = {
            'username': await (await bot.users.fetch(allUserIDs[i]['User ID'])).username,
            'discriminator': await (await bot.users.fetch(allUserIDs[i]['User ID'])).discriminator,
            'currentPoints': await mongo.getUserCurrPoints(req.params.id, allUserIDs[i]['User ID']),
            'totalPoints': await mongo.getUserTotalPoints(req.params.id, allUserIDs[i]['User ID']),
            'avatarUrl': (await bot.users.fetch(allUserIDs[i]['User ID'])).avatarURL(),
            'monthlyPoints': await mongo.getUserMonthlyPoints(req.params.id, allUserIDs[i]['User ID'], month),
            'totalExchange': await mongo.getUserTotalExchange(req.params.id, allUserIDs[i]['User ID']),
            'monthlyExchange': await mongo.getUserMonthlyExchange(req.params.id, allUserIDs[i]['User ID'], month),
            'highestStreak': await mongo.getUserHighestStreak(req.params.id, allUserIDs[i]['User ID']),
            'attendance': await mongo.getUserTotalAttendance(req.params.id, allUserIDs[i]['User ID']),
            'level': await mongo.getUserLevel(req.params.id, allUserIDs[i]['User ID']),
            'xp': await mongo.getUserXP(req.params.id, allUserIDs[i]['User ID']),
            'messages': await mongo.getUserTotalMsg(req.params.id, allUserIDs[i]['User ID']),
        }
        nextUser['untilNextLevel'] = 5 * Math.pow(nextUser['level'], 2) + 50 * nextUser['level'] + 100,
        users.push(nextUser);
    }

    //sort
    var usersByCurrentPoints = JSON.parse(JSON.stringify(users)); 
    var usersByTotalPoints = JSON.parse(JSON.stringify(users));
    var usersByMonthlyPoints = JSON.parse(JSON.stringify(users));
    var usersByTotalExchange = JSON.parse(JSON.stringify(users));
    var usersByMonthlyExchange = JSON.parse(JSON.stringify(users));
    var usersByHighestStreak = JSON.parse(JSON.stringify(users));
    var usersByAttendance = JSON.parse(JSON.stringify(users));
    var usersByLevel = JSON.parse(JSON.stringify(users));
    var usersByMessages = JSON.parse(JSON.stringify(users));

    usersByCurrentPoints.sort(function (a, b){
            return b.currentPoints - a.currentPoints;
    })
    usersByTotalPoints.sort(function (a, b){
        return b.totalPoints - a.totalPoints;
    })
    usersByMonthlyPoints.sort(function (a, b){
        return b.monthlyPoints - a.monthlyPoints;
    })
    usersByTotalExchange.sort(function (a, b){
        return b.totalExchange - a.totalExchange;
    })
    usersByMonthlyExchange.sort(function (a, b){
        return b.monthlyExchange - a.monthlyExchange;
    })
    usersByHighestStreak.sort(function (a, b){
        return b.highestStreak - a.highestStreak;
    })
    usersByAttendance.sort(function (a, b){
        return b.attendance - a.attendance;
    })
    usersByMessages.sort(function (a, b){
        return b.messages - a.messages;
    })
    usersByLevel.sort(function (a, b){
        return b.level - a.level || b.xp - a.xp;
    })

    res.render('dashboard/modules/leaderboards', {
        guildExists,
        usersByTotalPoints,
        usersByCurrentPoints,
        usersByMonthlyPoints,
        usersByTotalExchange,
        usersByMonthlyExchange,
        usersByHighestStreak,
        usersByAttendance,
        usersByMessages,
        usersByLevel
    })
    
})

module.exports = router;