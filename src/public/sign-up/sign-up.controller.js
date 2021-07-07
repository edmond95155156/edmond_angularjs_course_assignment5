(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$http', 'ApiPath', 'MyInfoService'];
function SignUpController($http, ApiPath, MyInfoService) {
  this.first_name="";
  this.last_name="";
  this.email="";
  this.phone="";
  this.short_name="";
  this.msg="";
  this.signUpSubmit=function(){
    var short_name=this.short_name;
    var first_name=this.first_name;
    var last_name=this.last_name;
    var email=this.email;
    var phone=this.phone;
    //var push_list=[];
    var success=[];
    $http.get(ApiPath+'/menu_items.json')
    .then(function (response) {
      var a=response.data.menu_items;
      var z=0;
      for (let index = 0; index < a.length; index++) {
        if (a[index].short_name==short_name) {
          var it={
            "first_name":first_name,
            "last_name":last_name,
            "email":email,
            "phone":phone,
            "short_name":short_name,
            "title": a[index].name,
            "description":a[index].description,
            "picture_link":"images/"+short_name+".jpg",
          }
          MyInfoService.myInfoPush(it);
          z=1;
        }
      }
      if (z>0) {
        success.push({"result" : "Your information has been saved!"});
      } else {
        success.push({"result" : "No such menu number exists"});
      }
    }, function (error) {
      
    });
    /*if (result[0].result=="success") {
      this.msg="Your information has been saved!";
    } else {
      this.msg="No such menu number exists";
    }*/
    this.res=success;
    

  }

  
}




})();
