angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function ($scope, $stateParams, $state, Posts, Comments, TimeService, ForumService) {
  $scope.posts = [];
  $scope.forums = [];
  $scope.numberOfComments = {};
  $scope.forum = ForumService.currentForum.model.forum;
  $scope.TimeService = TimeService;
  /// add boolean to control whether or not to filter posts
  /// so when user lands on page or clicks 'all forums / homepage' all posts are listed
  $scope.forumSelected = false; // a.k.a disableFilter
  $scope.showStack = false;
  $scope.showSadface = false;
  $scope.orderSelect = 'score';

   $scope.selectScore = function () {
      $scope.orderSelect = 'score';
   };
   $scope.selectNumAnswers = function () {
      console.log('called')
      $scope.orderSelect = 'answer_count';
      console.log($scope.orderSelect)
   };
   $scope.selectViewCount = function () {
      $scope.orderSelect = 'view_count';
   };

    $scope.$watch('$scope.orderSelect', function() {
        console.log('hey, OS has changed!');
        console.log($scope.orderSelect)
    });


  $scope.forumSelect = function() {
    $scope.showStack = true;
    $scope.forumSelected  = true;
  };
  $scope.forumDeselect = function() {
    $scope.showStack = false;
    $scope.forumSelected = false;
  };
  $scope.getStackOverflowJSON = function(forum, min, endpoint){
    Posts.getStackOverflowJSON(forum, min, endpoint)
    .then(function(data){
      $scope.showSadface = false;
      $scope.stackJSON = data.data.items;
      if($scope.stackJSON.length === 0){
        $scope.showSadface = true;
      }
    });
  };


  $scope.getPosts = function getPosts(forum) {
    // TODO: need to pass in forum to Posts.getPosts()
    Posts.getPosts('').then(function (data) {
      $scope.posts = data.data;
      // this creates an object $scope.numberOfComments that
      // keeps track of each posts number of comments. not
      // ideal, but works. need to refactor how we go
      // about determining the number of comments.
      for (var i = 0; i < $scope.posts.length; i++) {
        $scope.posts[i].numberOfComments = $scope.getNumberOfComments($scope.posts[i]._id);
      }
    });
  };

  $scope.getForums = function getForums(forum) {
    Posts.getForums().then(function (data) {
      $scope.forums = data.data.sort();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    ForumService.currentForum.model.forum = forum;
    $scope.getForums();
  };

  $scope.getNumberOfComments = function getNumberOfComments(postId) {
    Comments.getNumberOfComments(postId).then(function (data) {
      $scope.numberOfComments[postId] = data.data;
    });
  };

  $scope.getPosts($scope.forum);
  $scope.getForums();
});
