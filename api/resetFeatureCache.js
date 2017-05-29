import fetch from 'isomorphic-fetch';

export default idUser =>
  fetch(
    `https://apidev.cbinsights.com/api/v1/user/features?idUser=${idUser}&noCache=true`
  ).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
