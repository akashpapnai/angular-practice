(function() {
'use strict'

    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    
    function ShoppingListCheckOffService() {
        var service = this;
        var itemsToBuy = [
            { name: "cookies", quantity: 10 },
            { name: "apples", quantity: 9 },
            { name: "mangoes", quantity: 8 },
            { name: "peaches", quantity: 7 },
            { name: "bananas", quantity: 6 }
        ];

        var itemsAlreadyBought = [];

        service.addItem = function(idx) {
            let item = itemsToBuy[idx];

            itemsAlreadyBought.push(item);
            itemsToBuy.splice(idx,1);
        };

        service.getItemsToBuy = function() {
            return itemsToBuy;
        }

        service.getItemsAlreadyBought = function() {
            return itemsAlreadyBought;
        }
    }

    function ToBuyController(ShoppingListCheckOffService) {
        var ctrl1 = this;
        ctrl1.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

        ctrl1.addItem = function(item) {
            ShoppingListCheckOffService.addItem(item);
        }
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let ctrl2 = this;

        ctrl2.itemsAlreadyBought = ShoppingListCheckOffService.getItemsAlreadyBought();

    }
})();