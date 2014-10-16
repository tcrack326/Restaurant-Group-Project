var menuURL = "http://restaurantapi.apiary.io/menu";

var apps_Template = $('#menuApps').html;
    apps_Render = _.template(apps_Template);

$.getJSON(menuURL).done( function(menu_data) {
  menu_data.appetizers.forEach( function (apps_data) {
    $('.menuItems').html(apps_Render(apps_data));
  });
});
