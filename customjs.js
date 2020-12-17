alert("hello")
function alertMe() {
  alert("kl")
}

function expDateCheck() {
    var currentYear = (new Date).getFullYear();
      var expYear = $("#trnExpYear").val();
      if (expYear === currentYear.toString().substr(2)) {
         var currentMonth = (new Date).getMonth() + 1;
         var expMonth = $("#trnExpMonth").val();
         if (expMonth < currentMonth.toString()) {
           $("#trnExpMonth").css('border-color', 'red')
           $("#trnExpYear").css('border-color', 'red')
           $("#submitButton").attr('disabled', true);
         } else {
          $("#trnExpMonth").css('border-color', 'black')
          $("#trnExpYear").css('border-color', 'black')
          $("#submitButton").attr('disabled', false);
         }
      }
  }
  
  // function validatePhoneNumber(phoneNumber, country) {
  //  return phoneUtil.isValidNumberForRegion(phoneUtil.parse(phoneNumber, country), country);
  // }
  
  $(document).ready(function(){
    $('#trnCardCvd').focus(function() {
      expDateCheck();
    })
    $('#trnExpMonth #trnExpYear').blur(function() {
      expDateCheck();
    });
    $('#ordName').blur(function() {
      
    });
    $('#ordCity').blur(function() {
      
    });
    $('#ordPhoneNumber').blur(function() {
      //validatePhoneNumber($('#ordPhoneNumber').val(), $('#ordCountry').val());
    });
    $('#ordPostalCode').blur(function() {
      
    });
  });


  const cardCvd = document.getElementById('trnCardCvd');
cardCvd.addEventListener('focus', function() {
    expDateCheck();
})


