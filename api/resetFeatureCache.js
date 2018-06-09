import axios from 'axios';

export default idUser =>
  axios.get('https://apidev.cbinsights.com/api/v1/user/features', {
    params: {
      idUser,
      noCache: true
    }
  });
