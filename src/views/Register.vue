<template>
  <main class="form-signin">
    <form @submit.stop.prevent="register">
      <h1 class="h3 mb-3 fw-normal">Formulário de cadastro</h1>

      <div class="form-floating">
        <input
         v-model="name"
         type="text" class="form-control" id="nameInput" placeholder="João">
        <label for="nameInput">Nome</label>
      </div>
      <div class="form-floating">
        <input
         v-model="email"
         type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input 
        v-model="password"
        type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating">
        <input 
        v-model="c_password"
        type="password" class="form-control" id="confirmPassword" placeholder="Password">
        <label for="confirmPassword">Confirmar senha</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Cadastro</button>
    </form>
  </main>
</template>

<script>
  import Cookie from 'js-cookie';
  export default {
    name: 'Register',

    data(){
      return {
        name: '',
        email: '',
        password: '',
        c_password: '',
      };
    },

    methods: {
      register(){
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password,
          c_password: this.c_password,
        };

        fetch(`http://localhost/testes/crud-despesas/public/api/auth/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(res => {
          Cookie.set('_myapp_token', res.access_token);
          this.$router.push({ name: 'ListExpense' })
          console.log(res);
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