export const validators = {
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isStrongPassword: (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },

  isValidHungarianPhone: (phone) => {
    const phoneRegex = /^(\+36|06)[1-9][0-9]{7,8}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }
}

export const formatters = {
  formatCoordinate: (coord) => {
    return parseFloat(coord).toFixed(6)
  },

  formatDate: (date) => {
    return new Date(date).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  truncateText: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  },

  formatRating: (rating) => {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
    return `${stars} (${rating.toFixed(1)})`
  }
}

export const apiHelpers = {
  handleApiError: (error, defaultMessage = 'Váratlan hiba történt') => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return 'Hibás kérés. Kérjük ellenőrizze a megadott adatokat.'
        case 401:
          return 'Nincs jogosultsága a művelet végrehajtásához.'
        case 403:
          return 'Hozzáférés megtagadva.'
        case 404:
          return 'A keresett erőforrás nem található.'
        case 422:
          return 'Az adatok validációja sikertelen.'
        case 500:
          return 'Szerver hiba. Kérjük próbálja meg később.'
        default:
          return defaultMessage
      }
    } else if (error.request) {
      return 'Hálózati hiba. Kérjük ellenőrizze az internetkapcsolatot.'
    } else {
      return defaultMessage
    }
  },

  isTokenValid: () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch (error) {
      return false
    }
  }
}

export const domHelpers = {
  scrollToElement: (elementId, offset = 80) => {
    const element = document.getElementById(elementId)
    if (element) {
      const top = element.offsetTop - offset
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      })
    }
  },

  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textArea)
      return success
    }
  }
}

export const storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Storage error:', error)
      return false
    }
  },

  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Storage error:', error)
      return defaultValue
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Storage error:', error)
      return false
    }
  }
}

export const debug = {
  log: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DogGo Debug]:', ...args)
    }
  },

  warn: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[DogGo Warning]:', ...args)
    }
  },

  error: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[DogGo Error]:', ...args)
    }
  }
}
