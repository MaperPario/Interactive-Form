//setting global constants
const jobRoleField = document.getElementById('other-title');
const jobRoles = document.getElementById('title');
const tShirtSizes = document.getElementById('size');
const tShirtThemes = document.getElementById('design');
const tShirtColors = document.getElementById('color');
const tShirtColorsLabel = document.querySelector("label[for='color']");

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
    const indexNumber = tShirtColors.options[number];
    indexNumber.hidden = false;
}

// functions
addOtherInputField();

/*
****************
Activity Section
****************
*/


