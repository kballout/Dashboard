const cat1 = 
    {name: 'General', 
    icon: "fas.fa-sliders-h", 
        settings: [{
            term: 'Exchange rate',
            description: 'Change the rate of exchange for the server (must be a whole number e.g. 75)'
        },
        {
            term: 'Maximum offenses',
            description: 'Change the maximum number of offenses a player can receive'
        },
        {
            term: 'Daily challenges',
            description: 'Change the maximum number of challenges a player can battle'
        },
        {
            term: 'Offenses Bonus',
            description: 'Change the amount of bonus points a player recieves for having 0 offenses when the bonus command is sent'
        },
        {
            term: 'Level 1 buyer',
            description: 'Change the level a player must reach to gain access to store 1'
        },
        {
            term: 'Level 2 buyer',
            description: 'Change the level a player must reach to gain access to store 2'
        },
        {
            term: 'Level 3 buyer',
            description: 'Change the level a player must reach to gain access to store 3'
        },
        {
            term: 'Exchange Bonus',
            description: 'Change the amount of bonus points a player recieves for being among the top exchangers when the bonus command is sent'
        },
        {
            term: 'Points Bonus',
            description: 'Change the amount of bonus points a player recieves for being among the top point collectors when the bonus command is sent'
        },
        {
            term: 'Streak Bonus',
            description: 'Change the amount of bonus points a player recieves for maintaining streaks for programs when the bonus command is sent'
        },

    ]};
  const cat2 =  {
      name: 'Time settings', 
      icon: 'fas fa-gavel', 
        settings: [{
            term: 'Automatic Monthly Bonus',
            description: 'Change this setting to allow automatic monthly bonuses in your server'
        },
        {
            term: 'Reset challenges schedule',
            description: 'Change the time when the daily challenges of all players are reset back to 0'
        },
        {
            term: 'Boost time limit',
            description: 'Change how long a boost card will last once used (in hours)'
        },
    ]};
    const cat3 = {
        name:'Rank multipliers', 
        icon: 'fas fa-gavel', 
        settings: [{
            term: 'Equal',
            description: 'Change the multiplier a player receives when defeating a player who is equal in rank'
        },
        {
            term: 'One step higher',
            description: 'Change the multiplier a player receives when defeating a player who is a one step higher in rank'
        },
        {
            term: 'Two steps higher',
            description: 'Change the multiplier a player receives when defeating a player who is two steps higher in rank'
        },
        {
            term: 'One step lower',
            description: 'Change the multiplier a player receives when defeating a player who is one step lower in rank'
        },
        {
            term: 'Two steps lower',
            description: 'Change the multiplier a player receives when defeating a player who is two steps lower in rank'
        }
    ]};
    
    const cat4 = {
        name: 'Tier multipliers', 
        icon: 'fas fa-gavel', 
        settings: [{
            term: 'Equal',
            description: 'Change the multiplier a player receives when defeating a player who is equal in tier'
        },
        {
            term: 'One step higher',
            description: 'Change the multiplier a player receives when defeating a player who is a one step higher in tier'
        },
        {
            term: 'Two steps higher',
            description: 'Change the multiplier a player receives when defeating a player who is two steps higher in tier'
        },
        {
            term: 'One step lower',
            description: 'Change the multiplier a player receives when defeating a player who is one step lower in tier'
        },
        {
            term: 'Two steps lower',
            description: 'Change the multiplier a player receives when defeating a player who is two steps lower in tier'
        }
    ]};
    
    const cat5 = {
        name: 'Team multipliers', 
        icon: 'fas fa-gavel', 
        settings: [{
            term: 'Equal',
            description: 'Change the multiplier a team receives when defeating a team who is equal in team tier'
        },
        {
            term: 'One step higher',
            description: 'Change the multiplier a team receives when defeating a team who is a one step higher in team tier'
        },
        {
            term: 'Two steps higher',
            description: 'Change the multiplier a team receives when defeating a team who is two steps higher in team tier'
        },
        {
            term: 'One step lower',
            description: 'Change the multiplier a team receives when defeating a team who is one step lower in team tier'
        },
        {
            term: 'Two steps lower',
            description: 'Change the multiplier a team receives when defeating a team who is two steps lower in team tier'
        }
    ]};
    const cat6 = {
        name: 'Icons', 
        icon: 'fas fa-gavel', 
        settings:[{
            term: 'Matchmaking icon',
            description: 'Change the icon of matchmaking when a battle is called'
        },
        {
            term: 'Boss icon',
            description: 'Change the general icon of the game boss'
        },
        {
            term: 'Boss winning icon',
            description: 'Change the icon of the game boss winning a battle'  
        },
        {
            term: 'Boss losing icon',
            description: 'Change the icon of the game boss losing a battle'
        },
        {
            term: 'Store 1 icon',
            description: 'Change the icon displayed in store 1'
        },
        {
            term: 'Store 2 icon',
            description: 'Change the icon displayed in store 2' 
        },
        {
            term: 'Store 3 icon',
            description: 'Change the icon displayed in store 3'
        },
        {
            term: 'Team store icon',
            description: 'Change the icon displayed in the team store'
        }
    ]};

    const categories = [cat1, cat2, cat3, cat4, cat5, cat6];

    module.exports = categories;