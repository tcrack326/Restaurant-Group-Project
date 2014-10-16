var menuURL = "http://restaurantapi.apiary.io/menu";

// Start of Templating of Appetizers
var apps_Template = $('#menuApps').html();
    apps_Render = _.template(apps_Template);
    entree_Template = $('#menuEntrees').html();
    entree_Render = _.template(entree_Template);
    sides_Template = $('#menuSides').html();
    sides_Render = _.template(sides_Template);

// Injecting Appertizers
$.getJSON(menuURL).done( function(menu_data) {
  menu_data.appetizers.forEach( function (apps_data) {
    $('.itemsMenu .appsMenu').append(apps_Render(apps_data));
  });
  menu_data.entrees.forEach( function (entree_data) {
    $('.itemsMenu .entreeMenu').append(entree_Render(entree_data));
  });
  menu_data.sides.forEach( function (sides_data) {
    $('.itemsMenu .sidesMenu').append(sides_Render(sides_data));
  });
});
