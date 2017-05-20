import fetch from 'isomorphic-fetch';

fetch('https://apidev.cbinsights.com/api/v1/user/features?idUser=145647&noCache=true')
  .then((response) => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then((stories) => {
    console.log(stories);
  });
