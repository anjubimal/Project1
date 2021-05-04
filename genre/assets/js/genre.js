const API_KEY = '4b52b8d4864cf35092c3095fb398a5e0';

var apiTest = function() {
    // format the api url
    var apiUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY + "&language=en-US";
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
          });
        } else {
          // head to error page
          console.log("error: in else");
        }
      })
      .catch(function(error) {
        // head to error page
        console.log("error: in catch");
      });
  };


  apiTest();