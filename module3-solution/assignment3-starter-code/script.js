(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .constant('ApiBasePath', "./data.json")
      .directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
          items: '<',
          onRemove: '&',
          isValid: '<'
      }
  }; 
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var menuSearch = this;

  menuSearch.valid = true;
  menuSearch.searchTerm = "";
  menuSearch.found = [];

  menuSearch.search = async function() {
      if (searchIsEmpty(menuSearch.searchTerm)) {
          menuSearch.found = [];
          menuSearch.valid = false;
          return;
      };

      try {
          menuSearch.found = await MenuSearchService.getMatchedMenuItems(menuSearch.searchTerm);
          menuSearch.valid = (menuSearch.found.length > 0);
      } catch (error) {
          console.error("Error fetching menu items:", error);
      }
  };

  menuSearch.removeItem = function (index) {
      menuSearch.found.splice(index, 1);
  };


  function searchIsEmpty (searchString) {
      return searchString.replace(/\s/g,"").length === 0;
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = async function (searchTerm) {
    try {
      const response = await $http.get(ApiBasePath);
      const data = response.data;
      const allMenuItems = data.menu_items;

      return allMenuItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  };
}

})();
