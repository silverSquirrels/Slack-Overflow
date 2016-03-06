angular.module('hackoverflow.services', [])

// POSTS

.factory('Posts', function($http) {
/////////
  

  var getStackOverflowJSON = function(forum, min){
    if(forum === 'RESTful API'){
      forum = 'REST';
    }
    console.log('forum', forum)
    min = min || 5;
    var url = 'http://api.stackexchange.com/2.2/questions?order=desc&min='+min+'&sort=votes&tagged='+forum+'&site=stackoverflow&callback=JSON_CALLBACK';
    console.log(url)

    return $http.jsonp(url).
    success(function(data, status, headers, config) {
        console.log('success', data);
        return data;
    }).
    error(function(data, status, headers, config) {
        console.log('error', data);
    });
  };

/////////
  var getForums = function() {
    return $http({
      method: 'GET',
      url: 'app/config/forums.json'
    })
    .then(function ( response ){
      return response;
    });
  };

  var getPosts = function(forum) {
    return $http({
      method: 'GET',
      url: '/api/post/' + forum
    })
    .then(function ( response ){
      return response;
      });
    };

  var createPost = function(title, body, forum, author, created, picture) {
    console.log('SERVICES', picture)
    var newPost = {
      title: title,
      body: body,
      forum: forum,
      author: author,
      created: created,
      picture: picture
    };
    console.log('create post: ', newPost);
    return $http({
      method: 'POST',
      url: '/api/post',
      data: newPost
    });
  };

  var editPost = function(postId, title, body,
    forum, author, created) {
    var editedPost = {
      postId: postId,
      title: title,
      body: body,
      forum: forum,
      author: author,
      created: created
    };
    console.log('edited post: ', editedPost);
    return $http({
      method: 'PUT',
      url: '/api/post/' + postId,
      data: editedPost
    });
  };

  var deletePost = function(postId) {
    console.log(postId + ' is for deleting');
    return $http({
      method: 'DELETE',
      url: '/api/post/' + postId
    });
  };

  return {
    getForums: getForums,
    getPosts: getPosts,
    createPost: createPost,
    editPost: editPost,
    deletePost: deletePost,
    getStackOverflowJSON: getStackOverflowJSON
  };
})

// COMMENTS

.factory('Comments', function ( $http ) {

  var getComments = function(postId) {
    console.log(postId + " is postId");
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/comments'
    })
    .then(function(response) {
      return response;
      });
    };

  var getNumberOfComments = function(postId) {
    return $http({
      method: 'GET',
      url: '/api/post/' + postId + '/commentsNumber'
    })
    .then(function(response) {
      return response;
    });
  };

  var createComment = function(postId, body, author, created) {
    var newComment = {
      postId: postId,
      body: body,
      author: author,
      created: created
    };
    console.log('new comment: ', newComment);
    return $http({
      method: 'POST',
      url: '/api/post/' + postId + '/comments',
      data: newComment
    });
  };

  var upVote = function(postId, commentId, user) {
    var userObj = { user: user };
    return $http({
      method: 'POST',
      url: '/api/post/' +postId + '/comments/' + commentId,
      data: userObj
    }).then(function(response, err){
      return response.data.num;
    });
  };

  // no edit comments for now. v2.
  // var editComment = function(commentId) {
  //   return $http({
  //     method: 'PUT',
  //     url: '/api/comments/' + commentId,
  //     data: comment
  //   });
  // };

  var deleteComment = function(postId, commentId) {
    console.log('commentID: ',commentId);

    return $http({
      method: 'DELETE',
      url: '/api/post/' + postId + '/comments/' + commentId
    });
  };

  return {
    getComments: getComments,
    createComment: createComment,
    getNumberOfComments: getNumberOfComments,
    upVote: upVote,
    // editComment: editComment,
    deleteComment: deleteComment
  };

})

// AUTHENTICATION

.factory('Auth', function($http, $location, $window) {

  var getUser = function getUser() {
    return $http({
      method: 'GET',
      url: '/api/me/'
    })
    .then(function ( response ){
      return response;
      });
    };

  return {
    getUser: getUser
  };
})

.factory('TimeService', function() {

  var relativeDate = function(date) {
    return moment(date).fromNow();
  };

  return {
    relativeDate: relativeDate
  };

})

.factory('ForumService', ['$rootScope', function ($rootScope) {

  var currentForum = {

    model: {
      forum: 'Algorithms'
    },

    SaveState: function () {
      sessionStorage.ForumService = angular.toJson(currentForum.model);
    },

    RestoreState: function () {
      currentForum.model = angular.fromJson(sessionStorage.ForumService);
    }
  };

  $rootScope.$on("savestate", currentForum.SaveState);
  $rootScope.$on("restorestate", currentForum.RestoreState);

  return {
    currentForum: currentForum
  };
}]);
