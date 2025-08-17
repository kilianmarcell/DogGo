<template>
    <div id="locs" class="text-inner mb-5 locations-container">
        <article class="best-location-card fade-in">
            <div class="card-body">
                <div class="trophy-icon">
                    <fa :icon="['fas', 'trophy']"/>
                </div>
                <h2 class="best-location-title">{{ this.bestRating.name }}</h2>
                <div class="best-location-rating">
                    <fa :icon="['fas', 'star']"/>
                    <span>{{ this.bestRating.atlag }}</span>
                </div>
            </div>
        </article>
        
        <div class="row location-grid justify-content-center">
            <article class="location-card col-12 col-md-4 col-lg-3 mb-4" 
                     v-for="(l, index) in locations" 
                     :key="l.id"
                     :style="{ 'animation-delay': (index * 0.1) + 's' }">
                <div class="card-content">
                    <div class="location-header">
                        <h3 class="location-name">
                            <fa :icon="['fas', 'map-marker-alt']" class="me-2"/>
                            {{ l.name }}
                        </h3>
                        <div v-if="l.atlag != null" class="location-rating">
                            <fa :icon="['fas', 'star']"/>
                            <span>{{ l.atlag }}</span>
                        </div>
                    </div>
                    
                    <div class="location-coordinates">
                        <div class="coordinate-item">
                            <fa :icon="['fas', 'compass']" class="me-2"/>
                            <span>Szélesség: {{ l.lat }}</span>
                        </div>
                        <div class="coordinate-item">
                            <fa :icon="['fas', 'compass']" class="me-2"/>
                            <span>Hosszúság: {{ l.lng }}</span>
                        </div>
                    </div>
                    
                    <p class="location-description">{{ l.description }}</p>
                    
                    <div class="location-actions">
                        <button v-if="l.allowed == 1" 
                                class="btn btn-primary action-btn" 
                                @click="checkLocationRating(l.id)">
                            <fa :icon="['fas', 'eye']" class="me-2"/>
                            Hely megtekintése
                        </button>
                        
                        <div v-if="this.admin" class="admin-actions">
                            <button class="btn btn-primary action-btn" @click="editLocation(l.id)">
                                <fa :icon="['fas', 'edit']" class="me-2"/>
                                Szerkesztés
                            </button>
                            <button v-if="l.allowed == 1" 
                                    class="btn btn-danger action-btn" 
                                    @click="bannLocation(l.id, l.name)">
                                <fa :icon="['fas', 'ban']" class="me-2"/>
                                Tiltás
                            </button>
                            <button v-if="l.allowed == 0" 
                                    class="btn btn-success action-btn" 
                                    @click="enableLocation(l.id, l.name)">
                                <fa :icon="['fas', 'check']" class="me-2"/>
                                Engedélyezés
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        
        <div v-if="editing" class="edit-form-container">
            <div class="edit-form">
                <h3 class="edit-form-title">
                    <fa :icon="['fas', 'edit']" class="me-2"/>
                    Hely szerkesztése
                </h3>
                
                <div class="form-group">
                    <label for="edit-name" class="form-label">
                        <fa :icon="['fas', 'map-marker-alt']" class="me-2"/>
                        Hely neve:
                    </label>
                    <input v-model="this.state.location.name" 
                           id="edit-name"
                           class="form-input" 
                           type="text">
                    <span class="validation-error" v-if="v$.location.name.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.location.name.$errors[0].$message }}
                    </span>
                </div>
                
                <div class="form-group">
                    <label for="edit-lat" class="form-label">
                        <fa :icon="['fas', 'compass']" class="me-2"/>
                        Szélesség:
                    </label>
                    <input v-model="this.state.location.lat" 
                           id="edit-lat"
                           class="form-input" 
                           type="number">
                    <span class="validation-error" v-if="v$.location.lat.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.location.lat.$errors[0].$message }}
                    </span>
                </div>
                
                <div class="form-group">
                    <label for="edit-lng" class="form-label">
                        <fa :icon="['fas', 'compass']" class="me-2"/>
                        Hosszúság:
                    </label>
                    <input v-model="this.state.location.lng" 
                           id="edit-lng"
                           class="form-input" 
                           type="number">
                    <span class="validation-error" v-if="v$.location.lng.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.location.lng.$errors[0].$message }}
                    </span>
                </div>
                
                <div class="form-group">
                    <label for="edit-description" class="form-label">
                        <fa :icon="['fas', 'info-circle']" class="me-2"/>
                        Leírás:
                    </label>
                    <textarea v-model="this.state.location.description" 
                              id="edit-description"
                              class="form-textarea" 
                              rows="4"
                              placeholder="Hely leírása..."/>
                    <span class="validation-error" v-if="v$.location.description.$error">
                        <fa :icon="['fas', 'exclamation-circle']" class="me-1"/>
                        {{ v$.location.description.$errors[0].$message }}
                    </span>
                </div>
                
                <div class="form-actions">
                    <button class="btn btn-danger form-btn" @click="cancelLocation">
                        <fa :icon="['fas', 'times']" class="me-2"/>
                        Mégse
                    </button>
                    <button class="btn btn-primary form-btn" @click="saveLocation">
                        <fa :icon="['fas', 'save']" class="me-2"/>
                        Mentés
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name: 'Locations',

    data() {
        return {
            locations: [],
            bestRating: [],
            editing: false,
            saving: false,
            admin: 0
        }
    },
    
    setup() {
        const state = reactive({
            location: {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false,
                user_id: null
            },
        })

        const rules = computed(() => {
            return {
                location: {
                    name: {
                        name: helpers.withMessage('A hely neve mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A hely nevének legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A hely neve legfeljebb 40 karakter hoszzú lehet!', maxLength(40))
                    },

                    lat: {
                        required: helpers.withMessage('A szélesség mező kitöltése kötelező!', required),
                    },

                    lng: {
                        required: helpers.withMessage('A hosszúság mező kitöltése kötelező!', required),
                    },

                    description: {
                        max: helpers.withMessage('A leírás legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
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
        async loadData() {
            await axios
                .get('api/best_rating')
                .then(response => (this.bestRating = response.data))
                .catch(error => console.log(error))

            let response = await axios
                .get('api/locations_avgrating')

            if (this.user != null) {
                if (this.user.permission == 2 || this.user.permission == 3) {
                    this.admin = 1
                }
            }
            
            if (this.admin == 1) {
                await axios
                    .get('api/locations')
                    .then(response => (this.locations = response.data))
                    .catch(error => console.log(error))
            } else {
                await axios
                    .get('api/locations_allowed')
                    .then(response => (this.locations = response.data))
                    .catch(error => console.log(error))
            }

            // Optimalizált ciklus - map használata
            const ratingMap = new Map(response.data.map(item => [item.id, item.atlag]));
            this.locations.forEach(location => {
                if (ratingMap.has(location.id)) {
                    location.atlag = ratingMap.get(location.id);
                }
            });
        },

        async checkLocationRating(id) {
            this.$router.push({ name: 'RatingsPage', params: { id: id }})
        },

        async bannLocation(id, locName) {
            await axios
                .put('api/locations/' + id, { name: locName , allowed: 0 })
                .catch(error => console.log(error))

            await this.loadData()
            this.resetForm()
        },

        async enableLocation(id, locName) {
            await axios
                .put('api/locations/' + id, { name: locName, allowed: 1 })
                .catch(error => console.log(error))

            await this.loadData()
            this.resetForm()
        },

        async editLocation(id) {
            this.editing = true

            await axios
                .get('api/locations/' + id)
                .then(response => this.state.location = response.data)
                .catch(error => console.log(error))
        },

        async saveLocation() {
            this.saving = 'disabled'

            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .put('api/locations/' + this.state.location.id, this.state.location)

                await this.loadData()
                this.resetForm()
            }
            this.saving = false
        },

        cancelLocation() {
            this.resetForm()
        },

        resetForm() {
            this.state.location = {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false
            };

            this.editing = false
        }
    },

    mounted() {
        this.loadData()
    },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>

<style scoped>
.locations-container {
    width: 95%;
    margin: 0 auto;
    padding: 2rem;
}

.best-location-card {
    background: linear-gradient(135deg, #FFD700, #FFA500, #FF8C00);
    border-radius: 20px;
    margin-bottom: 3rem;
    padding: 2rem;
    text-align: center;
    box-shadow: 
        0 15px 35px rgba(255, 215, 0, 0.3),
        0 5px 15px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.8s ease-out;
}

.best-location-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.trophy-icon {
    font-size: 4rem;
    color: #8B4513;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3));
}

.best-location-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #8B4513;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.best-location-rating {
    font-size: 2rem;
    color: #8B4513;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.best-location-rating svg {
    color: #FF8C00;
    filter: drop-shadow(0 2px 4px rgba(255, 140, 0, 0.5));
}

.location-card {
    padding: 0 15px;
    animation: fadeInUp 0.6s ease-out backwards;
}

.card-content {
    background: linear-gradient(135deg, rgba(34, 38, 41, 0.95), rgba(52, 58, 64, 0.9));
    border-radius: 20px;
    padding: 2rem;
    height: 100%;
    border: 1px solid rgba(134, 194, 50, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.card-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.1), transparent);
    transition: left 0.6s;
}

.card-content:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
        0 20px 40px rgba(134, 194, 50, 0.2),
        0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(134, 194, 50, 0.5);
}

.card-content:hover::before {
    left: 100%;
}

.location-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.location-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #86C232;
    margin: 0;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 200px;
}

.location-name svg {
    color: #86C232;
    filter: drop-shadow(0 0 5px rgba(134, 194, 50, 0.5));
}

.location-rating {
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

.location-coordinates {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.coordinate-item {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
}

.coordinate-item svg {
    color: #86C232;
    filter: drop-shadow(0 0 3px rgba(134, 194, 50, 0.5));
}

.location-description {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 10px;
    border-left: 4px solid #86C232;
}

.location-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.admin-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(134, 194, 50, 0.2);
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border-radius: 10px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    position: relative;
    overflow: hidden;
}

.action-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.action-btn:hover::before {
    left: 100%;
}

.action-btn:hover {
    transform: translateY(-2px) scale(1.02);
}

.edit-form-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.edit-form {
    background: linear-gradient(135deg, rgba(34, 38, 41, 0.98), rgba(52, 58, 64, 0.95));
    border-radius: 20px;
    padding: 3rem;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    border: 1px solid rgba(134, 194, 50, 0.3);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.edit-form-title {
    font-size: 2rem;
    font-weight: 600;
    color: #86C232;
    margin-bottom: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    color: #86C232;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
}

.form-label svg {
    color: #86C232;
    filter: drop-shadow(0 0 5px rgba(134, 194, 50, 0.5));
}

.form-input, .form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid rgba(134, 194, 50, 0.3);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-input:focus, .form-textarea:focus {
    outline: none;
    border-color: #86C232;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 20px rgba(134, 194, 50, 0.3);
    transform: scale(1.02);
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.validation-error {
    background: rgba(220, 53, 69, 0.1);
    border: 1px solid rgba(220, 53, 69, 0.3);
    border-radius: 8px;
    padding: 8px 12px;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #dc3545;
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

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.form-btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 500;
    min-width: 120px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-btn:hover {
    transform: translateY(-2px) scale(1.05);
}

@media (max-width: 768px) {
    .locations-container {
        padding: 1rem;
    }
    
    .best-location-title {
        font-size: 2rem;
    }
    
    .location-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .location-name {
        min-width: auto;
        font-size: 1.3rem;
    }
    
    .edit-form {
        padding: 2rem;
        margin: 1rem;
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .admin-actions {
        gap: 0.5rem;
    }
}

@media (max-width: 576px) {
    .best-location-card {
        padding: 1.5rem;
    }
    
    .best-location-title {
        font-size: 1.8rem;
    }
    
    .trophy-icon {
        font-size: 3rem;
    }
    
    .card-content {
        padding: 1.5rem;
    }
}
</style>