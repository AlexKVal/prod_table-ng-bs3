(function() {

  angular.module('productsTable', [])

  .directive('filterableTable', function(){
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: "<div class='well filterable-table' ng-transclude></div>"
    };
  })

  .directive('productsTable', function(Product){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directives/products-table.html',
      link: function(scope, element, attrs){
        scope.categories = [];

        var lastCategory = {name: null};
        Product.all().forEach(function(product){
          if (lastCategory.name !== product.category) { // new category
            var newCategory = { name: product.category, products: [product]};

            scope.categories.push(newCategory);
            lastCategory = newCategory;
          } else {
            lastCategory.products.push(product);
          }
        });
        // console.log(JSON.stringify(scope.categories));
      }
    };
  })

  .directive('searchBar', function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/directives/search-bar.html'
    };
  })

  .factory('Product', function ProductFactory(){
    return {
      all: function() {
        return glVarData;
      }
    };
  });


  var glVarData = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
})();
