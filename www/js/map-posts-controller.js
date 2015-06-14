angular.module('starter.controllers')

.controller('MapPosts', ['HttpClient', 'Api', function(HttpClient, Api) {

  function getNewUserPosts() {
    console.log('here?');
    var url = '/get-updated-posts';

    Api.getApiData(url).then(function(response) {
      var userPosts = JSON.parse(response);
      console.log(userPosts);

      initialiseGMaps(userPosts);
    }, function(error) {
      console.log(error);
    });

//    var aClient = new HttpClient();
//
//    aClient.get(url, function(response, status) {
//      if (status == 200) {
//        var userPosts = JSON.parse(response);
//
//        console.log(userPosts);
//
//        initialiseGMaps(userPosts);
//      } else {
//        // TODO: render error
//      }
//    });

  }

  function initialiseGMaps(userPosts) {
    var mapOptions = {
      center: {lat: 48.8534100, lng: 2.3488000},
      zoom: 5
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  //  var input = document.getElementById('places-input');

    // set the Google maps control array to have the input element at the "TOP_LEFT" value/position
  //  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  //  var searchBox = new google.maps.places.SearchBox(input); // turn the HTML input into places search

    var bounds = new google.maps.LatLngBounds();

    var allUserPaths = [];
    //  for every user
    for (var i = 0; i < userPosts.users.length; i++) {
      var user = userPosts.users[i];
      var posts = user.posts;

      // for every post by that user
      var routeHistory = [];

      for (var j = 0; j < posts.length; j++) {
        var post = posts[j];

        if (post.latitude != null && post.longitude != null) {
          var pinIcon = new google.maps.MarkerImage(
            user.avatar_url,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(42, 42)
          );

          // Adding the pin location to a list that will allow a path to be drawn between them, one
          // for each user
          var pinLocation = new google.maps.LatLng(post.latitude, post.longitude);
          routeHistory.push(pinLocation);

          var marker = new google.maps.Marker({
            position: pinLocation,
            map: map,
            title: user.name,
            id: post.id,
          });

          marker.setIcon(pinIcon);

          google.maps.event.addListener(marker, 'click', function(id) {
            return function() {
              console.log('[data-postcard-id="' + id + '"]');
              var postcardNode = document.querySelectorAll('[data-postcard-id="' + id + '"]')[0];
              var postcardBounds = postcardNode.getBoundingClientRect();
              console.log(postcardBounds.left, postcardContainer.scrollLeft);
              postcardContainer.scrollLeft = postcardBounds.left;
            }
          }(marker.id));
          // to bind the map to the markers
          bounds.extend(marker.getPosition());
        }
      }
      allUserPaths.push(routeHistory);

    }

    // making the path between all the pins
    for (var i = 0; i < allUserPaths.length; i++) {
        // TODO: CRW - this should be a list of colours - FIX!
      var colour;
      if (i == 0) {
        colour = '#040A0D';
      } else {
        colour = '#F2867A';
      }
      console.log(colour);

      var path = new google.maps.Polyline({
        path: allUserPaths[i],
        geodesic: true,
        strokeColor: colour,
        strokeOpacity: 1.0,
        strokeWight: 2
      });

      path.setMap(map);
    }

    map.fitBounds(bounds);

  }

  // Add all listeners down here
  getNewUserPosts();
//  google.maps.event.addDomListener(window, 'load', getNewUserPosts);
}]);

