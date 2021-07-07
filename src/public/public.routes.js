(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('sign-up', {
      url: '/sign-up',
      template: '\
      <form name="signUpForm"novalidate>\
        <div class="form-group">\
          <label >First Name</label>\
          <input type="name" class="form-control" name="first_name" ng-model="suc.first_name" required>\
          <span ng-if="signUpForm.first_name.$error.required && signUpForm.first_name.$touched">Empty First Name</span>\
        </div>\
        <div class="form-group">\
          <label >Last Name</label>\
          <input type="name" class="form-control"  name="last_name" ng-model="suc.last_name" required>\
          <span ng-if="signUpForm.last_name.$error.required && signUpForm.last_name.$touched">Empty Last Name</span>\
        </div>\
        <div class="form-group">\
          <label >Email address</label>\
          <input type="email" class="form-control" name="email" ng-model="suc.email" required>\
          <span ng-if="signUpForm.email.$invalid && signUpForm.email.$touched">Invalid Email</span>\
        </div>\
        <div class="form-group">\
          <label >Phone Number</label>\
          <input type="number" class="form-control" ng-model="suc.phone" name="phone" required>\
          <span ng-if="signUpForm.phone.$invalid && signUpForm.phone.$touched">Invalid Phone Number</span>\
        </div>\
        <div class="form-group">\
          <label >Menu Number</label>\
          <input type="text" class="form-control" name="menu_code" ng-model="suc.short_name" required>\
          <span ng-if="signUpForm.menu_code.$error.required && signUpForm.menu_code.$touched">Invalid Short Name</span>\
        </div>\
        <button ng-disabled="signUpForm.$invalid"type="submit" class="btn btn-primary" ng-click="suc.signUpSubmit();">Submit</button>\
      </form>{{suc.res[0].result}}',
      controller: 'SignUpController',
      controllerAs: 'suc'
    })
    .state('my-info', {
      url: '/my-info',
      template: '\
          <div class="jumbotron" style="width: 500px;" ng-repeat="i in mic.arr" ng-show="mic.arr.length !=0">\
            <img src="{{mic.imageAPI}}/{{i.picture_link}}" class="card-img-top" alt="...">\
            <div class="card-body">\
              <h5 class="text-primary">{{i.title}} ({{i.short_name}})</h5>\
              <p class="text-primary">{{i.description}}</p>\
            </div>\
            <ul class="list-group ">\
              <li class="text-primary">First Name: {{i.first_name}}</li>\
              <li class="text-primary">Last Name: {{i.last_name}}</li>\
              <li class="text-primary">Email: {{i.email}}</li>\
              <li class="text-primary">Phone: {{i.phone}}</li>\
            </ul>\
          </div> \
          </div>\
          <h1 ng-show="mic.arr.length ==0">Not Signed Up Yet. <a ui-sref="sign-up">Sign up Now!</a></h1>',
      controller: 'MyInfoController',
      controllerAs: 'mic'
    })
    ;
}
})();

