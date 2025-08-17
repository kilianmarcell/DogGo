<template>
    <div class="login-container full-height flex-center">
        <div class="login-card glass-card w-100" style="max-width: 400px;">
            <div class="text-center mb-4">
                <fa :icon="['fas', 'sign-in-alt']" class="login-icon icon-doggo animate-bounce"/>
                <h2 class="login-title text-gradient animate-gradient-text">Bejelentkezés</h2>
            </div>
            
            <form @submit.prevent="handleLogin">
                <div class="form-group-doggo">
                    <label class="form-label-doggo">Felhasználónév</label>
                    <input 
                        v-model="loginData.username"
                        type="text"
                        class="form-control input-doggo"
                        :class="{ 'is-invalid': hasFieldError('username') }"
                        placeholder="Adja meg felhasználónevét"
                        @keyup.enter="handleLogin"
                    />
                    <div v-if="hasFieldError('username')" class="validation-error">
                        {{ getFieldError('username') }}
                    </div>
                </div>

                <div class="form-group-doggo">
                    <label class="form-label-doggo">Jelszó</label>
                    <input 
                        v-model="loginData.password"
                        type="password"
                        class="form-control input-doggo"
                        :class="{ 'is-invalid': hasFieldError('password') }"
                        placeholder="Adja meg jelszavát"
                        @keyup.enter="handleLogin"
                    />
                    <div v-if="hasFieldError('password')" class="validation-error">
                        {{ getFieldError('password') }}
                    </div>
                </div>

                <button 
                    type="submit" 
                    class="btn btn-doggo w-100 mb-3"
                    :disabled="loading"
                >
                    <fa v-if="loading" :icon="['fas', 'spinner']" class="animate-spin me-2"/>
                    <fa v-else :icon="['fas', 'sign-in-alt']" class="me-2"/>
                    {{ loading ? 'Bejelentkezés...' : 'Bejelentkezés' }}
                </button>
            </form>

            <div v-if="error" class="alert alert-error animate-slide-in-up">
                <fa :icon="['fas', 'exclamation-triangle']" class="me-2"/>
                {{ error }}
            </div>

            <div class="text-center">
                <p class="text-muted">Nincs még fiókja?</p>
                <router-link :to="{ name: 'Register' }" class="btn btn-outline-doggo">
                    <fa :icon="['fas', 'user-plus']" class="me-2"/>
                    Regisztráció
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { useAuth, useFormValidation, useLoading } from '../../composables'

export default {
    name: 'Login',

    setup() {
        const { login } = useAuth()
        const { loading, withLoading } = useLoading()

        const loginData = reactive({
            username: '',
            password: ''
        })

        const rules = {
            username: {
                required: (value) => !!value || 'A felhasználónév megadása kötelező!',
                minLength: (value) => value.length >= 3 || 'A felhasználónév legalább 3 karakter legyen!'
            },
            password: {
                required: (value) => !!value || 'A jelszó megadása kötelező!',
                minLength: (value) => value.length >= 6 || 'A jelszó legalább 6 karakter legyen!'
            }
        }

        const { validate, hasFieldError, getFieldError, clearErrors } = useFormValidation(rules, loginData)

        const error = reactive({ message: null })

        const handleLogin = async () => {
            clearErrors()
            error.message = null

            if (!validate()) {
                return
            }

            try {
                await withLoading(async () => {
                    await login(loginData)
                }, 'Bejelentkezés...')
            } catch (err) {
                if (err.response?.status === 401) {
                    error.message = 'Hibás felhasználónév vagy jelszó!'
                } else {
                    error.message = 'Hiba történt a bejelentkezés során!'
                }
            }
        }

        return {
            loginData,
            loading,
            error: () => error.message,
            handleLogin,
            hasFieldError,
            getFieldError
        }
    },

    mounted() {
        // Ha már be van jelentkezve, irányítsa át a főoldalra
        if (localStorage.getItem('token')) {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style scoped>
.login-container {
    padding: var(--space-xl);
}

.login-icon {
    font-size: var(--font-5xl);
    margin-bottom: var(--space-lg);
}

.login-title {
    font-size: var(--font-3xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-xl);
}

.is-invalid {
    border-color: var(--border-error) !important;
    box-shadow: 0 0 0 3px var(--bg-error) !important;
}
</style>
