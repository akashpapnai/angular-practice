(function() {
  'use strict';
  angular.module('NarrowItDownApp', [])
  
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('BaseUrl', 'https://coursera-jhu-default-rtdb.firebaseio.com');

  function FoundItemsDirective() {
      var ddo = {
          templateUrl: 'found.html',
          scope: {
              found: '<',
              foundLength: '<',
              onRemove: '&'
          }
      };
  
      return ddo;
  }

  MenuSearchService.$inject = ['$http', 'BaseUrl'];
  function MenuSearchService($http, BaseUrl) {
      var service = this;

      service.getMatchedMenuItems = function(searchTerm) {
          return $http({
              method: "GET",
              url: (BaseUrl + "/menu_items.json")
          }).then(function(result) {
              var payload = result.data;
              var foundItems = [];
              if(searchTerm.trim().length > 0) {
                  var menu;
                  for(menu of Object.values(payload)) {
                      foundItems = foundItems.concat((menu.menu_items || []).filter(function(menuItem) { 
                          return menuItem && menuItem.description && menuItem.description.indexOf(searchTerm) >= 0;
                      }));
                  }
              }
              return foundItems;
          }).catch(function (error) {
              console.log(error);
          });
      };
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
      var narrowItDown = this;

      narrowItDown.found = [];
      narrowItDown.searchTerm = '';
      narrowItDown.foundLength = -1;

      narrowItDown.getMatchedMenuItems = function() {
          MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm).then(function(foundItems) {
              narrowItDown.found = foundItems;
              narrowItDown.foundLength = narrowItDown.found.length;
          });
      };

      narrowItDown.removeMenuItem = function(index) {
          narrowItDown.found.splice(index, 1);
      };
  };
})();