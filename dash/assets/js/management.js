

$('#editTeamForm').submit(function (event) {
    var newdata = getData();
    if(Object.keys(newdata).length === 0){
        event.preventDefault();
    }
    else{
        $(this)
        .find('input[name]')
        .filter(function () {
            return !this.value;
        })
        .prop('name', '');
    }
    
});

$('#createTeamForm').submit(function (event) {
    if(document.getElementById('teamName').value === ''){
        event.preventDefault();
    }
    else{
        $(this)
        .find('input[name]')
        .filter(function () {
            return !this.value;
        })
        .prop('name', '');
    }
    
});



function getData(){
    var data = {};

    if ($('#teamPoints').val().length !== 0 ){
        data['teamPoints'] = document.getElementById("teamPoints").value;
        
    }
    if ($('#teamTier').val().length !== 0 ){
        data['teamTier'] = document.getElementById("teamTier").value;
        
    }
    if ($('#teamFlag').val().length !== 0){
        data['teamFlag'] = document.getElementById("teamFlag").value;
    }

    return data;
}