$(".dropdown-menu li a").click(function(e){
    var selText = $(this).text();
    $(this).parents('.input-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');       
});



$(document).ready(function () {
    //general
    $('#generalForm').submit(function (event){
        event.preventDefault();
        var generalData = isGeneralAllEmpty();
        if(Object.keys(generalData).length !== 0){
            $.ajax({
                type: 'post',
                url: $('#generalForm').attr('action'),
                data: generalData
                
            })
            toggleSuccess();
            //clear
            document.getElementById("exchange").value = '';
            document.getElementById("maxOffenses").value = '';
            document.getElementById("dailyChallenges").value = '';
            document.getElementById("bonusAmount").value = '';
            document.getElementById("level1Buyer").value = '';
            document.getElementById("level2Buyer").value = '';
            document.getElementById("level3Buyer").value = '';
        }
        
    })
    
    //time
    $('#timeForm').submit(function (event){
        event.preventDefault();
        var timeData = isTimeAllEmpty();
        if(Object.keys(timeData).length !== 0){
            $.ajax({
                type: 'post',
                url: $('#timeForm').attr('action'),
                data: timeData
            })
            toggleSuccess();
            //clear
            document.getElementById('day').value = 'none';
            document.getElementById('time').value = 'none';
            document.getElementById('amount').value = 'none';

        }
    })

    //rank multipliers
    $('#rankMForm').submit(function (event){
        event.preventDefault();
        var rankData = isRankMAllEmpty();
        if(Object.keys(rankData).length !== 0){
            $.ajax({
                type: 'post',
                url: $('#rankMForm').attr('action'),
                data: rankData
                
            })
            toggleSuccess();
            //clear
            document.getElementById("equalRank").value = '';
            document.getElementById("oneHigherRank").value = '';
            document.getElementById("twoHigherRanks").value = '';
            document.getElementById("twoLowerRanks").value = '';
            document.getElementById("oneLowerRank").value = '';

        }
        
    })

    //Tier multipliers
    $('#tierMForm').submit(function (event){
        event.preventDefault();
        var tierData = isTierMAllEmpty();
        if(Object.keys(tierData).length !== 0){
            $.ajax({
                type: 'post',
                url: $('#tierMForm').attr('action'),
                data: tierData
                
            })
            toggleSuccess();
            //clear
            document.getElementById("equalTier").value = '';
            document.getElementById("oneHigherTier").value = '';
            document.getElementById("twoHigherTiers").value = '';
            document.getElementById("twoLowerTiers").value = '';
            document.getElementById("oneLowerTier").value = '';

        }
        
    })

    //team multipliers
    $('#teamMForm').submit(function (event){
        event.preventDefault();
        var teamData = isTeamMAllEmpty();
        if(Object.keys(teamData).length !== 0){
            $.ajax({
                type: 'post',
                url: $('#teamMForm').attr('action'),
                data: teamData
                
            })
            toggleSuccess();
            //clear
            document.getElementById("equalTeam").value = '';
            document.getElementById("oneHigherTeam").value = '';
            document.getElementById("twoHigherTeams").value = '';
            document.getElementById("twoLowerTeams").value = '';
            document.getElementById("oneLowerTeam").value = '';

        }
        
    })

    //Icons
    $('#iconsForm').submit(function (event){
        event.preventDefault();
        var iconsData = isIconsAllEmpty();
        if(Object.keys(iconsData).length !== 0){
            $.ajax({
                type: 'post',
                url: $('#iconsForm').attr('action'),
                data: iconsData
                
            })
            toggleSuccess();
            //clear
            document.getElementById("matchIcon").value = '';
            document.getElementById("bossIcon").value = '';
            document.getElementById("bossWinIcon").value = '';
            document.getElementById("bossLossIcon").value = '';
            document.getElementById("store1Icon").value = '';
            document.getElementById("store2Icon").value = '';
            document.getElementById("store3Icon").value = '';
            document.getElementById("teamStoreIcon").value = '';

        }
        
    })
})


function toggleSuccess(){
    $(".alert").css('visibility', 'visible');
}

$('.btn-close').on('click', function () {
    $('.alert').css('visibility', 'hidden');
});


