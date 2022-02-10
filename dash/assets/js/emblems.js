$('#editEmblemForm').submit(function (event) {
    var newData = getData();
    
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

function getData(){
    var data = {};

    if ($('#emblemTitle').val().length !== 0){
        data['emblemTitle'] = document.getElementById("emblemTitle").value;
        
    }
    if ($('#emblemAmount').val().length !== 0){
        data['emblemAmount'] = document.getElementById("emblemAmount").value;
        
    }
    
    return data;
}