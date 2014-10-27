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