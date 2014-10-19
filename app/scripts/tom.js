$(document).ready(function(){
//global variable(s)
var imageObjectsArray = []; //needed to store the pics from Flickr in the ajax call.
//template for pics
var picTemplate = $('#foodPics').html();
var picRenderTemplate = _.template(picTemplate);

/*=============================================================================================
request photos from Flickr
=============================================================================================*/

//method(s) for requests
var getMyFavs = "flickr.favorites.getList";

//Url for request - api key and token user are for user tmccracken209 - FOR FUTURE USE HIDE OR REMOVE - DO NOT MAKE PUBLIC!!! For json data from flickr: &format=json&nojsoncallback=1
var flickrUrl = "https://api.flickr.com/services/rest/?method=" + getMyFavs + "&api_key=8c0a03e678f636644357f9ac9cf7e49f&format=json&nojsoncallback=1&auth_token=72157648448595828-81bf56c93a297a32&api_sig=8e1b6f49ffde848689c1a2ff1cdfb45e";

//make the AJAX call with jQuery
var flickrPhotos = $.ajax({
  url: flickrUrl,
  dataType: 'json'
}).done(function(data){
  //construct the objects with urls and descriptions for the images and push to array.
  //load each photo in the array
  data.photos.photo.forEach( function(imagePhoto) {
    var imageDescription = imagePhoto.title;
    var imageID = imagePhoto.id;
    var imageSecret = imagePhoto.secret;
    var imageUrl = 'http://flickr.com/photos/' + imageID + '_' + imageSecret + '.jpg';
    var object = new Object;
    object.description = imageDescription;
    object.url = imageUrl;
    imageObjectsArray.push(object);
  });
  //Add all the images to the template for photos - each is an object with a url attribute
  imageObjectsArray.forEach(function(image){
    $('.foodImgList').append(picRenderTemplate(image));
  });

}).fail(function(){
  console.log("failure to get photos");
}).complete(function(){
  //console.log("request completed");
});

//=========================================================================
//Make the pig fly around the mouse cursor!!! currently not working :(
//=========================================================================
var x, y, offsetX, offsetY, newX, newY;
//set up recursive function to apply some offsets every second to make the pig hover around!!!!!!
var getRandomPosition = function(){
offsetX = Math.random(-100, 100);
offsetY = Math.random(-100, 100);
setTimeout(getRandomPosition, 1000);
}
//start it!
//getRandomPosition();

// $(document).mouseover(function(e) {
//
// x = e.pageX;
// y = e.pageY;
//
// newX = x;
// newY = y;

//$("#flyingPig").css({left:newX,top:newY});
//});






//============document ready end====================================
});
