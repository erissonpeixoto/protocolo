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
    return Http.get('/users', {headers: response.headers});
  },

  async create(data){
    let response = await this.sign_in();
    return Http.post('/auth', {
        name: data.name,
        email: data.email,
        profile_id: data.profile_id,
        password_confirmation: data.password_confirmation,
        password: data.password,
    }, {headers: response.headers});
  },

  async update(data){
    let response = await this.sign_in();
    return Http.put(`/users/${data.id}`, {
      name: data.name,
      profile_id: data.profile_id,
      password_confirmation: data.password_confirmation,
      password: data.password
    }, {headers: response.headers});
  },

  async get(id){
    let response = await this.sign_in();
    return Http.get(`/users/${id}`, {headers: response.headers})
  },

  async delete(id){
    let response = await this.sign_in();
    return Http.delete(`/users/${id}`, {headers: response.headers})
  }

}