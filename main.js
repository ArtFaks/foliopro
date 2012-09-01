/* 
Copyright: Color Me Pixeled LLC 
Author: Joshua Davis
Date Created: August 30, 2012

CONVENTIONS

* Variables names in all caps are meant to be treated as cosntants
* Variable names preceded with a $ are Zepto objects
jd
*/
Zepto(function($) {
	var $galleryThumbs = $('#thumbs img'),
		$lightbox = $('#lightbox'),
		currentImage,
		$lightboxImage = $('#lightbox-image'),
		$body = $("body"),
		touchEnabled = ("createTouch" in document);
		pressed = touchEnabled ? 'tap' : 'click',
		doublePressed = touchEnabled ? 'doubleTap' : 'dblclick',
		INACTIVE_STATE = "state-inactive",
		ACTIVE_STATE = "state-active",
		NO_SCROLL_CLASS = "no-scroll",
		VISIBLE_CLASS = "visible",
		INVISIBLE_CLASS = "invisible",
		CSS_BACKGROUND_IMAGE= "background-image";
		
	// Even though these are already visible onload, add this for some CSS transitions
	$galleryThumbs.addClass('visible');
	
	//Load an image into the lightbox
	$galleryThumbs.on(pressed, function(){
		//Use some z-index magic to make sure the user can interact with the "active" elements
		$galleryThumbs.addClass(INACTIVE_STATE);
		$galleryThumbs.removeClass(ACTIVE_STATE);
		$lightbox.addClass(ACTIVE_STATE);
		$lightbox.removeClass(INACTIVE_STATE);
		
		// When showing a lightbox the user shouldn't scroll the body element
		$body.addClass(NO_SCROLL_CLASS)					

		//Load up the targeted image		
		$lightboxImage.css(CSS_BACKGROUND_IMAGE, getFullSizeImage(this));	
		
		//Hide thumbnails, show the lightbox
		$galleryThumbs.removeClass(VISIBLE_CLASS);
		$galleryThumbs.addClass(INVISIBLE_CLASS);
		$lightbox.removeClass(INVISIBLE_CLASS);
		$lightbox.addClass(VISIBLE_CLASS);
				
		currentImage = this;
	})
	
	//Exit the lightbox
	$lightbox.on(doublePressed, function() {
		//Reenable scrolling of the body
		$body.removeClass(NO_SCROLL_CLASS)					

		//Hide the lightbox, show the thumbnails
		$lightbox.removeClass(VISIBLE_CLASS);
		$lightbox.addClass(INVISIBLE_CLASS);
		$galleryThumbs.removeClass(INVISIBLE_CLASS);
		$galleryThumbs.addClass(VISIBLE_CLASS);
		
		//Use some z-index magic to make sure the user can interact with the "active" elements
		$galleryThumbs.removeClass(INACTIVE_STATE);
		$galleryThumbs.addClass(ACTIVE_STATE);
		$lightbox.removeClass(ACTIVE_STATE);
		$lightbox.addClass(INACTIVE_STATE);

	});

	//Go forward through the gallery
	$lightbox.on('swipeLeft', function() {
		//Load the first gallery image if we're at the last image
		if(currentImage.nextElementSibling === null) {
			currentImage = document.querySelector('#thumbs img:first-of-type');
			$lightboxImage.css(CSS_BACKGROUND_IMAGE, getFullSizeImage(currentImage));
		} else {
			$lightboxImage.css(CSS_BACKGROUND_IMAGE, getFullSizeImage(currentImage.nextElementSibling));					
			currentImage = currentImage.nextElementSibling;
		}
	});

	//Go backwards through the gallery
	$lightbox.on('swipeRight', function() {
		//Load the last gallery image if we're at the first image
		if(currentImage.previousElementSibling === null) {
			currentImage = document.querySelector('#thumbs img:last-of-type');
			$lightboxImage.css(CSS_BACKGROUND_IMAGE, getFullSizeImage(currentImage));					
		} else {
			currentImage = currentImage.previousElementSibling;
			$lightboxImage.css(CSS_BACKGROUND_IMAGE, getFullSizeImage(currentImage));					
		}
	});
	
	//Build a CSS value for a URL to a referenced full size image
	function getFullSizeImage(image) {
		return 'url(' + $(image).attr('data-image-full') + ')';
	}
})