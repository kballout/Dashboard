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
router.get('/dashboard', (req, res) => res.render('dashboard/index', {
    subtitle: 'dashboard',
    categories,
}));

//choose server
router.get('/servers/:id', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    res.render('dashboard/show', {
        guildExists,
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
            categories,
    
        })
    }
    else{
        var data = await mongo.getAllGeneralData(req.params.id);
        var conv1 = 'Off';
        var conv2 = 'Off';
        var conv3 = parseFloat(data['Exchange Rate']) * 100;
            switch(data['Bonus Day']){
                case '1':
                    conv1 = 'Sunday';
                    break;
                case '2':
                    conv1 = 'Monday';
                    break;
                case '3':
                    conv1 = 'Tuesday';
                    break;
                case '4':
                    conv1 = 'Wednesday';
                    break;
                case '5':
                    conv1 = 'Thursday';
                    break;
                case '6':
                    conv1 = 'Friday';
                    break;
                case '7':
                    conv1 = 'Saturday';
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
    var guildExists = await mongo.checkIfExists(req.params.id);
    res.render('dashboard/modules/moderation', {
        guildExists,
    })
})




//lists all teams
router.get('/servers/:id/management', validateGuild, async (req, res) => {
    var guildExists = await mongo.checkIfExists(req.params.id);
    var allTeams = await mongo.getAllTeamData(req.params.id);
    res.render('dashboard/modules/management', {
        guildExists,
        allTeams,
    })
})

//edit one team
router.get('/servers/:id/edit/:teamName', validateGuild, async (req, res) => {
    var team = await mongo.getOneTeam(req.params.id, req.params.teamName);
    res.render('dashboard/modules/team/editTeam', {
        team,
    })
})

//create a team
router.get('/servers/:id/makeTeam', validateGuild, async (req, res) => {
    var allTeams = await mongo.getAllTeamData(req.params.id);
    res.render('dashboard/modules/team/createTeam', {
        allTeams,
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
        allStores,
    })
    
})

//get single item to edit
router.get('/servers/:id/editStore/:storeNum/:itemNumber', validateGuild, async (req, res) => {
    var store = req.params.storeNum;
    var item = await mongo.getItemData(req.params.id, store, req.params.itemNumber);
    res.render('dashboard/modules/store/editStore', {
        item,
        store
    })
    
})

//create item page
router.get('/servers/:id/makeItem/:storeNum', validateGuild, async (req, res) => {
    var store = req.params.storeNum;
    var item = await mongo.getStoreItemTotal(req.params.id, store);
    item++;
    res.render('dashboard/modules/store/makeItem', {
        item,
        store
    }) 
})

//delete item 
router.get('/servers/:id/delete/:storeNum/:itemNumber', validateGuild, async (req, res) => {
    await mongo.deleteItem(req.params.id, req.params.storeNum ,parseInt(req.params.itemNumber))

    res.redirect('/servers/' + req.params.id + '/stores');
    
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
        if(key === 'bonusAmount'){
            mongo.changeBonusAmount(req.params.id, parseFloat(value));
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
        if(key === 'offensesScheduleDay'){
            var conv1 = '-1';
            switch(value){
                case 'sunday':
                    conv1 = '1';
                    break;
                case 'monday':
                    conv1 = '2';
                    break;
                case 'tuesday':
                    conv1 = '3';
                    break;
                case 'wednesday':
                    conv1 = '4';
                    break;
                case 'thursday':
                    conv1 = '5';
                    break;
                case 'friday':
                    conv1 = '6';
                    break;
                case 'saturday':
                    conv1 = '7';
                    break;
            }
            if(value === 'off'){
                value = -1;
            }
            channel.send('~changebonusday ' + value);
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

module.exports = router;