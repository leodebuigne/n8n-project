---
name: "doubt-driven-dev"
description: "Pour toute question technique, de dev ou n8n, ou tout choix à enjeu : explorer plusieurs pistes, chercher à se contredire, compiler et analyser avant de conclure."
---

# Doubt-Driven Dev

Principe : la première réponse trouvée n'est qu'une hypothèse. Ne jamais s'arrêter à elle. Rassembler plusieurs trouvailles, les confronter, puis conclure avec un niveau de confiance honnête.

## 1. Reformuler et cadrer
- Reformuler la question en une phrase.
- Lister ce qui est connu, ce qui est supposé, et ce qui manque.
- Si une info manquante change tout, poser UNE question courte avant de continuer.

## 2. Générer plusieurs hypothèses (minimum 3)
- Écrire au moins trois réponses ou approches candidates, y compris une qui semble peu probable.
- Ne pas classer tout de suite : les garder toutes ouvertes.

## 3. Chercher large, pas profond d'abord
- Consulter plusieurs sources distinctes (doc officielle, changelog/version actuelle, forum/issues GitHub, exemples concrets, test réel si possible).
- Pour chaque hypothèse, chercher séparément ; ne pas faire une seule recherche combinée.
- Vérifier la date et la version de chaque source : une réponse juste il y a un an peut être fausse aujourd'hui.
- Quand c'est possible, TESTER (exécuter le code, le nœud n8n, la requête) plutôt que croire.

## 4. Se contredire volontairement
- Pour l'hypothèse favorite, chercher activement ce qui la rendrait fausse : cas limites, bugs connus, limites de l'outil, coûts cachés.
- Se demander : « Si je me trompe, pourquoi ce serait ? »
- Signaler toute contradiction entre sources au lieu de la masquer.

## 5. Compiler les trouvailles
Présenter un tableau :

| Piste | Arguments pour | Arguments contre / risques | Sources | Fiabilité (haute/moyenne/faible) |

## 6. Analyser et conclure
- Recommandation principale, avec la raison décisive.
- Niveau de confiance global (haut / moyen / faible) et ce qui le ferait changer.
- Alternative de repli si la recommandation échoue.
- Ce qui reste incertain ou à vérifier par l'utilisateur.

## Règles
- Ne jamais présenter une supposition comme un fait.
- Si les recherches ne départagent pas les pistes, le dire clairement plutôt que trancher arbitrairement.
- Adapter la longueur : pour une question simple, un tableau court suffit ; pour un choix d'architecture ou d'outil, analyse complète.
- Toujours citer les sources consultées en fin de réponse.
