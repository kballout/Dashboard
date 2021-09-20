const express = require('express');
const { validateGuild } = require('../modules/middleware');
const categories = require('../categories');
const router = express.Router();
const bot = require('../../bot');
const DB = require('../modules/mongodb');
let mongo = new DB()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
  }

  //login
router.get('/dashboard', (req, res) => res.render('dashboard/dashboardIndex', {
    subtitle: 'Dashboard',
    categories,
}));

//choose server
router.get('/servers/:id', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    res.render('dashboard/show', {
        guildExists,
        subtitle: 'Dashboard',
        categories,
        key: res.cookies.get('key')
    })
})

//general settings
router.get('/servers/:id/general', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    if(!guildExists){
        res.render('dashboard/modules/general', {
            guildExists,
            subtitle: 'Settings',
            categories,
    
        })
    }
    else{
        var data = await mongo.getAllGeneralData(req.params.id);
        var conv1 = 'Off';
        var conv2 = 'Off';
        var conv3 = parseFloat(data['Exchange Rate']) * 100;
            switch(data['Automatic Monthly Bonus']){
                case true:
                    conv1 = 'true';
                    break;
                case false:
                    conv1 = 'false';
                    break;
            }
            
            switch(data['Reset Challenges Time']){
                case 10:
                    conv2 = '10AM';
                    break;
                case 11:
                    conv2 = '11AM';
                    break;
                case 12:
                    conv2 = '12PM';
                    break;
                case 13:
                    conv2 = '1PM';
                    break;
                case 14:
                    conv2 = '2PM';
                    break;
                case 15:
                    conv2 = '3PM';
                    break;
                case 16:
                    conv2 = '4PM';
                    break;
            }

        res.render('dashboard/modules/general', {
            guildExists,
            categories,
            data,
            conv1,
            conv2,
            conv3

        })
    }
    
})

//moderation
router.get('/servers/:id/moderation', validateGuild, async (req, res) => {
    let guildExists = await mongo.checkIfExists(req.params.id);
    let badWordsList = await mongo.getBadWordsList(req.params.id);
    res.render('dashboard/modules/moderation', {
        guildExists,
        subtitle: 'Moderation',
        badWordsList
    })
})




//lists all teams
router.get('/servers/:id/management', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    var allTeams = await mongo.getAllTeamData(req.params.id);
    res.render('dashboard/modules/management', {
        guildExists,
        subtitle: 'Teams',
        allTeams,
    })
})

//edit one team
router.get('/servers/:id/edit/:teamName', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    var team = await mongo.getOneTeam(req.params.id, req.params.teamName);
    res.render('dashboard/modules/team/editTeam', {
        team,
        subtitle: 'Edit Team',
        guildExists
    })
})

//create a team
router.get('/servers/:id/makeTeam', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    var allTeams = await mongo.getAllTeamData(req.params.id);
    await sleep(2000);
    res.render('dashboard/modules/team/createTeam', {
        allTeams,
        subtitle: 'Create Team',
        guildExists
    })
	
})

//delete team
router.get('/servers/:id/delete/:teamName', validateGuild, async (req, res) => {
    if (await mongo.checkTeamNameValid(req.params.id, req.params.teamName)){
        var guild = bot.guilds.cache.get(req.params.id);
        const channel = guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.me).has('SEND_MESSAGES')).find(x => x.rawPosition === 0);
        channel.send('~deleteteam ' + req.params.teamName);
        await sleep(2000);
        res.redirect('/servers/' + req.params.id + '/management');

    }
    else{
        res.render('errors/teamError.pug');
    }
	
})





//initialize activity
router.get('/servers/:id/initialize', validateGuild, async (req, res) => {
        var guild = bot.guilds.cache.get(req.params.id);
        const channel = guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.me).has('SEND_MESSAGES')).find(x => x.rawPosition === 0);
        channel.send('~initiate');
        await sleep(8000);
        res.redirect('/servers/' + req.params.id);
})

