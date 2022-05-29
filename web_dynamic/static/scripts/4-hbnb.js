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

$.post('http://0.0.0.0:5001/api/v1/places_search/', {
	data: '{}',
	dataType: 'json',
	contentType: 'application/json'
},
function(data) {
	alert(data);
	for (let x = 0; x < data.length; x++) {
		let place = data[x];
		$('.places').append('<article><h2>' + place.name + '</h2>'
							'<div class="price_by_night"><p>$' + place.price_by_night + '</p></div>'
							'<div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div>'
							'<div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div>'
							'<div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div>'
							'</div><div class="description"><p>' + place.description + '</p></div></article>'); 
	});

$('button').click(function() {
	$.post('http://0.0.0.0:5001/api/v1/places_search/', {
		data: JSON.stringify({ amenities: Object.keys(ame) }),
		dataType: 'json',
		contentType: 'application/json'
	},
	function (data) {
		for (let place of Object.values(data)) {
			$('.places').append('<article><h2>' + place.name + '</h2>'
								'<div class="price_by_night"><p>$' + place.price_by_night + '</p></div>'
								'<div class="information"><div class="max_guest"><div class="guest_image"></div><p>' 
								+ place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image">'
								'</div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms">'
								'<div class="bath_image"></div><p>' + place.number_bathrooms +
								'</p></div></div><div class="description"><p>' + place.description + 
								'</p></div></article>');
		}
	}
}));
