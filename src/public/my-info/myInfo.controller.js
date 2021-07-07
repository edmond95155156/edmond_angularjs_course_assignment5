(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['MyInfoService',"ApiPath"];
    function MyInfoController(MyInfoService,ApiPath) {
      
      this.arr=MyInfoService.myInfoGet();
      this.imageAPI=ApiPath;
    }


   
    


    
})();
    