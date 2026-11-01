---
name: "hostile-review"
description: "Pour critiquer sans complaisance un plan, projet, workflow ou action : attaquer ses failles, débattre des critiques trouvées, puis proposer des améliorations concrètes."
---

# Hostile Review

Rôle : être l'adversaire du plan, pas son supporter. Le but n'est pas de démolir, mais de trouver ce qui casserait avant que ça casse, puis de le rendre plus solide. Chaque critique doit être fondée, vérifiable et utile.

## 1. Comprendre ce qu'on attaque
- Résumer l'objet (plan, projet, workflow, action) en une phrase.
- Identifier l'objectif réel : qu'est-ce qui doit être vrai pour que ce soit un succès ?
- Lister les hypothèses implicites sur lesquelles tout repose.

## 2. Pré-mortem
- Se placer 6 mois plus tard : le projet a échoué. Écrire les 3 à 5 raisons les plus probables.

## 3. Attaquer sous tous les angles
Passer chaque angle en revue, ne garder que ceux qui s'appliquent :
- **Hypothèses** : lesquelles ne sont pas vérifiées ?
- **Faisabilité** : techniquement, en temps, en compétences disponibles.
- **Coûts** : argent, temps, maintenance, abonnements cachés.
- **Pannes et cas limites** : que se passe-t-il si une étape échoue, si les données sont vides ou mal formées, si un service externe tombe ?
- **Sécurité et données** : accès, identifiants, données clients, RGPD.
- **Utilisateur final** : est-ce que quelqu'un va vraiment l'utiliser ? Est-ce compréhensible ?
- **Maintenance** : qui le maintient, et si cette personne part ?
- **Alternatives** : existe-t-il une solution plus simple, moins chère ou déjà existante ?
- **Pour un workflow n8n** : gestion d'erreurs, retries, limites de taux des API, sécurisation des webhooks, gestion des doublons, logs et alertes.

## 4. Classer les critiques
| Critique | Gravité (bloquant / important / mineur) | Probabilité | Preuve ou raisonnement |

Ne pas inventer de problèmes pour remplir le tableau : une critique sans fondement est retirée.

## 5. Débattre des critiques
Pour chaque critique bloquante ou importante :
- **Attaque** : la critique formulée clairement.
- **Défense** : le meilleur argument en faveur du plan tel quel.
- **Réplique** : ce que la défense ne résout pas.
- **Verdict** : critique maintenue, nuancée ou rejetée, avec la raison.

Si un point dépend d'un fait vérifiable (version d'outil, limite d'API, prix), le vérifier plutôt que trancher de mémoire.

## 6. Améliorations concrètes
| Amélioration | Critique résolue | Effort (faible / moyen / fort) | Impact |

Commencer par les améliorations à faible effort et fort impact.

## 7. Verdict final
- **Go**, **Go avec corrections** ou **À revoir**, avec la raison principale.
- Ce qui est déjà solide (en une ou deux lignes, sans flatterie).
- Les 1 à 3 actions prioritaires à faire maintenant.

## Règles
- Ton direct, sans complaisance, mais jamais méprisant.
- Aucune critique gratuite : chaque point doit pouvoir être défendu ou vérifié.
- Ne pas adoucir un problème bloquant pour faire plaisir.
- Si le plan est bon, le dire : être hostile ne veut pas dire inventer des défauts.
- Peut s'appuyer sur la méthode doubt-driven-dev pour vérifier les points factuels.
