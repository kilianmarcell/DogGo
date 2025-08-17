<template>
     <div class="text-wrapper p-5">
          <div class="text-inner w-75 fs-3 intro-content">
               <div class="intro-header">
                    <fa :icon="['fas', 'dog']" class="intro-icon"/>
                    <h1 class="intro-title">Üdvözöljük a DogGo világában!</h1>
               </div>
               
               <div class="intro-section">
                    <div class="section-icon">
                         <fa :icon="['fas', 'heart']"/>
                    </div>
                    <p class="intro-paragraph">
                         Különböző forrásokból hallani, ismerősöktől, közösségi médiából azt, hogy egy adott helyre elvihetik kedvenceiket. Ennek ellenére mégsem tudunk sok véleményt meghallgatni, olvasni az adott helyekről. Ez az alkalmazás ennek a problémának a megoldására kínál lehetőséget.
                    </p>
               </div>
               
               <div class="intro-section">
                    <div class="section-icon">
                         <fa :icon="['fas', 'users']"/>
                    </div>
                    <p class="intro-paragraph">
                         Egy olyan alkalmazást készítünk, ahova az emberek leírhatják véleményüket a közelükben lévő, számukra jelentéssel bíró helyekről. Ha más ember is hallaná a pozitív tapasztalatokat az adott helyről, tudná, hogy milyen kutyás emberek járnak milyen helyekre, lehet, hogy ő is elmenne és kipróbálni a mások által megjelölt helyeket.
                    </p>
               </div>
               
               <div class="intro-section">
                    <div class="section-icon">
                         <fa :icon="['fas', 'map-marked-alt']"/>
                    </div>
                    <p class="intro-paragraph">
                         A másik fő célunk ezzel az alkalmazással az, hogy kutyás csoportokat, társaságokat hozzunk létre. A helyek értékelésével, leírásával az emberek kapcsolatba léphetnek egymással, motiválhatják egymást, hogy kimozduljanak otthonról kiskedvenceikkel.
                    </p>
               </div>
               
               <div class="cta-section">
                    <div class="cta-content">
                         <fa :icon="['fas', 'paw']" class="cta-icon"/>
                         <h3 class="cta-title">Kezdjük el együtt felfedezni!</h3>
                         <p class="cta-text">Csatlakozz közösségünkhöz és oszd meg tapasztalataidat!</p>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
export default {
     name: 'Text'
}
</script>

<style scoped>
.intro-content {
    position: relative;
    animation: fadeInUp 1s ease-out;
}

.intro-header {
    text-align: center;
    margin-bottom: 3rem;
    animation: fadeInDown 1s ease-out;
}

.intro-icon {
    font-size: 4rem;
    color: #86C232;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 12px rgba(134, 194, 50, 0.4));
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.intro-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(45deg, #86C232, #61892F, #4CAF50);
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

.intro-section {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: rgba(134, 194, 50, 0.05);
    border-radius: 15px;
    border-left: 4px solid #86C232;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideInLeft 0.8s ease-out backwards;
}

.intro-section:nth-child(2) { animation-delay: 0.2s; }
.intro-section:nth-child(3) { animation-delay: 0.4s; }
.intro-section:nth-child(4) { animation-delay: 0.6s; }

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.intro-section:hover {
    transform: translateX(10px) scale(1.02);
    background: rgba(134, 194, 50, 0.1);
    box-shadow: 0 8px 25px rgba(134, 194, 50, 0.2);
}

.section-icon {
    margin-right: 1.5rem;
    margin-top: 0.3rem;
    flex-shrink: 0;
}

.section-icon svg {
    font-size: 2rem;
    color: #86C232;
    filter: drop-shadow(0 2px 8px rgba(134, 194, 50, 0.3));
    transition: all 0.3s ease;
}

.intro-section:hover .section-icon svg {
    transform: scale(1.2) rotate(5deg);
    filter: drop-shadow(0 4px 15px rgba(134, 194, 50, 0.5));
}

.intro-paragraph {
    margin: 0;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.1rem;
    text-align: justify;
}

.cta-section {
    margin-top: 3rem;
    text-align: center;
    padding: 2.5rem;
    background: linear-gradient(135deg, rgba(134, 194, 50, 0.1), rgba(97, 137, 47, 0.1));
    border-radius: 20px;
    border: 1px solid rgba(134, 194, 50, 0.3);
    animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 20px rgba(134, 194, 50, 0.2);
    }
    50% {
        box-shadow: 0 0 40px rgba(134, 194, 50, 0.4);
    }
}

.cta-content {
    animation: fadeInUp 1s ease-out 0.8s backwards;
}

.cta-icon {
    font-size: 3rem;
    color: #86C232;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 12px rgba(134, 194, 50, 0.4));
    animation: wiggle 2s ease-in-out infinite;
}

@keyframes wiggle {
    0%, 7% { transform: rotateZ(0); }
    15% { transform: rotateZ(-15deg); }
    20% { transform: rotateZ(10deg); }
    25% { transform: rotateZ(-10deg); }
    30% { transform: rotateZ(6deg); }
    35% { transform: rotateZ(-4deg); }
    40%, 100% { transform: rotateZ(0); }
}

.cta-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #86C232;
    text-shadow: 0 2px 4px rgba(134, 194, 50, 0.3);
}

.cta-text {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-style: italic;
}

/* Responsive design */
@media (max-width: 768px) {
    .intro-title {
        font-size: 2rem;
    }
    
    .intro-section {
        flex-direction: column;
        text-align: center;
        padding: 1rem;
    }
    
    .section-icon {
        margin-right: 0;
        margin-bottom: 1rem;
        margin-top: 0;
    }
    
    .intro-paragraph {
        font-size: 1rem;
    }
    
    .cta-section {
        padding: 2rem 1rem;
    }
    
    .cta-title {
        font-size: 1.5rem;
    }
    
    .cta-text {
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .intro-icon {
        font-size: 3rem;
    }
    
    .intro-title {
        font-size: 1.8rem;
    }
    
    .section-icon svg {
        font-size: 1.5rem;
    }
    
    .cta-icon {
        font-size: 2.5rem;
    }
}
</style>