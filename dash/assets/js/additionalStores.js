let originalChecks = new Map();
let changedBoxes = [];
let newChecks = [{}];
let inputs;
let count;

window.addEventListener('load', () => {
    initialStoreSettings();
})

function validateStoreCreation(invalidNames){
    let storeName = document.querySelector('#storeName').value;
    document.querySelector('#errorMsg').innerHTML = ''
    for(let next of invalidNames){
        if(next['Name'].toLowerCase().includes(storeName.toLowerCase())){
            document.querySelector('#errorMsg').innerHTML = 'Store name already in use.'
            return false;
        }
    }
    return true;
}



function initialStoreSettings(){
    inputs = document.querySelector('#options').querySelectorAll('select');
    for(let i = 0; i < inputs.length; i++){
        originalChecks.set(inputs[i].getAttribute('name'), inputs[i].value)
    }
}

function validateStoreSettings(){
    document.querySelector('#errorMsg').innerHTML = ''
    inputs = document.querySelector('#options').querySelectorAll('select');
    for(let i = 0; i < inputs.length; i++){
        newChecks[i] = {};
        newChecks[i]['Name'] = inputs[i].getAttribute('name');
        if(inputs[i].value === 'On'){
            newChecks[i]['Value'] = 'On';
        }
        else{
            newChecks[i]['Value'] = 'Off'; 
        }
    }

    for(let i = 0; i < newChecks.length; i++){
        if(newChecks[i]['Value'] !== originalChecks.get(newChecks[i]['Name'])){
            changedBoxes.push(newChecks[i]['Name'] + '\t' + newChecks[i]['Value']);
        }
    }
    document.querySelector('#checkedBoxes').setAttribute('value', changedBoxes);
    return true;
        
    
}