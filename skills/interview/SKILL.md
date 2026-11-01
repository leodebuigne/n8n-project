---
name: "interview"
description: "Cadre les specs d'un projet n8n par des questions à 3 options, adaptées au niveau de l'utilisateur et aux pièges déjà rencontrés, puis propose d'enrichir la skill."
---

# Interview — cadrage des specs d'un workflow n8n

Objectif : avant de construire un workflow n8n, poser à l'utilisateur les questions qui changent réellement la conception, en proposant à chaque fois les 3 meilleures options. On ne construit rien tant que les specs ne sont pas validées.

Tout se fait en français. Le niveau de l'utilisateur évolue : la skill s'adapte à ce niveau et s'enrichit des problèmes rencontrés au fil des projets.

## Comment cette skill évolue

Une skill ne se réécrit pas toute seule. Elle progresse par deux mécanismes :

1. **La mémoire** : avant chaque interview, consulter la mémoire de l'utilisateur sur n8n (projets, niveau, outils utilisés, difficultés passées). Elle est mise à jour au fil des conversations et donne le contexte le plus récent.
2. **La mise à jour proposée en fin de session** (étape 7) : quand un nouveau problème, une nouvelle bonne pratique ou un changement de niveau apparaît dans la conversation, proposer une version enrichie de cette skill avec l'outil de proposition de skills. L'utilisateur valide d'un clic.

## Étape 0 — Calibrer le niveau (silencieusement)

Déterminer le niveau à partir de la mémoire, de la section « Niveau actuel » ci-dessous et des signaux de la conversation. Ne pas faire passer de test ; ne poser la question que si les signaux se contredisent vraiment.

- **Débutant** : demande où cliquer, confond nœuds et paramètres, a besoin de captures commentées, découvre les expressions `{{ }}`.
- **Intermédiaire** : construit seul des workflows simples, comprend les items, les expressions et le glisser-déposer, débogue avec l'onglet Executions, pose des questions sur les erreurs et les doublons.
- **Avancé** : parle d'architecture, de coûts, de sous-workflows réutilisables, de nœud Code, d'environnements, de sécurité et de montée en charge ; veut des arbitrages plutôt que des tutoriels.

En cas de doute entre deux niveaux, choisir le plus bas pour les explications et le plus haut pour la profondeur des questions.

### Niveau actuel

- Débutant en progression rapide (a construit seul un chatbot avec escalade par mail et remplissage automatique de FAQ depuis un site et un PDF).

## Étape 1 — Comprendre et classer le projet

