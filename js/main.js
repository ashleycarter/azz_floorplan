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
$('.menu-button , .dropdown li').click(function(){
	$('.menu').find('.dropdown').toggleClass('fadeout fadein');
	$('.menu').find('i').toggleClass('fa-bars fa-close');
});


// ----------------------------------------
// Hide signal bar on scroll
// ----------------------------------------

$(window).scroll(function() {
    if ($(this).scrollTop()>100)
     {
        $('.signals').slideUp();
     }
    else
     {
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

setInterval(function signalsPerSecond() { document.getElementById("signals-per-second").innerHTML = Math.floor(Math.random() * (2500 - 2200 + 1)) + 2200; }, 1000);
setInterval(function totalSignals() { document.getElementById("total-signals").innerHTML = Math.floor(Math.random() * (55000000 - 50000000 + 1)) + 50000000; }, 2500);
setInterval(function totalCpu() { document.getElementById("total-cpu").innerHTML = (Math.floor(Math.random() * (20 - 15 + 1)) + 15); }, 1500);


// ----------------------------------------
// Toggle status connections
// ----------------------------------------
setInterval(function motionDetector() {
	// $('.fire-lane-room').function() {
	// 	$('.sensor').find('img').addClass('disconnected');
	// }
}, 1000);

// setInterval(function signalsPerSecond() { 
// 	document.getElementById("signals-per-second").innerHTML = Math.floor(Math.random() * (2500 - 2200 + 1)) + 2200; 
// }, 1000);
SVGElement.prototype.toggleClass = function (className) {
  if (this.hasClass(className)) {
    this.removeClass(className);
  } else {
    this.addClass(className);
  }
};

setInterval(function motionDetector() {
	$('.fire-lane-room').find('.motion svg').lunar.toggleClass('on, disconnected');
	$('.fire-lane-room').find('.motion span').toggleClass('not-detected detected');
}, 1000);

// setInterval(function motionDetector() {
// 	$('.fire-lane-room').find('.motion svg').attr('class','on');
// }, 5000);

// setInterval(function ampsAnimation() {
// 	$('.amps').css("transform" , "scaleX(-1)");
// }, 1000);

setInterval(function ampsAnimation() {
	$('.amps').toggleClass('amps-animate');
}, 1000);

setInterval(function pressureAnimation() {
	$('.pressure').toggleClass('pressure-animate');
}, 1000);




































