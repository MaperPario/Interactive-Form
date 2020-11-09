// found on stackoverflow, adjusted to use arrow function and replaced target id with 'name'.
window.onload = () => {
    const nameFocus = document.getElementById("name").focus();
  };
//setting global constants
const jobRoleField = document.getElementById('other-title');
const jobRoles = document.getElementById('title');
//making Job Role input field hidden upon load
jobRoleField.className = 'is-hidden';
//if 'Other' is selected in the Job Role options, Job Role input field shows again
jobRoles.addEventListener('change', (e) => {
    if (e.target.value === "other") {
        jobRoleField.className = '';
    } else {
        jobRoleField.className = 'is-hidden';
    }
});







