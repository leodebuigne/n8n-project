# Transcript projet n8n

Transcription de la vidéo « Workflow chatbot O'Food avec n8n et Supabase ».

**00:00** Bonjour Monsieur P1, du coup je vais vous montrer aujourd'hui mon workflow. Alors on va commencer tout de suite par la partie du coup du bas, sachant que mon workflow est un tchat de base.

**00:16** qui consiste à répondre aux questions par rapport au site internet de mon alternance. J'ai d'abord lié tout ce workflow en bas qui permet de d'enrichir la base super base que du coup vous voyez ici donc là vous voyez on a 753 questions et puis du coup enfin voilà il y a cinq pages vous avez jusqu'à 291

**00:48** du coup parce que j'ai dû supprimer quelques questions que j'avais fait avant pour éviter les doublons. Donc ce qui va se passer c'est que j'ai mis le lien du coup du site en ici du coup donc des différences url du coup du site.

**01:04** Donc je vais mettre cette URL là, qui va permettre de lire chaque page. Du coup, ça va être converti en XML, les pages vont être listées une par une, pour pouvoir faciliter la lecture.

**01:20** et extraites, ensuite elles vont être merged avec le pdf qui fait partie du catalogue de la compagnie, donc WhoFood, et une fois que ces informations sont extraites, divisez par chacune, par page pour faciliter la lecture, elles sont en merge, et ensuite je vais générer des questions avec Gmini, sauf

**01:48** que Gmini avait un peu de mal, du coup ce que j'ai fait c'est que je lui ai mis une pause anticota pour éviter que pour éviter que ça crache à chaque fois.

**01:56** Ensuite, une fois que cette boucle est analysée, il y a les 86 pages, il va faire lister une question de FAQ, donc question-réponse.

**02:06** Et j'ai fait la même chose ici, parce que j'ai miné aussi plusieurs qui avait du mal pour pouvoir envoyer toutes les questions dans Superbase.

**02:14** Une fois que ça, ça a été fait, du coup, maintenant que la base de données est enrichie, on peut poser des questions aux gens.

**02:24** chatbot qui va aller chercher dans superbase donc il a différentes consignes notamment vous voyez du coup aller chercher uniquement dans la base de données superbase et s'il n'a pas la réponse qu'il faut pas qui l'envoie un mail, et il faut qu'il demande le mail à la personne et on recevra un e-mail

**02:52** pour pouvoir répondre directement à la question. Donc voilà, ça c C'est si il a la réponse, il répond directement, s'il n'a pas la réponse, j'ai une alerte pour mon mail.

**03:04** Ensuite, du coup, ce que je veux éviter, c'est aussi que, alors c'est bien beau de donner une alerte et de répondre, mais après, s'il Si la question se réitère, le but c'est que le chatbot puisse y répondre directement par lui-même une fois la question réitérée.

**03:19** Du coup, une fois que j'ai répondu, l'objet quand je vais recevoir le mail va être FAQ ou food. Il faut répondre directement au mail pour avoir ce petit « re » et qui va déclencher le fait d'extraire la réponse.

**03:38** Pour qu'il sache que c'est à ce moment-là qu'il faut qu'il extraie la réponse, la mettre dans ce subabail. Ensuite, on a celui ce petit nœud qui permet d'avoir la réponse déjà préfaite, donc le bonjour, la réponse à laquelle je vais répondre, et la bienvenue à l'équipe au Food.

**03:58** Donc si on fait un petit test, On peut faire, du coup par exemple, moi j'aime bien celle-là, c'est de demander quels sont les packages de bienvenues.

**04:08** Packages de bienvenues. Parce qu'en fait il va y avoir différents packages de bienvenues dans les questions réponses. J'ai aussi demandé dans le prompt du chatbot de compiler un peu s'il y avait des sources similaires.

**04:30** Donc là il va avoir bienvenu. Du coup, il ne va pas juste me donner le sucré, il va aussi me donner le salé, il va me donner les mini-barres, et voilà.

**04:41** Et après, il va demander si on souhaite avoir une réponse plus personnalisée, si on veut plus d'infos, ou quelque chose comme ça.

**04:47** Donc, ça permet de trouver de différencier les différentes choses par rapport au kit de bienvenue. Donc là ici, sucré, la salée et le minibar.

**05:00** Et par exemple, si on lui pose une question qu'il n'y a pas, ça peut être et « Est-ce que vous livrez en Italie ?

**05:13** » Donc là, normalement, il ne devrait pas avoir la réponse. Donc, hop, et voilà. je devrais recevoir un mail, du coup d'abord il demande mon mail parce qu'il dit que je n'ai pas cette information, pouvez-vous me laisser votre adresse email, un membre de l'équipe vous répondra rapidement.

**05:32** Donc là je vais mettre mon adresse mail, eugenia, et du coup il je vais recevoir un doublon parce que du coup je me l'envoie la question à moi-même et puis comme c'est moi qui suis censé recevoir la question pour pouvoir y répondre, ça fait un doublon.

**05:48** Voilà, donc on va rafraîchir. Donc là je reçois la question, donc je reçois la question. à laquelle le chatbot n'a pas pu répondre, et l'email de la personne communiquée.

**05:59** Donc j'ai juste à reply directement, et je peux dire, en effet, nous vivons bien en Italie. Par contre, vous aurez des frais de livraison supplémentaires.