//checks
function isGeneralAllEmpty(){
    var data = {};
    if ($('#exchange').val().length !== 0){
        data['exchange'] = document.getElementById("exchange").value;
        document.getElementById('currExRate').innerHTML = 'Currently: ' + document.getElementById("exchange").value + '%';
    }
    if ($('#maxOffenses').val().length !== 0){
        data['maxOffenses'] = document.getElementById("maxOffenses").value;
        document.getElementById('currMaxOffenses').innerHTML = 'Currently: ' + document.getElementById("maxOffenses").value;
    }
    if ($('#dailyChallenges').val().length !== 0){
        data['dailyChallenges'] = document.getElementById("dailyChallenges").value;
        document.getElementById('currDailyChallenges').innerHTML = 'Currently: ' + document.getElementById("dailyChallenges").value;
    }
    if ($('#bonusAmount').val().length !== 0){
        data['bonusAmount'] = document.getElementById("bonusAmount").value;
        document.getElementById('currBonusAmount').innerHTML = 'Currently: ' + document.getElementById("bonusAmount").value;
    }
    if ($('#level1Buyer').val().length !== 0){
        data['level1Buyer'] = document.getElementById("level1Buyer").value;
        document.getElementById('currLevel1Buyer').innerHTML = 'Currently: ' + document.getElementById("level1Buyer").value;
    }
    if ($('#level2Buyer').val().length !== 0){
        data['level2Buyer'] = document.getElementById("level2Buyer").value;
        document.getElementById('currLevel2Buyer').innerHTML = 'Currently: ' + document.getElementById("level2Buyer").value;
    }
    if ($('#level3Buyer').val().length !== 0){
        data['level3Buyer'] = document.getElementById("level3Buyer").value;
        document.getElementById('currLevel3Buyer').innerHTML = 'Currently: ' + document.getElementById("level3Buyer").value;
    }
    return data;
}

function isTimeAllEmpty(){
    var data = {};
    if (document.getElementById('day').value !== 'none'){
        data['offensesScheduleDay'] = document.getElementById('day').value;
        document.getElementById('currDay').innerHTML = 'Currently: ' + document.getElementById("day").value;
    }
    if (document.getElementById('time').value !== 'none'){
        data['challengesScheduleTime'] = document.getElementById('time').value;
        document.getElementById('currTime').innerHTML = 'Currently: ' + document.getElementById("time").value;
    }
    if (document.getElementById('amount').value !== 'none'){
        data['boostTimeLimit'] = document.getElementById('amount').value;
        document.getElementById('currAmount').innerHTML = 'Currently: ' + document.getElementById("amount").value;
    }
    return data;
}

function isRankMAllEmpty(){
    var data = {};
    if ($('#equalRank').val().length !== 0){
        data['equalRank'] = document.getElementById('equalRank').value;
        document.getElementById('currRankEqual').innerHTML = 'Currently: ' + document.getElementById("equalRank").value;
    }
    if ($('#oneHigherRank').val().length !== 0){
        data['oneHigherRank'] = document.getElementById('oneHigherRank').value;
        document.getElementById('currRank1Higher').innerHTML = 'Currently: ' + document.getElementById("oneHigherRank").value;
    }
    if ($('#twoHigherRanks').val().length !== 0){
        data['twoHigherRanks'] = document.getElementById('twoHigherRanks').value;
        document.getElementById('currRank2Higher').innerHTML = 'Currently: ' + document.getElementById("twoHigherRanks").value;
    }
    if ($('#oneLowerRank').val().length !== 0){
        data['oneLowerRank'] = document.getElementById('oneLowerRank').value;
        document.getElementById('currRank1Lower').innerHTML = 'Currently: ' + document.getElementById("oneLowerRank").value;
    }
    if ($('#twoLowerRanks').val().length !== 0){
        data['twoLowerRanks'] = document.getElementById('twoLowerRanks').value;
        document.getElementById('currRank2Lower').innerHTML = 'Currently: ' + document.getElementById("twoLowerRanks").value;
    }
    return data;
}

function isTierMAllEmpty(){
    var data = {};
    if ($('#equalTier').val().length !== 0){
        data['equalTier'] = document.getElementById('equalTier').value;
        document.getElementById('currTierEqual').innerHTML = 'Currently: ' + document.getElementById("equalTier").value;
    }
    if ($('#oneHigherTier').val().length !== 0){
        data['oneHigherTier'] = document.getElementById('oneHigherTier').value;
        document.getElementById('currTier1Higher').innerHTML = 'Currently: ' + document.getElementById("oneHigherTier").value;
    }
    if ($('#twoHigherTiers').val().length !== 0){
        data['twoHigherTiers'] = document.getElementById('twoHigherTiers').value;
        document.getElementById('currTier2Higher').innerHTML = 'Currently: ' + document.getElementById("twoHigherTiers").value;
    }
    if ($('#oneLowerTier').val().length !== 0){
        data['oneLowerTier'] = document.getElementById('oneLowerTier').value;
        document.getElementById('currTier1Lower').innerHTML = 'Currently: ' + document.getElementById("oneLowerTier").value;
    }
    if ($('#twoLowerTiers').val().length !== 0){
        data['twoLowerTiers'] = document.getElementById('twoLowerTiers').value;
        document.getElementById('currTier2Lower').innerHTML = 'Currently: ' + document.getElementById("twoLowerTiers").value;
    }
    return data;
}

