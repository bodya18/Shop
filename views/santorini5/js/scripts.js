jQuery(window).on("load", function() {
	"use strict";

	/* -----------------------------------------
	 FlexSlider Init
	 ----------------------------------------- */
	jQuery("#slider").flexslider({
		directionNav: false,
		controlnav: true,
		start: function(slider) {
			slider.removeClass('loading');
		}
	});

	jQuery(".room-slider").flexslider({
		prevText: '',
		nextText: '',
		directionNav: true,
		controlNav: false,
		start: function(slider) {
			slider.removeClass('loading');
		}
	});

});

jQuery(document).ready(function($) {
	"use strict";

	/* -----------------------------------------
	 Main Navigation Init
	 ----------------------------------------- */
	$('ul.navigation').superfish({
		delay:       300,
		animation:   { opacity:'show', height:'show' },
		speed:       'fast',
		dropShadows: false
	});

	/* -----------------------------------------
	 Weather
	 ----------------------------------------- */
	// Fill the following with your openweathermap API key
	// http://www.openweathermap.org/price (free option, click on Get API key)
	var WEATHER_API_KEY = '';

	// Find the ID of your desired location by going to
	// http://www.openweathermap.org/ and searching, you can find the ID
	// in the location's URL e.g. http://www.openweathermap.org/city/734077
	// it's the numeric part after /city/
	var WEATHER_LOCATION_ID = '';
	var WEATHER_UNIT = 'C';

	function kelvinToC(k) {
		return k - 273.15;
	}

	function kelvinToF(k) {
		return (k * (9/5)) - 459.67;
	}

	var $weather = $('#weather');

	$weather.each(function () {
		if (!WEATHER_API_KEY || !WEATHER_LOCATION_ID) {
			return;
		}

		var $this = $(this);
		var apiKey = WEATHER_API_KEY;
		var locationId = WEATHER_LOCATION_ID;
		var unit = WEATHER_UNIT;
		var requestUrl = '//api.openweathermap.org/data/2.5/weather?id=' + locationId + '&APPID=' + apiKey;

		if (!unit || !locationId || !apiKey) {
			console.warn('Theme weather module :: No temperature unit or location id or api key found.');
			return;
		}

		$.ajax({
			method: 'get',
			url: requestUrl
		}).done(function (response) {
			var temperature = unit === 'C'
				? kelvinToC(response.main.temp)
				: kelvinToF(response.main.temp);
			console.log(response);

			$('#ywloc').html(response.name + ', ' + response.sys.country);
			$('#ywtem').html(temperature + '<span>' + '&deg;' + (unit.toUpperCase()) + '</span>');
			$('.ywicon').addClass('wi-ow-' + response.weather[0].id);
		}).fail(function (response) {
			console.error('Theme weather module :: ', response.responseText);
		});
	});

	/* -----------------------------------------
	 Custom Select Boxes
	 ----------------------------------------- */
	var box = $(".dk");
	box.dropkick({
		theme: 'ci'
	});

	/* -----------------------------------------
	 Responsive videos
	 ----------------------------------------- */
	$(".video-wrap").fitVids();

	/* -----------------------------------------
	 Datepickers
	 ----------------------------------------- */
	// The datepickers must output the format yy/mm/dd
	// otherwise PHP's checkdate() fails.
	// Makes sure arrival date is not after departure date, and vice versa.
	$( ".datepicker[name='arrive']" ).datepicker({
		showOn: 'both',
		buttonText: '<i class="fa fa-calendar"></i>',
		dateFormat: 'yy/mm/dd',
		onSelect: function(dateText, dateObj){
			var minDate = new Date(dateObj.selectedYear, dateObj.selectedMonth, dateObj.selectedDay );
			minDate.setDate(minDate.getDate()+1);
			$( ".datepicker[name='depart']" ).datepicker("option", "minDate", minDate );
		}
	});

	$( ".datepicker[name='depart']" ).datepicker({
		showOn: 'both',
		buttonText: '<i class="fa fa-calendar"></i>',
		dateFormat: 'yy/mm/dd',
		onSelect: function(dateText, dateObj) {
			//var maxDate = new Date(dateText);
			var maxDate = new Date(dateObj.selectedYear, dateObj.selectedMonth, dateObj.selectedDay );
			maxDate.setDate(maxDate.getDate()-1);
			$( ".datepicker[name='arrive']" ).datepicker("option", "maxDate", maxDate );
		}
	});

	/* -----------------------------------------
	 Responsive Menus Init with jPanelMenu
	 ----------------------------------------- */
	$("#mobilemenu").mmenu();

	/* -----------------------------------------
	 Lightboxes
	 ----------------------------------------- */
	var $pp = $("a[data-rel^='prettyPhoto']");
	if ($pp.length) {
		$pp.prettyPhoto({
			show_title: false,
			hook: 'data-rel',
			social_tools: false,
			theme: 'pp_ignited',
			horizontal_padding: 20,
			opacity: 0.95,
			deeplinking: false
		});
	}

	/* -----------------------------------------
	 Map Init
	 ----------------------------------------- */
	if ( $("#map").length ) {
		map_init();
	}

});

function map_init() {
	'use strict';
	var myLatlng = new google.maps.LatLng(33.59,-80);
	var mapOptions = {
		zoom: 8,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var contentString = '<div id="content">Change it to whatever your want! <strong>HTML</strong> too!</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: 'Hello'
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}
