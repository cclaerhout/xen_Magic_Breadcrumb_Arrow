<?php

class Sedo_MagicArrow_Listeners_Templates
{
	public static function hooks($hookName, &$contents, array $hookParams, XenForo_Template_Abstract $template)
	{
		if ($hookName == 'footer')
		{
			$contents .= $template->create('magicarrow', $template->getParams());
		}
	}
	
	
	public static function postrender($templateName, &$content, array &$containerData, XenForo_Template_Abstract $template)
	{
		if ($templateName == 'PAGE_CONTAINER')
		{
			$Tms = preg_match('#<fieldset.*?class=".*?breadcrumb.*?MagicTms.*?".*?>#ui', $content);
			
			if(!empty($Tms))
			{
				//If Tms is activated, clean the code
				$content = preg_replace('#<div id="MagicArrow_SVG".+?>((?:<div.+?>.*</div>|.)+?)</div>#sui', '', $content);
			
			}
		}
	}
}
//	Zend_Debug::dump($abc);