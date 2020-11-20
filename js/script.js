const form = document.querySelector('form');

//tshirt section constants
const jobRoleField = document.getElementById('other-title');
const jobRoles = document.getElementById('title');
const tShirtSizes = document.getElementById('size');
const tShirtThemes = document.getElementById('design');
const tShirtColors = document.getElementById('color');
const tShirtColorsLabel = document.querySelector("label[for='color']");
const totalActivityCostLabel = document.createElement('h4');

//activity section constants (and lets)
const activitiesList = document.querySelector('.activities');
const firstActivity = activitiesList[0];
const activitiesListCheckboxes = document.querySelectorAll('.activities input');
let totalActivityCost = 0;

//payment section constants
const bitcoinForm = document.getElementById('bitcoin');
const paypalForm = document.getElementById('paypal');
const paymentSelector = document.querySelector('#payment');
const paymentSelectorPlaceholderIndex = 0;
const paymentSelectorCreditCard = 1;

//form validation constants
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const creditCardNumberInput = document.getElementById("cc-num");
const creditCardZipCodeInput = document.getElementById("zip");
const creditCardCVVInput = document.getElementById("cvv");

// found on stackoverflow, adjusted to use arrow function and replaced target id with 'name'.
window.onload = () => {
    document.getElementById("name").focus();
    document.querySelector("label[for='color']").textContent = '<<< Please Select T-Shirt Theme';
    tShirtColors.hidden = true;
};

//making Job Role input field hidden upon load
jobRoleField.className = 'is-hidden';

//Function created for if 'Other' is selected in the Job Role options, Job Role input field shows again
function addOtherInputField() {
    jobRoles.addEventListener('change', (e) => {
        jobRoleField.className = e.target.value === 'other' ? '' : 'is-hidden';
    });
}

/*
***************
T-Shirt Section
***************
*/
//listener that shows only specified colors when the corresponding theme is selected
tShirtThemes.addEventListener('change', (e) => {
    tShirtColors.hidden = false;
    tShirtColorsLabel.textContent = 'Colors:';

    for (let i = 0; i < tShirtColors.options.length; i++) {
        tShirtColors.options[i].hidden = true;
    }

    let lowestIndex = 0;
    switch (e.target.value) {
        case 'js puns':
            lowestIndex = showMatchingColors('JS Puns shirt only');
            tShirtColors.options[lowestIndex].selected = true;
            break;

        case 'heart js':
            lowestIndex = showMatchingColors('JS shirt only');
            tShirtColors.options[lowestIndex].selected = true;
            break;

        default:
            console.log('Invalid Theme Selection');
            break;
    }
});

//function to be used in the above event listener for showing matching tshirt colors
function showMatchingColors(themeIdentifier) {
    let lowestIndex = -1;

    for (let i = 0; i < tShirtColors.options.length; i++) {
        if (tShirtColors.options[i].textContent.indexOf(themeIdentifier) > -1) {
            showTShirtColor(i);

            if (lowestIndex === -1) {
                lowestIndex = i;
            }
        }
    }

    return lowestIndex;
}

//function for showing appropiate tshirt color according to the option index
function showTShirtColor(number) {
    tShirtColors.options[number].hidden = false;
}

/*
****************
Activity Section
****************
*/
// function created for updating the total cost of the selected activities
function updateTotalActivityCostLabel() {
    totalActivityCostLabel.textContent = "Total Activity Cost: $" + totalActivityCost;
}
activitiesList.appendChild(totalActivityCostLabel);

activitiesList.addEventListener('change', (e) => {
    const clickedActivity = e.target;
    const clickedActivityCost = clickedActivity.getAttribute('data-cost');

    if (clickedActivity.checked) {
        totalActivityCost += parseInt(clickedActivityCost);
    } else {
        totalActivityCost -= parseInt(clickedActivityCost);
    }
    updateTotalActivityCostLabel();
    
    const clickedDayAndTime = clickedActivity.getAttribute('data-day-and-time');

    for (let i = 0; i < activitiesListCheckboxes.length; i++) {
        const activitiesDayAndTimeIndex = activitiesListCheckboxes[i].getAttribute('data-day-and-time');
        const isOverlappingActivityTime = activitiesDayAndTimeIndex === clickedDayAndTime;
        const isClickedActivity = clickedActivity === activitiesListCheckboxes[i];
        const isOverlappingActivity = isOverlappingActivityTime && !isClickedActivity;

        if (isOverlappingActivity) {
            activitiesListCheckboxes[i].disabled = clickedActivity.checked;
        }
    }
});

