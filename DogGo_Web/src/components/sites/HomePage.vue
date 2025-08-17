<template>
     <Text/>
     <Locations/>
     <Footer/>
</template>

<script>
import Text from '../parts/Text.vue'
import Locations from '../parts/Locations.vue'
import Footer from '../layouts/Footer.vue'

export default {
     name: 'HomePage',
     
     components: {
          Text,
          Locations,
          Footer
     }
}
</script>