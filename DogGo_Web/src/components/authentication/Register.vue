<template>
    <div class="register-container">
        <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner register-card fade-in">
            <div class="text-decoration-underline fs-2 text-center pb-3 register-title">
                <fa :icon="['fas', 'user-plus']" class="me-3"/>
                Regisztráció
            </div>
            
            <div class="container">
                <div class="row mb-3 input-group-animated">
                    <label for="reg-username" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'user']" class="me-2"/>
                        Felhasználónév
                    </label>
                    <input type="text"
                        id="reg-username"
                        class="fs-5 input-doggo"
                        v-model="this.state.registerUser.username"
                        placeholder="Felhasználónév"
                        @keyup.enter="register">

                    <span class="text-danger text-center validation-error" v-if="v$.registerUser.username.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.registerUser.username.$errors[0].$message }}
                    </span>
                </div>

                <div class="row mb-3 input-group-animated">
                    <label for="reg-email" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'envelope']" class="me-2"/>
                        Email
                    </label>
                    <input type="email"
                        id="reg-email"
                        class="fs-5 input-doggo"
                        v-model="this.state.registerUser.email"
                        placeholder="Email"
                        @keyup.enter="register">

                    <span class="text-danger text-center validation-error" v-if="v$.registerUser.email.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.registerUser.email.$errors[0].$message }}
                    </span>
                </div>

                <div class="row mb-3 input-group-animated">
                    <label for="reg-password" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'lock']" class="me-2"/>
                        Jelszó
                    </label>
                    <input type="password"
                        id="reg-password"
                        class="fs-5 input-doggo"
                        v-model="this.state.registerUser.password"
                        placeholder="Jelszó"
                        @keyup.enter="register">

                    <span class="text-danger text-center validation-error" v-if="v$.registerUser.password.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.registerUser.password.$errors[0].$message }}
                    </span>
                </div>
                
                <div class="row mb-3 input-group-animated">
                    <label for="reg-confirm-password" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'lock']" class="me-2"/>
                        Jelszó ismét
                    </label>
                    <input type="password"
                        id="reg-confirm-password"
                        class="fs-5 input-doggo"
                        v-model="this.state.confirmPassword"
                        placeholder="Jelszó ismét"
                        @keyup.enter="register">

                    <span class="text-danger text-center validation-error" v-if="v$.confirmPassword.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.confirmPassword.$errors[0].$message }}
                    </span>
                </div>

                <div v-if="this.error" class="alert alert-danger d-flex align-items-center mt-3 error-alert">
                    <fa :icon="['fas', 'exclamation-triangle']" class="me-2"/>
                    {{ this.errorMessage }}
                </div>
            </div>
            <div class="pt-3">
                <button class="btn btn-primary w-100 fs-5 animated-btn" @click="register">
                    <fa :icon="['fas', 'user-plus']" class="me-2"/>
                    Regisztrálás
                </button>
            </div>

            <div class="text-end fs-6">
                <router-link :to="{ name: 'Login' }" class="login-link">
                    <fa :icon="['fas', 'sign-in-alt']" class="me-2"/>
                    Van már fiókom
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, sameAs, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name: 'Register',
    
    data() {
        return {
            token: "",
            error: false,
            errorMessage: ""
        }
    },

    setup() {
        const state = reactive({
            registerUser: {
                username: "",
                email: "",
                password: ""
            },
            confirmPassword: ""
        })

        const rules = computed(() => {
            return {
                registerUser: {
                    username: {
                        required: helpers.withMessage('A felhasználónév mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A felhasználónévnek legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A felhasználónév legfeljebb 20 karakter hoszzú lehet!', maxLength(20))
                    },

                    email: {
                        email: helpers.withMessage('Csak érvényes email cím írható be!', email),
                        required: helpers.withMessage('Az email mező kitöltése kötelező!', required),
                        max: helpers.withMessage('Az email legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
                    },

                    password: {
                        required: helpers.withMessage('A jelszó mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A jelszónak legalább 8 karakter hoszzúnak kell lennie!', minLength(8))
                    },
                },

                confirmPassword: {
                    required: helpers.withMessage('A mező kitöltése kötelező!', required),
                    same: helpers.withMessage('A mezőnek egyeznie kell a jelszóval!', sameAs(state.registerUser.password))
                }
            }
        })

        const v$ = useVuelidate(rules, state)

        return {
            state,
            v$
        }
    },

    methods: {
        async register() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                .post('api/register', this.state.registerUser)
                .then(() => {
                    this.error = false;
                })
                .catch(error => {
                    if (error.response.status == 400) {
                        this.error = true
                        this.errorMessage = "Ilyen felhasználó már létezik!"
                    }
                })

                if (!this.error) {
                    await axios
                        .post('api/login', this.state.registerUser)
                        .then(response => (localStorage.setItem('token', response.data.token)))

                    this.$router.go()
                }
            }
        }
    },

    mounted() {
        if (localStorage.getItem('token') != null) {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style scoped>
.register-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
}

.register-card {
  position: relative;
  z-index: 1;
  animation-delay: 0.2s;
}

.register-title {
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

.validation-error {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  animation: slideInError 0.3s ease-out;
}

@keyframes slideInError {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.login-link {
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

.login-link::before {
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

.login-link:hover {
  color: #9AD149;
  transform: translateY(-2px);
  background: rgba(134, 194, 50, 0.1);
}

.login-link:hover::before {
  width: 100%;
}

.login-link svg {
  transition: transform 0.3s ease;
}

.login-link:hover svg {
  transform: scale(1.2) rotate(-5deg);
}

@media (max-width: 768px) {
  .register-card {
    width: 90% !important;
    padding: 20px;
  }
  
  .register-title {
    font-size: 1.5rem !important;
  }
}
</style>