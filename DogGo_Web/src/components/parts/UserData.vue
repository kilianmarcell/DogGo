<template>
    <div class="userdata-container">
        <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner userdata-card fade-in">
            <div class="text-decoration-underline fs-2 text-center pb-3 userdata-title">
                <fa :icon="['fas', 'user-edit']" class="me-3"/>
                Adataim módosítása
            </div>
            <div class="container">
                <div class="row mb-3 input-group-animated">
                    <label for="username" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'user']" class="me-2"/>
                        Felhasználónév
                    </label>
                    <input v-if="user"
                        type="text"
                        id="username"
                        class="fs-5 input-doggo"
                        placeholder="Felhasználónév"
                        v-model="this.state.modifyUser.username">

                    <span class="text-danger text-center validation-error" v-if="v$.modifyUser.username.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.modifyUser.username.$errors[0].$message }}
                    </span>
                </div>
                <div class="row mb-3 input-group-animated">
                    <label for="email" class="fs-5 p-0 input-label">
                        <fa :icon="['fas', 'envelope']" class="me-2"/>
                        Email
                    </label>
                    <input v-if="user"
                        type="email"
                        id="email"
                        class="fs-5 input-doggo"
                        placeholder="Email"
                        v-model="this.state.modifyUser.email">

                    <span class="text-danger text-center validation-error" v-if="v$.modifyUser.email.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.modifyUser.email.$errors[0].$message }}
                    </span>
                </div>
            </div>
            
            <div class="pt-3">
                <button class="btn btn-primary w-100 fs-5 animated-btn" @click="change">
                    <fa :icon="['fas', 'save']" class="me-2"/>
                    Módosítás
                </button>
            </div>
            <div v-if="this.error" class="alert alert-danger d-flex align-items-center error-alert">
                <fa :icon="['fas', 'exclamation-triangle']" class="me-2"/>
                {{ this.errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name: 'UserData',

    data() {
        return {
            error: false,
            errorMessage: ""
        }
    },
    
    setup() {
        const state = reactive({
            modifyUser: {
                username: "",
                email: ""
            }
        })

        const rules = computed(() => {
            return {
                modifyUser: {
                    username: {
                        required: helpers.withMessage('A felhasználónév mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A felhasználónévnek legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A felhasználónév legfeljebb 20 karakter hoszzú lehet!', maxLength(20))
                    },

                    email: {
                        email: helpers.withMessage('Csak érvényes email cím írható be!', email),
                        required: helpers.withMessage('Az email mező kitöltése kötelező!', required),
                        max: helpers.withMessage('Az email legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
                    }
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
        async change() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .put('api/users/' + this.user.id, this.state.modifyUser)
                    .then(() => {
                        this.error = false;
                    })
                    .catch(error => {
                        if (error.response.status == 500) {
                            this.errorMessage = "Ilyen felhasználó már létezik!"
                            this.error = true
                        }
                    })

                if (!this.error) {
                    await axios
                        .request({ url: 'api/user', method: 'get' })
                        .then(response => this.$store.dispatch('user', response.data))
                        
                    this.$router.go(-1)
                }
            }
        },

        loadUserDatas() {
            if (this.user == null) {
                this.$router.push({ name: "Home" })
            } else {
                this.state.modifyUser.username = this.user.username
                this.state.modifyUser.email = this.user.email
            }
        }
    },

    mounted() {
        this.loadUserDatas()
    },

    computed: {
        ...mapGetters(['user'])
    }
}
</script>

<style scoped>
.userdata-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
}

.userdata-card {
  position: relative;
  z-index: 1;
  animation-delay: 0.2s;
  width: 30% !important;
}

.userdata-title {
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

/* Responsive */
@media (max-width: 768px) {
  .userdata-card {
    width: 90% !important;
    padding: 20px;
  }
  
  .userdata-title {
    font-size: 1.5rem !important;
  }
}
</style>