<template>
    <div class="info-container">
        <div class="text-wrapper p-5">
            <div class="text-inner w-75 fs-3 info-content">
                <div class="info-header">
                    <fa :icon="['fas', 'info-circle']" class="info-icon"/>
                    <h1 class="info-title">DogGo Információk</h1>
                </div>
                
                <div class="info-section">
                    <div class="section-header">
                        <fa :icon="['fas', 'lightbulb']" class="section-icon"/>
                        <h2 class="section-title">Téma</h2>
                    </div>
                    <div class="section-content">
                        <p class="info-paragraph">
                            Téma a kutyasétáltatás. Mivel a választott témának egyedinek kell lennie, ezért olyan problémákat kerestünk a mindennapi alkalmazásokban, amikre egy alternatív program sincs. A kutyákat manapság nem lehet akárhová vinni, külön engedéllyel, bizonyos időközönként vagy egyeltalán nem lehet számos helyre menni velük.
                        </p>
                        <p class="info-paragraph">
                            Emellett a közösségi médiában is sokszor látni olyat, amikor az emberek segítséget kérnek, hogy mégis hová vihetik a kutyáikat. Ezért lenne jó, egy olyan alkalmazás, ahol minden kutyasétáltatással kapcsolatos információ megtalálható egy adott helyhez, parkhoz.
                        </p>
                    </div>
                </div>

                <div class="info-section">
                    <div class="section-header">
                        <fa :icon="['fas', 'cogs']" class="section-icon"/>
                        <h2 class="section-title">Funkciók</h2>
                    </div>
                    <div class="section-content">
                        <div class="feature-grid">
                            <div class="feature-item">
                                <fa :icon="['fas', 'map']" class="feature-icon"/>
                                <h4>Térképes nézet</h4>
                                <p>Egy térképen láthatunk megjelölt helyeket, amiket emberek tudnak az alkalmazáshoz rendelni, regisztrálás, bejelentkezés után.</p>
                            </div>
                            <div class="feature-item">
                                <fa :icon="['fas', 'star']" class="feature-icon"/>
                                <h4>Értékelések</h4>
                                <p>A helymegjelöléshez tartoznak képek, egy 5-ös skálán értékelések és kommentek.</p>
                            </div>
                            <div class="feature-item">
                                <fa :icon="['fas', 'users']" class="feature-icon"/>
                                <h4>Közösség</h4>
                                <p>Az alkalmazást lehet látogatóként is használni, azonban csak regisztrált felhasználók jelölhetnek meg helyeket.</p>
                            </div>
                            <div class="feature-item">
                                <fa :icon="['fas', 'shield-alt']" class="feature-icon"/>
                                <h4>Moderáció</h4>
                                <p>Az adminisztrátor jogosultsággal szűrni lehet a rossz szándékú felhasználókat és helyeket.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <div class="section-header">
                        <fa :icon="['fas', 'heart']" class="section-icon"/>
                        <h2 class="section-title">Témaválasztás indoklása</h2>
                    </div>
                    <div class="section-content">
                        <p class="info-paragraph highlight">
                            Manapság a háztartások nagy részében óriási szerepet játszik a háziállat, azonban kiskedvenceink a legtöbb helyről ki vannak tiltva.
                        </p>
                        <p class="info-paragraph">
                            Szerettünk volna olyan témát választani, amivel megtudjuk könnyíteni, azoknak az embereknek az életét, akik mindenhová a kutyájukkal mennének. Gondolkoztunk, hogy hogyan is lehetne ezt a problémát egy alkalmazás segítségével orvosolni.
                        </p>
                        <p class="info-paragraph">
                            Egyik megoldás lenne, hogy mi felsorolunk híres, számunkra izgalmas, jó helyeket, de ez egyéni vélemény és nem feltétlenül tetszene az emberek nagy részének. Lehet, hogy sok embernek tettszenének azok a helyek, amiket mi mutatnánk, de minél több ember mutat számára kutyasétáltatásra alkalmas helyeket, annál több ember fog számára megfelelő helyet találni.
                        </p>
                        <p class="info-paragraph">
                            Emiatt jutottunk arra a megoldásra, hogy ha ezeknek az embereknek különböző helyeket kínálnánk, hogy hova is mehetnének kiskedvenceikkel sétálni, motiválnánk őket, hogy mozduljanak ki. Ha sikerülne kialakítani közösségeket, akkor egymást is ösztönöznék egy tartalmas sétára.
                        </p>
                        <p class="info-paragraph highlight">
                            A gondolat a fejlesztői csapat összes tagjának tetszett, a lelkesedést látva, ezt a témát rögtön megválasztottuk.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Info'
}
</script>

