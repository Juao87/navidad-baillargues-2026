/**
 * Arquitectura JavaScript Vanilla - Nuestra Navidad en Baillargues
 * Experiencia optimizada para Papá y Mamá (Ergonomía, Legibilidad y Bilingüe)
 */

// Función global para cambiar la foto del alojamiento
function switchAccPhoto(src, el) {
    const mainImg = document.getElementById('acc-img-main');
    if (mainImg) {
        mainImg.src = src;
    }
    document.querySelectorAll('.acc-thumb').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
}

const App = (() => {
    let currentLang = 'es';
    let currentFilter = 'all';

    // 1. Diccionario Bilingüe Integral (Español / Francés)
    const i18n = {
        es: {
            brand: "Nuestra Navidad en Baillargues",
            navFlights: "✈ Vuelos",
            navStay: "🏡 Alojamiento",
            navMarkets: "🎄 Mercados",
            navItinerary: "🗓 Programa",
            navContacts: "📞 Contactos",
            print: "Imprimir",
            dates: "22 — 27 de Diciembre de 2026",
            heroTitle: "Nuestra Navidad en Baillargues",
            heroSub: "Un viaje diseñado con todo nuestro amor para Papá y Mamá. De Málaga a Baillargues, todo está organizado y reservado para disfrutar de unos días mágicos, cómodos y llenos de cariño en familia.",
            hbFlights: "Vuelos Directos",
            hbSeats: "Asientos + Prioridad",
            hbStay: "Planta Baja 100%",
            hbDist: "A 900m de casa",
            hbMarkets: "Mercadillos",
            hbVisits: "LGM & Montpellier",
            cdLabel: "Cuenta atrás para nuestro abrazo en Montpellier:",
            days: "Días", hours: "Horas", mins: "Minutos",
            photoCaption: "✨ Ver recuerdo familiar",

            // Vuelos
            transKicker: "Transporte Aéreo Confirmado",
            vuelosTitle: "Vuelos Ryanair Directos",
            vuelosLead: "Reserva confirmada con embarque prioritario, 2 piezas de equipaje de cabina por persona y asientos contiguos reservados.",
            carrierLabel: "Compañía:",
            bookingRefLabel: "Localizador de Reserva:",
            paxLabel: "Pasajeros:",
            priorityTag: "★ Embarque Prioritario + 2 Bultos de Cabina",
            flightOutBadge: "IDA • VUELO FR6622",
            flightBackBadge: "VUELTA • VUELO FR6623",
            depLabel: "Salida puntual",
            arrLabel: "Llegada terminal",
            arrHomeLabel: "Llegada a casa",
            directFlight: "Vuelo Directo (2h 05 min)",
            outConnectionNote: "ℹ️ Al aterrizar en Marsella a las 12:10, recogida de maletas y salida cómoda hacia la dársena de autobuses para la conexión a Montpellier.",
            inConnectionNote: "ℹ️ Llegada al aeropuerto de Marsella en bus a las 12:05 (2h40 antes del despegue), tiempo perfecto para facturar y comer con tranquilidad.",

            // Transfers
            transfersHeading: "🚌 Conexiones de Autobús & Recogida Personalizada",
            tcOutBadge: "CONEXIÓN IDA (22 DIC)",
            tcInBadge: "CONEXIÓN VUELTA (27 DIC)",
            pickupTitle: "Recogida VIP por Juan José (hijo):",
            pickupDesc: "Os espero en coche a la bajada del autobús en Montpellier. Maletas al maletero, nos vamos a casa a merendar juntos con Laura y las niñas, y luego os acompaño a la Cabane.",
            dropoffTitle: "Acompañamiento por Juan José:",
            dropoffDesc: "Salimos de casa a las 09:30 en coche. Os dejo directamente en la parada del autobús con vuestro equipaje listo para subir al car.",

            // Alojamiento
            accKicker: "Vuestro Refugio Privado",
            accTitle: "La Cabane Souirié",
            accSublead: "Un espacio independiente, cálido y silencioso a tan solo 900 metros de nuestra casa.",
            officialPhoto: "📸 Foto Oficial del Alojamiento",
            accDistance: "🚗 A 900 m de nuestra casa (2 minutos en coche o 10 min a pie).",
            accFullDesc: "Elegido cuidadosamente para vuestro descanso: suite independiente de 21 m² totalmente equipada con baño privado moderno, cocina completa, televisión, conexión Wi-Fi de alta velocidad y parking privado cerrado. Todo de una sola planta para evitar cualquier esfuerzo.",
            bookingConfirmed: "Estancia 100% Confirmada & Pagada",
            bookingNumLabel: "Nº Reserva Booking",
            pinCodeLabel: "Código PIN Llaves",
            checkinLabel: "Check-in",
            checkoutLabel: "Check-out",
            btnCopy: "Copiar Dirección",
            btnMap: "Ver en Google Maps",
            btnBooking: "Ficha Booking",

            // Mercados
            marketsKicker: "Paseos Mágicos en Familia",
            marketsTitle: "Mercados de Navidad del Sur",
            marketsLead: "Dos excursiones diseñadas para disfrutar de las luces, los sabores navideños y el ambiente festivo sin cansancio.",
            highlightsTitle: "Lo que disfrutaremos juntos:",
            lgmTitle: "La Forêt Magique de La Grande-Motte",
            lgmDesc: "Un mercado de Navidad único a orillas del mar Mediterráneo. Un bosque encantado de abetos decorados con luces doradas, carrusel tradicional y las famosas pirámides de Jean Balladur iluminadas.",
            lgmItem1: "🍬 <strong>Village des Délices:</strong> Crêpes, churros, gofres artesanos y chocolate caliente.",
            lgmItem2: "❄️ <strong>Nieve mágica:</strong> Caída de nieve artificial a las 17:00 en un ambiente de cuento.",
            lgmItem3: "⛵ <strong>Paseo llano marítimo:</strong> Totalmente accesible, llano y sin desniveles para pasear con tranquilidad frente a los veleros.",
            lgmDistance: "🚗 A solo 18 minutos en coche desde casa",

            mtpTitle: "Les Hivernales de Montpellier",
            mtpDesc: "El gran mercado de Navidad tradicional de Montpellier en el majestuoso marco del Peyrou, con el Arco del Triunfo del siglo XVII y el Acueducto de los Arcos iluminados.",
            mtpItem1: "🪵 <strong>Más de 90 chalets de madera:</strong> Artesanos locales, figuras de belén provenzal (santons) y adornos.",
            mtpItem2: "🧀 <strong>Gastronomía festiva:</strong> Degustación de aligot caliente, castañas asadas, ostras de Bouzigues y vino caliente con canela.",
            mtpItem3: "🎡 <strong>Ambiente señorial:</strong> Paseo majestuoso con amplias avenidas pavimentadas y bancos para descansar a placer.",
            mtpDistance: "🚗 A 15 minutos en coche desde Baillargues",

            // Itinerario
            itinKicker: "Día a Día",
            itinTitle: "Programa de las Fiestas",
            itinLead: "Todo planeado a un ritmo sereno, sin prisas y priorizando el descanso y la alegría familiar.",
            fAll: "Todo el viaje",
            fTransit: "Transportes",
            fFestive: "Navidad & Mercados",

            // Contactos
            contactKicker: "Siempre a vuestro lado",
            contactTitle: "Teléfonos de Contacto & Asistencia",
            contactLead: "Cualquier detalle o duda, con un solo toque podéis llamarme directamente.",
            contactJuanSub: "Organizador & chofer familiar",
            contactHostSub: "Anfitrión & Acceso Llaves",
            contactEmergTitle: "Emergencias (Francia / UE)",
            contactEmergSub: "Atención médica & Policía (en español)",

            // Footer & Modal
            footerText: "Nuestra Navidad en Baillargues • Diciembre 2026",
            footerSub: "Diseñado con todo mi cariño para Papá y Mamá • Juan José",
            modalText: "El calor de estar juntos. ¡Qué ganas inmensas de recibiros y abrazaros!",
            copiedToast: "✓ Dirección copiada al portapapeles"
        },
        fr: {
            brand: "Notre Noël à Baillargues",
            navFlights: "✈ Vols",
            navStay: "🏡 Logement",
            navMarkets: "🎄 Marchés",
            navItinerary: "🗓 Programme",
            navContacts: "📞 Contacts",
            print: "Imprimer",
            dates: "22 — 27 Décembre 2026",
            heroTitle: "Notre Noël à Baillargues",
            heroSub: "Un voyage préparé avec tout notre amour pour Papa et Maman. De Malaga à Baillargues, tout est réservé et organisé pour vivre un séjour magique, confortable et chaleureux en famille.",
            hbFlights: "Vols Directs",
            hbSeats: "Sièges + Priorité",
            hbStay: "Plain-pied 100%",
            hbDist: "À 900m de la maison",
            hbMarkets: "Marchés de Noël",
            hbVisits: "LGM & Montpellier",
            cdLabel: "Compte à rebours avant nos retrouvailles à Montpellier :",
            days: "Jours", hours: "Heures", mins: "Minutes",
            photoCaption: "✨ Voir le souvenir de famille",

            // Vuelos
            transKicker: "Transport Aérien Confirmé",
            vuelosTitle: "Vols Ryanair Directs",
            vuelosLead: "Réservation confirmée avec embarquement prioritaire, 2 bagages cabine par personne et sièges côte à côte réservés.",
            carrierLabel: "Compagnie :",
            bookingRefLabel: "Référence Dossier :",
            paxLabel: "Passagers :",
            priorityTag: "★ Embarquement Prioritaire + 2 Bagages Cabine",
            flightOutBadge: "ALLER • VOL FR6622",
            flightBackBadge: "RETOUR • VOL FR6623",
            depLabel: "Départ ponctuel",
            arrLabel: "Arrivée terminal",
            arrHomeLabel: "Retour à la maison",
            directFlight: "Vol Direct (2h 05 min)",
            outConnectionNote: "ℹ️ À l'atterrissage à Marseille à 12h10, récupération des bagages et accès direct aux quais de bus pour la liaison vers Montpellier.",
            inConnectionNote: "ℹ️ Arrivée à l'aéroport de Marseille en bus à 12h05 (2h40 avant le décollage), timing idéal pour enregistrer et déjeuner sereinement.",

            // Transfers
            transfersHeading: "🚌 Connexions en Autocar & Prise en Charge VIP",
            tcOutBadge: "LIAISON ALLER (22 DÉC)",
            tcInBadge: "LIAISON RETOUR (27 DÉC)",
            pickupTitle: "Accueil VIP par Juan José (fils) :",
            pickupDesc: "Je vous attends directement en voiture à la descente du bus à Montpellier. Valises dans le coffre, goûter en famille à la maison avec Laura et les filles, puis installation à la Cabane.",
            dropoffTitle: "Accompagnement par Juan José :",
            dropoffDesc: "Départ de la maison en voiture à 09h30. Je vous dépose directement devant le quai du bus avec vos bagages prêts à embarquer.",

            // Alojamiento
            accKicker: "Votre Refuge Privé",
            accTitle: "La Cabane Souirié",
            accSublead: "Un havre de paix indépendant, douillet et chaleureux à seulement 900 mètres de la maison.",
            officialPhoto: "📸 Photo Officielle du Logement",
            accDistance: "🚗 À 900 m de notre maison (2 minutes en voiture ou 10 min à pied).",
            accFullDesc: "Sélectionné avec soin pour votre confort : suite indépendante de 21 m² tout équipée avec salle d'eau moderne, cuisine complète, télévision, Wi-Fi très haut débit et parking privatif clos. 100% de plain-pied pour vous éviter tout effort.",
            bookingConfirmed: "Séjour 100% Confirmé & Payé",
            bookingNumLabel: "N° Réservation Booking",
            pinCodeLabel: "Code PIN Clés",
            checkinLabel: "Arrivée",
            checkoutLabel: "Départ",
            btnCopy: "Copier l'Adresse",
            btnMap: "Voir sur Google Maps",
            btnBooking: "Fiche Booking",

            // Mercados
            marketsKicker: "Douceurs & Balades Festives",
            marketsTitle: "Marchés de Noël du Sud",
            marketsLead: "Deux sorties enchantées pensées pour s'émerveiller des lumières et des saveurs locales à un rythme très doux.",
            highlightsTitle: "Ce que nous partagerons ensemble :",
            lgmTitle: "La Forêt Magique de La Grande-Motte",
            lgmDesc: "Un marché de Noël singulier face à la Méditerranée. Une forêt féerique de sapins illuminés, un manège d'antan et les célèbres pyramides de Jean Balladur parées de mille feux.",
            lgmItem1: "🍬 <strong>Village des Délices :</strong> Crêpes, churros, gaufres gourmandes et chocolat chaud réconfortant.",
            lgmItem2: "❄️ <strong>Chutes de neige féeriques :</strong> Animation quotidienne à 17h00 dans un décor de conte de fées.",
            lgmItem3: "⛵ <strong>Promenade maritime de plain-pied :</strong> Idéale pour marcher sereinement au grand air marin sans fatigue.",
            lgmDistance: "🚗 À 18 minutes en voiture de la maison",

            mtpTitle: "Les Hivernales de Montpellier",
            mtpDesc: "Le grand marché de Noël traditionnel de Montpellier dans l'écrin majestueux du Peyrou, sublimé par l'Arc de Triomphe du XVIIe siècle et l'Aqueduc des Arceaux.",
            mtpItem1: "🪵 <strong>Plus de 90 chalets en bois :</strong> Artisans créateurs, santonniers provençaux traditionnels et décorations.",
            mtpItem2: "🧀 <strong>Gourmandises régionales :</strong> Aligot filant au chaudron, marrons grillés, huîtres de Bouzigues et vin chaud aux épices.",
            mtpItem3: "🎡 <strong>Cadre historique :</strong> Allées pavées spacieuses et bancs de repos pour flâner en toute quiétude.",
            mtpDistance: "🚗 À 15 minutes en voiture de Baillargues",

            // Itinerario
            itinKicker: "Jour par Jour",
            itinTitle: "Programme des Fêtes",
            itinLead: "Un déroulé serein, sans précipitation, centré sur le repos et le bonheur d'être réunis.",
            fAll: "Tout le séjour",
            fTransit: "Transports",
            fFestive: "Noël & Marchés",

            // Contactos
            contactKicker: "Toujours à vos côtés",
            contactTitle: "Numéros Utiles & Assistance",
            contactLead: "Pour toute question ou besoin, vous pouvez m'appeler d'un simple clic.",
            contactJuanSub: "Organisateur & chauffeur familial",
            contactHostSub: "Hôte & Accès Boîte à clés",
            contactEmergTitle: "Urgences (France / UE)",
            contactEmergSub: "Secours médicaux & Police (assistance multilingue)",

            // Footer & Modal
            footerText: "Notre Noël à Baillargues • Décembre 2026",
            footerSub: "Conçu avec tout mon amour pour Papa et Maman • Juan José",
            modalText: "La chaleur d'être réunis. Tellement hâte de vous serrer dans mes bras !",
            copiedToast: "✓ Adresse copiée dans le presse-papiers"
        }
    };

    // 2. Données Chronologiques du Séjour
    const timelineData = [
        {
            type: 'transit',
            date: { es: 'Martes 22 de Diciembre', fr: 'Mardi 22 Décembre' },
            title: { es: '¡Bienvenidos a Francia! El viaje de llegada', fr: 'Bienvenue en France ! Le voyage aller' },
            desc: {
                es: '<strong>10:05:</strong> Despegue del vuelo Ryanair FR6622 en Málaga (asientos 15E y 15F). Llegada a Marsella a las 12:10.<br><strong>13:25:</strong> Autobús directo a Montpellier (llegada 15:10).<br><strong>15:15:</strong> <em>Juan José os recoge en coche</em>. Merienda de bienvenida en casa con Laura, Maëva y Mila, y acomodación tranquila en la Cabane Souirié.',
                fr: '<strong>10h05 :</strong> Décollage du vol Ryanair FR6622 à Malaga (sièges 15E et 15F). Arrivée à Marseille à 12h10.<br><strong>13h25 :</strong> Autocar direct vers Montpellier (arrivée à 15h10).<br><strong>15h15 :</strong> <em>Accueil par Juan José en voiture</em>. Goûter festif à la maison avec Laura, Maëva et Mila, puis installation paisible à la Cabane Souirié.'
            }
        },
        {
            type: 'festive',
            date: { es: 'Miércoles 23 de Diciembre', fr: 'Mercredi 23 Décembre' },
            title: { es: 'Mañana tranquila y Mercado de Navidad en La Grande-Motte', fr: 'Matinée douce et Marché de Noël à La Grande-Motte' },
            desc: {
                es: 'Mañana sin despertador para descansar del viaje. Almuerzo familiar relajado en casa. Por la tarde (16:00), excursión en coche a <strong>La Grande-Motte</strong>: paseo llano frente al puerto, descubrimiento de "La Forêt Magique", caída de nieve mágica a las 17:00 y merienda de chocolate caliente con churros frente al mar.',
                fr: 'Matinée sans réveil pour récupérer du voyage. Déjeuner tranquille à la maison. L\'après-midi (16h00), balade à <strong>La Grande-Motte</strong> : promenade de plain-pied le long du port, féerie de "La Forêt Magique", chutes de neige à 17h00 et crêpes/chocolat chaud face à la mer.'
            }
        },
        {
            type: 'festive',
            date: { es: 'Jueves 24 de Diciembre', fr: 'Jeudi 24 Décembre' },
            title: { es: 'Preparativos y Gran Cena de Nochebuena', fr: 'Douceur des préparatifs & Réveillon de Noël' },
            desc: {
                es: 'Día dedicado a la cocina y a la convivencia en familia. Aperitivo festivo a media tarde y gran <strong>Cena de Nochebuena</strong> con platos tradicionales, dulces navideños y villancicos con las niñas. Al terminar, regreso en coche a descansar a la Cabane.',
                fr: 'Journée consacrée aux préparatifs gourmands et aux rires en famille. Apéritif raffiné en fin d\'après-midi et <strong>Grand Dîner du Réveillon</strong> au coin de la table avec Laura et les filles. Nuit reposante et silencieuse à la Cabane.'
            }
        },
        {
            type: 'festive',
            date: { es: 'Viernes 25 de Diciembre', fr: 'Vendredi 25 Décembre' },
            title: { es: '¡Feliz Navidad! Regalos y gran banquete familiar', fr: 'Joyeux Noël ! Cadeaux et banquet en famille' },
            desc: {
                es: 'Mañana mágica de apertura de regalos junto al árbol con las pequeñas. Comida tradicional de Navidad con sobremesa sin fin. Por la tarde, juegos familiares y paseo suave digestivo por las calles tranquilas de Baillargues.',
                fr: 'Matinée féerique d\'ouverture des cadeaux sous le sapin avec les petites. Grand repas de Noël chaleureux et savoureux. Après-midi détente, jeux de société et promenade digestive au calme dans Baillargues.'
            }
        },
        {
            type: 'festive',
            date: { es: 'Sábado 26 de Diciembre', fr: 'Samedi 26 Décembre' },
            title: { es: 'Grandes Hivernales de Montpellier y Cena de despedida', fr: 'Les Hivernales de Montpellier & Dîner de clôture' },
            desc: {
                es: 'Paseo vespertino por <strong>Les Hivernales de Montpellier</strong> en la Promenade du Peyrou: visita a los chalets de madera, figuras de belén provenzal, luces del Arco del Triunfo y degustación de aligot caliente. Por la noche, cena especial de despedida en casa.',
                fr: 'Sortie d\'après-midi aux <strong>Hivernales de Montpellier</strong> sur la Promenade du Peyrou : découverte des 90 chalets d\'artisans, santons de Provence, illuminations grandioses et aligot chaud. Dîner spécial de clôture en famille le soir.'
            }
        },
        {
            type: 'transit',
            date: { es: 'Domingo 27 de Diciembre', fr: 'Dimanche 27 Décembre' },
            title: { es: 'Viaje de regreso sereno a Málaga', fr: 'Voyage retour serein vers Malaga' },
            desc: {
                es: '<strong>09:15:</strong> Cierre de maletas y entrega de llaves en la caja de seguridad.<br><strong>09:30:</strong> <em>Juan José os lleva en coche a la estación de autobús</em>.<br><strong>10:05:</strong> Salida del FlixBus directo (llegada al aeropuerto MRS a las 12:05). Tiempo sobrado (2h40) para comer y facturar.<br><strong>14:45:</strong> Vuelo Ryanair FR6623 (asientos 23E y 23F). ¡Aterrizaje en Málaga a las 16:50 con el corazón lleno de recuerdos!',
                fr: '<strong>09h15 :</strong> Fermeture des valises et dépôt des clés dans la boîte sécurisée.<br><strong>09h30 :</strong> <em>Juan José vous conduit en voiture à la gare routière</em>.<br><strong>10h05 :</strong> Départ du FlixBus direct (arrivée à l\'aéroport MRS à 12h05). Large avance (2h40) pour déjeuner et enregistrer.<br><strong>14h45 :</strong> Vol Ryanair FR6623 (sièges 23E et 23F). Atterrissage à Malaga à 16h50, les valises et le cœur pleins de beaux souvenirs !'
            }
        }
    ];

    // 3. Rendu du Timeline
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;
        const filtered = timelineData.filter(item => currentFilter === 'all' || item.type === currentFilter);

        container.innerHTML = filtered.map(item => `
            <article class="tl-item">
                <span class="tl-date">${item.date[currentLang]}</span>
                <h3 class="tl-title">${item.title[currentLang]}</h3>
                <p class="tl-desc">${item.desc[currentLang]}</p>
            </article>
        `).join('');
    }

    // 4. Application de la langue
    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                el.innerHTML = i18n[lang][key];
            }
        });

        const esBtn = document.getElementById('lang-es');
        const frBtn = document.getElementById('lang-fr');
        if (esBtn) esBtn.classList.toggle('lang-active', lang === 'es');
        if (frBtn) frBtn.classList.toggle('lang-active', lang === 'fr');

        renderTimeline();
    }

    // 5. Compte à Rebours (jusqu'à l'arrivée des parents à 15:10 le 22 déc 2026)
    function initCountdown() {
        const target = new Date('2026-12-22T15:10:00+01:00').getTime();

        const update = () => {
            const now = Date.now();
            const diff = Math.max(0, target - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);

            const elDays = document.getElementById('cd-days');
            const elHours = document.getElementById('cd-hours');
            const elMins = document.getElementById('cd-mins');

            if (elDays) elDays.textContent = String(days).padStart(2, '0');
            if (elHours) elHours.textContent = String(hours).padStart(2, '0');
            if (elMins) elMins.textContent = String(mins).padStart(2, '0');
        };

        update();
        setInterval(update, 60000);
    }

    // 6. Gestion du Modal Photo
    function initModal() {
        const tilt = document.getElementById('hero-tilt');
        const modal = document.getElementById('photo-modal');
        const closeBg = document.getElementById('modal-close-bg');
        const closeBtn = document.getElementById('modal-close-btn');

        const open = () => {
            if (modal) {
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');
            }
        };

        const close = () => {
            if (modal) {
                modal.classList.remove('open');
                modal.setAttribute('aria-hidden', 'true');
            }
        };

        if (tilt) tilt.addEventListener('click', open);
        if (closeBg) closeBg.addEventListener('click', close);
        if (closeBtn) closeBtn.addEventListener('click', close);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }

    // 7. Copie d'adresse & Toast
    function initClipboard() {
        const btn = document.getElementById('copy-address');
        const toast = document.getElementById('toast');

        if (btn) {
            btn.addEventListener('click', () => {
                const addr = "6 Rue de la Croix d'Avignon, 34670 Baillargues, France";
                navigator.clipboard.writeText(addr).then(() => {
                    if (toast) {
                        toast.textContent = i18n[currentLang].copiedToast;
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2500);
                    }
                }).catch(() => {
                    alert(addr);
                });
            });
        }
    }

    // 8. Filtres Timeline
    function initFilters() {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter') || 'all';
                renderTimeline();
            });
        });
    }

    // 9. Initialisation Globale
    function init() {
        renderTimeline();
        initCountdown();
        initModal();
        initClipboard();
        initFilters();

        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                applyLanguage(currentLang === 'es' ? 'fr' : 'es');
            });
        }
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
