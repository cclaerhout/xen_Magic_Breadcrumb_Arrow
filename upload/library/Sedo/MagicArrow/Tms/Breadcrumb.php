<?php
class Sedo_MagicArrow_Tms_Breadcrumb
{
	public static function Breadcrumb(&$templateText, &$applyCount, $styleId)
	{
		//Will be use to check if TMS is activated
		$search[] = '#(<fieldset.+?class=".+?)(">)#i';
		$replace[] = '$1 MagicTms$2';
	
		$search[] = '#</a>\s+<span class="arrow"><span>(.*?)</span></span>#i';
		$replace[] = '{xen:if "!{xen:property \'magicbreadcrumb_arrow_makeitclickable\'}", "</a>"}
					<xen:include template="breadcrumb_magicarrow"><xen:set var="$arrow_content">$1</xen:set></xen:include>
				{xen:if "{xen:property \'magicbreadcrumb_arrow_makeitclickable\'}", "</a>"}';

		$templateText = preg_replace($search, $replace, $templateText, -1, $count);
		$applyCount = $count;
	}
	
	public static function Breadcrumb_css(&$templateText, &$applyCount, $styleId)
	{
		//Delete arrows borders
		$search[] = '#(\s+)({xen:property breadcrumbItemArrowOuter})#i';
		$replace[] = "$0\n$1" . '<xen:if is="{xen:property \'magicbreadcrumb_arrow_killborders\'}">border-left-color: transparent;</xen:if>';
		
		

		//Delete arrows borders on Firefox
		$search[] = '#(\s+)({xen:property breadcrumbItemArrowInner})#i';
		$replace[] = "$0\n$1" . '<xen:if is="{xen:property \'magicbreadcrumb_arrow_killborders\'}">-moz-border-bottom-colors: transparent;</xen:if>';
		
		$templateText = preg_replace($search, $replace, $templateText, -1, $count);
		$applyCount = $count + 1;
	}
}
//	Zend_Debug::dump($abc);