let currAvailable
window.addEventListener('load', () => {
    currAvailable = document.getElementById('availability').value;
})






$('#editStoreForm').submit(function (event) {
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

$('#createItemForm').submit(function (event) {
    document.getElementById('available').setAttribute('value', document.getElementById('availability').value);
        $(this)
        .find('input[name]')
        .filter(function () {
            return !this.value;
        })
        .prop('name', '');
    
    
});


function getData(){
    var data = {};
    var newAvailable = document.getElementById('availability').value;

    if ($('#itemName').val().length !== 0){
        data['itemName'] = document.getElementById("itemName").value;
        
    }
    if ($('#itemQuantity').val().length !== 0){
        data['itemQuantity'] = document.getElementById("itemQuantity").value;
        
    }
    if ($('#itemCost').val().length !== 0){
        data['itemCost'] = document.getElementById("itemCost").value;
        
    }
if(currAvailable !== newAvailable){
    data['available'] = document.getElementById('availability').value;
    document.getElementById('available').setAttribute('value', newAvailable);
}
    
    return data;
}