//terminate activity
router.get('/servers/:id/terminate', validateGuild, async (req, res) => {
    var guild = bot.guilds.cache.get(req.params.id);
    const channel = guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.me).has('SEND_MESSAGES')).find(x => x.rawPosition === 0);
    channel.send('~terminate');
    await sleep(10000);
    res.redirect('/servers/' + req.params.id);
})





//get store lists
router.get('/servers/:id/stores', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    var allStores = await mongo.getAllStoresData(req.params.id);
    res.render('dashboard/modules/stores', {
        guildExists,
        subtitle: 'Stores',
        allStores,
    })
    
})

//get single item to edit
router.get('/servers/:id/editStore/:storeNum/:itemNumber', validateGuild, async (req, res) => {
    var store = req.params.storeNum;
    var guildExists = await mongo.checkIfExists(req.params.id);
    var item = await mongo.getItemData(req.params.id, store, req.params.itemNumber);
    res.render('dashboard/modules/store/editStore', {
        item,
        store,
        subtitle: 'Edit Store',
        guildExists
    })
    
})

//create item page
router.get('/servers/:id/makeItem/:storeNum', validateGuild, async (req, res) => {
    var store = req.params.storeNum;
    var item = await mongo.getStoreItemTotal(req.params.id, store);
    item++;
    res.render('dashboard/modules/store/makeItem', {
        item,
        subtitle: 'Create Item',
        store
    }) 
})

//delete item 
router.get('/servers/:id/delete/:storeNum/:itemNumber', validateGuild, async (req, res) => {
    await mongo.deleteItem(req.params.id, req.params.storeNum ,parseInt(req.params.itemNumber))

    res.redirect('/servers/' + req.params.id + '/stores');
    
})





//programs
router.get('/servers/:id/programs', validateGuild, async (req, res) => {
    let guildExists = await mongo.checkIfExists(req.params.id);
    let programs = await mongo.getAllProgramData(req.params.id);
    res.render('dashboard/modules/programs', {
        guildExists,
        programs,
        subtitle: 'Programs'
    })
    
})

//edit program
router.get('/servers/:id/editprogram/:program', validateGuild, async (req, res) => {
    let guildExists = await mongo.checkIfExists(req.params.id);
    let program = await mongo.getOneProgram(req.params.id, req.params.program);
    let num = req.params.program;
    res.render('dashboard/modules/programs/editProgram', {
        guildExists,
        program,
        num,
        subtitle: 'Edit Program'

    })
    
})

//create program
router.get('/servers/:id/createprogram', validateGuild, async (req, res) => {
    let guildExists = await mongo.checkIfExists(req.params.id);
    let programs = await mongo.getAllProgramData(req.params.id);
    let total = programs['Total Programs'];
    total++;
    res.render('dashboard/modules/programs/createprogram', {
        guildExists,
        programs,
        total,
        subtitle: 'Create Program'
    })
    
})

//delete program
router.get('/servers/:id/deleteprogram/:program', validateGuild, async (req, res) => {
    await mongo.deleteProgram(req.params.id, parseInt(req.params.program));
    res.redirect('/servers/' + req.params.id + '/programs');
    
})





//leaderboards
router.get('/servers/:id/stats', validateGuild, async (req, res) => {
    let guildExists = await mongo.checkIfExists(req.params.id);
    let loggedIn = true;
    let month = new Date().toLocaleDateString('default', {month : 'long'});
    var users = [];
    let allUserIDs = await mongo.getAllUsers(req.params.id);
    let nextUser = {};

    for(var i = 0; i < allUserIDs.length; i++){
        
        nextUser = {
            'username': await mongo.getUserName(req.params.id, allUserIDs[i]['User ID']),
            'discriminator': await mongo.getUserDiscriminator(req.params.id, allUserIDs[i]['User ID']),
            'currentPoints': await mongo.getUserCurrPoints(req.params.id, allUserIDs[i]['User ID']),
            'totalPoints': await mongo.getUserTotalPoints(req.params.id, allUserIDs[i]['User ID']),
            'avatarUrl': await mongo.getUserAvatar(req.params.id, allUserIDs[i]['User ID']),
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
        loggedIn,
        usersByTotalPoints,
        usersByCurrentPoints,
        usersByMonthlyPoints,
        usersByTotalExchange,
        usersByMonthlyExchange,
        usersByHighestStreak,
        usersByAttendance,
        usersByMessages,
        usersByLevel,
        subtitle: 'Leaderboards'
    })
    
})




