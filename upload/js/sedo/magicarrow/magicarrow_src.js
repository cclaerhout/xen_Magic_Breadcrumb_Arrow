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
		config.tms = 0;
		if($('fieldset.breadcrumb').hasClass('MagicTms')){ config.tms = 1; }
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
		if(!config.tms && config.svg && Tools.supportsSVG())
		{
			//Create new arrows using SVG (will only work with modern browsers)
			$('.crumbs .crumb').each(function() {
				$(this).append($('#MagicArrow_SVG').unwrap().html())
				.find('.arrow').remove();
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