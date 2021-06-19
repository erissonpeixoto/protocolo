<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h4 class="m-0 text-dark jt-title"></h4>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/users">Usuários</router-link></li>
              <li class="breadcrumb-item active">Editar</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="card card-success card-outline">
          <div class="card-header">
            <h3 class="card-title">Editar Usuário #{{form.id}}</h3>
          </div> <!-- /.card-body -->
          <div class="card-body">
            <b-form @submit="onSubmit" v-if="show">
              <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  placeholder="Insira o nome"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Email:" label-for="input-2">
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  placeholder="Insira o email"
                  required
                  disabled
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Perfil:" label-for="input-2">
                <b-form-select v-model="form.profile_id" required>
                  <option v-for="option in profiles" :value="option.id">
                    {{ option.name }}
                  </option>
                </b-form-select>
              </b-form-group>

              <b-button type="submit" variant="success" size="sm">Salvar</b-button>
              <b-button href="/users" variant="outline-secondary" size="sm">Voltar</b-button>

            </b-form>
          </div><!-- /.card-body -->
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
  import Api from '../../api';
  import Toast from '../../tools/toast.js'

  export default {
    data() {
      return {
        form: {
          id: this.$route.params.id,
          name: '',
          profile_id: ''
        },
        profiles: [],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        Api.User.update(this.form)
          .then(response => {
            this.$router.push({ path: "/users"});
            Toast.fire({
              icon: 'success',
              title: 'Usuário atualizado com sucesso!'
            });
          })
          .catch(function (error) {
            Toast.fire({
              icon: 'error',
              title: error
            });
            console.log(error);
        });
      },

      getProfiles(){
        Api.Profile.index()
        .then(response => {
          this.profiles = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    mounted() {
      Api.User.get(this.$route.params.id)
        .then(response => {
          this.form = response.data
          this.getProfiles()
        })
        .catch(function (error) {
          console.log(error);
      });
    }
  }
</script>

<style scoped>
</style>