//POST requests
router.post('/servers/:id/general', (req, res) => {
    for (let [key, value] of Object.entries(req.body)) {
        if(key === 'exchange'){
            mongo.changeExchangeRate(req.params.id, parseFloat(value) / 100);
        }
        if(key === 'maxOffenses'){
            mongo.changeMaxOffenses(req.params.id, parseInt(value));
        }
        if(key === 'dailyChallenges'){
            mongo.changeDailyChallenges(req.params.id, parseInt(value));
        }
        if(key === 'offensesBonus'){
            mongo.changeBonusAmount(req.params.id, parseFloat(value), 'Offenses Bonus');
        }
        if(key === 'exchangeBonus'){
            mongo.changeBonusAmount(req.params.id, parseFloat(value), 'Exchange Bonus');
        }
        if(key === 'pointsBonus'){
            mongo.changeBonusAmount(req.params.id, parseFloat(value), 'Points Bonus');
        }
        if(key === 'streakBonus'){
            mongo.changeBonusAmount(req.params.id, parseFloat(value), 'Streak Bonus');
        }
        if(key === 'level1Buyer'){
            mongo.changeLevel1Buyer(req.params.id, parseInt(value));
        }
        if(key === 'level2Buyer'){
            mongo.changeLevel2Buyer(req.params.id, parseInt(value));
        }
        if(key === 'level3Buyer'){
            mongo.changeLevel3Buyer(req.params.id, parseInt(value));
        }
        
      }
    res.redirect('back');
})

router.post('/servers/:id/time', (req, res) => {
    var guild = bot.guilds.cache.get(req.params.id);
    
    const channel = guild.channels.cache.filter(ch => ch.name === 'bot-messages' && ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.me).has('SEND_MESSAGES')).first();
    
    for (let [key, value] of Object.entries(req.body)) {
        if(key === 'automaticMonthlyBonus'){
            let conv1 = value;
            let result;
            if(conv1 === true){
                result = 'on';
            }
            else{
                result = 'off';
            }
            mongo.changeBonusDaySchedule(req.params.id, conv1);
        }
        if(key === 'challengesScheduleTime'){
            var conv2 = -1;
            switch(value){
                case 'tenAM':
                    conv2 = 10;
                    break;
                case 'elevenAM':
                    conv2 = 11;
                    break;
                case 'twelvePM':
                    conv2 = 12;
                    break;
                case 'onePM':
                    conv2 = 13;
                    break;
                case 'twoPM':
                    conv2 = 14;
                    break;
                case 'threePM':
                    conv2 = 15;
                    break;
                case 'fourPM':
                    conv2 = 16;
                    break;
            }
            channel.send('~changedailyresettime ' + conv2);
            mongo.changeChallengesResetTime(req.params.id, conv2);
        }

        if(key === 'boostTimeLimit'){
            var conv3
            switch(value){
                case 'oneHR':
                    conv3 = 1
                    break;
                case 'twoHRs':
                    conv3 = 2;
                    break;
                case 'threeHRs':
                    conv3 = 3;
                    break;
                case 'fourHRs':
                    conv3 = 4;
                    break;
                case 'fiveHRs':
                    conv3 = 5;
                    break;
                case 'sixHRs':
                    conv3 = 6;
                    break;
            }
            mongo.changeBoostTimeLimit(req.params.id, conv3);
        }
        
      }
    res.redirect('back');
})

router.post('/servers/:id/rankM', (req, res) => {
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'equalRank'){
            mongo.changeMultipliers(req.params.id, 'rank', 'equal', parseFloat(value));
        }
        if(key === 'oneHigherRank'){
            mongo.changeMultipliers(req.params.id, 'rank', 'oneHigherRank', parseFloat(value));

        }
        if(key === 'twoHigherRanks'){
            mongo.changeMultipliers(req.params.id, 'rank', 'twoHigherRanks', parseFloat(value));

        }
        if(key === 'oneLowerRank'){
            mongo.changeMultipliers(req.params.id, 'rank', 'oneLowerRank', parseFloat(value));

        }
        if(key === 'twoLowerRanks'){
            mongo.changeMultipliers(req.params.id, 'rank', 'twoLowerRanks', parseFloat(value));

        }
    }
    
    res.redirect('back');
})

