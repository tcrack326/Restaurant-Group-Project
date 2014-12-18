
var menuURL = "http://private-2d011-restaurantapi.apiary-mock.com/menu",
    latestURL = "http://private-2d011-restaurantapi.apiary-mock.com/news/latest",
    specialURL = "http://private-2d011-restaurantapi.apiary-mock.com/menu/special";


// Start of Templating of Appetizers
var apps_Template = $('#menuApps').html();
    apps_Render = _.template(apps_Template);
    entree_Template = $('#menuEntrees').html();
    entree_Render = _.template(entree_Template);
    sides_Template = $('#menuSides').html();
    sides_Render = _.template(sides_Template);

// Injecting Menu Items
$.getJSON(menuURL).done( function(menu_data) {
  menu_data.appetizers.forEach( function (apps_data) { // appetizers
    $('.itemsMenu .appsMenu').append(apps_Render(apps_data));
  });
  menu_data.entrees.forEach( function (entree_data) { // Entrees
    $('.itemsMenu .entreeMenu').append(entree_Render(entree_data));
  });
  menu_data.sides.forEach( function (sides_data) { // Sides
    $('.itemsMenu  .sidesMenu').append(sides_Render(sides_data));
  });
});


// Start Templating of Updating News Boxes
var latest_Template = $('#newsTemplate').html();
    latest_Render = _.template(latest_Template);
    special_Template = $('#specialTemplate').html();
    special_Render = _.template(special_Template);

// Updating News feed
$.getJSON(latestURL).done( function(news) {
  $('.updatingNews').append(latest_Render(news));
});

// Updating Special
var menuItemId;

$.getJSON(specialURL).done( function(special) {
  // determines id of special of day from menu
  var menuItemId = special.menu_item_id;
  console.log("Today's special is: Menu Item #" + menuItemId)
  $.getJSON(menuURL).done( function(menu_item) {
    menu_item.appetizers.forEach( function(apps_data) { // loops through appetizers to look for id
      if (apps_data.id === menuItemId) { // if found use that appetizers
        $('.updatingSpecial').append(special_Render(apps_data));
      };
    });
    menu_item.entrees.forEach( function(entree_data) { // loops through entrees to look for id
      if (entree_data.id === menuItemId) { // if found use that entree
        $('.updatingSpecial').append(special_Render(entree_data));
      };
    });
    menu_item.sides.forEach( function(sides_data) { // loops through sides to look for id
      if (sides_data.id === menuItemId) { // if found use that side
        $('.updatingSpecial').append(special_Render(sides_data));
      };
    });
  });
});

// Hide Menu When Not Active Tab
$('.menu').on('click', function() {
  $('#disqus_thread').addClass('hide');
  $('.reservation').addClass('hide');
  $('.ourStory div').addClass('hide');
  $('.itemsMenu').removeClass('hide');
});
$('.reservations').on('click', function() {
  $('#disqus_thread').addClass('hide');
  $('.itemsMenu').addClass('hide');
  $('.ourStory div').addClass('hide');
  $('.reservation').removeClass('hide');
});
$('.ourStory').on('click', function() {
  $('#disqus_thread').addClass('hide');
  $('.itemsMenu').addClass('hide');
  $('.reservation').addClass('hide');
  $('.ourStory div').removeClass('hide');
});

$('.comments').on('click', function() {
  $('.itemsMenu').addClass('hide');
  $('.reservation').addClass('hide');
  $('.ourStory div').addClass('hide');
  $('#disqus_thread').removeClass('hide');
});

/*  Newsbar Remove Overlay on Click  */
$('.trigger').mouseover( function () {
  $(this).css('opacity', '0');
}).mouseleave( function() {
  $(this).css('opacity', '.9');
});

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
var flickrUrl = "https://api.flickr.com/services/rest/?method=" + getMyFavs + "&api_key=c224f81cf237acd3bf8d78cf11078309&format=json&nojsoncallback=1&auth_token=72157646550013693-b96e704984877afd&api_sig=67f1986924ffb851157500035fdda1bd";

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