<style scoped>
.info-container {
    min-height: 80vh;
    display: flex;
    align-items: center;
    position: relative;
}

.info-content {
    position: relative;
    animation: fadeInUp 1s ease-out;
}

.info-header {
    text-align: center;
    margin-bottom: 3rem;
    animation: fadeInDown 1s ease-out;
}

.info-icon {
    font-size: 4rem;
    color: #86C232;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 12px rgba(134, 194, 50, 0.4));
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 4px 12px rgba(134, 194, 50, 0.4));
    }
    50% {
        transform: scale(1.1);
        filter: drop-shadow(0 6px 20px rgba(134, 194, 50, 0.6));
    }
}

.info-title {
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

.info-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(134, 194, 50, 0.05);
    border-radius: 20px;
    border: 1px solid rgba(134, 194, 50, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: slideInUp 0.8s ease-out backwards;
}

.info-section:nth-child(2) { animation-delay: 0.2s; }
.info-section:nth-child(3) { animation-delay: 0.4s; }
.info-section:nth-child(4) { animation-delay: 0.6s; }

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.info-section:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(134, 194, 50, 0.1);
    box-shadow: 0 15px 35px rgba(134, 194, 50, 0.2);
    border-color: rgba(134, 194, 50, 0.4);
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(134, 194, 50, 0.3);
}

.section-icon {
    font-size: 2.5rem;
    color: #86C232;
    margin-right: 1rem;
    filter: drop-shadow(0 2px 8px rgba(134, 194, 50, 0.3));
    transition: all 0.3s ease;
}

.info-section:hover .section-icon {
    transform: scale(1.2) rotate(10deg);
    filter: drop-shadow(0 4px 15px rgba(134, 194, 50, 0.5));
}

.section-title {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    color: #86C232;
    text-shadow: 0 2px 4px rgba(134, 194, 50, 0.3);
}

.section-content {
    line-height: 1.8;
}

.info-paragraph {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.1rem;
    text-align: justify;
    transition: all 0.3s ease;
}

.info-paragraph:hover {
    color: #fff;
    transform: translateX(10px);
}

.info-paragraph.highlight {
    background: linear-gradient(135deg, rgba(134, 194, 50, 0.1), rgba(97, 137, 47, 0.1));
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 4px solid #86C232;
    position: relative;
    overflow: hidden;
}

.info-paragraph.highlight::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.1), transparent);
    transition: left 0.6s;
}

.info-paragraph.highlight:hover::before {
    left: 100%;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.feature-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    border: 1px solid rgba(134, 194, 50, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.feature-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(134, 194, 50, 0.1), transparent);
    transition: left 0.5s;
}

.feature-item:hover::before {
    left: 100%;
}

.feature-item:hover {
    transform: translateY(-10px) scale(1.05);
    background: rgba(134, 194, 50, 0.1);
    box-shadow: 0 15px 30px rgba(134, 194, 50, 0.2);
    border-color: rgba(134, 194, 50, 0.4);
}

.feature-icon {
    font-size: 3rem;
    color: #86C232;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 12px rgba(134, 194, 50, 0.4));
    transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
    transform: scale(1.2) rotate(360deg);
    filter: drop-shadow(0 6px 20px rgba(134, 194, 50, 0.6));
}

.feature-item h4 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #86C232;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(134, 194, 50, 0.3);
}

.feature-item p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
}

/* Responsive design */
@media (max-width: 768px) {
    .info-content {
        width: 95% !important;
    }
    
    .info-title {
        font-size: 2rem;
    }
    
    .info-icon {
        font-size: 3rem;
    }
    
    .section-header {
        flex-direction: column;
        text-align: center;
    }
    
    .section-icon {
        margin-right: 0;
        margin-bottom: 1rem;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .info-section {
        padding: 1.5rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .feature-item {
        padding: 1.5rem;
    }
    
    .info-paragraph {
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .info-title {
        font-size: 1.8rem;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
    
    .feature-icon {
        font-size: 2.5rem;
    }
    
    .info-section {
        padding: 1rem;
    }
    
    .feature-item {
        padding: 1rem;
    }
}
</style>