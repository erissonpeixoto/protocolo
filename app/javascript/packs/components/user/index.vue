<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <b-button variant="primary" href="users/new" size="sm"><b-icon icon="plus-circle-fill"></b-icon> Cadastrar</b-button>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
              <li class="breadcrumb-item active">{{breadcrumb}}</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Lista de Usuários</h3>
      </div>
      <div class="card-body p-0">
        <b-table striped hover :items="users" :fields="fields" class="table table-striped">
          <template #cell(action)="data">
            <b-button :href="'users/' + data.item.id" size="sm" class="mb-2" >
              <b-icon icon="search" aria-hidden="true"></b-icon >
            </b-button >
          </template>

        </b-table>
      </div>
      <div class="card-footer clearfix">
        <ul class="pagination pagination-sm m-0 float-right">
          <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../api';

  export default {
    data () {
      return {
        fields: [
          {
            key: 'id',
            label: '#',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            //variant: 'info',
          },
          {
            key: 'name',
            label: 'Nome',
            sortable: true
          },
          {
            key: 'email',
            label: 'Email',
            sortable: true,
          },
          {
            key: 'profile_name',
            label: 'Perfil',
            sortable: true,
          },
          {
            key: 'action',
            label: 'Ação'
          }
        ],
        users: [],
        breadcrumb: "Usuários"
      }
    },
    mounted () {
      Api.User.index()
        .then(response => {
          this.users = response.data
        })
        .catch(function (error) {
          console.log(error);
      });
    }
  }
</script>

<style scoped>
</style>
