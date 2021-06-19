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
            <h3 class="card-title">Visualização do Usuário #{{user.id}}</h3>
          </div> <!-- /.card-body -->
          <div class="card-body">
            <div>
              <b-row>
                <b-col><b>Nome:</b> {{user.name}}</b-col>
                <b-col><b>Perfil:</b> {{user.profile_name}}</b-col>
              </b-row>

              <b-row>
                <b-col><b>Email:</b> {{user.email}}</b-col>
                <b-col><b>Criado em:</b> {{user.created_at | formatDate}}</b-col>
              </b-row>
            </div>
          </div><!-- /.card-body -->
        </div>

        <b-button href="/users" variant="outline-secondary" size="sm">Voltar</b-button>
        <b-button :href="user.id + '/edit'" variant="primary" size="sm"><b-icon icon="pencil"></b-icon> Editar</b-button>
        <b-button variant="outline-danger" size="sm" data-toggle="modal" data-target="#modal-sm"><b-icon icon="trash"></b-icon> Excluir</b-button>

      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    <!-- modal -->
    <div class="modal fade" id="modal-sm">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Excluir Usuário <b-icon icon="exclamation-triangle-fill" variant="danger"></b-icon></h4>
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
        user: {
          id: this.$route.params.id,
          name: '',
          email: '',
        }
      }
    },
    methods: {
      destroy() {
        Api.User.delete(this.user.id)
        .then(response => {
          this.$router.push({ path: "/users"});
          Toast.fire({
            icon: 'success',
            title: 'Usuário excluído com sucesso!'
          });
          console.log(this.result);
        });
      },

    },
    mounted() {
      Api.User.get(this.$route.params.id)
      .then(response => {
        this.user = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style scoped>
</style>
