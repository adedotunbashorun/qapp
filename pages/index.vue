<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto" id="login">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li class="text-danger" v-for="error in errors" :key="error">{{ error.message }}</li>
                </ul>
              </p>
            <form class="form-signin"  @submit.prevent="checkForm">
              <div class="form-label-group">
                <input type="email" id="inputEmail" class="form-control" v-model="user.email" placeholder="Email address" required autofocus>
                <label for="inputEmail">Email address</label>
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" v-model="user.password" placeholder="Password" required>
                <label for="inputPassword">Password</label>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              <a href="#" class="txt1" id="show_forgetpassword">
								Forgot Password?
							</a>
              <!-- <hr class="my-4">
              <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
              <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button> -->
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto" id="forgetPassword">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Forget Password</h5>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li class="text-danger" v-for="error in errors" :key="error">{{ error.message }}</li>
                </ul>
              </p>
            <form class="form-forget" @submit.prevent="forgetPassword">
              <div class="form-label-group">
                <input type="email" id="inputEmail1" class="form-control" v-model="login.email" placeholder="Email address" required autofocus>
                <label for="inputEmail1">Email address</label>
              </div>
              <a href="#" class="txt1" id="show_login">
                <i class="fa fa-arrow-left"></i> Back</h6><br/>
              </a>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Send Reset Instruction</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'guest',
  layout: 'site',
  data(){
      return {
        errors: [],
        user: {
          email:'',
          password:''
        },
        login:{
          email:''
        }
      }
  },
  mounted(){
    $("#forgetPassword").hide();
      $('#show_login').on('click', function(){
        $("#login").show()
        $("#forgetPassword").hide();
      })
      $('#show_forgetpassword').on('click', function(){
        $("#login").hide()
        $("#forgetPassword").show();
      })
  },
  methods: {
      loginUser(){
          let component = this;
          this.$store.dispatch('login', component.user)
          .then((resp) => {
              const token = resp.data.token
              const user = resp.data.user
              this.$store.commit('LOGIN_SUCCESS', {token, user})
              Cookie.set('jwtToken', token)
              Cookie.set('user', user)
              this.$router.go('/admin/dashboard')
          })
          .catch(err =>  {
            component.errors.push(err)
            console.log(err)
          })
      },
      checkForm: function (e) {
        if (this.user.email && this.user.password) {
          this.loginUser();
          return true;
        }

        this.errors = [];
        if (!this.user.email) {
          this.errors.push('Email required.');
          return false;
        }else if (!this.validEmail(this.user.email)) {
          this.errors.push('Valid email required.');
          return false;
        }
        if (!this.user.password) {
          this.errors.push('Password required.');
          return false;
        }
        e.preventDefault();

      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      forgetPassword(){
          if (!this.validEmail(this.login.email)) {
            this.errors.push('Valid email required.');
            return false;
          }
          let component = this;
          this.$store.dispatch('forgetPassword', component.login)
          .then((user) =>{
            $("#login").show()
            $("#forgetPassword").hide()
          })
          .catch(err => console.log(err))
      },
  }
}
</script>

<style>
.mx-auto {
   margin-top: 5em;
}
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}
</style>