router.post('/servers/:id/tierM', (req, res) => {
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'equalTier'){
            mongo.changeMultipliers(req.params.id, 'Tier', 'equal', parseFloat(value));
        }
        if(key === 'oneHigherTier'){
            mongo.changeMultipliers(req.params.id, 'Tier', 'oneHigherTier', parseFloat(value));

        }
        if(key === 'twoHigherTiers'){
            mongo.changeMultipliers(req.params.id, 'Tier', 'twoHigherTiers', parseFloat(value));

        }
        if(key === 'oneLowerTier'){
            mongo.changeMultipliers(req.params.id, 'Tier', 'oneLowerTier', parseFloat(value));

        }
        if(key === 'twoLowerTiers'){
            mongo.changeMultipliers(req.params.id, 'Tier', 'twoLowerTiers', parseFloat(value));

        }
    }
    
    res.redirect('back');
})

router.post('/servers/:id/teamM', (req, res) => {
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'equalTeam'){
            mongo.changeMultipliers(req.params.id, 'Team', 'equal', parseFloat(value));
        }
        if(key === 'oneHigherTeam'){
            mongo.changeMultipliers(req.params.id, 'Team', 'oneHigherTeam', parseFloat(value));

        }
        if(key === 'twoHigherTeams'){
            mongo.changeMultipliers(req.params.id, 'Team', 'twoHigherTeams', parseFloat(value));

        }
        if(key === 'oneLowerTeam'){
            mongo.changeMultipliers(req.params.id, 'Team', 'oneLowerTeam', parseFloat(value));

        }
        if(key === 'twoLowerTeams'){
            mongo.changeMultipliers(req.params.id, 'Team', 'twoLowerTeams', parseFloat(value));

        }
    }
    
    res.redirect('back');
})

router.post('/servers/:id/icons', (req, res) => {
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'matchIcon'){
            mongo.changeIcon(req.params.id, 'matchIcon', value);
        }
        if(key === 'bossIcon'){
            mongo.changeIcon(req.params.id, 'bossIcon', value);
        }
        if(key === 'bossWinIcon'){
            mongo.changeIcon(req.params.id, 'bossWinIcon', value);
        }
        if(key === 'bossLossIcon'){
            mongo.changeIcon(req.params.id, 'bossLossIcon', value);
        }
        if(key === 'store1Icon'){
            mongo.changeIcon(req.params.id, 'store1Icon', value);
        }
        if(key === 'store2Icon'){
            mongo.changeIcon(req.params.id, 'store2Icon', value);
        }
        if(key === 'store3Icon'){
            mongo.changeIcon(req.params.id, 'store3Icon', value);
        }
        if(key === 'teamStoreIcon'){
            mongo.changeIcon(req.params.id, 'teamStoreIcon', value);
        }
    }
    
    res.redirect('back');
})




//words
router.post('/servers/:id/words', (req, res) => {
    
    let str = JSON.stringify(req.body['textArea']).replace(/^"|"$/g, '').split(',');
    str = str.filter(function(stri) {
        return /\S/.test(stri);
    });
    let data = {};
    for(var i = 0; i < str.length; i++){
        data[i] = str[i];
    }
    mongo.setBadWordsList(req.params.id, data);
    
    res.redirect('/servers/' + req.params.id);
})




//teams
router.post('/servers/:id/edit/:teamName', (req, res) => {
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'teamPoints'){
            mongo.updateTeamPoints(req.params.id, req.params.teamName, parseFloat(value));
        }
        if(key === 'teamTier'){
            mongo.updateTeamTier(req.params.id, req.params.teamName, parseInt(value));
        }
        if(key === 'teamFlag'){
            var url = value
            if(value === 'none'){
                var url = 'https://drive.google.com/thumbnail?id='
            }
            mongo.updateTeamFlag(req.params.id, req.params.teamName, url);
        }
        
    }
    
    res.redirect('/servers/' + req.params.id + '/management');
})

