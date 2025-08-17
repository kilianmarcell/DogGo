<template>
     <Info/>
     <Footer/>
</template>

<script>
import Info from "../parts/Info.vue"
import Footer from "../layouts/Footer.vue"

export default {
     name: 'InfoPage',

     components: {
          Info,
          Footer
     }
}
</script>