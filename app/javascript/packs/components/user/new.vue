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
              <li class="breadcrumb-item active">Cadastro</li>
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
            <h3 class="card-title">Cadastrar Usuário</h3>
          </div> <!-- /.card-body -->
          <div class="card-body">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Perfil:" label-for="input-3">
                <b-form-select v-model="form.profile_id" required>
                  <option v-for="option in profiles" :value="option.id">
                    {{ option.name }}
                  </option>
                </b-form-select>
              </b-form-group>

              <b-form-group id="input-group-4" label="Senha:" label-for="input-4">
                <b-form-input v-model="form.password" type="password" id="text-password" aria-describedby="password-help-block" placeholder="Insira a senha" required></b-form-input>
                <b-form-text id="password-help-block">
                  A senha deve conter 6 ou mais caracteres.
                </b-form-text>
              </b-form-group>

              <b-form-group id="input-group-5" label="Confirme a Senha:" label-for="input-5">
                <b-form-input v-model="form.password_confirmation" type="password" id="text-password-confirmation" aria-describedby="password-help-block" placeholder="Insira a senha" required></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="success" size="sm">Salvar</b-button>
              <b-button href="/users" variant="outline-secondary" size="sm">Voltar</b-button>
              <b-button type="reset" variant="outline-danger" size="sm">Limpar</b-button>

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
          name: '',
          email: '',
          profile_id: '',
          password: '',
          password_confirmation: '',
        },
        profiles: [],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        Api.User.create(this.form)
          .then(response => {
            this.$router.push({ path: "/users"});
            Toast.fire({
              icon: 'success',
              title: 'Usuário cadastrado com sucesso!'
            });
          })
          .catch(function (error) {
            console.log(error);
        });
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.newObject()
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      newObject(){
        this.form.name = ""
        this.form.email = ""
        this.profile_id = ""
        this.password = ""
        this.password_confirmation = ""
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
    mounted () {

      this.getProfiles()

    }
  }
</script>

<style scoped>
</style>
