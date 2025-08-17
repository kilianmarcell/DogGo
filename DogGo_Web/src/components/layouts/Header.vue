<template>
     <div>
          <nav id="navbar" class="navbar navbar-expand-lg navbar-dark fixed-top">
               <div class="container-fluid mx-5">
                    <div class="md-auto d-flex align-items-center">
                         <img src="../../assets/DogGoLogo.png" id="logo" class="img-fluid rounded" alt="DogGo logo">
                         <router-link :to="{ name: 'Home' }" class="nav-link navbar-brand fs-1">DogGo</router-link>
                    </div>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
                         <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-4">
                              <li class="nav-item">
                                   <router-link :to="{ name: 'Home' }" class="nav-link"><fa :icon="['fas', 'home']"/></router-link>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" href="https://github.com/kilianmarcell/DogGo_Web"><fa :icon="['fas', 'code']"/></a>
                              </li>
                              <li class="nav-item">
                                   <router-link :to="{ name: 'Info' }" class="nav-link"><fa :icon="['fas', 'question']"/></router-link>
                              </li>
                              <li class="nav-item">
                                   <router-link :to="{ name: 'ErrorPage' }" class="nav-link"><fa :icon="['fas', 'comment-dots']"/></router-link>
                              </li>
                              <li v-if="!user" class="nav-item">
                                   <router-link :to="{ name: 'Register' }" class="nav-link"><fa :icon="['fas', 'sign-in']"/></router-link>
                              </li>
                              <li v-if="user" class="nav-item dropdown">
                                   <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {{ user.username }} <fa :icon="['fas', 'user']"/>
                                   </a>
                                   <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                        <li><router-link :to="{ name: 'UserData' }" class="dropdown-item">Adataim módosíása</router-link></li>
                                        <li><router-link :to="{ name: 'MyLocationsPage' }" class="dropdown-item">Helyeim módosíása</router-link></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a @click="signOut" class="dropdown-item" href="#">Kijelentkezés</a></li>
                                   </ul>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
     </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
     name: 'Header',

     methods: {
          async signOut() {
               localStorage.removeItem('token')
               this.$store.dispatch('user', null)
               this.$router.go()
          },

          async getUserDatas() {
               await axios
                    .request({ url: 'api/user', method: 'get' })
                    .then(response => this.$store.dispatch('user', response.data))
                    .catch(error => {
                         if (error.response.status == 401) {
                              localStorage.removeItem('token')
                         }
                    })
          }
     },
     
     mounted() {
          if (localStorage.getItem('token') != null) {
               this.getUserDatas()
          }
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>

<style>
#navbar {
  background: var(--gradient-glass);
  backdrop-filter: var(--blur-md);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  z-index: var(--z-fixed);
}

#navbar:hover {
  box-shadow: var(--shadow-lg);
}

#logo {
  width: 80px;
  transition: all var(--transition-cubic);
  filter: drop-shadow(var(--shadow-sm));
}

#logo:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(var(--shadow-md));
}

.navbar-brand {
  font-weight: 700;
  background: linear-gradient(45deg, #86C232, #61892F, #86C232);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientText 3s ease infinite;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 8px;
  margin: 0 5px;
  overflow: hidden;
  padding: 5px 10px;
}

.navbar-brand::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.2), transparent);
  transition: left 0.5s;
  z-index: -1;
}

.navbar-brand:hover {
  color: transparent !important;
  background: linear-gradient(45deg, #86C232, #61892F, #86C232) !important;
  background-size: 200% 200% !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  transform: scale(1.05);
  text-shadow: none !important;
}

.navbar-brand:hover::before {
  left: 100%;
}

@keyframes gradientText {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.nav-link {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  margin: 0 5px;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.2), transparent);
  transition: left 0.5s;
  z-index: -1;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: #86C232 !important;
  background: rgba(134, 194, 50, 0.1);
  transform: translateY(-2px) scale(1.05);
  text-shadow: 0 0 10px rgba(134, 194, 50, 0.5);
}

.nav-link svg {
  transition: all 0.3s ease;
}

.nav-link:hover svg {
  transform: scale(1.2);
  filter: drop-shadow(0 0 5px rgba(134, 194, 50, 0.8));
}

.dropdown-menu {
  background: linear-gradient(135deg, rgba(34, 38, 41, 0.95), rgba(52, 58, 64, 0.9));
  backdrop-filter: blur(15px);
  border: 1px solid rgba(134, 194, 50, 0.2);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 2px 8px;
  position: relative;
  overflow: hidden;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.1), transparent);
  transition: left 0.4s;
}

.dropdown-item:hover::before {
  left: 100%;
}

.dropdown-item:hover {
  background: rgba(134, 194, 50, 0.15) !important;
  color: #86C232 !important;
  transform: translateX(5px);
}

.dropdown-divider {
  border-color: rgba(134, 194, 50, 0.3);
  margin: 8px 0;
}

.navbar-toggler {
  border: 2px solid rgba(134, 194, 50, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.navbar-toggler:hover {
  border-color: #86C232;
  box-shadow: 0 0 15px rgba(134, 194, 50, 0.4);
  transform: scale(1.05);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28134, 194, 50, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-nav .nav-item {
  animation: slideInFromTop 0.6s ease-out backwards;
}

.navbar-nav .nav-item:nth-child(1) { animation-delay: 0.1s; }
.navbar-nav .nav-item:nth-child(2) { animation-delay: 0.2s; }
.navbar-nav .nav-item:nth-child(3) { animation-delay: 0.3s; }
.navbar-nav .nav-item:nth-child(4) { animation-delay: 0.4s; }
.navbar-nav .nav-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    background: rgba(34, 38, 41, 0.98);
    border-radius: 12px;
    margin-top: 10px;
    padding: 20px;
    border: 1px solid rgba(134, 194, 50, 0.2);
  }
}
</style>