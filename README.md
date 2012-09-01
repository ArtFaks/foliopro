foliopro
========

An automated script to build beautiful HTML5 portfolios that photographers and
other visual artists can use while offline on their iOS devices.

Portfolio Builder is a tool that let's you automatically and easily build
portfolio of your images for offline access on your iPad, iPhone or iPod 
touch. It works by creating an HTML5 and cache file so that you can add
a bookmark to your homescreen.

To build a portfolio
--------------------
Note: this is currently not very user friendly, we're working on a better
way to do this. 

Preparing your portfolio
------------------------
1.	Generate versions of your images optimized for digital display. We reccomend
	sizing your images at 1024x768 pixels or a similar size. However any size 
	will work.
2.	Generate a square thumbnail sized at least at 300 x 300 pixels. Please note 	
	the thumbnail needs the exact same name as the full size image.
3.	Move the full size images into a directory called "images."
4.	Move the thumbnails into a directory called "thumbs."

Building the portfolio
----------------------
1.	Ensure that PHP5 is installed on your system
2.	Navigate to the directory where this file is located
3.	Run the command php -f build.php title="Your Portfolio Name"
4 	The script will then output a string like 	"/var/www/jdavis/portfolio/
	6afeccacdd8aea79e3bb55fb07b5aa423dfc728d44d3fef5d50bdb59cd98e999.html", 
	this is where your newly generated portfolio is located. Copy all the 
	files to a location that is accessiable by your iOS device.
5.	Fire up Safari and bookmark the page by adding it to the home screen.
6. 	Click on your newly bookmarked page, you now have a portfolio accessibale 
	offline at any time.
