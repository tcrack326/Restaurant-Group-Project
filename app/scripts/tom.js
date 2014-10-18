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
var flickrUrl = "https://api.flickr.com/services/rest/?method=" + getMyFavs + "&api_key=5e715a51144335a92f2e6cc30d46b221&format=json&nojsoncallback=1&auth_token=72157646507003863-4fae072f7f9f813b&api_sig=387f2449917c379cc67fe158f59660f3";

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
//Make the pig fly around the mouse cursor!!!
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

$('*').mouseover(function(e) {

x = e.pageX;
y = e.pageY;

newX = x;
newY = y;

//$("#flyingPig").css({left:newX,top:newY});
});






//============document ready end====================================
});