router.post('/servers/:id/makeTeam', async (req, res) => {
    var value = req.body['teamName'];
    value = value[0].toUpperCase() + value.slice(1).toLowerCase();
   if (await mongo.checkTeamNameValid(req.params.id, value) === null){
        var guild = bot.guilds.cache.get(req.params.id);
        const channel = guild.channels.cache.filter(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.me).has('SEND_MESSAGES')).find(x => x.rawPosition === 0);
        channel.send('~createteam ' + value);
        await sleep(2000);
        res.redirect('/servers/' + req.params.id + '/management');
         
   }
   else{
       res.render('errors/teamError.pug');
   }
})




//edit item 
router.post('/servers/:id/editStore/:storeNum/:itemNum', (req, res) => {
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'itemName'){
            mongo.updateItemName(req.params.id, req.params.storeNum, req.params.itemNum, value);
        }
        if(key === 'itemQuantity'){
            mongo.updateItemQuantity(req.params.id, req.params.storeNum, req.params.itemNum, parseInt(value));
        }
        if(key === 'itemCost'){
            mongo.updateItemCost(req.params.id, req.params.storeNum, req.params.itemNum, parseFloat(value));
        }
        if(key === 'available'){
            mongo.updateItemAvailable(req.params.id, req.params.storeNum, req.params.itemNum, value);
        }
        
    }
    res.redirect('/servers/' + req.params.id + '/stores');
})
//create item function
router.post('/servers/:id/makeItem/:storeNum/:itemNum', async (req, res) => {
    await mongo.createNewItem(req.params.id, req.params.storeNum, req.params.itemNum, 
    req.body['itemName'], 
    parseInt(req.body['itemQuantity']), 
    parseFloat(req.body['itemCost']), 
    req.body['available']);
    
    res.redirect('/servers/' + req.params.id + '/stores');
})




//create program function
router.post('/servers/:id/createprogram/:program', async (req, res) => {
    let name = capitalizeTheFirstLetterOfEachWord(req.body['programName']);
    let data = await mongo.getAllProgramData(req.params.id);
    let isValid = true;
    for(let i = 1; i < data['Total Programs']; i++){
        if(name === data['Programs']['Program ' +  i]['Name']){
            isValid = false;
            break;
        }
    }
    if(isValid){
        let bonusType;
        if(req.body['programBonusType'] === 'noBonus'){
            bonusType = 0;
        }
        else if(req.body['programBonusType'] === 'fullAttendance'){
            bonusType = 1;
        }
        else if(req.body['programBonusType'] === 'partialAttendance'){
            bonusType = 2;
        }
    
        await mongo.createNewProgram(req.params.id, parseInt(req.params.program), name, parseFloat(req.body['programFactor']), bonusType, parseFloat(req.body['programBonusAmount']))
        await mongo.updateProgramForAllUsers(req.params.id, name);
        res.redirect('/servers/' + req.params.id + '/programs');
    }
    else{
        res.render('errors/progError');
    }
    
})

//edit program function
router.post('/servers/:id/editprogram/:program', async (req, res) => {
    
    for (let [key, value] of Object.entries(req.body)){
        if(key === 'programFactor'){
            await mongo.updateProgFactor(req.params.id, req.params.program, parseFloat(req.body['programFactor']));
        }
        if(key === 'programBonusType'){
            let bonusType;
            if(req.body['programBonusType'] === 'noBonus'){
                bonusType = 0;
            }
            else if(req.body['programBonusType'] === 'fullAttendance'){
                bonusType = 1;
            }
            else if(req.body['programBonusType'] === 'partialAttendance'){
                bonusType = 2;
            }
            await mongo.updateProgBonusType(req.params.id, req.params.program, bonusType);
        }
        if(key === 'programBonusAmount'){
            await mongo.updateProgBonusAmount(req.params.id, req.params.program, parseFloat(req.body['programBonusAmount']));
        }
        
    }
    res.redirect('/servers/' + req.params.id + '/programs');

    
})



function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

module.exports = router;