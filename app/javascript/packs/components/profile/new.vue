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
              <li class="breadcrumb-item"><router-link to="/profiles">Perfis</router-link></li>
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
            <h3 class="card-title">Cadastrar Perfil</h3>
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

              <b-form-group id="input-group-2" label="Código:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.code"
                  placeholder="Insira o código"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="success" size="sm">Salvar</b-button>
              <b-button href="/profiles" variant="outline-secondary" size="sm">Voltar</b-button>
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
          code: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        Api.Profile.create(this.form)
          .then(response => {
            this.$router.push({ path: "/profiles"});
            Toast.fire({
              icon: 'success',
              title: 'Perfil cadastrado com sucesso!'
            });
          })
          .catch(function (error) {
            console.log(error);
        });
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.code = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      newObject(){
        this.form.name = ""
        this.form.code = ""
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>
</style>
