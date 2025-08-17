<template>
  <footer class="d-flex justify-content-center align-items-center fs-5 w-100 border-top-5">
       <div>
          <p><u class="fs-4">Elérhetőségek:</u></p>
               <p>
                    <fa :icon="['fas', 'envelope']"/> <i>infodoggo@gmail.com</i><br>
                    <fa :icon="['fas', 'phone']"/> <i>-</i>
               </p>
       </div>
  </footer>
</template>

<script>
export default {
     name: 'Footer'
}
</script>

<style>
footer {
  background: linear-gradient(135deg, rgba(34, 38, 41, 0.95), rgba(52, 58, 64, 0.9));
  color: #FFFFFF;
  height: 150px;
  border-top: 2px solid rgba(134, 194, 50, 0.3);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
}

footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #86C232, transparent);
  animation: borderGlow 3s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

footer p {
  margin: 0;
  transition: all 0.3s ease;
}

footer p:hover {
  transform: translateY(-2px);
  text-shadow: 0 0 10px rgba(134, 194, 50, 0.5);
}

footer svg {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(134, 194, 50, 0.3));
}

footer svg:hover {
  transform: scale(1.2) rotate(5deg);
  filter: drop-shadow(0 0 10px rgba(134, 194, 50, 0.8));
}

footer u {
  background: linear-gradient(45deg, #86C232, #61892F);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientTextFooter 2s ease infinite;
  text-decoration: none;
  border-bottom: 2px solid #86C232;
  padding-bottom: 2px;
}

@keyframes gradientTextFooter {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

footer i {
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

footer i:hover {
  color: #86C232;
  transform: scale(1.05);
}
</style>