var module = angular.module("miaomiao", []);
module.directive('rattingCtrl', function() {
    return {
        restrict: 'AC',
        replace: true,
        template: '<p class="ratting">' + '<span class="add-ratting" ng-show="placeholder">添加评分： </span>'+
        	'<span ng-repeat="s in stars" class="star" ng-class="s" ng-click="toggle($index)"></span>' + '</p>',
        scope: {
            ratting: '=',
            placeholder: '=',
            max: '=',
            readonly: '@',
            onRattingSelected: '&'
        },
        link: function(scope, elem, attrs) {
            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        'icon-star': i < scope.ratting,
                        'icon-star-empty': i >= scope.ratting
                    });
                }
            };

            scope.toggle = function(index) {
                if (scope.readonly && scope.readonly === 'true') {
                    return;
                }
                scope.ratting = index + 1;
                scope.onRattingSelected({
                    ratting: index + 1
                });
            };

            scope.$watch('ratting', function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
module.service("MiaoMiaoService", function($http) {
    return {
    	// fake api access
        getStoreInfo: function(params, callback) {
            var data = {
                photo: '/holder.js/64x64',
                name: '史塔克工业',
                tel: '010-66886868',
                address: '北京市三元桥京信大厦1236'
            };
            callback(data);
        },
        // fake api access
        getStoreDetails: function(params, callback) {
            var data = {
                description: "“以服务著称”的火锅店，门口有专人“引客”，等位提供“免费”茶水、美甲、擦鞋服务，落座后送上......",
                homepage: "javascript:void(0);",
                products: [{
                    photo: "/holder.js/50x50",
                    title: '可口可乐',
                    price: '¥3.00'
                }, {
                    photo: "/holder.js/50x50",
                    title: '牛奶',
                    price: '¥8.00'
                }, {
                    photo: "/holder.js/50x50",
                    title: '红牛',
                    price: '¥6.00'
                }, {
                    photo: "/holder.js/50x50",
                    title: '咖啡',
                    price: '¥6.00'
                }, {
                    photo: "/holder.js/50x50",
                    title: '巧克力',
                    price: '¥24.00'
                }],
                customers_count: 288,
                customer_comments_count: 69,
                comments: [{
                    photo: "/holder.js/48x48",
                    comment: "不错，就是人比较多，要等",
                    ratting: 4
                }, {
                    photo: "/holder.js/48x48",
                    comment: "位置很好找，店内环境也不错",
                    ratting: 5
                }, {
                    photo: "/holder.js/48x48",
                    comment: "一般吧，灯光比较暗",
                    ratting: 3
                }]
            };
            callback(data);
        }
    }
});

module.controller("MainCtrl", ["$scope", "MiaoMiaoService",
    function($scope, MiaoMiaoService) {

        MiaoMiaoService.getStoreInfo({}, function(data) {
            $scope.storeInfo = data;
        });

        MiaoMiaoService.getStoreDetails({}, function(data) {
            $scope.storeIntroduction = data;
        })

        $scope.customer_comment = {
            ratting: 1
        };

        $scope.addComment = function() {
            $scope.showRatting = true;
        }

        $scope.commentAdded = function() {
            $scope.showRatting = false;
            $scope.customer_comment = {
                ratting: 1
            };
        }
    }
]);