function isTeamMAllEmpty(){
    var data = {};
    if ($('#equalTeam').val().length !== 0){
        data['equalTeam'] = document.getElementById('equalTeam').value;
        document.getElementById('currTeamEqual').innerHTML = 'Currently: ' + document.getElementById("equalTeam").value;
    }
    if ($('#oneHigherTeam').val().length !== 0){
        data['oneHigherTeam'] = document.getElementById('oneHigherTeam').value;
        document.getElementById('currTeam1Higher').innerHTML = 'Currently: ' + document.getElementById("oneHigherTeam").value;
    }
    if ($('#twoHigherTeams').val().length !== 0){
        data['twoHigherTeams'] = document.getElementById('twoHigherTeams').value;
        document.getElementById('currTeam2Higher').innerHTML = 'Currently: ' + document.getElementById("twoHigherTeams").value;
        
    }
    if ($('#oneLowerTeam').val().length !== 0){
        data['oneLowerTeam'] = document.getElementById('oneLowerTeam').value;
        document.getElementById('currTeam1Lower').innerHTML = 'Currently: ' + document.getElementById("oneLowerTeam").value;
    }
    if ($('#twoLowerTeams').val().length !== 0){
        data['twoLowerTeams'] = document.getElementById('twoLowerTeams').value;
        document.getElementById('currTeam2Lower').innerHTML = 'Currently: ' + document.getElementById("twoLowerTeams").value;
    }
    return data;
}

function isIconsAllEmpty(){
    var data = {};
    var novalue;
    if ($('#matchIcon').val().length !== 0){
        data['matchIcon'] = document.getElementById('matchIcon').value;
        noValue = document.getElementById('matchIcon').value;
        if(data.matchIcon === 'none'){
            data['matchIcon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currMatchmaking').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#bossIcon').val().length !== 0){
        data['bossIcon'] = document.getElementById('bossIcon').value;
        noValue = document.getElementById('bossIcon').value;
        if(data.bossIcon === 'none'){
            data['bossIcon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currBoss').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#bossWinIcon').val().length !== 0){
        data['bossWinIcon'] = document.getElementById('bossWinIcon').value;
        noValue = document.getElementById('bossWinIcon').value;
        if(data.bossWinIcon === 'none'){
            data['bossWinIcon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currBossWin').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#bossLossIcon').val().length !== 0){
        data['bossLossIcon'] = document.getElementById('bossLossIcon').value;
        noValue = document.getElementById('bossLossIcon').value;
        if(data.bossLossIcon === 'none'){
            data['bossLossIcon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currBossLose').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#store1Icon').val().length !== 0){
        data['store1Icon'] = document.getElementById('store1Icon').value;
        noValue = document.getElementById('store1Icon').value;
        if(data.store1Icon === 'none'){
            data['store1Icon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currStore1').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#store2Icon').val().length !== 0){
        data['store2Icon'] = document.getElementById('store2Icon').value;
        noValue = document.getElementById('store2Icon').value;
        if(data.store2Icon === 'none'){
            data['store2Icon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currStore2').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#store3Icon').val().length !== 0){
        data['store3Icon'] = document.getElementById('store3Icon').value;
        noValue = document.getElementById('store3Icon').value;
        if(data.store3Icon === 'none'){
            data['store3Icon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currStore3').innerHTML = 'Currently: ' +noValue;
    }
    if ($('#teamStoreIcon').val().length !== 0){
        data['teamStoreIcon'] = document.getElementById('teamStoreIcon').value;
        noValue = document.getElementById('teamStoreIcon').value;
        if(data.teamStoreIcon === 'none'){
            data['teamStoreIcon'] = 'https://drive.google.com/thumbnail?id='
            noValue = 'None'
        }
        document.getElementById('currTeamStore').innerHTML = 'Currently: ' +noValue;
    }
    return data;
}







