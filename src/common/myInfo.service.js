(function () {
    "use strict";
    angular.module('public')
    .service('MyInfoService', MyInfoService);
    
    
    //MenuService.$inject = ['$http'];
    function MyInfoService(/*$http*/) {
      this.myInfo=[];

      this.myInfoPush=function (array) {
        this.myInfo.push(array);
      }
      this.myInfoGet=function () {
        return this.myInfo;
      }
    
    }
    
    
    
    })();
    