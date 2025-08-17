<template>
     <div class="d-grid gap-3 mx-auto mt-5 mb-5 text-inner w-100">
        <div class="text-decoration-underline fs-1 text-center">
            Saját helyek kezelése
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5 justify-content-center">
            <div v-for="l in locations" :key="l.id" class="col">
                <div class="border border-dark p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <p class="fs-2">{{ l.name }}</p>
                        <p class="fs-4">{{ l.lat }}</p>
                        <p class="fs-4">{{ l.lng }}</p>
                        <p class="fs-4">{{ l.description }}</p>
                    </div>
                    <div>
                        <button class="btn btn-primary fs-5 m-1 w-50" @click="editLocation(l.id)" v-if="!add_new">Szerkesztés</button>
                        <button class="btn btn-danger fs-5 m-1 w-50" @click="deleteLocation(l.id)" v-if="!add_new">Törlés</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="border border-dark p-4 rounded w-100" style="max-width: 500px;">
                <div class="row mb-3">
                    <label class="w-100 mb-1">Hely neve:</label>
                    <input v-model="this.state.location.name" class="form-control" type="text" placeholder="Hely neve">
                    <span class="text-danger text-center" v-if="submitted && v$.location.name.$error">
                        {{ v$.location.name.$errors[0].$message }}
                    </span>
                </div>
                <div class="row mb-3">
                    <label class="w-100 mb-1">Hely szélessége:</label>
                    <input v-model="this.state.location.lat" class="form-control" type="number" placeholder="Szélesség">
                    <span class="text-danger text-center" v-if="submitted && v$.location.lat.$error">
                        {{ v$.location.lat.$errors[0].$message }}
                    </span>
                </div>
                <div class="row mb-3">
                    <label class="w-100 mb-1">Hely hosszúsága:</label>
                    <input v-model="this.state.location.lng" class="form-control" type="number" placeholder="Hosszúság">
                    <span class="text-danger text-center" v-if="submitted && v$.location.lng.$error">
                        {{ v$.location.lng.$errors[0].$message }}
                    </span>
                </div>
                <div class="row mb-3">
                    <label class="w-100 mb-1">Hely leírása:</label>
                    <textarea v-model="this.state.location.description" class="form-control" type="text" rows="4" placeholder="Leírás"/>
                    <span class="text-danger text-center" v-if="submitted && v$.location.description.$error">
                        {{ v$.location.description.$errors[0].$message }}
                    </span>
                </div>
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-success w-50 fs-4" @click="newLocation" :disabled="saving" v-if="!add_new">Hely hozzáadása</button>
                    <button class="btn btn-primary w-25 fs-4 mb-2" v-if="add_new" @click="saveLocation">Mentés</button>
                    <button class="btn btn-danger w-25 fs-4" v-if="add_new" @click="resetForm">Mégse</button>
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
     name: 'MyLocations',

     data() {
        return {
            locations: [],
            add_new: false,
            saving: false
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
                        required: helpers.withMessage('A hely neve mező kitöltése kötelező!', required),
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
                    },
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
        changeUserId() {
            if (this.user != null) {
                this.state.location.user_id = this.user.id
            } else {
                this.$router.push({ name: "Home" })
            }

            this.loadData()
        },

        async loadData() {
            await axios
                .get('api/user_locations/' + this.state.location.user_id)
                .then(response => (this.locations = response.data))
                .catch(error => console.log(error))
        },
    
        async newLocation() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.saving = true

                await axios
                    .post('api/locations', this.state.location)
                    .catch(error => console.log(error))

                await this.loadData()
                
                this.saving = false
                this.resetForm()
            }
        },

        async deleteLocation(id) {
            await axios
                .delete('api/locations/' + id)
                .catch(error => console.log(error))

            await this.loadData()

            this.resetForm()
        },

        async editLocation(id) {
            this.add_new = true

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
                    .put(`api/locations/${this.state.location.id}`, this.state.location)

                await this.loadData()
                this.resetForm()
            }
            this.saving = false
        },

        resetForm() {
            this.state.location = {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false,
                user_id: this.user.id
            },

            this.add_new = false
            this.v$.$reset()
        }
    },

    mounted() {
        this.changeUserId()
    },

     computed: {
         ...mapGetters(['user'])
     }
}
</script>