import axios from 'axios';

//let token = document.getElementsByName('csrf-token')[0].getAttribute('content')

const http = axios.create({
  baseURL: '/api/v1',
  timeout: 1000
});

export default http;