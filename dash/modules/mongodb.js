const { MongoClient } = require("mongodb");
var {Double} = require("mongodb");
const config = require('../../config.json');
let database; //global

class DB {
    #url

    constructor() {
        this.#url = config.mongoURI;
    }

    async #connect() {
            let client = new MongoClient(this.#url);
            await client.connect();
           
            return client;
    }

    async checkIfExists(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Initialize");
        let fieldName = "Started";
        let value = await doc.distinct(fieldName);
        if(value[0] === true){
            return true;
        }
        return false;
    }



    //GENERAL
    async getAllGeneralData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        var query = {Name: "General Settings"};
        return await doc.findOne(query);   
    }

    async changeExchangeRate(dbName, rate){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Exchange Rate";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Exchange Rate']: value[0] },
        {$set:{'Exchange Rate': rate}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeMaxOffenses(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Max Offenses";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Max Offenses']: value[0] },
        {$set:{'Max Offenses': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeDailyChallenges(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Daily Challenges";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Daily Challenges']: value[0] },
        {$set:{'Daily Challenges': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeBonusAmount(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Bonus Amount";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Bonus Amount']: value[0] },
        {$set:{'Bonus Amount': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeLevel1Buyer(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Buyer 1 Level";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Buyer 1 Level']: value[0] },
        {$set:{'Buyer 1 Level': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeLevel2Buyer(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Buyer 2 Level";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Buyer 2 Level']: value[0] },
        {$set:{'Buyer 2 Level': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeLevel3Buyer(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Buyer 3 Level";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Buyer 3 Level']: value[0] },
        {$set:{'Buyer 3 Level': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeBonusDaySchedule(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Bonus Day";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Bonus Day']: value[0] },
        {$set:{'Bonus Day': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeChallengesResetTime(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Reset Challenges Time";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Reset Challenges Time']: value[0] },
        {$set:{'Reset Challenges Time': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeBoostTimeLimit(dbName, num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName = "Boost Time Limit";
        let value = await doc.distinct(fieldName);
        doc.findOneAndUpdate({['Boost Time Limit']: value[0] },
        {$set:{'Boost Time Limit': num}}, function(err, res){
            if (err) throw err;
        });
        
    }

    async changeMultipliers(dbName, type, mult ,num){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        let fieldName;
        let value;
        if(type === 'rank'){
            if(mult === 'equal'){
                fieldName = "Rank Multipliers.Equal";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.Equal']: value[0] },
                {$set:{'Rank Multipliers.Equal': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneHigherRank'){
                fieldName = "Rank Multipliers.One Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.One Higher']: value[0] },
                {$set:{'Rank Multipliers.One Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoHigherRanks'){
                fieldName = "Rank Multipliers.Two Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.Two Higher']: value[0] },
                {$set:{'Rank Multipliers.Two Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneLowerRank'){
                fieldName = "Rank Multipliers.One Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.One Lower']: value[0] },
                {$set:{'Rank Multipliers.One Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoLowerRanks'){
                fieldName = "Rank Multipliers.Two Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Rank Multipliers.Two Lower']: value[0] },
                {$set:{'Rank Multipliers.Two Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }  
        }
        if(type === 'tier'){
            if(mult === 'equal'){
                fieldName = "Tier Multipliers.Equal";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.Equal']: value[0] },
                {$set:{'Tier Multipliers.Equal': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneHigherTier'){
                fieldName = "Tier Multipliers.One Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.One Higher']: value[0] },
                {$set:{'Tier Multipliers.One Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoHigherTiers'){
                fieldName = "Tier Multipliers.Two Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.Two Higher']: value[0] },
                {$set:{'Tier Multipliers.Two Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneLowerTier'){
                fieldName = "Tier Multipliers.One Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.One Lower']: value[0] },
                {$set:{'Tier Multipliers.One Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoLowerTiers'){
                fieldName = "Tier Multipliers.Two Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Tier Multipliers.Two Lower']: value[0] },
                {$set:{'Tier Multipliers.Two Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }  
        }
        if(type === 'team'){
            if(mult === 'equal'){
                fieldName = "Team Multipliers.Equal";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.Equal']: value[0] },
                {$set:{'Team Multipliers.Equal': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneHigherTeam'){
                fieldName = "Team Multipliers.One Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.One Higher']: value[0] },
                {$set:{'Team Multipliers.One Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoHigherTeams'){
                fieldName = "Team Multipliers.Two Higher";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.Two Higher']: value[0] },
                {$set:{'Team Multipliers.Two Higher': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'oneLowerTeam'){
                fieldName = "Team Multipliers.One Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.One Lower']: value[0] },
                {$set:{'Team Multipliers.One Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }
            else if(mult === 'twoLowerTeams'){
                fieldName = "Team Multipliers.Two Lower";
                value = await doc.distinct(fieldName);
                doc.findOneAndUpdate({['Team Multipliers.Two Lower']: value[0] },
                {$set:{'Team Multipliers.Two Lower': num}}, function(err, res){
                    if (err) throw err;
                });
            }  
        }
        
        
    }

    async changeIcon(dbName, choice, url){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Guild Settings");
        if(choice === 'matchIcon'){
            let fieldName = "Matchmaking Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Matchmaking Icon']: value[0] },
            {$set:{'Matchmaking Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'bossIcon'){
            let fieldName = "Boss Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Boss Icon']: value[0] },
            {$set:{'Boss Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'bossWinIcon'){
            let fieldName = "Boss Win";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Boss Win']: value[0] },
            {$set:{'Boss Win': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'bossLossIcon'){
            let fieldName = "Boss Lose";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Boss Lose']: value[0] },
            {$set:{'Boss Lose': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'store1Icon'){
            let fieldName = "Store 1 Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Store 1 Icon']: value[0] },
            {$set:{'Store 1 Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'store2Icon'){
            let fieldName = "Store 2 Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Store 2 Icon']: value[0] },
            {$set:{'Store 2 Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else if(choice === 'store3Icon'){
            let fieldName = "Store 3 Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Store 3 Icon']: value[0] },
            {$set:{'Store 3 Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }
        else {
            let fieldName = "Team Store Icon";
            let value = await doc.distinct(fieldName);
            doc.findOneAndUpdate({['Team Store Icon']: value[0] },
            {$set:{'Team Store Icon': url}}, function(err, res){
                if (err) throw err;
            });
        }

        
        
    }



    //TEAMS
    async getAllTeamData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        var allTeams = [];
        let cursor = doc.find();
        while(await cursor.hasNext()){
            allTeams.push(await cursor.next());
        }
       return allTeams;
    }

    async getOneTeam(dbName, teamName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        var query = {Name: teamName};
        return await doc.findOne(query);
    }

    async updateTeamPoints(dbName, teamName, points){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        let update = {$set: {Points: points}};
        await doc.updateOne(filter, update);
    }

    async updateTeamTier(dbName, teamName, tier){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        let update = {$set: {Tier: tier}};
        await doc.updateOne(filter, update);
    }

    async updateTeamFlag(dbName, teamName, url){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        let update = {$set: {'Team Flag': url}};
        await doc.updateOne(filter, update);
    }

    async checkTeamNameValid(dbName, teamName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Teams");
        let filter = {Name: teamName};
        return await doc.findOne(filter);
    }



    //STORES
    async getAllStoresData(dbName){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var allStores = [];
        let cursor = doc.find();
        while(await cursor.hasNext()){
            allStores.push(await cursor.next());
        }
       return allStores;       
    }

    async getStoreItemTotal(dbName, store){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        let filter = {Name: store};
        let res = await doc.findOne(filter);
        return Object.keys(res['Items']).length;
    }

    async getItemData(dbName, store, itemNumber){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + itemNumber;
        return await doc.distinct(search , {Name:store});
    }
    


    //UPDATES
    async updateItemName(dbName, store, item, name){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Name';
        let filter = {Name: store};
        let update = {$set:{[search]: name}};
        await doc.updateOne(filter, update);
    }

    async updateItemQuantity(dbName, store, item, qty){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Qty';
        let filter = {Name: store};
        let update = {$set:{[search]: qty}};
        await doc.updateOne(filter, update);
    }
 
    async updateItemCost(dbName, store, item, cost){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Cost';
        let filter = {Name: store};
        let update = {$set:{[search]: Double(cost)}};
        await doc.updateOne(filter, update);
    }

    async updateItemNumber(dbName, store, item, number){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Number';
        let filter = {Name: store};
        let update = {$set:{[search]: number}};
        await doc.updateOne(filter, update);
    }

    async updateItemAvailable(dbName, store, item, available){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var search = 'Items.' + 'Item ' + item + '.Available';
        let filter = {Name: store};
        let update = {$set:{[search]: this.parseBool(available)}};
        await doc.updateOne(filter, update);
    }

    async createNewItem(dbName, store, itemNumber, itemName, itemQuantity, itemCost, itemAvailable){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");
        var location = 'Items.' + 'Item ' + itemNumber;
        var newItem = {
            $set:{
                [location]:{
                    Number: parseInt(itemNumber),
                    Name: itemName,
                    Qty: itemQuantity,
                    Cost: Double(itemCost),
                    Available: this.parseBool(itemAvailable)
                }
            }
        }
        let filter = {Name: store};
        await doc.updateOne(filter, newItem, {upsert: true})
    }

    async deleteItem(dbName, store, itemNumber){
        let client = this.#connect();
        database = (await client).db(dbName);
        let doc = database.collection("Stores");

        //Inital Delete item entry
        var location = 'Items.' + 'Item ' + itemNumber;
        var removeItem = {$unset:{[location]: {}}};
        let filter = {Name: store};
        await doc.updateOne(filter, removeItem);
        
        //get total items currently
        var total = await this.getStoreItemTotal(dbName, store);
        total++;
        //Update new store
        var nextLocation, nextRemove;
        for(var i  = itemNumber; i < total; i++){
            this.updateItemNumber(dbName, store, 1 + i, i);
            var data = await this.getItemData(dbName,store, 1 + i);
            this.createNewItem(dbName, store, i, 
                data[0]['Name'], 
                parseInt(data[0]['Qty']), 
                parseFloat(data[0]['Cost']), 
                this.parseBool(data[0]['Available'])
                )
            //Delete old item
            nextLocation = 'Items.' + 'Item ' + (1 + i);
            nextRemove = {$unset:{[nextLocation]: {}}};
            await doc.updateOne(filter, nextRemove);
        }
    }








    parseBool(val) { 
        if(val === 'true'){
            return true;
        }
        return false;
      }
    
    async closeConnection(){
        await client.close();
    }
}

module.exports = DB;