var langCode;
function alertMe() {
  var url = window.location.href;
  var lang = url.split('&trnLanguage=')[1].substr(0, 3);
  langCode = lang;
  initPage();
}

const fieldErrorMap = [['#ordName', 'Name', 'Nom']
                  ,['#ordAddress1', 'Address Line1', 'Adresse – ligne 1']
                  ,['#ordCity', 'City', 'Ville']
                  ,['#ordPostalCode', 'Postal/Zip code', 'Code postal/zip'] ];

function getFieldName(fieldId) {
  var returnValue = "";
  fieldErrorMap.forEach((data) => {
    if (fieldId === data[0]) {
      returnValue = langCode === 'eng' ? data[1] : data[2];
    }
  });
  return returnValue;
}

function setAdjacentStyle(fieldId, color) {
  if (fieldId === "#ordName") {
    $("#ordEmailAddress").css("border-top-color", color);
    $("#ordPhoneNumber").css("border-top-color", color);
  } else {
    var addr1 = $("#ordAddress1").val();
    var city = $("#ordCity").val();
    if (addr1.length === 0 && city.length === 0) {
      $("#ordAddress2").css("border-left-color", 'red');
      $("#ordCity").css("border-top-color", 'red');
      $("#ordProvince").css("border-top-color", 'red');
    } else if (addr1.length > 0 && city.length > 0) {
      $("#ordAddress2").css("border-left-color", 'rgba(200,200,200,1)');
      $("#ordCity").css("border-top-color", 'rgba(200,200,200,1)');
      $("#ordProvince").css("border-top-color", 'rgba(200,200,200,1)');
    } else if (addr1.length > 0 && city.length === 0) {
      $("#ordAddress2").css("border-left-color", 'rgba(200,200,200,1)');
      $("#ordCity").css("border-top-color", 'red');
      $("#ordProvince").css("border-top-color", 'red');
    } else if (addr1.length === 0 && city.length > 0) {
      $("#ordAddress2").css("border-left-color", 'red');
      $("#ordCity").css("border-top-color", 'red');
      $("#ordProvince").css("border-top-color", 'rgba(200,200,200,1)');
    }
    var postalCode = $("#ordPostalCode").val();
    if (postalCode.length === 0 && city.length === 0) {
      $("#ordPostalCode").css("border-left-color", 'red');
      $("#ordCountry").css("border-top-color", 'red');
    } else if (postalCode.length > 0 && city.length > 0) {
      $("#ordPostalCode").css("border-left-color", 'rgba(200,200,200,1)');
      $("#ordCountry").css("border-top-color", 'rgba(200,200,200,1)');
    } else if (postalCode.length > 0 && city.length === 0) {
      $("#ordPostalCode").css("border-left-color", 'red');
      $("#ordCountry").css("border-top-color", 'rgba(200,200,200,1)');
    } else if (postalCode.length === 0 && city.length > 0) {
      //$("#ordPostalCode").css("border-left-color", 'red');
      $("#ordCountry").css("border-top-color", 'red');
    }
  }
}

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
  if (cErrorItems != null) {
    var items = cErrorItems.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
      if (items[i].innerHTML === message) {
        cErrorItems.removeChild(items[i]);
      }
    }
  }
}

