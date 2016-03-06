angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentsController',
  function ($scope, $rootScope, $stateParams, $state, Comments,
    Posts, TimeService) {
  $scope.comments = [];
  console.log('$stateParams', $stateParams)
  $scope.post = $stateParams.post;
  // this starts out undefined...does it ever get set?
  $scope.comment = $stateParams.comment;
  $scope.newCommentBody = '';
  $scope.theUser = $rootScope.user;
  $scope.TimeService = TimeService;
  
  // Voting
  //$scope.votes = 0;
  $scope.upVote = function(postId, commentId, user) {
    // console.log('commentId: ', commentId);
    // console.log('postId: ', postId);
    // console.log('user: ', user);
    Comments.upVote(postId, commentId, user)
    .then(function(response){
      console.log('response in controller!!!!', response);
      //$scope.numVotes = response;

      $scope.getComments();
    });
  };
  
  //

  $scope.getComments = function getComments() {
    Comments.getComments($scope.post._id).then(function(data) {
      // console.log('getComments Data: ', data);
      $scope.comments = data.data;
    });
    hljs.initHighlightingOnLoad();

  };


  $scope.deleteComment = function deleteComment(postId, commentId) {
    Comments.deleteComment(postId, commentId);
    $scope.getComments();
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('posts');
  };

  $scope.submit = function () {
    Comments.createComment($scope.post._id, $scope.newCommentBody, $rootScope.user, new Date());
    $scope.newCommentBody = '';
    $scope.getComments();
  };

  $scope.getComments();
  console.log('all the comments', $scope.comments)
});
