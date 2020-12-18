// alert("hello")
// function alertMe() {
//   alert("kl")
// }

  function isAlreadyAdded(ulElment, content) {
    var items = ulElment.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
      if (items[i].innerHTML === content) {
        return true;
      }
    }
    return false;
  }

  function addMessage(message) {
    var cErrorItems = document.getElementById('customErrorItems');
      if (!isAlreadyAdded(cErrorItems, message)) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(message));
        cErrorItems.appendChild(li);
      }
  }

  function removeMessage(message) {
    var cErrorItems = document.getElementById('customErrorItems');
    var items = cErrorItems.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
      if (items[i].innerHTML === message) {
        cErrorItems.removeChild(items[i]);
      }
    }
  }

  function removeErrorMessage(message) {
    removeMessage(message);
    var cErrorItems = document.getElementById('customErrorItems');
    var items = cErrorItems.getElementsByTagName("li");
    if (items.length === 0) {
      var parent = document.getElementById('checkout-container');
      var child = document.getElementById('customErrors');
      parent.removeChild(child);
    }
  }

  function createErrorMessage(message) {
    var cerrors = document.getElementById('customErrors');
    if (cerrors === null) {
        var div = document.createElement('div');
        div.id = "customErrors";

        div.innerHTML = "<div id='customIcon'><img src='https://paymentintegration.github.io/svgt.svg'></div><ul id='customErrorItems'></ul>";
        div.style.display = "block";

        var bef = document.getElementById('frmPayment');
        bef.parentNode.insertBefore(div, bef);
        addMessage(message);
    } else {
        addMessage(message);
    }
  }

function expDateCheck() {
    var currentYear = (new Date).getFullYear();
      var expYear = $("#trnExpYear").val();
      //if (expYear === currentYear.toString().substr(2)) {
         var currentMonth = (new Date).getMonth() + 1;
         var expMonth = $("#trnExpMonth").val();
         if (expMonth < currentMonth.toString()) {
           $("#trnExpMonth").css('border-color', 'red')
           $("#trnExpYear").css('border-color', 'red')
           $("#trnCardCvd").css('border-left-color', 'red')
           $("#submitButton").attr('disabled', true);
           createErrorMessage("Card expiry is in the past");
         } else {
          $("#trnExpMonth").css('border-color', 'rgba(200,200,200,1)')
          $("#trnExpYear").css('border-color', 'rgba(200,200,200,1)')
           $("#trnCardCvd").css('border-left-color', 'rgba(200,200,200,1)')
          $("#submitButton").attr('disabled', false);
          removeErrorMessage("Card expiry is in the past");
         }
      //}
  }
  
  // function validatePhoneNumber(phoneNumber, country) {
  //  return phoneUtil.isValidNumberForRegion(phoneUtil.parse(phoneNumber, country), country);
  // }
  
  $(document).ready(function(){
    registerEventListeners();
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

function registerEventListeners() {
    const cardCvd = document.getElementById('frmPayment').trnCardCvd
    const trnExpMonth = document.getElementById('frmPayment').trnExpMonth
    const trnExpYear = document.getElementById('frmPayment').trnExpYear
    cardCvd.addEventListener('focus', function() {
        expDateCheck();
    });
      trnExpMonth.addEventListener('blur', function() {
        expDateCheck();
    });
      trnExpYear.addEventListener('blur', function() {
        expDateCheck();
    });
}