function removeErrorMessage(message) {
  removeMessage(message);
  var cErrorItems = document.getElementById('customErrorItems');
  if (cErrorItems != null) {
    var items = cErrorItems.getElementsByTagName("li");
    if (items.length === 0) {
      var parent = document.getElementById('checkout-container');
      var child = document.getElementById('customErrors');
      parent.removeChild(child);
    }
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

function isInvalidExpDate() {
  var currentYear = (new Date).getFullYear();
  var expYear = $("#trnExpYear").val();
  var currentMonth = (new Date).getMonth() + 1;
  var expMonth = $("#trnExpMonth").val();
  return expYear === currentYear.toString().substr(2) && expMonth < currentMonth.toString()
}

function expDateCheck() {
       if (isInvalidExpDate()) {
         $("#trnExpMonth").css('border-color', 'red')
         $("#trnExpYear").css('border-color', 'red')
         $("#trnCardCvd").css('border-left-color', 'red')
         createErrorMessage("Card expiry is in the past");
       } else {
        $("#trnExpMonth").css('border-color', 'rgba(200,200,200,1)')
        $("#trnExpYear").css('border-color', 'rgba(200,200,200,1)')
         $("#trnCardCvd").css('border-left-color', 'rgba(200,200,200,1)')
        removeErrorMessage("Card expiry is in the past");
       }
       setSubmitButton();
}

$(document).ready(function(){
  registerEventListeners();
  initPage();
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

function initPage() {
const name = document.getElementById('frmPayment').ordName
name.placeholder = name.placeholder + "*"
const addr1 = document.getElementById('frmPayment').ordAddress1
addr1.placeholder = addr1.placeholder + "*"
const city = document.getElementById('frmPayment').ordCity
city.placeholder = city.placeholder + "*"
const postalCode = document.getElementById('frmPayment').ordPostalCode
postalCode.placeholder = postalCode.placeholder + "*"
$("#submitButton").attr('disabled', true);
  const ordNumber = document.getElementById('frmPayment').trnOrderNumber
  ordNumber.setAttribute("tabindex", -1);
  document.getElementsByTagName("html")[0].setAttribute("lang", langCode.substr(0, 2));
  const img = document.getElementById('dt-img')
  const headerDiv = document.getElementById('headerBar');
  img.src = 'https://drivetest.ca/img/site/svg/Drivetest-Logo.svg'
  headerDiv.innerHTML = "Book a Road Test // Payment";
  if (langCode === 'fre') {
      img.src = 'https://drivetest.ca/img/site/svg/Drivetest-Logo-fr.svg'
     headerDiv.innerHTML = "Effectuer une réservation pour un examen pratique // Paiement";
  }
}

function mandatoryFieldCheck() {
  setFieldAttributes("#ordName");
  setFieldAttributes("#ordAddress1");
  setFieldAttributes("#ordCity");
  setFieldAttributes("#ordPostalCode");
  setSubmitButton();
}

function setFieldAttributes(fieldName) {
  var name = $(fieldName).val();
  if (!name.length > 0) {
    $(fieldName).css('border-color', 'red');
    setAdjacentStyle(fieldName, 'red'); 
    createErrorMessage(getFieldName(fieldName) + " is required. Please enter valid value to proceed.");
  } else {
    $(fieldName).css('border-color', 'rgba(200,200,200,1)');
    setAdjacentStyle(fieldName, 'rgba(200,200,200,1)'); 
    removeErrorMessage(getFieldName(fieldName) + " is required. Please enter valid value to proceed.");
  }
}

function setSubmitButton() {
  var name = $("#ordName").val();
  var addr1 = $("#ordAddress1").val();
  var city = $("#ordCity").val();
  var postalCode = $("#ordPostalCode").val();
  if (name.length > 0 && addr1.length > 0 && city.length > 0 && postalCode.length > 0 && !isInvalidExpDate() ) {
    $("#submitButton").attr('disabled', false);
  } else {
    $("#submitButton").attr('disabled', true);
  }
}

function registerEventListeners() {
  const cardCvd = document.getElementById('frmPayment').trnCardCvd
  const trnExpMonth = document.getElementById('frmPayment').trnExpMonth
  const trnExpYear = document.getElementById('frmPayment').trnExpYear
  const name = document.getElementById('frmPayment').ordName
  const addr1 = document.getElementById('frmPayment').ordAddress1
  const city = document.getElementById('frmPayment').ordCity
  const postal = document.getElementById('frmPayment').ordPostalCode
  cardCvd.addEventListener('focus', function() {
      expDateCheck();
  });
  cardCvd.addEventListener('blur', function() {
      mandatoryFieldCheck();
  });
  name.addEventListener('blur', function() {
    mandatoryFieldCheck();
  });
  addr1.addEventListener('blur', function() {
    mandatoryFieldCheck();
  });
  city.addEventListener('blur', function() {
    mandatoryFieldCheck();
  });
  postal.addEventListener('blur', function() {
    mandatoryFieldCheck();
  });
    trnExpMonth.addEventListener('blur', function() {
      expDateCheck();
  });
    trnExpYear.addEventListener('blur', function() {
      expDateCheck();
  });
}
