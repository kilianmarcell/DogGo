import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import { apiHelpers } from '../utils/helpers'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const executeRequest = async (requestFn, errorMessage = 'Hiba történt') => {
    loading.value = true
    error.value = null
    
    try {
      const response = await requestFn()
      data.value = response.data
      return response.data
    } catch (err) {
      error.value = apiHelpers.handleApiError(err, errorMessage)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    data: computed(() => data.value),
    executeRequest
  }
}

export function useAuth() {
  const store = useStore()
  const router = useRouter()
  
  const user = computed(() => store.getters.user)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.permission >= 2)

  const login = async (credentials) => {
    try {
      const response = await axios.post('api/login', credentials)
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        await getUserData()
        router.push({ name: 'Home' })
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    store.dispatch('user', null)
    router.push({ name: 'Home' })
  }

  const getUserData = async () => {
    try {
      const response = await axios.get('api/user')
      store.dispatch('user', response.data)
      return response.data
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        store.dispatch('user', null)
      }
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post('api/register', userData)
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        await getUserData()
        router.push({ name: 'Home' })
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    getUserData,
    register
  }
}

export function useFormValidation(rules, state) {
  const errors = reactive({})
  const isValid = ref(true)

  const validate = (field = null) => {
    if (field) {
      // Egy mező validálása
      validateField(field)
    } else {
      // Összes mező validálása
      Object.keys(rules).forEach(validateField)
    }
    
    updateValidState()
    return isValid.value
  }

  const validateField = (field) => {
    const fieldRules = rules[field]
    const value = state[field]
    
    errors[field] = []
    
    if (fieldRules) {
      Object.keys(fieldRules).forEach(ruleName => {
        const rule = fieldRules[ruleName]
        
        if (typeof rule === 'function') {
          const result = rule(value)
          if (result !== true) {
            errors[field].push(result)
          }
        }
      })
    }
  }

  const updateValidState = () => {
    isValid.value = Object.values(errors).every(fieldErrors => fieldErrors.length === 0)
  }

  const clearErrors = (field = null) => {
    if (field) {
      errors[field] = []
    } else {
      Object.keys(errors).forEach(key => {
        errors[key] = []
      })
    }
    updateValidState()
  }

  const getFieldError = (field) => {
    return errors[field]?.[0] || null
  }

  const hasFieldError = (field) => {
    return errors[field]?.length > 0
  }

  return {
    errors: computed(() => errors),
    isValid: computed(() => isValid.value),
    validate,
    clearErrors,
    getFieldError,
    hasFieldError
  }
}

export function useToast() {
  const toasts = ref([])

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const toast = {
      id,
      message,
      type,
      visible: true
    }
    
    toasts.value.push(toast)
    
    setTimeout(() => {
      removeToast(id)
    }, duration)
    
    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message, duration) => showToast(message, 'success', duration)
  const error = (message, duration) => showToast(message, 'error', duration)
  const warning = (message, duration) => showToast(message, 'warning', duration)
  const info = (message, duration) => showToast(message, 'info', duration)

  return {
    toasts: computed(() => toasts.value),
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}

export function useLoading() {
  const loading = ref(false)
  const loadingMessage = ref('')

  const startLoading = (message = 'Betöltés...') => {
    loading.value = true
    loadingMessage.value = message
  }

  const stopLoading = () => {
    loading.value = false
    loadingMessage.value = ''
  }

  const withLoading = async (asyncFn, message) => {
    startLoading(message)
    try {
      return await asyncFn()
    } finally {
      stopLoading()
    }
  }

  return {
    loading: computed(() => loading.value),
    loadingMessage: computed(() => loadingMessage.value),
    startLoading,
    stopLoading,
    withLoading
  }
}
