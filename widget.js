var genderInput = document.getElementById("gender"),
	ageInput = document.getElementById("age"),
	weightInput = document.getElementById("weight"),
	heightInput = document.getElementById("height"),
	activityInput = document.getElementById("activity"),
	caloriesInput = document.getElementById("dailyCalories");

genderInput.onchange = function () {
	triggerHarrisBenedictCalculation();
};

ageInput.onchange = function () {
	checkIsNumber(ageInput);
	triggerHarrisBenedictCalculation();
};

weightInput.onchange = function () {
	checkIsNumber(weightInput);
	triggerHarrisBenedictCalculation();
};

heightInput.onchange = function () {
	checkIsNumber(heightInput);
	triggerHarrisBenedictCalculation();
};

activityInput.onchange = function () {
	triggerHarrisBenedictCalculation();
};

var checkIsNumber = function (input) {
	if (isNaN(parseInt(input.value))) {
		input.value = '';
	}
}

var hasValue = function (input) {
	return (input.value && input.value.trim().length > 0);
}

var triggerHarrisBenedictCalculation = function () {
	if (hasValue(ageInput) && hasValue(weightInput) && hasValue(heightInput)) {
		var hbf = calculateHarrisBenedictFormula();
		caloriesInput.value = hbf;
	} else {
		caloriesInput.value = '';
	}
}

var FOOT_TO_INCHES = 12;
var calculateBMR = function () {
	var modifier = genderInput.value == 'female' ? 655 : 66;
	var weightModifier = genderInput.value == 'female' ? 4.35 : 6.23;
	var heightModifier = genderInput.value == 'female' ? 4.7 : 12.7;
	var ageModifier = genderInput.value == 'female' ? 4.7 : 6.8;

	var heightInches = heightInput.value * FOOT_TO_INCHES;

	return modifier + (weightModifier * weightInput.value) + (heightModifier * heightInches) - (ageModifier * ageInput.value);
}

var calculateHarrisBenedictFormula = function () {
	var bmr = calculateBMR();
	var result = bmr * activityInput.value;
	return Math.floor(result);
}


var loseRadio = document.getElementById("lose"),
	gainRadio = document.getElementById("gain"),
	losePounds = document.getElementById("losePounds"),
	loseDays = document.getElementById("loseDays"),
	gainPounds = document.getElementById("gainPounds"),
	gainDays = document.getElementById("gainDays"),
	result = document.getElementById("result");

losePounds.onchange = function () {
	checkIsNumber(losePounds);
	triggerCaloriesCalculation();
};

loseDays.onchange = function () {
	checkIsNumber(loseDays);
	triggerCaloriesCalculation();
};

gainPounds.onchange = function () {
	checkIsNumber(gainPounds);
	triggerCaloriesCalculation();
};

gainDays.onchange = function () {
	checkIsNumber(gainDays);
	triggerCaloriesCalculation();
};

loseRadio.onclick = function () {
	selectLoseRadio();
}

var selectLoseRadio = function () {
	losePounds.removeAttribute("disabled");
	losePounds.focus();
	loseDays.removeAttribute("disabled");
	gainPounds.setAttribute("disabled", "true");
	gainDays.setAttribute("disabled", "true");
	gainPounds.value = '';
	gainDays.value = '';
	result.value = '';
}

gainRadio.onclick = function () {
	gainPounds.removeAttribute("disabled");
	gainPounds.focus();
	gainDays.removeAttribute("disabled");
	losePounds.setAttribute("disabled", "true");
	loseDays.setAttribute("disabled", "true");
	losePounds.value = '';
	loseDays.value = '';
	result.value = '';
}

var triggerCaloriesCalculation = function () {
	if (hasValue(caloriesInput)) {
		if (loseRadio.checked) {
			if (hasValue(losePounds) && hasValue(loseDays)) {
				result.value = calculateNeededCalories(parseInt(losePounds.value), parseInt(loseDays.value), false);
			}
		} else if (gainRadio.checked) {
			if (hasValue(gainPounds) && hasValue(gainDays)) {
				result.value = calculateNeededCalories(parseInt(gainPounds.value), parseInt(gainDays.value), true);
			}
		}
	}
}

var calculateNeededCalories = function (pounds, days, gain) {
	var val = pounds * 3500 / days;
	val = Math.floor(val);
	var dailyCalories = parseInt(caloriesInput.value);
	return gain ? dailyCalories + val : dailyCalories - val;
}

loseRadio.checked = true;
selectLoseRadio();

genderInput.focus();