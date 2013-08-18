<?php

class Sedo_MagicArrow_Listeners_Templates
{
	public static function hooks($hookName, &$contents, array $hookParams, XenForo_Template_Abstract $template)
	{
		if ($hookName == 'footer')
		{
			$requestPaths = XenForo_Application::get('requestPaths');
			$params['disableSVG'] = false;

			/*
			//Should be improve but can be useful to solve a svg bug
			$excludeRoutes = array('portal', 'search');				
			foreach($excludeRoutes as $route)
			{
				if($params['disableSVG'] == true)
				{
					break;
				}

				if(preg_match("#/$route/#i", $requestPaths["requestUri"]))
				{
					$params['disableSVG'] = true;						
				}
			}
			*/

			$mergedParams = array_merge($template->getParams(), $params);
			$contents .= $template->create('magicarrow', $mergedParams);
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