/*
***************
Payment Section
***************
*/
//initialization for the payment section
paymentSelector.options[paymentSelectorPlaceholderIndex].hidden = true;
paymentSelector.options[paymentSelectorCreditCard].selected = true;
bitcoinForm.hidden = true;
paypalForm.hidden = true;

//listener that displays the specified form/information depending on the payment option that was selected
paymentSelector.addEventListener('change', () => {
    const paymentOption = document.getElementById('payment');
    const paymentValue = paymentOption.value;
    const creditCardForm = document.getElementById('credit-card');
    const bitcoinForm = document.getElementById('bitcoin');
    const paypalForm = document.getElementById('paypal');

    if (paymentValue === "credit card") {
        bitcoinForm.style.display = 'none';
        paypalForm.style.display = 'none';
        creditCardForm.style.display = 'block';
    } else if (paymentValue === "paypal") {
        bitcoinForm.style.display = 'none';
        creditCardForm.style.display = 'none';
        paypalForm.style.display = 'block';
    } else if (paymentValue === "bitcoin") {
        paypalForm.style.display = 'none';
        creditCardForm.style.display = 'none';
        bitcoinForm.style.display = 'block';                  
    }
});

/*
***********************
Form Validation Section
***********************
*/
// master validation function
function validateForm(e) {
    let isInvalid = false;

    if (!isValidName(nameInput.value)) {
        isInvalid = true;
        document.querySelector('#nameError').hidden = false;
    }
    
    if (!validateEmail()) {
        isInvalid = true;
    }

    if (!isCheckedActivity()) {
        isInvalid = true;
    }

    if (paymentSelector[paymentSelectorCreditCard].selected) {
        if (!isValidCreditCardNumber(creditCardNumberInput.value)) {
            isInvalid = true;
            document.querySelector('#cardNumberError').hidden = false;
        }
        if (!isValidZipCode(creditCardZipCodeInput.value)) {
            isInvalid = true;
            document.querySelector('#cardZipError').hidden = false;
        }
        if (!isValidCVV(creditCardCVVInput.value)) {
            isInvalid = true;
            document.querySelector('#cardCVVError').hidden = false;
        }
    }

    if (isInvalid) {
        e.preventDefault();
    }
}

//validators
function isValidName(name) {
    return /^[a-zA-Z ]{2,30}$/.test(name);
}

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.([a-z]{2,5})+$/i.test(email);
}

function isCheckedActivity() {
    for (let i = 0; i < activitiesListCheckboxes.length; i++) {
        if (activitiesListCheckboxes[i].checked) {
            document.getElementById('activitySpan').hidden = true;
            return true;
        }
    }
    document.getElementById('activitySpan').hidden = false;
    return false;
}

function isValidCreditCardNumber(creditCardNum) {
    return /^[0-9]{13,16}$/.test(creditCardNum);
}

function isValidZipCode(zipcode) {
    return /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipcode);
}

function isValidCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
}

function showOrHideTip (show, element) {
    if (show) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}

// factory function for showing error messages
function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = !valid;
      const tooltip = e.target.previousElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  }

// function for multiple error messages to display for email field
function validateEmail() {
    if (!emailInput.value) {
        document.querySelector('#emailEmptyError').hidden = false;
        document.querySelector('#emailError').hidden = true;

        return false;
    } 
    const isValid = isValidEmail(emailInput.value);
    document.querySelector('#emailEmptyError').hidden = true;
    document.querySelector('#emailError').hidden = isValid;

    return isValid;

}

//listeners for each input
nameInput.addEventListener("input", createListener(isValidName)); //name listener
emailInput.addEventListener("input", validateEmail); //email listener
creditCardNumberInput.addEventListener("input", createListener(isValidCreditCardNumber)); //card number listener
creditCardZipCodeInput.addEventListener("input", createListener(isValidZipCode)); //zipcode listener
creditCardCVVInput.addEventListener("input", createListener(isValidCVV)); //cvv listener

for (let i = 0; i < activitiesListCheckboxes.length; i++) {
    activitiesListCheckboxes[i].addEventListener('change', isCheckedActivity); //activity checkbox listener
}

form.addEventListener('submit', validateForm); //form validation using master validation function

// initialization functions
addOtherInputField();