**06:30** Juste à envoyer, et du coup, le bon email à envoyer, donc là c'est parce que j'ai répondu à moi-même, mais l'email qui va être envoyé à la personne.

**06:41** va ressembler à avec le bonjour par exemple j'avais fait un test avec l'Espagne juste avant et du coup j'ai juste répondu ça et il a mis le bonjour bien à vous l'équipe au foot.

**06:57** Normalement c Bonjour, en effet nous livrons bien en Italie, par contre vous aurez des frais de livraison supplémentaires, bienvenue à l'équipe Oufou.

**07:06** Donc ensuite, vu que ça a exécuté ça, ça va, La nouvelle question devra aller dans la base superbase, du coup si on rafraîchit à la 5ème page, normalement ça devrait fonctionner.

**07:29** Donc normalement, il devrait y avoir une question supplémentaire qui arrive. Peut-être en attendant, je vais vous montrer les commandes CLI, parce que ça met peut-être un peu plus de temps à arriver.

**07:40** Donc, au niveau des commandes de n8n CLI, qu'est-ce qu'on peut faire ? alors là ça va être déjà fait alors on va faire un nouveau terminal pour que ce soit plus simple donc n8n-cli-help qui nous permet de savoir tout ce que contient dans du coup ce skill, ensuite on a le n-utncli-version qui nous permet

**08:12** de savoir sur quelle version on est. Vous avez aussi le document. Donc quand on avait setup, on avait fait un n8n-cli-init-interactive.

**08:25** Donc là, comme il est déjà setup, je ne vais peut-être pas le faire, mais après on met l'API du token que j'ai copié là.

**08:33** On peut mettre l'URL du cloud de N8n, on peut par exemple juste copier celui-là. Et ensuite, je peux faire un push aussi de mon, J'ai déjà fait, mais pour pouvoir le mettre sur le GitHub, le workflow.ts, il suffit de copier le nom de la version, et ensuite le push est fait.

**09:11** On va aller voir dans SupaBase si ça s'est actualisé, sinon je vous montrerai un exemple qui avait fonctionné, j'avais fait un test avant, je ne sais pas si Je pas s'il y a une limite au nombre de questions que je peux générer là-dedans, mais à la rigueur, je vais vous montrer, parce que visiblement,

**09:28** ça met un peu de temps. Du coup, j'avais préparé ça. Voilà, par exemple, j'avais fait, Alors, moi, je m'étais trompé, j'avais ajouté ce, ce petit truc moi-même mais en demandant de livrer en Belgique donc j'avais mis ça par rapport à la question est-ce que je peux me faire livrer en Belgique du coup

**09:50** suite à ça du coup ça a dédoublé le bonjour bonjour bonjour bonjour Bienvenue à l'équipe O'Food, mais la question c'est, générer du coup dans SupaBase, est-ce que je peux me faire livrer en Belgique ?

**10:05** Et du coup il y a la réponse, mais en vrai normalement ça ça aurait dû, ça aurait dû partir, et puis ça aussi, puisqu'il n'était pas nécessaire d'ajouter ça.

**10:16** Donc, si on fait un test derrière, si je demande « est-il possible de se faire faire livrer en Belgique, normalement maintenant il devrait me donner les informations liées à ça.

**10:37** Donc voilà, oui il est tout à fait possible de se faire livrer en Belgique avec des frais supplémentaires de transfert en fonction de la marque.

**10:43** Voilà, donc c'est comme ça que fonctionne mon workflow, je vous le met en grand cadrage. Et puis du coup, concernant le cours, alors moi j'ai beaucoup aimé, je trouve ça impressionnant.

**10:58** tout ce qu'on peut faire avec NV10, puis vous nous avez donné des ressources vraiment géniales entre les templates, le Notion site, le NV10 CLI, franchement c'est des trucs qu'on ne pourrait pas forcément avoir accès.

**11:14** facilement ou en cherchant un peu, mais ça fait toujours plaisir de les avoir à portée de main. Par contre, je pense que j'aurais bien aimé, je pense qu'il faudrait que le premier cours, après ça c'est mon avis personnel, le premier cours que vous fassiez quelques workflows avec les élèves pour bien

**11:31** leur expliquer, qui voient directement comment les nœuds sont utilisés, que ce soit des workflows qui peuvent être très simples, mais je pense que ça pourrait aussi leur donner plus d'idées pour leur projet, parce que ça permettrait de voir la manière dont ça fonctionne.

**11:46** Je trouve qu'on a été un peu jeté dans le bain directement sans savoir vraiment ce que ça donnait. Alors c'est sûr que les templates aident, mais si on ne comprend pas trop comment les nœuds fonctionnent, ça peut être un vite nous perdre un petit peu.

**12:04** Mais honnêtement le cours est hyper sympa, comme je vous ai dit, ce que vous nous avez donné, c'est vraiment des ressources géniales.

**12:11** Et puis honnêtement, même quand on a fait par nous-mêmes, en tout cas personnellement j'ai appris plein de trucs, notamment en faisant Notamment cette chaîne qui m'a appris pas mal de choses à voir comment on pouvait se démerder même si tout est gratuit.

**12:29** Et puis faire même des petits workflows comme ça qui font des trucs de ouf. Donc en vrai, hyper sympa. Et puis je vous remercie, et puis je vous souhaite une bonne journée.

**12:37** Au revoir.
