<template>
  <main class="form-signin">

    <h1>Cadastros de despesa</h1>

    <div class="container">
      <div class="area-actions">
        <router-link class="btn btn-secondary" to="/expenses">Listar</router-link>
        <router-link class="btn btn-primary" to="/expenses/create">Registrar</router-link>
      </div>
      <form @submit.stop.prevent="register">
        <div class="form-floating">
          <textarea
           v-model="description"
           type="textarea" class="form-control" id="nameInput" placeholder="João">
           </textarea>
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
          type="text" class="form-control" id="dateExpense" >
          <label for="dateExpense">Data</label>
        </div>
        <div class="form-floating">
          <select class="form-control" v-model="id_user" id="idUser">
            <option v-for="(user, index) in users" v-bind:value="user.id" :key="index">{{ user.name }}</option>
          </select>
          <label for="idUser">Usuário</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Cadastro</button>
      </form>
    </div>
  </main>
</template>

<script>
  import Cookie from 'js-cookie';
  
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

        fetch(`http://localhost/testes/crud-despesas/public/api/expense/register`,{
          method: 'POST',
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
  main h1 {margin-bottom:45px;}
  div.area-actions {
    display:flex;
    margin-bottom:10px;
  }

  .form-signin {
    flaot:left;
    width: 100%;
    max-width: 600px !important;
    padding: 15px;
  }

  .form-floating {
    margin-bottom:10px;
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