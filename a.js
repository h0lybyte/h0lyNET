var myApp = angular.module('myApp', ['ngRoute','ui.router', 'ui.bootstrap']);
myApp.controller('profile', ['$compile','$scope', '$http', '$filter', function($compile,$scope,$http,$filter) {
	$http.get('https://kbve.com/api/member/member.php')
				.success(function(data) {
					if(data.g_id == '2')
						{
						location.href='https://kbve.com/dash/login.php';
						}
					
				$scope.member_id = data.member_id;
				$scope.members_display_name = data.members_display_name;
				$scope.newpm = data.newpm;
				$scope.login = data.login;
				
				
				
				});
	
	
		
	}]);
myApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {


     $stateProvider
        .state('dashboard', {
          url: '/dashboard/:objId',
          //abstract: true,
          templateUrl: 'main.html',
          controller: function($scope, obj) {$scope.obj = obj},
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });
		
	 $stateProvider
        .state('forum', {
          url: '/forum/:objId',
          //abstract: true,
          templateUrl: 'forum.html',
          controller: 'forum',
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });	
		
		
	 $stateProvider
        .state('cat', {
          url: '/cat/:objId',
          //abstract: true,
          templateUrl: 'cat.html',
          controller: 'cat',
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });		
		
		
	  $stateProvider
        .state('thread', {
          url: '/thread/:objId',
          //abstract: true,
          templateUrl: 'thread.html',
          controller: function($scope, obj) {$scope.obj = obj},
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });	


	
	$stateProvider
        .state('mmo', {
          //abstract: true,
          url: '/mmo/:objId',
          templateUrl: 'mmo.html',
          controller: 'mmo',
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });
	
	 
	$stateProvider
			.state('wine', {
			  url: '/wine/:objId',
			  //abstract: true,
			  templateUrl: 'wine.html',
			  controller: function($scope, obj) {$scope.obj = obj; alert(obj);},
			  resolve: {
				obj: function(OBJ, $stateParams) {
				  return obj = OBJ.get($stateParams.objId);
				},
			  }
			});
	 
	$stateProvider
			.state('beer', {
			  url: '/beer/:objId',
			  //abstract: true,
			  templateUrl: 'beer.html',
			  controller: function($scope, obj) {$scope.obj = obj},
			  resolve: {
				obj: function(OBJ, $stateParams) {
				  return obj = OBJ.get($stateParams.objId);
				},
			  }
			});
	 
	 	 
	$stateProvider
			.state('art', {
			  url: '/art/:objId',
			  //abstract: true,
			  templateUrl: 'art.html',
			  controller: function($scope, obj) {$scope.obj = obj},
			  resolve: {
				obj: function(OBJ, $stateParams) {
				  return obj = OBJ.get($stateParams.objId);
				},
			  }
			});
	 
	 $stateProvider
			.state('community', {
			  url: '/community/:objId',
			  //abstract: true,
			  templateUrl: 'community.html',
			  controller: function($scope, obj) {$scope.obj = obj},
			  resolve: {
				obj: function(OBJ, $stateParams) {
				  return obj = OBJ.get($stateParams.objId);
				},
			  }
			});
	 

	 $stateProvider
        .state('parentstate', {
          url: '/parent/:objId',
          //abstract: true,
          templateUrl: 'views.parentview.html',
          controller: function($scope, obj) {$scope.obj = obj},
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });

	 

      $stateProvider
        .state('parentstate.childs', {
          url: '/edit',
          views: {
            "view1@parentstate": {
              templateUrl: 'views.view1.html',
              controller: 'view1Ctrl',
            },
            "view2@parentstate": {
              templateProvider: function($http, $stateParams, OBJ) {

                var obj = OBJ.get($stateParams.objId);
                var templateName = obj.id == 1
                  ? "views.view2.html"
                  : "views.view2.second.html"
                  ;
            
                return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
              },
              controller: 'view2Ctrl',
            }
          }
        });
		
		
      $urlRouterProvider.otherwise('/forum/');

    }
  ])
  .controller('view2Ctrl', function($scope, obj) {
    $scope.obj = obj
  })
  .controller('mmo', function($scope, obj) {
    $scope.obj = obj
  })
  .controller('pm', ['$compile','$scope', '$http', '$filter', function($compile,$scope,$http,$filter) {
	$http.get('https://kbve.com/api/pm/pm.php')
				.success(function(data) {
				$scope.private = data;
				});
	
		
	}])
  .controller('view1Ctrl', function($scope, obj) {
    $scope.obj = obj
  })
  .factory('OBJ', ['$http',
    function($http) {
      return {
        get : function(id) {return {id : id}; },
      };
    }
  ]);


	
	myApp.controller('topics', ['$compile','$scope', '$http', '$filter', function($compile,$scope,$http,$filter) {
	$http.get('https://kbve.com/api/topics/topics.json')
				.success(function(data) {
				$scope.topic = data;
				});
				
	
		
	}]);
	
	myApp.controller('cat', ['$compile','$scope', '$http', '$filter', '$location', function($compile,$scope,$http,$filter, $location) {	
	
		$http.get('https://kbve.com/api/forum/sub_topic/'+$location.hash()+'.json')
					.success(function(data) {
					$scope.cat_data = data;
					});

		$scope.$on('$locationChangeStart', function(){
		
				$http.get('https://kbve.com/api/forum/sub_topic/'+$location.hash()+'.json')
						.success(function(data) {
						$scope.cat_data = data;
						});
					});
					
			
	}]);
	
	myApp.controller('pm', ['$compile','$scope', '$http', '$filter', '$location', function($compile,$scope,$http,$filter, $location) {	
	
		$http.get('https://kbve.com/api/forum/sub_topic/'+$location.hash()+'.json')
					.success(function(data) {
					$scope.cat_data = data;
					});

		$scope.$on('$locationChangeStart', function(){
		
				$http.get('https://kbve.com/api/forum/sub_topic/'+$location.hash()+'.json')
						.success(function(data) {
						$scope.cat_data = data;
						});
					});
					
			
	}]);
	
	
	
	myApp.controller('stats', ['$compile','$scope', '$http', '$filter', function($compile,$scope,$http,$filter) {
	$http.get('https://kbve.com/api/forum/stats.json')
				.success(function(data) {
				$scope.stats = data;
				});
	
		
	}]);	
	
	myApp.controller('ytradio', ['$compile','$scope', '$http', '$filter', function($compile,$scope,$http,$filter) {
/*	$http.get('https://kbve.com/api/forum/stats.json')
				.success(function(data) {
				$scope.stats = data;
				});
	*/
	$scope.isCollapsed = true;
		
	}]);
	
	myApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
	/*
	myApp.controller('forum', ['$compile','$scope', '$http', '$filter', function($compile,$scope,$http,$filter) {
	//3
     $scope.forum = [];
	 $http.get('https://kbve.com/api/forum/sub/3.json')
				.success(function(datai) {
				$scope.forum.push({d_id:1,sort_id:3, name:"HQ", icon:"cube", subforum:datai});

		});
	//7
	$http.get('https://kbve.com/api/forum/sub/7.json')
				.success(function(datai) {
				$scope.forum.push({d_id:2,sort_id:7, name:"Crypto", icon:"bitcoin", subforum:datai});

		});
	
	//31 Tech
	$http.get('https://kbve.com/api/forum/sub/31.json')
				.success(function(datai) {
				$scope.forum.push({d_id:3,sort_id:31, name:"Technology", icon:"tablet", subforum:datai});

		});
	
	
	//9 Gaming
	$http.get('https://kbve.com/api/forum/sub/9.json')
				.success(function(datai) {
				$scope.forum.push({d_id:4,sort_id:9, name:"Gaming", icon:"gamepad", subforum:datai});

		});

		
	//80 Services
	$http.get('https://kbve.com/api/forum/sub/80.json')
				.success(function(datai) {
				$scope.forum.push({d_id:99,sort_id:80, name:"Services", icon:"gears", subforum:datai});

		});
	
	//56 Dev
	$http.get('https://kbve.com/api/forum/sub/56.json')
				.success(function(datai) {
				$scope.forum.push({d_id:5,sort_id:56, name:"Dev", icon:"code-fork", subforum:datai});

		});
	
	}]);
	*/
	myApp.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });