$(document).ready(function() {
	$('input[type="checkbox"]').change(function() {
		let amenities = {};
		if (this.checked) { // check if the checkbox is checked
			amenities[$(this).attr('data-id')] = $(this).attr('data-name'); // if checked get id attribute value of the clicked element
		} else {
			delete amenities[$(this).attr('data-id')]; //if the checkbox is unchecked, you must remove the Amenity ID from the variable
		}
		console.log(amenities); //log to console wether checked or not
		if (Object.keys(amenities).length >= 0) { //update the h4 tag inside the div Amenities with the list of Amenities checked
			$("DIV.amenities H4").text(Object.values(amenities).join(', '));
		}
	})
});

fetch('http://0.0.0.0:5001/api/v1/status/')
	.then(res => {
		if (res.status === 'OK') {
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	});
