// -----------------
// SVG images
// -----------------

// Replace all SVG images with inline SVG
function svgReplace() {
	$('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

			setUpClickHandlers();
			setUpTooltips();
		}, 'xml');

	});
}

$(function() {
  svgReplace();
});


// ----------------------------------------
// Dropdown Menu
// ----------------------------------------

$('#page-two .contains-dropdown .menu-button , .contains-dropdown .dropdown li').click(function(){
	$('.menu').find('.dropdown').toggleClass('fadeout fadein');
	$('.contains-dropdown').find('i').toggleClass('fa-bars fa-close');
});


// ----------------------------------------
// Hide signal bar on scroll
// ----------------------------------------

$(window).scroll(function() {
    if ($(this).scrollTop()>100) {
        $('.signals').slideUp();
     } else {
      $('.signals').slideDown();
     }
 });


// ----------------------------------------
// Scroll to ID
// ----------------------------------------

function moveTo(id) {
	var el = $('#' + id),
		parent = el.parent();

	$('html, body').stop().animate({
		'scrollTop': parent.offset().top - 60
	}, 1200, 'swing');
}

function setUpClickHandlers() {
	$('a[labtarget]').unbind().click(function(ev) {
		moveTo($(this).attr('labtarget'));
		ev.preventDefault();
	});
}

function setUpTooltips() {
	$('a[tooltip]').each(function() {
		$(this).qtip({
			content: {
				text: $('#' + $(this).attr('tooltip'))
			},
			position: {
				my: 'top center',
				at: 'bottom center',
				target: $(this).find('g circle'),
				viewport: $(window),
				adjust: {
					method: 'shift'
				}
			},
			style: {
				classes: 'qtip-plain lab-tooltip',
				def: false,
				tip: {
					corner: 'top center',
					height: 10,
					width: 10
				}
			},
			show: {
				effect: function(offset) {
					$(this).slideDown(200);
				}
			},
			hide: {
				fixed: true,
				delay: 300,
				leave: false,
				effect: function(offset) {
					$(this).slideUp(200);
				}
			}
		});
	});
}


// ----------------------------------------
// Generating numbers on signal bar
// ----------------------------------------
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

setInterval(function signalsPerSecond() { 
	document.getElementById('signals-per-second').innerHTML = addCommas(Math.floor(Math.random() * (2500 - 2200 + 1)) + 2200);
}, 1000);

setInterval(function totalSignals() { 
	document.getElementById('total-signals').innerHTML = addCommas(Math.floor(Math.random() * (55000000 - 53000000 + 1)) + 53000000); 
}, 2500);

setInterval(function totalCpu() { 
	document.getElementById('total-cpu').innerHTML = (Math.floor(Math.random() * (17 - 10 + 1)) + 10); 
}, 1500);


// ----------------------------------------
// Toggle png animations
// ----------------------------------------
setInterval(function ampAnimation() {
	$('.amp').find('.animated').fadeToggle('fast');
}, 700);

setInterval(function cameraDetector() {
	$('.camera').find('img').toggleClass('off on');
	$('.camera').find('span').toggleClass('off on');
}, 3000);

setInterval(function motionDetector() {
	$('.motion').find('img').toggleClass('off on');
	$('.motion').find('span').toggleClass('not-detected detected');
}, 5000);

setInterval(function pressureAnimation() {
	$('.pressure').find('.animated').fadeToggle('fast');
}, 1500);

setInterval(function windAnimation() {
	$('.wind').find('.animated').fadeToggle('slow');
}, 1500);


// ----------------------------------------
// Generating sensors numbers
// ----------------------------------------

var getPressureClass = document.getElementsByClassName("pressure-status");
var getTemperatureClass = document.getElementsByClassName("temperature-status");
var getProductTemperatureClass = document.getElementsByClassName("product-temperature-status");

setInterval(function pressureSignals() { 
	for(i=0;i<getPressureClass.length;i++) {
    	getPressureClass[i].innerHTML = (Math.floor(Math.random() * (140 - 125 + 1)) + 125);
    } 
}, 3500);

setInterval(function temperatureSignals() { 
	for(i=0;i<getTemperatureClass.length;i++) {
    	getTemperatureClass[i].innerHTML = (Math.floor(Math.random() * (860 - 820 + 1)) + 820);
    } 
}, 2000);

setInterval(function productTemperatureSignals() { 
	for(i=0;i<getProductTemperatureClass.length;i++) {
    	getProductTemperatureClass[i].innerHTML = (Math.floor(Math.random()  * (680 - 630 + 1)) + 630);
    }
}, 1500);


































