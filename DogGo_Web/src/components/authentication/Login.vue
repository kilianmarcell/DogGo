<template>
    <div class="login-container">
        <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner login-card fade-in">
            <div class="text-decoration-underline fs-2 text-center pb-3 login-title">
                <fa :icon="['fas', 'sign-in-alt']" class="me-3"/>
                Bejelentkezés
            </div>
            <div class="container">
                <div class="row mb-3 input-group-animated">
                    <label for="username" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'user']" class="me-2"/>
                        Felhasználónév
                    </label>
                    <input type="text"
                        id="username"
                        class="fs-5 input-doggo"
                        v-model="this.registeredUser.username"
                        placeholder="Felhasználónév"
                        @keyup.enter="login">
                </div>

                <div class="row mb-3 input-group-animated">
                    <label for="password" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'lock']" class="me-2"/>
                        Jelszó
                    </label>
                    <input type="password"
                        id="password"
                        class="fs-5 input-doggo"
                        v-model="this.registeredUser.password"
                        placeholder="Jelszó"
                        @keyup.enter="login">
                </div>
            </div>
            <div class="pt-3">
                <button class="btn btn-primary w-100 fs-5 animated-btn" @click="login">
                    <fa :icon="['fas', 'sign-in-alt']" class="me-2"/>
                    Bejelentkezés
                </button>
            </div>

            <div v-if="this.error" class="alert alert-danger d-flex align-items-center error-alert">
                <fa :icon="['fas', 'exclamation-triangle']" class="me-2"/>
                {{ this.errorMessage }}
            </div>

            <div class="text-end fs-6">
                <router-link :to="{ name: 'Register' }" class="register-link">
                    <fa :icon="['fas', 'user-plus']" class="me-2"/>
                    Nincs még fiókom
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    
    data() {
        return {
            registeredUser: {
                username: "",
                password: ""
            },
            token: "",
            error: false,
            errorMessage: ""
        }
    },

    methods: {
        async login() {
            await axios
                .post('api/login', this.registeredUser)
                .then(response => {
                    this.token = response.data.token;
                    this.error = false;
                })
                .catch(error => {
                    console.log(error.status)
                    if (error.response.status == 401) {
                        this.error = true
                        this.errorMessage = "Helytelen felhasználónév vagy jelszó!"
                    } else if (error.response.status == 403) {
                        this.error = true
                        this.errorMessage = "Ez a felhasználó tiltva van!"
                    }
                })

            if (!this.error) {
                await localStorage.setItem('token', this.token)
                this.$router.go()
            }
        }
    },

    mounted() {
        if (localStorage.getItem('token') != null) {
            this.$router.push({ name: 'Home' })
        }
    },

    computed: {
        ...mapGetters(['user'])
    }
}
</script>

<style scoped>
.login-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
}

.login-card {
  position: relative;
  z-index: 1;
  animation-delay: 0.2s;
}

.login-title {
  background: linear-gradient(45deg, #86C232, #61892F, #86C232);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientTextTitle 3s ease infinite;
  margin-bottom: 2rem;
}

@keyframes gradientTextTitle {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.input-group-animated {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-label {
  color: #86C232;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.input-label svg {
  color: #86C232;
  filter: drop-shadow(0 0 5px rgba(134, 194, 50, 0.5));
}

.animated-input {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(134, 194, 50, 0.3);
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  color: #fff;
}

.animated-input:focus {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(134, 194, 50, 0.2),
    0 0 0 3px rgba(134, 194, 50, 0.1);
  border-color: #86C232;
}

.animated-btn {
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-btn:hover {
  transform: translateY(-3px) scale(1.02);
}

.animated-btn:active {
  transform: translateY(-1px) scale(0.98);
}

.error-alert {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.9), rgba(231, 76, 60, 0.8));
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 12px;
  animation: shakeError 0.5s ease-in-out;
}

@keyframes shakeError {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.register-link {
  color: #86C232;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
}

.register-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #86C232, #61892F);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.register-link:hover {
  color: #9AD149;
  transform: translateY(-2px);
  background: rgba(134, 194, 50, 0.1);
}

.register-link:hover::before {
  width: 100%;
}

.register-link svg {
  transition: transform 0.3s ease;
}

.register-link:hover svg {
  transform: scale(1.2) rotate(5deg);
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    width: 90% !important;
    padding: 20px;
  }
  
  .login-title {
    font-size: 1.5rem !important;
  }
}
</style>