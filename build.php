<?php

// If we have arguments move them in the $_GET array
if(count($argc) > 0) {
	parse_str(implode('&', array_slice($argv, 1)), $_GET);
}

$buildId = hash('sha256',$_GET['title'] . (isset($_GET['m']) ? $_GET['m'] : getcwd() ) . date('U'));

//If a path to the images has been defined
if(isset($args['m']) && is_dir($args['m'])) {
	$images = glob($_GET['m'] . '/images/*.{jpg,jpeg}', GLOB_BRACE);

} else {
	$images = glob(getcwd() . '/images/*.{jpg,jpeg}', GLOB_BRACE);
}

//BUILD THE CACHE MANIFEST
ob_start();
include 'app_cache.manifest';

foreach($images as $k) {
	echo 'thumbs/' . end(explode('/',$k)) . "\n";
	echo 'images/' . end(explode('/',$k)) . "\n";
}

$cache = ob_get_clean();
$newFile = getcwd() . '/' . $buildId . '_cache.manifest';
file_put_contents($newFile, $cache);

//BUILD THE HTML PAGE
ob_start();
include 'portfolio.html';
$page = ob_get_clean();
$newFile = getcwd() . '/' . $buildId . '.html';
file_put_contents($newFile, $page);

echo "Your freshly built portfolio is at: $newFile \n";

?>
