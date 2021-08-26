<template>
  <main class="form-signin">

    <h1>Edição de despesa</h1>

    <form @submit.stop.prevent="register">
      

      <div class="form-floating">
        <input
         v-model="description"
         type="textarea" class="form-control" id="nameInput" placeholder="João">
        <label for="nameInput">Descrição</label>
      </div>
      <div class="form-floating">
        <input
         v-model="price"
         type="number" class="form-control" id="price" placeholder="0,00">
        <label for="price">Valor</label>
      </div>
      <div class="form-floating">
        <input 
        v-model="date_expense"
        type="text" class="form-control" id="dateExpense" placeholder="Password">
        <label for="dateExpense">Data</label>
      </div>
      <div class="form-floating">
        <select class="form-control" v-model="id_user" id="idUser">
          <option v-for="(user, index) in users" v-bind:value="user.id" :key="index">{{ user.name }}</option>
        </select>
        <label for="idUser">Usuário</label>
      </div>



      <button class="w-100 btn btn-lg btn-primary" type="submit">Salvar</button>
    </form>
  </main>
</template>

<script>
  import Cookie from 'js-cookie';
  import moment from 'moment';
  
  export default {
    name: 'RegisterExpense',

    data(){
      return {
        errors: '',
        users:[],
        description: '',
        price: '',
        date_expense: '',
        id_user: '',
      };
    },

    mounted(){
      fetch(`http://localhost/testes/crud-despesas/public/api/expense/${this.$route.params.id}`,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('_myapp_token'),
        }
      })
      .then(response => response.json())
      .then(res => {
        this.description = res.expense.description;
        this.price = res.expense.price;
        this.date_expense = moment(res.expense.date_expense).format('MM/DD/YYYY');
        this.id_user = res.expense.id_user;
      })


      fetch(`http://localhost/testes/crud-despesas/public/api/user`,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('_myapp_token'),
        }
      })
      .then(response => response.json())
      .then(res => {
        this.users = res.users;
        console.log(this.users);
      })
    },


    methods: {
      register(){
        const payload = {
          description: this.description,
          price: this.price,
          date_expense: this.date_expense,
          id_user: this.id_user,
        };

        fetch(`http://localhost/testes/crud-despesas/public/api/expense/${this.$route.params.id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access': 'application/json',
            'Authorization': 'Bearer '+Cookie.get('_myapp_token'),
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(res => {
          this.errors == "";
          if(res.description != undefined)
            this.errors += res.description+'\n';
          if(res.date_expense != undefined)
            this.errors += res.date_expense+'\n';
          if(res.price != undefined)
            this.errors += res.price+'\n';
          if(res.id_user != undefined)
            this.errors += res.id_user+'\n';

          if(this.errors != ""){
            alert(this.errors);
          }

          if(this.errors == ""){
            this.$router.push({ name: 'ListExpense' })
          }
        })
      },
    },
  }
</script>

<style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>