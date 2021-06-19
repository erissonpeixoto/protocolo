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
              <li class="breadcrumb-item active">Visualização</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">Visualização do Perfil #{{profile.id}}</h3>
          </div> <!-- /.card-body -->
          <div class="card-body">
            <div>
              <b-row>
                <b-col><b>Nome:</b> {{profile.name}}</b-col>
              </b-row>

              <b-row>
                <b-col><b>Código:</b> {{profile.code}}</b-col>
              </b-row>
            </div>
          </div><!-- /.card-body -->
        </div>

        <b-button href="/profiles" variant="outline-secondary" size="sm">Voltar</b-button>
        <b-button :href="profile.id + '/edit'" variant="primary" size="sm"><b-icon icon="pencil"></b-icon> Editar</b-button>
        <b-button variant="outline-danger" size="sm" data-toggle="modal" data-target="#modal-sm"><b-icon icon="trash"></b-icon> Excluir</b-button>

      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <!-- modal -->
    <div class="modal fade" id="modal-sm">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Excluir Perfil <b-icon icon="exclamation-triangle-fill" variant="danger"></b-icon></h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p style="text-align:center;">Tem certeza?</p>
          </div>
          <div class="modal-footer justify-content-between">
            <b-button class="btn btn-default" data-dismiss="modal" variant="outline-secondary" size="sm">Fechar</b-button>
            <b-button @click="destroy" data-dismiss="modal" variant="primary" size="sm">Excluir</b-button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

  </div>
</template>

<script>
  import Api from '../../api';
  import Toast from '../../tools/toast.js'

  export default {
    data() {
      return {
        profile: {
          id: this.$route.params.id,
          name: '',
          code: '',
        }
      }
    },
    methods: {
      destroy() {
        Api.Profile.delete(this.profile.id)
        .then(response => {
          this.$router.push({ path: "/profiles"});
          Toast.fire({
            icon: 'success',
            title: 'Perfil excluído com sucesso!'
          });
          console.log(this.result);
        });
      },

    },
    mounted() {
      Api.Profile.get(this.$route.params.id)
      .then(response => {
        this.profile = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style scoped>
</style>
