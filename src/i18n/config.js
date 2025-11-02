import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getStoredLanguage } from '../utils/localStorage'


i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: getStoredLanguage(),
  resources: {
    en: {
      translations: {
        
        "hero.welcome": "WELCOME TO",
        "hero.myWebsite": "MY WEBSITE",
        "hero.nameIntro": "I'm Kebsi",
        "hero.scrollIndicator": "Scroll",
        "aboutme.title": "About Me",
        "aboutme.description": "I'm Montassar, a Full Stack Developer with 2+ years of experience building and deploying scalable web applications. I focus on creating high-performance, user-friendly solutions using modern technologies and cloud-native practices.",
        "aboutme.personalwebsite": "Personal Website",
        "moreaboutme.more": "More",
        "moreaboutme.title": "about me",
        "moreaboutme.paragraph": "I'm a passionate Full Stack Developer who creates digital experiences that blend creativity, technology, and purpose. I love exploring new tools and ideas to push boundaries while keeping quality and usability at the core.",
        "moreaboutme.part1": "I enjoy diving deep into how things work — from frontend animations",
        "moreaboutme.part2": "to backend logic and system design — constantly finding new ways",
        "moreaboutme.part3": "to make technology feel more human, intuitive, and alive.",
        "moreaboutme.part4": "Beyond coding, I love experimenting with ideas that combine art and tech,",
        "moreaboutme.part5": "turning imagination into functional design and solving real-world problems",
        "moreaboutme.part6": "through AI, automation, and innovation that inspires progress.",
        "moreaboutme.circularText": "CODE * CREATE * INNOVATE * IMPACT * ",
        "services.servicesTitle": "Services",
        "services.servicesDescription":
          "I specialize in building scalable, high-performance web applications that combine creativity and modern technologies. My goal is to craft seamless user experiences with clean architecture, reliable automation, and smart integrations that make a real impact.",
        "services.fullstack.title": "Full Stack Web Development",
        "services.fullstack.description":
          "Developing modern, responsive, and feature-rich web applications — from intuitive frontends to robust and secure backends.",
        "services.ai.title": "AI-Enhanced App Development",
        "services.ai.description":
          "Integrating intelligent features and automation systems to create smarter, data-driven digital experiences.",
        "services.cloud.title": "Cloud & DevOps Solutions",
        "services.cloud.description":
          "Designing scalable cloud infrastructures and automation pipelines to ensure performance, security, and reliability.",
        "getintouch.titlepartone": "Get in",
        "getintouch.titleparttwo": "Touch",
        "getintouch.subtitle": "Have a project in mind?",
        "getintouch.subtitleparttwo": " Let's make it a reality!",
        "getintouch.cta": "Get in touch",
        "getintouch.signature": "Montassar",
        "getintouch.thankyou1": "Thank you for visiting!",
        "getintouch.thankyou2": "Let's stay connected.",
        "getintouch.backtotop": "Back To Top",
        "getintouch.copied": "Copied!",
        "projects.titleMy": "My",
        "projects.titleProjects": "Projects"

      }
    },
    fr: {
      translations: {

        "hero.welcome": "BIENVENUE SUR",
        "hero.myWebsite": "MON SITE WEB",
        "hero.nameIntro": "Je suis Kebsi",
        "hero.scrollIndicator": "Faire défiler",
        "aboutme.title": "À Propos de Moi",
        "aboutme.description": "Je suis Montassar, un développeur Full Stack avec plus de 2 ans d'expérience dans la création et le déploiement d'applications web évolutives. Je me concentre sur la création de solutions performantes et conviviales en utilisant des technologies modernes et des pratiques natives du cloud.",
        "aboutme.personalwebsite": "Site Personnel",
        "moreaboutme.more": "Plus",
        "moreaboutme.title": "à propos de moi",
        "moreaboutme.paragraph": "Je suis un développeur Full Stack passionné qui crée des expériences numériques alliant créativité, technologie et objectif. J'adore explorer de nouveaux outils et idées pour repousser les limites tout en gardant la qualité et l'utilisabilité au cœur de mes préoccupations.",
        "moreaboutme.part1": "J'aime plonger profondément dans le fonctionnement des choses — des animations frontend",
        "moreaboutme.part2": "à la logique backend et à la conception de systèmes — en trouvant constamment de nouvelles façons",
        "moreaboutme.part3": "de rendre la technologie plus humaine, intuitive et vivante.",
        "moreaboutme.part4": "Au-delà du codage, j'aime expérimenter des idées qui combinent art et technologie,",
        "moreaboutme.part5": "transformant l'imagination en design fonctionnel et résolvant des problèmes réels",
        "moreaboutme.part6": "grâce à l'IA, l'automatisation et l'innovation qui inspirent le progrès.",
        "moreaboutme.circularText": "CODE * CRÉER * INNOVER * IMPACTER * ",
        "services.servicesTitle": "Services",
        "services.servicesDescription":
          "Je me spécialise dans la création d'applications web évolutives et performantes qui allient créativité et technologies modernes. Mon objectif est de concevoir des expériences utilisateur fluides avec une architecture propre, une automatisation fiable et des intégrations intelligentes qui ont un impact réel.",
        "services.fullstack.title": "Développement Web Full Stack",
        "services.fullstack.description":
          "Développement d'applications web modernes, réactives et riches en fonctionnalités — des interfaces utilisateur intuitives aux backends robustes et sécurisés.",
        "services.ai.title": "Développement d'Applications Améliorées par l'IA",
        "services.ai.description":
          "Intégration de fonctionnalités intelligentes et de systèmes d'automatisation pour créer des expériences numériques plus intelligentes et axées sur les données.",
        "services.cloud.title": "Solutions Cloud & DevOps",
        "services.cloud.description":
          "Conception d'infrastructures cloud évolutives et de pipelines d'automatisation pour garantir performance, sécurité et fiabilité.",
        "getintouch.titlepartone": "Get in",
        "getintouch.titleparttwo": "Touch",
        "getintouch.subtitle": "Vous avez un projet en tête?",
        "getintouch.subtitleparttwo": " Réalisons-le ensemble!",
        "getintouch.cta": "Contactez-moi",
        "getintouch.signature": "Montassar",
        "getintouch.thankyou1": "Merci de votre visite!",
        "getintouch.thankyou2": "Restons connectés.",
        "getintouch.backtotop": "Retour en haut",
        "getintouch.copied": "Copié!",
        "projects.titleMy": "Mes",
        "projects.titleProjects": "Projets"

      }
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
})

export default i18n
