<template>
     <div class="ratings-page">
          <!-- Hero Header Section -->
          <div class="hero-section text-inner">
               <div class="container py-5">
                    <div class="row justify-content-center">
                         <div class="col-12 col-lg-10">
                              <div v-if="locationData" class="location-hero fade-in">
                                   <div class="hero-icon">
                                        <fa :icon="['fas', 'map-marker-alt']"/>
                                   </div>
                                   <h1 class="hero-title">{{ locationData.name }}</h1>
                                   <div class="hero-details">
                                        <div class="detail-item">
                                             <fa :icon="['fas', 'compass']" class="me-2"/>
                                             <span>{{ locationData.lat }}, {{ locationData.lng }}</span>
                                        </div>
                                        <div v-if="locationRating.atlag" class="detail-rating">
                                             <fa :icon="['fas', 'star']" class="me-2"/>
                                             <span class="rating-value">{{ locationRating.atlag }}</span>
                                             <span class="rating-text">átlagos értékelés</span>
                                        </div>
                                   </div>
                                   <p class="hero-description">{{ locationData.description }}</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

          <!-- Main Content Section -->
          <div class="content-section">
               <div class="container py-5">
                    <!-- Rating Form Section -->
                    <div v-if="user && publishable && !sent && !editing" class="rating-form-section mb-5">
                         <div class="row justify-content-center">
                              <div class="col-12 col-md-8 col-lg-6">
                                   <div class="rating-form-card">
                                        <div class="form-header">
                                             <fa :icon="['fas', 'comment-alt']" class="form-icon"/>
                                             <h3 class="form-title">Ossza meg véleményét!</h3>
                                             <p class="form-subtitle">Segítsen másoknak a tapasztalataival</p>
                                        </div>
                                        <div class="form-body">
                                             <div class="form-group">
                                                  <label class="form-label">
                                                       <fa :icon="['fas', 'edit']" class="me-2"/>
                                                       Vélemény leírása
                                                  </label>
                                                  <textarea v-model="state.description" 
                                                            placeholder="Írja le tapasztalatait erről a helyről..." 
                                                            class="form-textarea" 
                                                            rows="4"/>
                                                  <span class="error-message" v-if="v$.description.$error">
                                                       <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                                                       {{ v$.description.$errors[0].$message }}
                                                  </span>
                                             </div>
                                             <div class="form-group">
                                                  <label class="form-label">
                                                       <fa :icon="['fas', 'star']" class="me-2"/>
                                                       Értékelés (1-5 csillag)
                                                  </label>
                                                  <select v-model="state.stars" class="form-select">
                                                       <option disabled selected hidden>Válasszon értékelést</option>
                                                       <option value="1">⭐ 1 csillag - Rossz</option>
                                                       <option value="2">⭐⭐ 2 csillag - Gyenge</option>
                                                       <option value="3">⭐⭐⭐ 3 csillag - Átlagos</option>
                                                       <option value="4">⭐⭐⭐⭐ 4 csillag - Jó</option>
                                                       <option value="5">⭐⭐⭐⭐⭐ 5 csillag - Kiváló</option>
                                                  </select>
                                                  <span class="error-message" v-if="v$.stars.$error">
                                                       <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                                                       {{ v$.stars.$errors[0].$message }}
                                                  </span>
                                             </div>
                                             <div class="form-actions">
                                                  <button class="btn-submit" @click="addRating">
                                                       <fa :icon="['fas', 'paper-plane']" class="me-2"/>
                                                       Vélemény közzététele
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <!-- Ratings Grid Section -->
                    <div class="ratings-grid-section">
                         <div class="section-header text-center mb-5">
                              <div class="section-icon">
                                   <fa :icon="['fas', 'comments']"/>
                              </div>
                              <h2 class="section-title">Felhasználói vélemények</h2>
                              <p class="section-subtitle">Nézze meg, mit mondanak mások erről a helyről</p>
                         </div>
                         
                         <div class="row location-grid justify-content-center">
                              <article v-for="(r, index) in ratings" :key="r.id" 
                                       class="rating-card-wrapper col-12 col-md-6 col-lg-4 mb-4"
                                       :style="{ 'animation-delay': (index * 0.1) + 's' }">
                                   <div class="rating-card">
                                        <div class="card-header">
                                             <div class="user-info">
                                                  <fa :icon="['fas', 'user-circle']" class="user-icon"/>
                                                  <h4 class="username">{{ r.username }}</h4>
                                             </div>
                                             <div class="rating-badge">
                                                  <fa :icon="['fas', 'star']"/>
                                                  <span>{{ r.stars }}</span>
                                             </div>
                                        </div>
                                        
                                        <div class="card-body">
                                             <p class="rating-text">{{ r.description }}</p>
                                        </div>
                                        
                                        <div v-if="user && r.user_id == user.id" class="card-actions">
                                             <button class="action-btn edit-btn" @click="editRating(r.id)">
                                                  <fa :icon="['fas', 'edit']" class="me-2"/>
                                                  Szerkesztés
                                             </button>
                                             <button class="action-btn delete-btn" @click="deleteRating(r.id)">
                                                  <fa :icon="['fas', 'trash']" class="me-2"/>
                                                  Törlés
                                             </button>
                                        </div>
                                   </div>
                              </article>
                         </div>
                    </div>
               </div>
          </div>

          <!-- Edit Form Section -->
          <div v-if="editing" class="content-section">
               <div class="container py-5">
                    <div class="row justify-content-center">
                         <div class="col-12 col-md-8 col-lg-6">
                              <div class="edit-form-card">
                                   <div class="form-header">
                                        <fa :icon="['fas', 'edit']" class="form-icon"/>
                                        <h3 class="form-title">Értékelés módosítása</h3>
                                   </div>
                                   <div class="form-body">
                                        <div class="form-group">
                                             <label class="form-label">Szöveges értékelés</label>
                                             <textarea v-model="state.description" 
                                                       placeholder="Írja le tapasztalatait..." 
                                                       class="form-textarea" 
                                                       rows="4"/>
                                             <span class="error-message" v-if="v$.description.$error">
                                                  <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                                                  {{ v$.description.$errors[0].$message }}
                                             </span>
                                        </div>
                                        <div class="form-group">
                                             <label class="form-label">Értékelés (1-5 csillag)</label>
                                             <select v-model="state.stars" class="form-select">
                                                  <option value="1">⭐ 1 csillag</option>
                                                  <option value="2">⭐⭐ 2 csillag</option>
                                                  <option value="3">⭐⭐⭐ 3 csillag</option>
                                                  <option value="4">⭐⭐⭐⭐ 4 csillag</option>
                                                  <option value="5">⭐⭐⭐⭐⭐ 5 csillag</option>
                                             </select>
                                             <span class="error-message" v-if="v$.stars.$error">
                                                  <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                                                  {{ v$.stars.$errors[0].$message }}
                                             </span>
                                        </div>
                                        <div class="form-actions">
                                             <button class="btn-cancel" @click="cancelEdit">
                                                  <fa :icon="['fas', 'times']" class="me-2"/>
                                                  Mégsem
                                             </button>
                                             <button class="btn-submit" @click="changeRating">
                                                  <fa :icon="['fas', 'save']" class="me-2"/>
                                                  Módosítás mentése
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

          <!-- Success/Error Messages -->
          <div v-if="sent && show" class="content-section">
               <div class="container py-5">
                    <div class="row justify-content-center">
                         <div class="col-12 col-md-8 col-lg-6">
                              <div v-if="error == 1" class="message-card success-card">
                                   <div class="message-icon">
                                        <fa :icon="['fas', 'check-circle']"/>
                                   </div>
                                   <h3 class="message-title">Sikeres művelet!</h3>
                                   <p class="message-text">{{ message }}</p>
                              </div>
                              <div v-else class="message-card error-card">
                                   <div class="message-icon">
                                        <fa :icon="['fas', 'exclamation-triangle']"/>
                                   </div>
                                   <h3 class="message-title">Hiba történt!</h3>
                                   <p class="message-text">{{ message }}</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
     name: 'Ratings',

     data() {
          return {
               ratings: [],
               locationRating: [],
               locationData: [],
               message: "",
               error: 2,
               sent: false,
               editing: false,
               show: true,
               id: null,
               admin: false,
               publishable: false
          }
     },
     
     setup() {
        const state = reactive({
             description: "",
             stars: null
        })

        const rules = computed(() => {
            return {
               description: {
                    max: helpers.withMessage('A leírás legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
               },

               stars: {
                    required: helpers.withMessage('A skálás értékelés kitöltése kötelező!', required)
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
          async checkEnabledLocation() {
               await axios
                    .get('api/locations/' + this.$route.params.id)
                    .then(response => {
                         if (response.data.allowed == 0) {
                              this.$router.push({ name: 'Home'})
                         } else {
                              this.loadDatas()
                         }
                    })
                    .catch(error => {
                         if (error.response.status == 404) {
                              this.$router.push({ name: 'Home'})
                         } else {
                              console.log(error)
                         }
                    })
          },

          async loadDatas() {
               await axios
                    .get('api/rating_by_location_with_username/' + this.$route.params.id)
                    .then(response => this.ratings = response.data)
                    .catch(error => console.log(error))

               await axios
                    .get('api/location_avgrating/' + this.$route.params.id)
                    .then(response => this.locationRating = response.data)
                    .catch(error => console.log(error))
               
               await axios
                    .get('api/locations/' + this.$route.params.id)
                    .then(response => (this.locationData = response.data))
                    .catch(error => console.log(error))

               if (this.user != null) {
                    if (this.user.permission == 2 || this.user.permission == 3) {
                         this.admin = true
                    }

                    let count = 0
                    for (let i = 0; i < this.ratings.length; i++) {
                         if (this.ratings[i].user_id == this.user.id) {
                              count++
                         }
                    }

                    if (count == 0) {
                         this.publishable = true
                    }
               }
          },

          async addRating() {
               this.v$.$validate()
               if (!this.v$.$error) {
               await axios
                    .post('api/ratings', {
                         description: this.state.description,
                         location_id: this.$route.params.id,
                         user_id: this.user.id,
                         stars: parseInt(this.state.stars)
                    })
                    .then(response => {
                              if (response.status == 201) {
                                   this.message = "Értékelés sikeresen közzétéve!"
                                   this.error = 1
                                   this.sent = 1
                              } else {
                                   this.message = "Valami hiba történt"
                                   this.error = 0
                              }
                              this.show = true
                         })
                    .catch(error => console.log(this.error))
               }

               this.loadDatas()
          },

          async editRating(id) {
               this.editing = true
               this.id = id
               this.show = false

               await axios
                    .get('api/ratings/' + id)
                    .then(response => {
                         this.state.description = response.data.description,
                         this.state.stars = response.data.stars
                    })
                    .catch(error => console.log(error))
          },

          async changeRating() {
               this.v$.$validate()
               if (!this.v$.$error) {
                    await axios
                    .put('api/ratings/' + this.id, {
                         description: this.state.description,
                         location_id: this.$route.params.id,
                         user_id: this.user.id,
                         stars: parseInt(this.state.stars)
                    })
               }

               await this.loadDatas()
               this.resetForm()
               this.saving = false
          },

          cancelEdit() {
               this.editing = false
               this.resetForm()
          },

          async deleteRating(id) {
               await axios
                    .delete('api/ratings/' + id)
                    .catch(error => console.log(error))

               await this.loadDatas()
               this.resetForm()
          },

          resetForm() {
               this.state.description = ""
               this.state.stars = null
               this.editing = false
          }
     },

     mounted() {
          this.checkEnabledLocation()
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>

<style scoped>
/* Modern Ratings Page Styling */

.ratings-page {
     min-height: 100vh;
     background: linear-gradient(-45deg, #86C232, #61892F, #4CAF50, #2E7D32);
     background-size: 400% 400%;
     animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
     0% { background-position: 0% 50%; }
     50% { background-position: 100% 50%; }
     100% { background-position: 0% 50%; }
}

/* Hero Section */
.hero-section {
     background: linear-gradient(135deg, rgba(34, 38, 41, 0.95), rgba(52, 58, 64, 0.9));
     backdrop-filter: blur(15px);
     border: 2px solid rgba(134, 194, 50, 0.2);
     border-radius: 20px;
     margin: 2rem auto;
     max-width: 95%;
}

.location-hero {
     text-align: center;
     color: white;
}

.hero-icon {
     font-size: 4rem;
     color: #86C232;
     margin-bottom: 1rem;
     filter: drop-shadow(0 0 20px rgba(134, 194, 50, 0.5));
}

.hero-title {
     font-size: 3rem;
     font-weight: 700;
     background: linear-gradient(45deg, #86C232, #61892F, #86C232);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     background-clip: text;
     margin-bottom: 2rem;
     text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-details {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 2rem;
     margin-bottom: 2rem;
     flex-wrap: wrap;
}

.detail-item {
     display: flex;
     align-items: center;
     background: rgba(255, 255, 255, 0.1);
     padding: 0.75rem 1.5rem;
     border-radius: 25px;
     border: 1px solid rgba(134, 194, 50, 0.3);
}

.detail-rating {
     display: flex;
     align-items: center;
     background: linear-gradient(135deg, #86C232, #61892F);
     padding: 0.75rem 1.5rem;
     border-radius: 25px;
     gap: 0.5rem;
     box-shadow: 0 8px 25px rgba(134, 194, 50, 0.3);
}

.rating-value {
     font-size: 1.5rem;
     font-weight: 700;
}

.hero-description {
     font-size: 1.2rem;
     line-height: 1.8;
     color: rgba(255, 255, 255, 0.9);
     max-width: 800px;
     margin: 0 auto;
     background: rgba(255, 255, 255, 0.05);
     padding: 2rem;
     border-radius: 15px;
     border-left: 4px solid #86C232;
}

/* Content Section */
.content-section {
     background: rgba(255, 255, 255, 0.05);
     backdrop-filter: blur(10px);
     border-radius: 20px;
     margin: 2rem auto;
     max-width: 95%;
}

/* Rating Form Section */
.rating-form-section {
     margin-bottom: 4rem;
}

.rating-form-card,
.edit-form-card {
     background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
     border-radius: 20px;
     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
     border: 2px solid rgba(134, 194, 50, 0.2);
     overflow: hidden;
     transition: transform 0.3s ease;
}

.rating-form-card:hover,
.edit-form-card:hover {
     transform: translateY(-5px);
}

.form-header {
     background: linear-gradient(135deg, #86C232, #61892F);
     color: white;
     padding: 2rem;
     text-align: center;
}

.form-icon {
     font-size: 3rem;
     margin-bottom: 1rem;
     filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.form-title {
     font-size: 2rem;
     font-weight: 700;
     margin-bottom: 0.5rem;
}

.form-subtitle {
     font-size: 1.1rem;
     opacity: 0.9;
     margin: 0;
}

.form-body {
     padding: 2rem;
}

.form-group {
     margin-bottom: 2rem;
}

.form-label {
     display: block;
     font-weight: 600;
     margin-bottom: 0.75rem;
     color: #333;
     font-size: 1.1rem;
}

.form-textarea,
.form-select {
     width: 100%;
     padding: 1rem;
     border: 2px solid #e0e0e0;
     border-radius: 12px;
     font-size: 1rem;
     transition: all 0.3s ease;
     background: white;
}

.form-textarea:focus,
.form-select:focus {
     outline: none;
     border-color: #86C232;
     box-shadow: 0 0 0 3px rgba(134, 194, 50, 0.1);
}

.form-actions {
     display: flex;
     gap: 1rem;
     justify-content: center;
     margin-top: 2rem;
}

.btn-submit,
.btn-cancel {
     padding: 1rem 2rem;
     border-radius: 25px;
     font-weight: 600;
     font-size: 1.1rem;
     border: none;
     cursor: pointer;
     transition: all 0.3s ease;
     display: flex;
     align-items: center;
}

.btn-submit {
     background: linear-gradient(135deg, #86C232, #61892F);
     color: white;
     box-shadow: 0 8px 25px rgba(134, 194, 50, 0.3);
}

.btn-submit:hover {
     transform: translateY(-2px);
     box-shadow: 0 12px 35px rgba(134, 194, 50, 0.4);
}

.btn-cancel {
     background: linear-gradient(135deg, #dc3545, #c82333);
     color: white;
     box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);
}

.btn-cancel:hover {
     transform: translateY(-2px);
     box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);
}

/* Section Headers */
.section-header {
     margin-bottom: 3rem;
}

.section-icon {
     font-size: 3rem;
     color: #86C232;
     margin-bottom: 1rem;
     filter: drop-shadow(0 0 10px rgba(134, 194, 50, 0.5));
}

.section-title {
     font-size: 2.5rem;
     font-weight: 700;
     background: linear-gradient(45deg, #86C232, #61892F);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     background-clip: text;
     margin-bottom: 1rem;
}

.section-subtitle {
     font-size: 1.2rem;
     color: rgba(255, 255, 255, 0.8);
     margin: 0;
}

/* Rating Cards */
.rating-card-wrapper {
     animation: fadeInUp 0.6s ease-out backwards;
}

.rating-card {
     background: linear-gradient(135deg, rgba(34, 38, 41, 0.95), rgba(52, 58, 64, 0.9));
     border-radius: 20px;
     padding: 2rem;
     height: 100%;
     border: 2px solid rgba(134, 194, 50, 0.2);
     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
     position: relative;
     overflow: hidden;
     color: white;
}

.rating-card::before {
     content: '';
     position: absolute;
     top: 0;
     left: -100%;
     width: 100%;
     height: 100%;
     background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.1), transparent);
     transition: left 0.6s;
}

.rating-card:hover {
     transform: translateY(-10px) scale(1.02);
     box-shadow: 0 20px 40px rgba(134, 194, 50, 0.2);
     border-color: rgba(134, 194, 50, 0.5);
}

.rating-card:hover::before {
     left: 100%;
}

.card-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 1.5rem;
}

.user-info {
     display: flex;
     align-items: center;
     gap: 1rem;
}

.user-icon {
     font-size: 2rem;
     color: #86C232;
     filter: drop-shadow(0 0 5px rgba(134, 194, 50, 0.5));
}

.username {
     font-size: 1.5rem;
     font-weight: 600;
     color: #86C232;
     margin: 0;
}

.rating-badge {
     background: linear-gradient(135deg, #86C232, #61892F);
     color: white;
     padding: 8px 16px;
     border-radius: 20px;
     display: flex;
     align-items: center;
     gap: 8px;
     font-weight: 600;
     box-shadow: 0 4px 12px rgba(134, 194, 50, 0.3);
}

.card-body {
     margin-bottom: 1.5rem;
}

.rating-text {
     color: rgba(255, 255, 255, 0.9);
     line-height: 1.6;
     font-size: 1rem;
     background: rgba(255, 255, 255, 0.05);
     padding: 1rem;
     border-radius: 10px;
     border-left: 3px solid #86C232;
}

.card-actions {
     display: flex;
     gap: 0.5rem;
     margin-top: auto;
}

.action-btn {
     flex: 1;
     padding: 10px 16px;
     border-radius: 20px;
     font-weight: 600;
     font-size: 0.9rem;
     border: none;
     cursor: pointer;
     transition: all 0.3s ease;
     display: flex;
     align-items: center;
     justify-content: center;
}

.edit-btn {
     background: linear-gradient(45deg, #86C232, #61892F);
     color: white;
}

.edit-btn:hover {
     transform: translateY(-2px);
     box-shadow: 0 8px 25px rgba(134, 194, 50, 0.4);
}

.delete-btn {
     background: linear-gradient(45deg, #dc3545, #c82333);
     color: white;
}

.delete-btn:hover {
     transform: translateY(-2px);
     box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
}

/* Message Cards */
.message-card {
     background: white;
     border-radius: 20px;
     padding: 3rem;
     text-align: center;
     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.success-card {
     border: 2px solid #28a745;
}

.error-card {
     border: 2px solid #dc3545;
}

.message-icon {
     font-size: 4rem;
     margin-bottom: 1rem;
}

.success-card .message-icon {
     color: #28a745;
}

.error-card .message-icon {
     color: #dc3545;
}

.message-title {
     font-size: 2rem;
     font-weight: 700;
     margin-bottom: 1rem;
     color: #333;
}

.message-text {
     font-size: 1.2rem;
     color: #666;
     margin: 0;
}

/* Error Messages */
.error-message {
     color: #dc3545;
     font-size: 0.9rem;
     margin-top: 0.5rem;
     display: flex;
     align-items: center;
}

/* Animations */
@keyframes fadeInUp {
     from {
          opacity: 0;
          transform: translateY(30px);
     }
     to {
          opacity: 1;
          transform: translateY(0);
     }
}

.fade-in {
     animation: fadeInUp 0.8s ease-out;
}

/* Responsive Design */
@media (max-width: 768px) {
     .hero-title {
          font-size: 2rem;
     }
     
     .hero-details {
          flex-direction: column;
          gap: 1rem;
     }
     
     .section-title {
          font-size: 2rem;
     }
     
     .rating-card {
          padding: 1.5rem;
     }
     
     .form-header {
          padding: 1.5rem;
     }
     
     .form-body {
          padding: 1.5rem;
     }
     
     .form-actions {
          flex-direction: column;
     }
     
     .card-actions {
          flex-direction: column;
     }
}

@media (max-width: 576px) {
     .hero-section,
     .content-section {
          margin: 1rem;
          border-radius: 15px;
     }
     
     .hero-icon,
     .section-icon {
          font-size: 2.5rem;
     }
     
     .form-icon {
          font-size: 2rem;
     }
}
</style>