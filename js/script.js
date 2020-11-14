//tshirt section constants
const jobRoleField = document.getElementById('other-title');
const jobRoles = document.getElementById('title');
const tShirtSizes = document.getElementById('size');
const tShirtThemes = document.getElementById('design');
const tShirtColors = document.getElementById('color');
const tShirtColorsLabel = document.querySelector("label[for='color']");
let totalActivityCostLabel = document.createElement('h4');

//activity section constants
const activitiesList = document.querySelector('.activities');
const activitiesListCheckboxes = document.querySelectorAll('.activities input');

//payment section constants
const bitcoinForm = document.getElementById('bitcoin');
const paypalForm = document.getElementById('paypal');

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

function showTShirtColor(number) {
    tShirtColors.options[number].hidden = false;
}



/*
****************
Activity Section
****************
*/
function updateTotalActivityCostLabel() {
    totalActivityCostLabel.textContent = "Total Activity Cost: $" + totalActivityCost;
}
activitiesList.appendChild(totalActivityCostLabel);

let totalActivityCost = 0;

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
const paymentSelector = document.querySelector('#payment');
const paymentSelectorPlaceholderIndex = 0;
const paymentSelectorCreditCard = 1;

paymentSelector.options[paymentSelectorPlaceholderIndex].hidden = true;
paymentSelector.options[paymentSelectorCreditCard].selected = true;

bitcoinForm.hidden = true;
paypalForm.hidden = true;

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

// functions
addOtherInputField();
