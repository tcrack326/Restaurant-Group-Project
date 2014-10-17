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
  /*$('.commentsContent').addClass('hide');*/
  $('.reservation').addClass('hide');
  $('.ourStory div').addClass('hide');
  $('.itemsMenu').removeClass('hide');
});
$('.reservations').on('click', function() {
  /*$('.commentsContent').addClass('hide');*/
  $('.itemsMenu').addClass('hide');
  $('.ourStory div').addClass('hide');
  $('.reservation').removeClass('hide');
});
$('.ourStory').on('click', function() {
  /*$('.commentsContent').addClass('hide');*/
  $('.itemsMenu').addClass('hide');
  $('.reservation').addClass('hide');
  $('.ourStory div').removeClass('hide');
});
/*$('.comments').on('click', function() {
  $('.itemsMenu').addClass('hide');
  $('.reservation').addClass('hide');
  $('.ourStory div').addClass('hide');
  $('.commentsContent').removeClass('hide');
});*/
