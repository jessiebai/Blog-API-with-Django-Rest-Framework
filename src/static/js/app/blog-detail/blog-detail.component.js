'use strict';

angular.module('blogDetail').
    component('blogDetail', {
        templateUrl: '/api/templates/blog-detail.html',
        controller: function(Comment, Post, $cookies, $http, $location, $routeParams, $scope){
            var slug = $routeParams.slug
            Post.get({"slug": slug}, function(data){
              $scope.post = data
              //$scope.comments = data.comments
              Comment.query({"slug": slug, "type": "post"}, function(data){
                $scope.comments = data
              })
            })
            // Post.query(function(data){
            //   $scope.notFound = true
            //
            //   $scope.comments = []
            //    angular.forEach(data, function(post){
            //         if (post.id == $routeParams.id){
            //           $scope.notFound = false
            //           $scope.post = post
            //           if (post.comments) {
            //             $scope.comments = post.comments
            //
            //           }
            //           resetReply()
            //         }
            //   })
            // })



            $scope.deleteComment = function(comment) {
              comment.$delete({"id": comment.id}, function(data) {
                 $scope.comments.splice(comment, 1)
              }, function(e_data) {
                console.log(e_data)
              })
              // $create
              // $save
            }

            $scope.updateReply = function(comment) {

                  Comment.update({
                    "id": comment.id,
                    content: $scope.reply.content,
                    slug: slug,
                    type: "post"
                  },
                    function(data){
                      //success
                      //$scope.comments.push(data)
                      //resetReply()
                    }, function(e_data) {
                      console.log(e_data)
                    })

            }

            $scope.addCommentReply = function(reply, parentComment) {
              Comment.create({
                content: reply.content,
                slug: slug,
                type: "post",
                parent_id: parentComment.id
              },
                function(data){
                  //success
                  parentComment.reply_count += 1
                  //resetNewComment()
                }, function(e_data) {
                  console.log(e_data)
                })
            }

            //curl -X POST -H "Authorization: JWT '{"content":"some reply to another try"}' 'http://127.0.0.1:8000/api/comments/create/?slug=new-title&type=post&parent_id=13'
            $scope.addNewComment = function() {
                  console.log($scope.reply)
                  Comment.create({
                    content: $scope.newComment.content,
                    slug: slug,
                    type: "post"
                  },
                    function(data){
                      //success
                      $scope.comments.push(data)
                      resetNewComment()
                    }, function(e_data) {
                      console.log(e_data)
                    })

            }

            function resetReply(){
              $scope.reply = {
                        //  id: $scope.comments.length + 1,
                          content: "",
              }
            }

            if ($scope.notFound) {
                console.log("Not found")
                // change location
                $location.path("/")
            }




    }
});
