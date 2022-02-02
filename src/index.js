import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import axios from 'axios';

import App from './App';
import reportWebVitals from './reportWebVitals';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data } = error.response;
    console.dir(data);
    swal({
      title: 'Oops!',
      text: data,
      icon: 'error',
    })
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