- Reformuler l'idée en une ou deux phrases.
- Classer le projet dans un type (sert à choisir les questions de l'étape 3) :
  - Chatbot / assistant IA / base de connaissances
  - Traitement d'emails ou de documents entrants
  - Devis, commandes, CRM (Incwo ou autre)
  - Synchronisation entre outils
  - Reporting / tableaux de bord / alertes
  - Remplissage ou enrichissement de données en masse
- Si on ne sait ni ce qui déclenche le workflow ni ce qu'il doit produire, poser UNE question ouverte avant de continuer.

## Étape 2 — Premier tour : les 4 piliers

AskUserQuestion avec 4 questions préfixées en majuscules : **DÉCLENCHEUR**, **OUTILS**, **RÉSULTAT**, **CONTRAINTES**.

Règles pour les options :
- 3 options distinctes et réalistes dans n8n ; l'option conseillée en premier avec « (Recommandé) ».
- Une ligne de description par option : ce qu'elle implique (simplicité, coût, limites).
- La recommandation dépend du niveau : la plus simple pour un débutant, la plus robuste ou la plus évolutive pour un avancé.
- Respecter le choix de l'utilisateur même s'il diffère de la recommandation, en signalant brièvement le compromis.

## Étape 3 — Questions approfondies (1 à 2 tours)

Choisir dans la banque ci-dessous les questions dont la réponse **change la conception** du workflow. Ne jamais poser une question déjà tranchée (dans la conversation ou dans la mémoire). Maximum 4 questions par tour, 2 tours.

### Selon le niveau

**Tous niveaux**
- Modèle IA (si LLM) et type de clé (gratuite ou payante).
- Hébergement (n8n Cloud ou auto-hébergé).
- Périmètre (une entité, une par entité, commun) et validation humaine.

**Intermédiaire et plus**
- Gestion des erreurs : que se passe-t-il si un nœud échoue (retry, On Error, workflow d'erreur avec Error Trigger, notification) ?
- Doublons et idempotence : comment éviter qu'un même élément soit traité deux fois (clé unique, upsert, colonne Source, statut) ?
- Volumes : combien d'éléments par jour, pics, limites des API, pagination ?
- Tests : données de test, pin data, scénarios à vérifier avant mise en ligne.
- Format des données : quels champs, quels noms, quelle source de vérité ?

**Avancé**
- Architecture : un workflow ou plusieurs, sous-workflows réutilisables entre Capitole Évènements, OOH FOODS et Tryame ?
- Coûts : coût par exécution, choix du modèle par étape (petit modèle pour trier, plus gros pour rédiger), budget mensuel.
- Qualité de l'IA : jeu de questions de test, critères d'acceptation, suivi des mauvaises réponses.
- Observabilité : journalisation, alertes, rétention des exécutions, indicateurs de succès.
- Sécurité et RGPD : authentification des webhooks, domaines autorisés, secrets, durée de conservation, données personnelles.
- Montée en charge : concurrence, files d'attente, latence acceptable.
- Exploitation : environnement de test vs production, versioning, qui maintient le workflow.
- Valeur : temps gagné, KPI suivis, critère pour dire que le projet est réussi.

### Selon le type de projet

- **Chatbot / IA** : source de connaissances et volume, que faire quand le bot ne sait pas, ton et langue, intégration sur le site (mode Hosted ou Embedded), mémoire de conversation.
- **Emails / documents** : filtres d'entrée, pièces jointes, PDF scannés ou texte, classement, réponse automatique ou brouillon.
- **Devis / CRM** : règles de prix et remises (quantités, combinaisons), validation avant envoi, écriture dans Incwo, numérotation.
- **Synchronisation** : sens de la synchro, conflits, fréquence, clé de correspondance.
- **Reporting** : destinataires, fréquence, format, seuils d'alerte.
- **Remplissage en masse** : sources, découpage (page par page), rythme (Loop Over Items + Wait), dédoublonnage, relance future.

## Étape 4 — Pré-mortem (intermédiaire et plus)

Poser une dernière question courte : « Imaginons que dans un mois ce workflow pose problème : qu'est-ce qui aura cassé ? » avec 3 scénarios plausibles tirés du projet et du journal des pièges. Intégrer la réponse dans les contraintes.

## Étape 5 — Récapitulatif des specs

Quatre sections : Déclencheurs, Outils, Résultats, Contraintes. Pour chacune : **Retenu** puis **Propositions en plus** (1 à 3). Ensuite :
- **Points de vigilance** issus du journal des pièges, uniquement ceux qui s'appliquent.
- **Complexité estimée** (simple / moyenne / élevée) et nombre approximatif de nœuds.
- **Points encore ouverts** sous forme de questions courtes.

Proposer de mettre les specs dans un document partageable, puis de construire pas à pas (débutant) ou de livrer directement les réglages nœud par nœud (intermédiaire et plus).

## Étape 6 — Pendant la construction

Noter mentalement chaque problème rencontré : erreur n8n, incompréhension, réglage mal placé, limite d'un service, solution qui a fonctionné. Ils alimentent l'étape 7.

## Étape 7 — Faire évoluer la skill

À la fin d'un projet, ou quand l'utilisateur le demande, si la conversation a apporté quelque chose de nouveau :
1. Ajouter les nouveaux pièges au **Journal des pièges** (symptôme → cause → solution), sans dupliquer une entrée existante.
2. Mettre à jour **Niveau actuel** si les signaux ont changé (dater le changement).
3. Ajouter une question à la banque de l'étape 3 si une question importante a manqué pendant le cadrage.
4. Retirer ou corriger une entrée devenue fausse (changement de n8n, de service).
5. Proposer la version complète mise à jour de ce SKILL.md avec l'outil de proposition de skills (type « improvement », cible « interview »), et résumer en une ou deux lignes ce qui a changé.

Ne rien proposer si rien de nouveau n'est apparu.

## Journal des pièges

Format : symptôme → cause → solution.

- Réponses de plusieurs minutes, erreur « too many requests » → limites de la clé IA gratuite (Gemini) → clé payante avant mise en ligne ; pour un traitement en masse, Loop Over Items (batch 1) + Wait 6 s, et récupération des résultats sur la sortie « done ».
- « Max iterations reached » → le prompt de l'agent cite un outil qui n'existe pas, ou le bot tourne en boucle → vérifier les noms d'outils dans le prompt, Max Iterations = 4.
- Champ vide dans un mail ou un Sheet alors que l'extraction fonctionne → nom de champ différent (« Question : » au lieu de « question ») → noms en minuscules, sans espace ni deux-points ; glisser-déposer plutôt que taper.
- « Can't determine which item to use » → `.item` perd la trace en passant par certains nœuds → utiliser `.first()` quand il n'y a qu'un item.
- Nœud « Respond to Chat » introuvable → renommé **Chat** (opération Send Message) ; exige Response Mode = « Using Response Nodes » sur le Chat Trigger ; en mode Embedded, utiliser Respond to Webhook.
- Chat qui reste en attente → Gmail « Send and Wait » garde l'exécution ouverte → Gmail Send + Gmail Trigger séparé (filtre sur l'objet, ex. `subject:"Re: [FAQ OOH]"`) + Information Extractor pour lire la réponse.
- « At least one attribute must be specified » → Information Extractor laissé sur « From Attribute Descriptions » → choisir « Generate From JSON Example » pour une liste.
- « Service unavailable » sur un site → protection anti-robots → en-tête User-Agent de navigateur dans HTTP Request.
- Sitemap qui liste d'autres sitemaps (WordPress/Yoast) → viser directement page-sitemap.xml.
- PDF de nombreuses pages → trop pour un seul appel IA → Extract from File avec Join Pages désactivé + Split Out (une page par item).
- FAQ générée incomplète (date de création, équipe manquantes) → petit modèle qui trie et consigne trop restrictive → prompt exhaustif listant les infos de base obligatoires ; ne pas exclure les mentions légales.
- Doublons après relance → tout est réajouté → colonne Source = auto, supprimer ces lignes avant de relancer.
- Chatbot lent avec une grosse FAQ Google Sheets → la FAQ entière est relue à chaque question → limiter la taille, puis passer à Supabase (vectoriel).
- Abonnement Claude Pro inutilisable dans n8n → l'API est un produit séparé → clé API via la Claude Console.
- Triangle orange sur un nœud → données d'une ancienne exécution, pas une erreur → relancer.

## Style

- Questions via AskUserQuestion, pas en texte libre (sauf la question ouverte de l'étape 1).
- Pas de question dont la réponse ne changerait rien au workflow.
- Réponses courtes et structurées ; explications détaillées pour un débutant, arbitrages et compromis pour un avancé.
- Ne jamais construire avant validation du récapitulatif.
