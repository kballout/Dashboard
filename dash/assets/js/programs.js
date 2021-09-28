const currType = document.getElementById('programBonusT').value;

$('#createProgramForm').submit(function (event) {
    document.getElementById('programBonusType').setAttribute('value', document.getElementById('programBonusT').value);
        $(this)
        .find('input[name]')
        .filter(function () {
            return !this.value;
        })
        .prop('name', '');
});

$('#editProgramForm').submit(function (event) {
    var newData = getEditData();
    
    if(Object.keys(newData).length === 0){
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

function getEditData(){
    var data = {};
    var newType = document.getElementById('programBonusT').value;

    
    if ($('#programFactor').val().length !== 0){
        data['programFactor'] = document.getElementById("programFactor").value;
        
    }
    if ($('#programBonusAmount').val().length !== 0){
        data['programBonusAmount'] = document.getElementById("programBonusAmount").value;
        
    }

    if (currType !== newType){
        data['programBonusType'] = document.getElementById('programBonusT').value;
        document.getElementById('programBonusType').setAttribute('value', newType);
    }

    return data;
}

function getData(){
    var data = {};
    var newType = document.getElementById('programBonusT').value;

    if ($('#programName').val().length !== 0){
        data['programName'] = document.getElementById("programName").value;
        
    }
    if ($('#programFactor').val().length !== 0){
        data['programFactor'] = document.getElementById("programFactor").value;
        
    }
    if ($('#programBonusAmount').val().length !== 0){
        data['programBonusAmount'] = document.getElementById("programBonusAmount").value;
        
    }

    if (currType !== newType){
        data['programBonusType'] = document.getElementById('programBonusT').value;
        document.getElementById('programBonusType').setAttribute('value', newType);
    }

    return data;
}