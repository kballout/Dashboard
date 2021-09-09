const clear = document.getElementById('clear');

$(document).ready(function (){
    let wordsArr = document.getElementById('list').getAttribute('value');
    
    console.log(wordsArr);
    let array = wordsArr.replace(/[^a-zA-Z ]/g, " ").split(" ");
    array = array.filter(function(str) {
        return /\S/.test(str);
    });
    $.each(array, function(index, value) {
        $('#textArea').tagsinput('add', value);
    });   
})

clear.addEventListener('click', function(){
    $('#textArea').tagsinput('removeAll') 
})

