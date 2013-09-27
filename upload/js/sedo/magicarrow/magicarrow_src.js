!function($, window, document, _undefined)
{    	
	var Tools = {}, config = {};

	XenForo.MagicArrow = function($e)
	{
		Tools.init();
		Tools.fixDefaultArrowBorders();
		Tools.makeArrowClickable();
		Tools.SVG_Arrows_Activation($e);
	}

	Tools.init = function()
	{
		config.tms = $('fieldset.breadcrumb').hasClass('MagicTms');
		config.clickable = $('#MagicArrow').data('arrow-killborders');
		config.killborders = $('#MagicArrow').data('arrow-clickable');
		config.svg = $('#MagicArrow').data('svg-activate');
		config.killbackgrounds = $('#MagicArrow').data('svg-killbackgrounds');
	}

	Tools.fixDefaultArrowBorders = function()
	{
		if(!config.tms && config.killborders)
		{
			//Make borders of default arrows transparent for all browsers
			$('.breadcrumb .arrow').css({
	    			'border-left-color': 'transparent'
	      		});
				//Fix for Firefox
				$('.breadcrumb .arrow span').css({
	    				'-moz-border-bottom-colors': 'transparent'
	      			});
	      	}
	}
	
	Tools.makeArrowClickable = function()
	{
		if(!config.tms && config.clickable)
		{
			//Move arrows inside the html link
			$('.crumbs .crumb').each(function() {
				$(this).next('.arrow').appendTo(this);
			});
		}
	}
	
	Tools.SVG_Arrows_Activation = function($e)
	{	
		//TO use to check what must be the height of the breadcrumb
		/***
		$con = $('.breadcrumb');
		con = $con.get(0);
		console.log(con.offsetHeight);
		$con.css('height', 'auto');
		console.log(con.offsetHeight);
		 **/

		/***
		 * On XenForo 1.1 the code was deleted in the template post render listener.
		 * With XenForo 1.2, we need to keep it.
		 **/
		$svgArrow = $('#MagicArrow_SVG');
		var svgArrowHtml = $svgArrow.unwrap().html();

		/***
		 * On XenForo 1.2 with the responsive design activated 
		 * The first crumb can be created with Javascript... with a timeout
		 * So the only way to get it is to target the same events as the ones it's using
		 * and to set a timeout slightly higher than the official one (20)
		 **/
		if(!$('html').hasClass('NoResponsive') && config.svg && Tools.supportsSVG())
		{
			var placeHolder = '.breadcrumb .placeholder';
			
			function fixSvg(src){
				$(src).find('.crumb').append(svgArrowHtml);
				
				$('.breadcrumb').each(function(i){
					var hasPlaceholder = $(this).find('.placeholder').length;
					$HC_SVG  = $(this).find($('.homeCrumb .svg_arrow'));
										
					if(hasPlaceholder){
						$HC_SVG.empty();
					}else{
						$HC_SVG.append(svgArrowHtml);
					}
				});
			}
			
			var resizeTimer;
			
			$(window).on('resize orientationchange load', function(e) {
				if (resizeTimer)
				{
					return;
				}				

				resizeTimer = setTimeout(function() {
					resizeTimer = 0;
					
					if($(placeHolder).length == 0){
						return; //Jquery new
					}

					fixSvg(placeHolder);

					$(document).on('click', placeHolder, function(e) {
						fixSvg(placeHolder);
					})		
				}, 22); 
			});
		}

		/***
		 * On XenForo 1.2, we wouldn't need anymore to use this js integration method,
		 * but let's keep it for XenForo 1.1
		 **/
		if(!config.tms && config.svg && Tools.supportsSVG())
		{
			//Create new arrows using SVG (will only work with modern browsers)
			$('.crumbs .crumb').each(function() {
				$(this).append(svgArrowHtml).find('.arrow').remove();
			});
		}

		if (!config.tms && window.opera)
		{
			$('.crumbs .crumb').addClass('crumb_raz');
		}

		if(!Tools.supportsSVG() && config.killbackgrounds)
		{
			$('.crumbs .crumb').addClass('crumb_raz')
				.find('.svg_arrow').hide()
				.next('.normal_arrow').show();
		}
	}
	
	Tools.supportsSVG = function() 
	{
		//Detect if broswer can use SVG - Source: http://modernizr.com
		return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
	}
	

	XenForo.register('#MagicArrow', 'XenForo.MagicArrow');
}
(jQuery, this, document);