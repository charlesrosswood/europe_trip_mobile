angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('HttpClient', function() {
  var HttpClient = function() {

    function buildFormData(jsonObj) {
      var encodedData = '';
      var encodedPairs = [];

      for (var key in jsonObj) {
        var value = jsonObj[key];
        encodedPairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }

      // replace spaces with pluses
      encodedData = encodedPairs.join('&').replace(/%20/g, '+');
      return encodedData;
    }

    this.get = function(aUrl, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() {
        if (anHttpRequest.readyState == 4)
          aCallback(anHttpRequest.responseText, anHttpRequest.status);
      }

      anHttpRequest.open( "GET", aUrl, true );

      anHttpRequest.send( null );
    };

    this.post = function(aUrl, bodyData, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() {
        if (anHttpRequest.readyState == 4) {
          aCallback(anHttpRequest.responseText, anHttpRequest.status);
        }
      }

      anHttpRequest.open( "POST", aUrl, true );

      anHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      anHttpRequest.send(JSON.stringify(bodyData));
    };

    this.put = function(aUrl, bodyData, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() {
        if (anHttpRequest.readyState == 4) {
          aCallback(anHttpRequest.responseText, anHttpRequest.status);
        }
      }

      anHttpRequest.open( "PUT", aUrl, true );

      anHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      anHttpRequest.send(JSON.stringify(bodyData));
    };

    this.postImgur = function(imgFile, aCallback) {

      var aUrl = 'https://api.imgur.com/3/image';
      // create new form to send to imgur
      var fd = new FormData();
      fd.append('image', imgFile);

      var anHttpRequest = new XMLHttpRequest();

      anHttpRequest.onreadystatechange = function() {
        if (anHttpRequest.readyState == 4)
          aCallback(anHttpRequest.responseText, anHttpRequest.status);
      }

      anHttpRequest.open('POST', aUrl);

      var clientId = 'a9cda2e43ea6ba9';
      anHttpRequest.setRequestHeader('Authorization', 'Client-ID ' + clientId)

      anHttpRequest.send(fd);
    };
  }

  return HttpClient;

})

.factory('Api', function($http) {
  console.log('ApiEndpoint')

  var getApiData = function(url) {
    return $http.get(url)
      .then(function(data) {
        console.log('Got some data: ', data);
        return data;
      })
  };

  return {
    getApiData: getApiData
  };
});
