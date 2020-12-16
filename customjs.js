alert('TEsting js')
function checkAlert() {
  alert("kl")
}

$(document).ready(function(){
  $('#trnExpYear').blur(function() {
    var currentYear = (new Date).getFullYear();
    var expYear = $("#trnExpYear").text());
    if (expYear === currentYear) {
       var currentMonth = (new Date).getMonth() + 1;
       var expMonth = $("#trnExpMonth").text());
       if (expMonth < currentMonth) {
         $("#trnExpMonth").css('background-color', 'red')
       }
    }
  })
});
