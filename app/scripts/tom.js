//global variable(s)
var imageObjectsArray = []; //needed to store the pics from Flickr in the ajax call.


/*=============================================================================================
request photos from Flickr
=============================================================================================*/


//method(s) for requests
var getMyFavs = "flickr.favorites.getList";

//Url for request - api key and token are used for user tmccracken209 - FOR FUTURE USE HIDE OR REMOVE - DO NOT MAKE PUBLIC!!!
var flickrUrl = "https://api.flickr.com/services/rest/?method=" + getMyFavs + "&api_key=83d50fa32805ad108edc1de65c199465&format=rest&auth_token=72157648372758390-e16def6bf3ad7b29&api_sig=5380a6b9617e6f35a3a8949850b63a2d";

//make the AJAX call with jQuery
var flickrPhotos = $.ajax({
  url: flickrUrl,
  dataType: 'xml'
}).done(function(data){
  //convert to JSON
  var jsonData = $.xml2json(data);

  //construct the objects with urls and descriptions for the images and push to array.
  //load each photo in the array
  jsonData.photos.photo.forEach( function(imagePhoto) {
    var imageDescription = imagePhoto.title;
    var imageID = imagePhoto.id;
    var imageSecret = imagePhoto.secret;
    var imageUrl = 'http://flickr.com/photos/' + imageID + '_' + imageSecret + '.jpg';
    var object = new Object;
    object.description = imageDescription;
    object.Url = imageUrl;
    imageObjectsArray.push(object);
  });
}).fail(function(){
  //console.log("failure to get photos");
}).complete(function(){
  //console.log("request completed");
});
