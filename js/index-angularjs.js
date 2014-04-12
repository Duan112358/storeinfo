var module = angular.module("miaomiao", []);
module.directive('ratingCtrl', function() {
    return {
        restrict: 'AC',
        replace: true,
        template: '<p class="rating">' + '<span class="add-rating" ng-show="placeholder">添加评分： </span>'+
        	'<span ng-repeat="s in stars" class="star" ng-class="s" ng-click="toggle($index)"></span>' + '</p>',
        scope: {
            rating: '=',
            placeholder: '=',
            max: '=',
            readonly: '@',
            onratingSelected: '&'
        },
        link: function(scope, elem, attrs) {
            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        'icon-star': i < scope.rating,
                        'icon-star-empty': i >= scope.rating
                    });
                }
            };

            scope.toggle = function(index) {
                if (scope.readonly && scope.readonly === 'true') {
                    return;
                }
                scope.rating = index + 1;
                scope.onratingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('rating', function(oldVal, newVal) {
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
                    rating: 4
                }, {
                    photo: "/holder.js/48x48",
                    comment: "位置很好找，店内环境也不错",
                    rating: 5
                }, {
                    photo: "/holder.js/48x48",
                    comment: "一般吧，灯光比较暗",
                    rating: 3
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
            rating: 1
        };

        $scope.addComment = function() {
            $scope.showrating = true;
        }

        $scope.commentAdded = function() {
            $scope.showrating = false;
            $scope.customer_comment = {
                rating: 1
            };
        }
    }
]);