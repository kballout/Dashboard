$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    
  })


$("#terminateBtn").click(function(){
  $('#endModal').modal('hide')   
    toggleSuccess();
})

$("#returnBtn").click(function(){
    toggleSuccess();
})

  function toggleSuccess(){
    $(".alert").css('visibility', 'visible');
}

$('.btn-close').on('click', function () {
    $('.alert').css('visibility', 'hidden');
});