import axios from 'axios';
import Http from './http';

// POST request using axios with set headers

// Isso aqui deve ser refatorado, está assim apenas pra poder rodar o projeto pegando o token de um
// usuário fixo já criado. Ao se logar já armazenarei em sessão o token do usuário logado
// para poder usar em cada requisição.
const sign_in_params = { 'email': 'erisson.intersol@gmail.com', 'password': '!@12345#$'};

export default {

  sign_in() {
    return axios.post("/api/v1/auth/sign_in", sign_in_params);
  },

  async index(){
    let response = await this.sign_in();
    return Http.get('/profiles', {headers: response.headers});
  },

  async create(data){
    let response = await this.sign_in();
    return Http.post('/profiles', {
      profile: {
        name: data.name,
        code: data.code
      }
    }, {headers: response.headers});
  },

  async update(data){
    let response = await this.sign_in();
    return Http.put(`/profiles/${data.id}`, {
      profile: {
        id: data.id,
        name: data.name,
        code: data.code
      }
    }, {headers: response.headers});
  },

  async get(id){
    let response = await this.sign_in();
    return Http.get(`/profiles/${id}`, {headers: response.headers})
  },

  async delete(id){
    let response = await this.sign_in();
    return Http.delete(`/profiles/${id}`, {headers: response.headers})
  }

}