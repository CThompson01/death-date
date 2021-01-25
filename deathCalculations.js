/**
 * The average life span of a human in days
 * @type {Number}
 */
const avgLifeSpan = 27375;

/**
 * The variables passed to the webpage through urls
 * @type {String[]}
 */
const urlVariables = window.location.search.substring(1).split('&');

/**
 * The current date of when the page is being accessed
 * @type {Date}
 */
var currentDate = new Date();

/**
 * The birth date of the person
 * @type {Date}
 */
var birthDate = new Date('02/16/2001');

// Check if a custom name has been given and update screen if one has
if (getURLParam('name') != undefined)
	document.getElementById('name').innerHTML = getURLParam('name') + ' has';

// Check if a custom date has been given and update the screen if one has
if (getURLParam('date') != undefined) {
	var date = getURLParam('date').split('%');
	birthDate = new Date(date[0] + '/' + date[1] + '/' + date[2]);
}

// Calculate the difference in time between the birth date and the current date 
var dateDifference = Math.abs(currentDate.getTime() - birthDate.getTime()); 

// Convert the difference in time to difference in days
var dateDifferenceDays = dateDifference / (1000 * 3600 * 24);

// Update the page to show the amount of days left
document.getElementById('time-left-label').innerHTML = Math.floor(avgLifeSpan - dateDifferenceDays);

/**
 * Redirects the user to their custom link using the entered date of birth and name
 */
function generateWebpage() {
	var dob = document.getElementById('dob').value.split('-');
	window.location.href = `?name=${document.getElementById('enter-name').value}&date=${dob[1]}%${dob[2]}%${dob[0]}`;
}

/**
 * Sorts through the URL Params and grabs the one specified
 * @param  {String} param The param being searched for
 * @return {String}       The value of the param that was searched for
 */
function getURLParam(param) {
	for (var i = 0; i < urlVariables.length; i++) {
		var paramName = urlVariables[i].split('=');
		if (paramName[0] == param)
			return paramName[1];
	}
}