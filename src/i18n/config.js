import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getStoredLanguage } from '../utils/localStorage'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: getStoredLanguage(),
  resources: {
    en: {
      translations: {
        // HERO
        "hero.welcome": "WELCOME TO",
        "hero.myWebsite": "MY WEBSITE",
        "hero.nameIntro": "I'm Kebsi",
        "hero.scrollIndicator": "Scroll",

        // ABOUT ME
        "aboutme.title": "About Me",
        "aboutme.description":
          "I'm Montassar, a Full Stack Developer with 2+ years of experience building scalable and high-quality web applications. I focus on clean design, performance, and cloud-based solutions.",
        "aboutme.personalwebsite": "Personal Website",

        // MORE ABOUT ME
        "moreaboutme.more": "More",
        "moreaboutme.title": "about me",
        "moreaboutme.paragraph":
          "I’m a passionate developer who loves creating meaningful digital experiences. I enjoy exploring new technologies while keeping quality and usability at the core.",
        "moreaboutme.part1": "I enjoy understanding how things work — from front-end animations",
        "moreaboutme.part2": "to backend systems and architecture — finding new ways",
        "moreaboutme.part3": "to make technology simple, human, and engaging.",
        "moreaboutme.part4": "Beyond code, I like blending art and logic,",
        "moreaboutme.part5": "building ideas that connect creativity and real-world impact",
        "moreaboutme.part6": "through AI, automation, and innovation.",
        "moreaboutme.circularText": "CODE * CREATE * INNOVATE * IMPACT * ",

        // SERVICES
        "services.servicesTitle": "Services",
        "services.servicesDescription":
          "I build fast, scalable web applications with clean architecture and smart integrations powered by AI and cloud technologies.",
        "services.fullstack.title": "Full Stack Web Development",
        "services.fullstack.description":
          "Building modern, responsive websites from intuitive frontends to robust backends.",
        "services.ai.title": "AI-Enhanced Development",
        "services.ai.description":
          "Adding intelligent and automated features for smarter digital experiences.",
        "services.cloud.title": "Cloud & DevOps",
        "services.cloud.description":
          "Deploying scalable and secure cloud infrastructures with CI/CD automation.",

        // GET IN TOUCH
        "getintouch.titlepartone": "Get in",
        "getintouch.titleparttwo": "Touch",
        "getintouch.subtitle": "Have a project in mind?",
        "getintouch.subtitleparttwo": " Let’s build it together!",
        "getintouch.cta": "Contact Me",
        "getintouch.signature": "Montassar",
        "getintouch.thankyou1": "Thanks for visiting!",
        "getintouch.thankyou2": "Let’s stay connected.",
        "getintouch.backtotop": "Back To Top",
        "getintouch.copied": "Copied!",
        
        // PROJECTS
        "projects.titleMy": "My",
        "projects.titleProjects": "Projects"
      }
    },

    fr: {
      translations: {
        // HERO
        "hero.welcome": "BIENVENUE SUR",
        "hero.myWebsite": "MON SITE WEB",
        "hero.nameIntro": "Je suis Kebsi",
        "hero.scrollIndicator": "Défiler",

        // ABOUT ME
        "aboutme.title": "À propos de moi",
        "aboutme.description":
          "Je suis Montassar, développeur Full Stack avec plus de 2 ans d’expérience dans la création d’applications web performantes et évolutives. J’allie design clair, performance et technologies cloud.",
        "aboutme.personalwebsite": "Site personnel",

        // MORE ABOUT ME
        "moreaboutme.more": "Plus",
        "moreaboutme.title": "à propos de moi",
        "moreaboutme.paragraph":
          "Développeur passionné, j’aime créer des expériences numériques utiles et élégantes. J’explore de nouvelles technologies tout en gardant la qualité au centre de mon travail.",
        "moreaboutme.part1": "J’aime comprendre comment les choses fonctionnent — des animations frontend",
        "moreaboutme.part2": "à la logique backend et à l’architecture système — en cherchant toujours",
        "moreaboutme.part3": "à rendre la technologie plus simple et intuitive.",
        "moreaboutme.part4": "Au-delà du code, j’aime relier art et technologie,",
        "moreaboutme.part5": "en créant des solutions qui allient créativité et impact réel",
        "moreaboutme.part6": "grâce à l’IA, l’automatisation et l’innovation.",
        "moreaboutme.circularText": "CODE * CRÉER * INNOVER * IMPACTER * ",

        // SERVICES
        "services.servicesTitle": "Services",
        "services.servicesDescription":
          "Je crée des applications web rapides et évolutives avec une architecture claire et des intégrations intelligentes basées sur l’IA et le cloud.",
        "services.fullstack.title": "Développement Web Full Stack",
        "services.fullstack.description":
          "Création de sites modernes et réactifs — du frontend intuitif au backend robuste.",
        "services.ai.title": "Développement Amélioré par l’IA",
        "services.ai.description":
          "Ajout de fonctionnalités intelligentes et automatisées pour des expériences plus efficaces.",
        "services.cloud.title": "Cloud & DevOps",
        "services.cloud.description":
          "Déploiement d’infrastructures cloud évolutives et sécurisées avec automatisation CI/CD.",

        // GET IN TOUCH
        "getintouch.titlepartone": "Contactez",
        "getintouch.titleparttwo": "Moi",
        "getintouch.subtitle": "Un projet en tête ?",
        "getintouch.subtitleparttwo": " Réalisons-le ensemble !",
        "getintouch.cta": "Contactez-moi",
        "getintouch.signature": "Montassar",
        "getintouch.thankyou1": "Merci de votre visite !",
        "getintouch.thankyou2": "Restons connectés.",
        "getintouch.backtotop": "Haut de page",
        "getintouch.copied": "Copié !",

        // PROJECTS
        "projects.titleMy": "Mes",
        "projects.titleProjects": "Projets"
      }
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
})

export default i18n
