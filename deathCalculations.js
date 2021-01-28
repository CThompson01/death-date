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
var birthDate = new Date();

// Check if a custom name has been given and update screen if one has
if (getURLParam('name') != undefined)
	document.getElementById('name').innerHTML = getURLParam('name') + ' has';

// Check if a custom date has been given and update the screen if one has
if (getURLParam('date') != undefined) {
	// Get the birth date from the url and format it
	var date = getURLParam('date').split('%');
	birthDate = new Date(date[0] + '/' + date[1] + '/' + date[2]);

	// Calculate the difference in time between the birth date and the current date 
	var dateDifference = Math.abs(currentDate.getTime() - birthDate.getTime()); 

	// Convert the difference in time to difference in days
	var dateDifferenceDays = dateDifference / (1000 * 3600 * 24);

	// Update the page to show the amount of days left
	document.getElementById('time-left-label').innerHTML = Math.floor(avgLifeSpan - dateDifferenceDays).toLocaleString('en');

	// Update the page to not capitalize the 'days until they die.' phrase
	document.getElementById('days-until').innerHTML = 'days left until death!';
}

/**
 * Redirects the user to their custom link using the entered date of birth and name
 */
function generateWebpage() {
	// Check if the inputs are even showing, if not display them
	if (document.getElementById('input-hider').style.display == '' || document.getElementById('input-hider').style.display == 'none') {
		document.getElementById('input-hider').style.display = 'block';
		document.getElementById('input-hider-button').style.display = 'inline-flex';
	} else {
		// Grab the entered info
		var name = document.getElementById('enter-name').value
		var dob = document.getElementById('dob').value.split('-');

		// Validate that all information is added
		// If any information is missing, change that input slot to red and exit the function
		if (!validateInfo([name, ...dob])) {
			Array.from(document.getElementsByTagName('input')).forEach(element => {
				if (element.value == '')
					element.style.borderColor = 'red';
				else
					element.style.borderColor = 'rgb(66,66,66)';
			});
			return;
		} 

		// Redirect to the custom page
		window.location.href = `?name=${name}&date=${dob[1]}%${dob[2]}%${dob[0]}`;
	}
}

/**
 * Hides the input window
 */
function closeGenerateWindow() {
	document.getElementById('input-hider').style.display = 'none';
	document.getElementById('input-hider-button').style.display = 'none';
}

/**
 * Checks that all info provided has an appropriate value
 * @param  {String[]} info The information being validated
 * @return {Boolean}       Whether the information is valid or not
 */
function validateInfo(info) {
	var isValid = true;
	info.forEach(item => {
		if (item == null || item == undefined || item == '')
			isValid = false;
	});

	return isValid;
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