<template>
     <div class="error-container">
          <div class="text-wrapper p-5 d-flex justify-content-center align-items-center w-100">
               <div class="text-inner error-form fade-in" style="width: 80%; max-width: 800px;">
                    <div class="error-header">
                         <fa :icon="['fas', 'bug']" class="error-icon"/>
                         <h2 class="error-title">Hiba jelentése</h2>
                         <p class="error-subtitle">Segítsen nekünk a fejlesztésben!</p>
                    </div>
                    
                    <div class="form-group">
                         <label for="error-description" class="form-label">
                              <fa :icon="['fas', 'comment-alt']" class="me-2"/>
                              Hiba leírása
                         </label>
                         <textarea
                              id="error-description"
                              class="form-textarea animated-textarea"
                              rows="6"
                              placeholder="Írja le részletesen a tapasztalt hibát..."
                              v-model="this.state.errorMsg.comment"/>
                         <span class="validation-error" v-if="v$.errorMsg.comment.$error">
                              <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                              {{ v$.errorMsg.comment.$errors[0].$message }}
                         </span>
                    </div>
                    
                    <div class="form-actions" v-if="!sent">
                         <button class="btn btn-success send-btn" @click="sendError">
                              <fa :icon="['fas', 'paper-plane']" class="me-2"/>
                              Hiba küldése
                         </button>
                    </div>
                    
                    <div v-if="this.error == 0" class="alert alert-danger d-flex align-items-center error-alert">
                         <fa :icon="['fas', 'exclamation-triangle']" class="me-2"/>
                         {{ this.message }}
                    </div>
                    <div v-if="this.error == 1" class="alert alert-success d-flex align-items-center success-alert">
                         <fa :icon="['fas', 'check-circle']" class="me-2"/>
                         {{ this.message }}
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
     name: 'Error',

     data() {
          return {
               message: "",
               error: 2,
               sent: false
          }
     },
     
     setup() {
        const state = reactive({
             errorMsg: {
               comment: ""
             }
        })

        const rules = computed(() => {
            return {
               errorMsg: {
                    comment: {
                         required: helpers.withMessage('A hiba leírása nem lehet üres!', required),
                         max: helpers.withMessage('A hiba leírása legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
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
          async sendError() {
               this.v$.$validate()
               if (!this.v$.$error) {
                    await axios
                         .post('api/feedbacks', this.state.errorMsg)
                         .then(response => {
                              if (response.status == 201) {
                                   this.message = "Üzenet sikeresen elküldve"
                                   this.error = 1
                                   this.sent = true
                              } else {
                                   this.message = "Az üzenet nincs elküldve"
                                   this.error = 0
                              }
                         })
                         .catch(error => console.log(this.error))
               }
          }
     }
}
</script>

<style scoped>
.error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70vh;
    position: relative;
}

.text-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-form {
    position: relative;
    z-index: 1;
    animation-delay: 0.2s;
    text-align: center;
    width: 100%;
}

.error-header {
    margin-bottom: 2.5rem;
    animation: fadeInDown 0.8s ease-out;
}

.error-icon {
    font-size: 4rem;
    color: #dc3545;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 12px rgba(220, 53, 69, 0.4));
    animation: shake 2s ease-in-out infinite;
}

@keyframes shake {
    0%, 50%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(-3deg); }
    20%, 40% { transform: rotate(3deg); }
}

.error-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #dc3545, #e74c3c, #f8565a);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientTitle 3s ease infinite;
}

@keyframes gradientTitle {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

.error-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    margin: 0;
    font-style: italic;
}

.form-group {
    margin-bottom: 2rem;
    text-align: left;
}

.form-label {
    color: #86C232;
    font-weight: 500;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
}

.form-label svg {
    color: #86C232;
    filter: drop-shadow(0 0 5px rgba(134, 194, 50, 0.5));
}

.animated-textarea {
    width: 100%;
    padding: 1rem 1.2rem;
    border: 2px solid rgba(134, 194, 50, 0.3);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1rem;
    resize: vertical;
    min-height: 150px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
}

.animated-textarea:focus {
    outline: none;
    border-color: #86C232;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 
        0 8px 25px rgba(134, 194, 50, 0.2),
        0 0 0 3px rgba(134, 194, 50, 0.1);
    transform: scale(1.02);
}

.animated-textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

.validation-error {
    background: rgba(220, 53, 69, 0.1);
    border: 1px solid rgba(220, 53, 69, 0.3);
    border-radius: 8px;
    padding: 8px 12px;
    margin-top: 0.8rem;
    font-size: 0.9rem;
    color: #dc3545;
    animation: slideInError 0.3s ease-out;
    display: flex;
    align-items: center;
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

.form-actions {
    text-align: center;
    margin-bottom: 2rem;
}

.send-btn {
    padding: 12px 30px;
    font-size: 1.1rem;
    font-weight: 500;
    border-radius: 12px;
    background: linear-gradient(135deg, #28a745, #20c997);
    border: none;
    color: white;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    min-width: 200px;
}

.send-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.send-btn:hover::before {
    left: 100%;
}

.send-btn:hover {
    background: linear-gradient(135deg, #34ce57, #24e5aa);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.4);
}

.send-btn:active {
    transform: translateY(-1px) scale(1.02);
}

.error-alert {
    background: linear-gradient(135deg, rgba(220, 53, 69, 0.9), rgba(231, 76, 60, 0.8));
    border: 1px solid rgba(220, 53, 69, 0.3);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    animation: shakeError 0.5s ease-in-out;
    font-size: 1rem;
}

.success-alert {
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.9), rgba(32, 201, 151, 0.8));
    border: 1px solid rgba(40, 167, 69, 0.3);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    animation: bounceIn 0.6s ease-out;
    font-size: 1rem;
}

@keyframes shakeError {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale(0.3);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
    70% {
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    .error-form {
        width: 95% !important;
        max-width: 95% !important;
        padding: 1.5rem;
    }
    
    .error-title {
        font-size: 2rem;
    }
    
    .error-icon {
        font-size: 3rem;
    }
    
    .send-btn {
        width: 100%;
        min-width: auto;
    }
}

@media (max-width: 576px) {
    .error-form {
        width: 98% !important;
        max-width: 98% !important;
    }
    
    .error-title {
        font-size: 1.8rem;
    }
    
    .form-label {
        font-size: 1rem;
    }
    
    .animated-textarea {
        min-height: 120px;
        font-size: 0.9rem;
    }
}
</style>