<template>
    <main>
      <h1>Despesas</h1>
      
      <div class="container">
        <div class="area-actions">
          <router-link class="btn btn-primary" to="/expenses">Listar</router-link>
          <router-link class="btn btn-secondary" to="/expenses/create">Registrar</router-link>
        </div>
        <table class="table table-hover table-bordered" id="example">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Usuário</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in expenses" :key="expense.id">
              <td>{{expense.id}}</td>
              <td>{{expense.description}}</td>
              <td>{{expense.price}}</td>
              <td>{{expense.date_expense}}</td>
              <td>{{expense.user.name}}</td>
              <td><button v-on:click="editElement(expense.id)" class="btn btn-warning">Editar</button></td>
              <td><button v-on:click="removeElement(expense.id)" class="btn btn-danger">Deletar</button></td>
            </tr>
          
          </tbody>
        </table>
      </div>
    </main>
 
</template>
<script>
import Cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

export default {
  
  name: 'ListExpense',

  methods: {
    editElement(key){
      this.$router.push('/expenses/edit/'+key)
    },

    removeElement(key){
      fetch(`http://localhost/testes/crud-despesas/public/api/expense/${key}`,{
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('_myapp_token'),
        }
      })
      .then(response => response.json())
      .then(res => {

        this.getExpenses()
        console.log(res)
      })
    },

    getExpenses(){
      fetch(`http://localhost/testes/crud-despesas/public/api/expense`,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('_myapp_token')
        }
      })
      .then(response => response.json())
      .then(res => {
        this.expenses = res.expenditure;
        this.expenses.forEach(function(item) {
          item.date_expense = moment(item.date_expense).format('MM/DD/YYYY');
        });
        console.log(this.expenses);
      })
    }
  },
 
  mounted(){
    this.getExpenses()
  },

  data: function() {
    return {
        expenses:[]
    }
  },
}
</script>

<style>
  div.area-actions {
    display:flex;
    margin-bottom:10px;
  }
  div.container {
  }
</style>