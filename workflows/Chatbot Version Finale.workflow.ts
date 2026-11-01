const modele_Gemini_Agent = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', version: 1.2, config: { name: 'Modele Gemini Agent', parameters: { modelName: 'models/gemini-flash-lite-latest', options: {} }, credentials: { googlePalmApi: newCredential('n8n - server (ldebuigne@eugeniaschool.com)', 'nsD5yylhzWKMEUb5') }, position: [24, 104] } });
const memoire_Conversation = memory({ type: '@n8n/n8n-nodes-langchain.memoryBufferWindow', version: 1.4, config: { name: 'Memoire Conversation', parameters: { contextWindowLength: 6 }, position: [152, 104] } });
const embeddings_Recherche_Question = embedding({ type: '@n8n/n8n-nodes-langchain.embeddingsGoogleGemini', version: 1, config: { name: 'Embeddings Recherche Question', credentials: { googlePalmApi: newCredential('n8n - server (ldebuigne@eugeniaschool.com)', 'nsD5yylhzWKMEUb5') }, position: [360, 312] } });
const recherche_Base_Connaissances = tool({ type: '@n8n/n8n-nodes-langchain.vectorStoreSupabase', version: 1.3, config: { name: 'Recherche Base Connaissances', parameters: { mode: 'retrieve-as-tool', toolDescription: 'Recherche dans la base de connaissances OOH FOODS (FAQ, catalogue produits, pages du site, réponses validées par l\'équipe). À utiliser pour CHAQUE question du visiteur avant de répondre.', tableName: { __rl: true, mode: 'id', value: 'documents', cachedResultName: 'documents' }, topK: 6, options: { queryName: 'match_documents' } }, credentials: { supabaseApi: newCredential('Supabase Ooh Foods', '3zfvqaqOsDhjO8Yd') }, position: [280, 104], subnodes: { embedding: embeddings_Recherche_Question } } });
const modele_Gemini_Extraction_Email = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', version: 1.2, config: { name: 'Modele Gemini Extraction Email', parameters: { modelName: 'models/gemini-flash-lite-latest', options: {} }, credentials: { googlePalmApi: newCredential('n8n - server (ldebuigne@eugeniaschool.com)', 'nsD5yylhzWKMEUb5') }, position: [88, 840] } });
const embeddings_Reponse_Equipe = embedding({ type: '@n8n/n8n-nodes-langchain.embeddingsGoogleGemini', version: 1, config: { name: 'Embeddings Reponse Equipe', credentials: { googlePalmApi: newCredential('n8n - server (ldebuigne@eugeniaschool.com)', 'nsD5yylhzWKMEUb5') }, position: [376, 840] } });
const document_Reponse_Equipe = documentLoader({ type: '@n8n/n8n-nodes-langchain.documentDefaultDataLoader', version: 1.1, config: { name: 'Document Reponse Equipe', parameters: { jsonMode: 'expressionData', jsonData: expr('Question : {{ $json.output.question }}\nRéponse : {{ $json.output.reponse }}'), options: { metadata: { metadataValues: [{ name: 'entity', value: 'OOH FOODS' }, { name: 'source', value: 'reponse_equipe' }] } } }, position: [504, 840] } });
const embeddings_Enregistrement_FAQ = embedding({ type: '@n8n/n8n-nodes-langchain.embeddingsGoogleGemini', version: 1, config: { name: 'Embeddings Enregistrement FAQ', credentials: { googlePalmApi: newCredential('n8n - server (ldebuigne@eugeniaschool.com)', 'nsD5yylhzWKMEUb5') }, position: [2168, 1272] } });
const document_FAQ = documentLoader({ type: '@n8n/n8n-nodes-langchain.documentDefaultDataLoader', version: 1.1, config: { name: 'Document FAQ', parameters: { jsonMode: 'expressionData', jsonData: expr('Question : {{ $json.question }}\nRéponse : {{ $json.reponse }}'), options: { metadata: { metadataValues: [{ name: 'entity', value: 'OOH FOODS' }, { name: 'source', value: 'catalogue_site' }] } } }, position: [2296, 1272] } });
const modele_Gemini_Generation_Questions = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', version: 1.2, config: { name: 'Modele Gemini Generation Questions', parameters: { modelName: 'models/gemini-flash-lite-latest', options: {} }, credentials: { googlePalmApi: newCredential('n8n - server (ldebuigne@eugeniaschool.com)', 'nsD5yylhzWKMEUb5') }, position: [1656, 1688] } });

const declencheur_Chat_Visiteur = trigger({
  type: '@n8n/n8n-nodes-langchain.chatTrigger',
  version: 1.5,
  config: { name: 'Declencheur Chat Visiteur', parameters: { options: { responseMode: 'responseNodes' } }, position: [-208, 80], webhookId: '18923e17-e997-4a97-9850-c788b0d6113c' }
});

const agent_Assistant_Ooh_Foods = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: { name: 'Agent Assistant Ooh Foods', parameters: { options: { systemMessage: '<system_prompt>\n  <role>\n    Tu es l\'assistant virtuel de OOH FOODS. Tu réponds aux visiteurs du site\n    internet, en français, de façon claire, chaleureuse et professionnelle.\n    Tu vouvoies toujours le visiteur.\n  </role>\n\n  <source_information>\n    <regle>Pour chaque question sur l\'entreprise, utilise l\'outil « Recherche Base Connaissances » pour chercher dans la base de connaissances.</regle>\n    <regle>Tu peux faire au maximum 2 recherches : une recherche principale, puis une seule reformulation avec d\'autres mots-clés (synonymes, version sucrée ou salée, composition, prix) si la première ne suffit pas. Ne refais jamais une recherche identique.</regle>\n    <regle>Réponds uniquement à partir des informations trouvées dans la base. N\'invente jamais d\'information, de prix, de nom, de référence ou de contact.</regle>\n  </source_information>\n\n  <synthese>\n    <regle>Quand plusieurs résultats sont pertinents, présente-les tous, sans te limiter au premier.</regle>\n    <regle>Pour une comparaison ou une question qui demande plusieurs éléments, présente une liste courte (3 à 6 points maximum) : pour chaque élément, indique ce qui le distingue, et ce qu\'il a en commun avec les autres si c\'est utile.</regle>\n    <regle>Termine par une phrase de synthèse qui aide le visiteur à choisir, ou à savoir quelle information lui manque.</regle>\n    <regle>Conserve les mentions de prix telles qu\'elles figurent dans la base (par exemple « prix indicatif, à confirmer sur devis »).</regle>\n  </synthese>\n\n  <reponse_partielle>\n    <regle>Si la base répond en partie, donne d\'abord ce que tu sais, puis précise clairement ce qui n\'est pas connu.</regle>\n    <regle>Ne demande l\'adresse email que si l\'information manquante est importante pour le visiteur. Propose-lui alors de transmettre la question à l\'équipe.</regle>\n  </reponse_partielle>\n\n  <reponse_absente_de_la_base>\n    <etape numero="1">\n      Si, après plusieurs recherches, la base ne contient aucune information utile,\n      dis que tu n\'as pas cette information pour le moment et demande au visiteur\n      son adresse email pour qu\'on lui réponde.\n    </etape>\n    <etape numero="2">\n      Quand le visiteur donne son adresse email, n\'utilise AUCUN outil et réponds\n      UNIQUEMENT avec ces 3 lignes, sans rien ajouter :\n      <format_escalade>\n[ESCALADE]\nQUESTION: la question du visiteur\nEMAIL: l\'adresse email du visiteur\n      </format_escalade>\n    </etape>\n    <etape numero="3">\n      Si le visiteur refuse de donner son email, n\'insiste pas.\n    </etape>\n  </reponse_absente_de_la_base>\n\n  <style>\n    <regle>Par défaut, réponses courtes : 2 à 4 phrases.</regle>\n    <regle>Exception : pour une comparaison ou une question à plusieurs éléments, utilise la liste courte décrite dans la section synthese.</regle>\n    <regle>Si la question n\'a aucun rapport avec OOH FOODS, réponds poliment que tu es là uniquement pour les questions concernant l\'entreprise.</regle>\n  </style>\n\n  <exemples>\n    <note>\n      Ces exemples illustrent le COMPORTEMENT attendu. Ne recopie jamais ces textes\n      tels quels : adapte-toi toujours à la vraie question du visiteur et aux vraies\n      informations trouvées dans la base.\n    </note>\n\n    <!-- Exemple 1 : information trouvée → réponse courte -->\n    <exemple cas="information_trouvee">\n      <visiteur>Bonjour, proposez-vous des kits de bienvenue pour les chambres ?</visiteur>\n      <assistant>Bonjour et bienvenue ! Oui, nous proposons des kits de bienvenue pour chambre, en version sucrée ou salée. Souhaitez-vous plus de détails sur l\'une de ces versions ?</assistant>\n    </exemple>\n\n    <!-- Exemple 2 : comparaison / synthèse → liste courte + phrase de synthèse -->\n    <exemple cas="comparaison_synthese">\n      <visiteur>Quelles sont les différentes versions de kits de bienvenue ?</visiteur>\n      <assistant>Nous proposons deux versions de kit de bienvenue pour chambre :\n- Kit sucré : réalisé pour l\'Adagio Aparthotel.\n- Kit salé (réf. 1411) : proposé à partir de 2,20 € HT, prix indicatif issu du catalogue 2021-2022, à confirmer sur devis.\nLes deux sont conçus pour l\'accueil en chambre. Pour connaître la composition exacte de chaque kit, vous pouvez contacter notre équipe.</assistant>\n    </exemple>\n\n    <!-- Exemple 3 : information absente → demande d\'email puis format [ESCALADE] strict -->\n    <exemple cas="information_absente_puis_escalade">\n      <visiteur>Vous livrez en Guadeloupe sous combien de jours ?</visiteur>\n      <assistant>Je n\'ai pas cette information pour le moment. Pouvez-vous me laisser votre adresse email ? Un membre de l\'équipe vous répondra rapidement.</assistant>\n      <visiteur>oui c\'est marie.dupont@email.fr</visiteur>\n      <assistant>\n[ESCALADE]\nQUESTION: Vous livrez en Guadeloupe sous combien de jours ?\nEMAIL: marie.dupont@email.fr\n      </assistant>\n    </exemple>\n\n    <!-- Exemple 4 : hors-sujet → recadrage poli, sans outil -->\n    <exemple cas="hors_sujet">\n      <visiteur>Tu peux me donner la recette du bœuf bourguignon ?</visiteur>\n      <assistant>Je suis désolé, je suis là uniquement pour répondre à vos questions concernant OOH FOODS. Puis-je vous aider sur nos produits ou nos services ?</assistant>\n    </exemple>\n  </exemples>\n</system_prompt>', maxIterations: 3 } }, position: [80, -128], retryOnFail: true, waitBetweenTries: 2, subnodes: { model: modele_Gemini_Agent, memory: memoire_Conversation, tools: [recherche_Base_Connaissances] } }
});

const verifier_Escalade = node({
  type: 'n8n-nodes-base.if',
  version: 2.4,
  config: { name: 'Verifier Escalade', parameters: { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 4 }, conditions: [{ id: '0df0ba4e-6c63-4ab7-a02e-4e561be9967c', leftValue: expr('{{ $json.output }}'), rightValue: '[ESCALADE]', operator: { type: 'string', operation: 'contains' } }], combinator: 'and' }, options: {} }, position: [640, 80] }
});

const preparer_Ticket_Escalade = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Preparer Ticket Escalade', parameters: { assignments: { assignments: [{ id: '0283ef19-d8d7-4add-b6d2-0abf8be25b2f', name: 'question: ', value: expr('{{ $(\'Agent Assistant Ooh Foods\').item.json.output.match(/QUESTION\\W*(.+?)\\s*(EMAIL|$)/is)?.[1] }}'), type: 'string' }, { id: '7f3d1667-0db3-4a0d-9058-1d82741120ca', name: 'email', value: expr('{{ $(\'Declencheur Chat Visiteur\').item.json.chatInput.match(/[\\w.+-]+@[\\w-]+\\.[\\w.]+/)?.[0] }}'), type: 'string' }] }, options: {} }, position: [864, -16] }
});

const message_Remerciement_Visiteur = node({
  type: '@n8n/n8n-nodes-langchain.chat',
  version: 1.3,
  config: { name: 'Message Remerciement Visiteur', parameters: { message: 'Merci, votre question a bien été transmise à notre équipe. Vous recevrez une réponse par email très prochainement.', options: {} }, position: [1088, -16], webhookId: 'aed2ef33-1e4f-444f-b06e-5f2f5065885f' }
});

const alerte_Email_Equipe = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Alerte Email Equipe', parameters: { sendTo: 'ldebuigne@eugeniaschool.com', subject: expr('[FAQ OOH] '), emailType: 'text', message: expr('{{ $(\'Agent Assistant Ooh Foods\').first().json.output }}'), options: { appendAttribution: false } }, credentials: { gmailOAuth2: newCredential('Gmail account', '521nUNF3UVGhGnmE') }, position: [1312, -16], webhookId: '90481119-884a-4985-875d-e9adb731d2c2' }
});

const reponse_Directe_Visiteur = node({
  type: '@n8n/n8n-nodes-langchain.chat',
  version: 1.3,
  config: { name: 'Reponse Directe Visiteur', parameters: { message: expr('{{ $(\'Agent Assistant Ooh Foods\').item.json.output }}'), options: {} }, position: [864, 176], webhookId: 'f4743ec6-fdbb-4eb0-bb23-6ed70a5d3d11' }
});

const declencheur_Reponse_Equipe_Email = trigger({
  type: 'n8n-nodes-base.gmailTrigger',
  version: 1.4,
  config: { name: 'Declencheur Reponse Equipe Email', parameters: { pollTimes: { item: [{ mode: 'everyMinute' }] }, simple: false, filters: { q: 'subject:"Re: [FAQ OOH]"' }, options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', '521nUNF3UVGhGnmE') }, position: [-208, 624] }
});

const extraire_Reponse_Equipe_Email = node({
  type: '@n8n/n8n-nodes-langchain.informationExtractor',
  version: 1.2,
  config: { name: 'Extraire Reponse Equipe Email', parameters: { text: expr('Objet : {{ $json.subject }}\nContenu : {{ $json.text }}'), attributes: { attributes: [{ name: 'question', description: '« La question du visiteur, indiquée dans l\u2019objet après [FAQ OOH] »' }, { name: 'email_visiteur', description: '« L\u2019adresse email du visiteur, indiquée dans le message d\u2019origine cité »' }, { name: 'reponse', description: '« Uniquement la nouvelle réponse écrite en haut du mail, sans le message d\u2019origine cité ni la signature »' }] }, options: {} }, position: [16, 624], subnodes: { model: modele_Gemini_Extraction_Email } }
});

const enregistrer_Reponse_Equipe_Supabase = node({
  type: '@n8n/n8n-nodes-langchain.vectorStoreSupabase',
  version: 1.3,
  config: { name: 'Enregistrer Reponse Equipe Supabase', parameters: { mode: 'insert', tableName: { __rl: true, mode: 'id', value: 'documents', cachedResultName: 'documents' }, options: { queryName: 'match_documents' } }, credentials: { supabaseApi: newCredential('Supabase Ooh Foods', '3zfvqaqOsDhjO8Yd') }, position: [368, 624], subnodes: { embedding: embeddings_Reponse_Equipe, documentLoader: document_Reponse_Equipe } }
});

const envoi_Reponse_Visiteur_Email = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Envoi Reponse Visiteur Email', parameters: { sendTo: expr('{{ $(\'Extraire Reponse Equipe Email\').first().json.output.email_visiteur }}'), subject: 'Réponse à votre question', emailType: 'text', message: expr('Bonjour,\n\n{{ $(\'Extraire Reponse Equipe Email\').first().json.output.reponse }}\n\nBien à vous,\nL\'équipe OOH FOODS'), options: { appendAttribution: false } }, credentials: { gmailOAuth2: newCredential('Gmail account', '521nUNF3UVGhGnmE') }, position: [720, 624], webhookId: '61942957-c463-4f7c-9c73-f4aca55f4dea' }
});

const lancement_Enrichissement_Manuel = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Lancement Enrichissement Manuel', position: [-208, 1472] }
});

const telecharger_Catalogue_PDF = node({
  type: 'n8n-nodes-base.googleDrive',
  version: 3,
  config: { name: 'Telecharger Catalogue PDF', parameters: { operation: 'download', fileId: { __rl: true, value: '1UvnGrJmK6lH2d7BPpYcCF5VYWUPsErvS', mode: 'list', cachedResultName: 'Ooh-Foods-Catalogue-2022.pdf', cachedResultUrl: 'https://drive.google.com/file/d/1UvnGrJmK6lH2d7BPpYcCF5VYWUPsErvS/view?usp=drivesdk' }, options: {} }, credentials: { googleDriveOAuth2Api: newCredential('Google Drive account', 'N5z93kzLZ01gkOS7') }, position: [464, 1568] }
});

const extraire_Texte_PDF = node({
  type: 'n8n-nodes-base.extractFromFile',
  version: 1.2,
  config: { name: 'Extraire Texte PDF', parameters: { operation: 'pdf', options: { joinPages: false } }, position: [688, 1568] }
});

const lister_Lignes_Texte_PDF = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: { name: 'Lister Lignes Texte PDF', parameters: { fieldToSplitOut: 'text', options: {} }, position: [912, 1568] }
});

const fusionner_Pages_Et_PDF = merge({
  version: 3.2,
  config: { name: 'Fusionner Pages Et PDF', position: [1136, 1472] }
});

const extraire_Texte_Page = node({
  type: 'n8n-nodes-base.html',
  version: 1.2,
  config: { name: 'Extraire Texte Page', parameters: { operation: 'extractHtmlContent', extractionValues: { values: [{ key: 'text', cssSelector: 'body', skipSelectors: 'script, style, noscript, nav, img, header, svg' }] }, options: { cleanUpText: true } }, position: [912, 1376] }
});

const lire_Sitemap_Site = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'Lire Sitemap Site', parameters: { url: 'https://oohfoods.fr/page-sitemap.xml', sendHeaders: true, headerParameters: { parameters: [{ name: 'User-Agent', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' }] }, options: { response: { response: { responseFormat: 'text' } } } }, position: [16, 1376] }
});

const convertir_Sitemap_XML = node({
  type: 'n8n-nodes-base.xml',
  version: 1,
  config: { name: 'Convertir Sitemap XML', parameters: { options: {} }, position: [240, 1376] }
});

const lister_Pages_Sitemap = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: { name: 'Lister Pages Sitemap', parameters: { fieldToSplitOut: 'urlset.url', options: {} }, position: [464, 1376] }
});

const lire_Chaque_Page_Site = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'Lire Chaque Page Site', parameters: { url: expr('{{ $json.loc }}'), sendHeaders: true, headerParameters: { parameters: [{ name: 'User-Agent', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' }] }, options: { response: { response: { responseFormat: 'text' } } } }, position: [688, 1376] }
});

const boucle_Extraction_Questions = node({
  type: 'n8n-nodes-base.splitInBatches',
  version: 3,
  config: { name: 'Boucle Extraction Questions', parameters: { options: {} }, position: [1360, 1472] }
});

const lister_Questions_FAQ = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: { name: 'Lister Questions FAQ', parameters: { fieldToSplitOut: 'output.faq', options: {} }, position: [1648, 1168] }
});

const boucle_Insertion_FAQ = node({
  type: 'n8n-nodes-base.splitInBatches',
  version: 3,
  config: { name: 'Boucle Insertion FAQ', parameters: { batchSize: 30, options: {} }, position: [1936, 1168] }
});

const enregistrer_FAQ_Supabase = node({
  type: '@n8n/n8n-nodes-langchain.vectorStoreSupabase',
  version: 1.3,
  config: { name: 'Enregistrer FAQ Supabase', parameters: { mode: 'insert', tableName: { __rl: true, mode: 'id', value: 'documents', cachedResultName: 'documents' }, embeddingBatchSize: 10, options: { queryName: 'match_documents' } }, credentials: { supabaseApi: newCredential('Supabase Ooh Foods', '3zfvqaqOsDhjO8Yd') }, position: [2160, 1056], subnodes: { embedding: embeddings_Enregistrement_FAQ, documentLoader: document_FAQ } }
});

const pause_Limite_Embeddings = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: { name: 'Pause Limite Embeddings', parameters: { amount: 65 }, position: [2512, 1168], webhookId: '5ac1c7c7-1533-43c7-b1ee-25ca64965c4a' }
});

const generer_Questions_Page = node({
  type: '@n8n/n8n-nodes-langchain.informationExtractor',
  version: 1.2,
  config: { name: 'Generer Questions Page', parameters: { text: expr('<role>\nTu extrais des questions-réponses à partir du texte d\'une page du site ou du catalogue d\'équipements de OOH FOODS, pour alimenter la base de connaissances d\'un chatbot.\n</role>\n\n<objectif>\nCouverture MAXIMALE des faits : une question-réponse par information distincte (chaque produit, variante, caractéristique, option, prix, service, fait sur l\'entreprise, contact, détail pratique). Ne crée pas plusieurs reformulations de la même question : la recherche gère déjà les synonymes.\n</objectif>\n\n<regles>\n  <regle>Base-toi UNIQUEMENT sur le texte fourni. N\'invente JAMAIS d\'information, prix, nom, référence ou contact. Si une info n\'y est pas, ne la mentionne pas.</regle>\n  <regle>Ignore menus, fil d\'ariane, mentions légales, cookies, boutons de partage et éléments de navigation.</regle>\n  <regle>Si une référence (REF) est indiquée, mentionne-la dans la réponse ; sinon n\'en parle pas.</regle>\n  <regle>Si un prix est indiqué, inclus-le en ajoutant TOUJOURS : « Prix indicatif HT issu du catalogue 2021-2022, à confirmer sur devis. »</regle>\n  <regle>Si la page ne contient rien d\'utile, renvoie une liste vide.</regle>\n  <regle>Réponds en français, de façon claire et professionnelle, en vouvoyant le client.</regle>\n  <regle>Format de sortie : un objet JSON { "faq": [ { "question": "...", "reponse": "..." } ] } et rien d\'autre.</regle>\n</regles>\n\n<exemples>\n  <exemple type="produit_catalogue_avec_ref_et_prix">\n    <texte>Chariot de petit-déjeuner MORNING — REF CH-204. Structure inox, 3 plateaux amovibles, roulettes silencieuses à frein. Dimensions 90 × 50 × 95 cm. Idéal pour le room service. Prix : 480 €.</texte>\n    <sortie>{ "faq": [\n      { "question": "Proposez-vous un chariot pour le room service ?", "reponse": "Oui, le chariot de petit-déjeuner MORNING (réf. CH-204), en inox avec roulettes silencieuses à frein, est conçu pour le room service. Prix indicatif HT issu du catalogue 2021-2022, à confirmer sur devis." },\n      { "question": "Quelles sont les dimensions du chariot MORNING ?", "reponse": "Le chariot MORNING (réf. CH-204) mesure 90 × 50 × 95 cm et dispose de 3 plateaux amovibles." },\n      { "question": "Quel est le prix du chariot MORNING ?", "reponse": "Le chariot MORNING (réf. CH-204) est proposé à 480 €. Prix indicatif HT issu du catalogue 2021-2022, à confirmer sur devis." }\n    ] }</sortie>\n  </exemple>\n\n  <exemple type="produit_site_sans_ref_ni_prix">\n    <texte>Machine à jus Zummo. Trois versions : Hôtelière Petit-déjeuner, Bar Restaurant, Self Service. Nous contacter.</texte>\n    <sortie>{ "faq": [\n      { "question": "Proposez-vous des machines à jus ?", "reponse": "Oui, nous proposons la machine à jus Zummo, disponible en trois versions : Hôtelière Petit-déjeuner, Bar Restaurant et Self Service." },\n      { "question": "Quelles versions de la machine Zummo existent ?", "reponse": "La machine Zummo existe en trois versions : Hôtelière Petit-déjeuner, Bar Restaurant et Self Service." }\n    ] }</sortie>\n  </exemple>\n\n  <exemple type="page_entreprise">\n    <texte>OOH FOODS est une agence indépendante créée en 2010, basée à Paris. Elle fournit équipements, produits et services à l\'hôtellerie, la restauration, les spas, maisons de retraite et parcs d\'attractions. Cofondée par Nadine, 25 ans d\'expérience. Clients : Accor, Pierre & Vacances, EuroDisney.</texte>\n    <sortie>{ "faq": [\n      { "question": "En quelle année OOH FOODS a-t-elle été créée ?", "reponse": "OOH FOODS est une agence indépendante créée en 2010, basée à Paris." },\n      { "question": "Quelle est l\'activité de OOH FOODS ?", "reponse": "OOH FOODS fournit des équipements, produits et services à l\'hôtellerie, la restauration, les spas, les maisons de retraite et les parcs d\'attractions." },\n      { "question": "Qui a fondé OOH FOODS ?", "reponse": "L\'agence a été cofondée par Nadine, qui possède 25 ans d\'expérience dans la restauration." },\n      { "question": "Pouvez-vous citer quelques clients de OOH FOODS ?", "reponse": "Parmi les clients de OOH FOODS figurent Accor, Pierre & Vacances et EuroDisney." }\n    ] }</sortie>\n  </exemple>\n\n  <exemple type="page_contact">\n    <texte>Contact : écrivez-nous à contact@oohfoods.fr ou via le formulaire du site. OOH FOODS est basée à Paris.</texte>\n    <sortie>{ "faq": [\n      { "question": "Comment contacter OOH FOODS ?", "reponse": "Vous pouvez contacter OOH FOODS par email à contact@oohfoods.fr ou via le formulaire de contact du site." },\n      { "question": "Où est basée OOH FOODS ?", "reponse": "OOH FOODS est basée à Paris." }\n    ] }</sortie>\n  </exemple>\n\n  <exemple type="page_sans_contenu_utile">\n    <texte>Accueil › Nos fournitures › Catégories. Partager sur Facebook, Twitter, LinkedIn. © OOH FOODS. Mentions légales. Politique de confidentialité.</texte>\n    <sortie>{ "faq": [] }</sortie>\n  </exemple>\n</exemples>\n\n<texte_a_traiter>\n{{ $json.text }}\n</texte_a_traiter>\n\n<consigne_finale>\nApplique les règles et imite le format des exemples pour traiter le contenu de <texte_a_traiter>. Réponds uniquement avec l\'objet JSON { "faq": [ ... ] }.\n</consigne_finale>'), schemaType: 'fromJson', jsonSchemaExample: '   { "faq": [ { "question": "Quels équipements proposez-vous ?", "reponse": "Nous proposons..." } ] }', options: {} }, position: [1584, 1472], retryOnFail: true, maxTries: 5, waitBetweenTries: 5000, subnodes: { model: modele_Gemini_Generation_Questions } }
});

const pause_Anti_Quota = node({
  type: 'n8n-nodes-base.wait',
  version: 1.1,
  config: { name: 'Pause Anti Quota', parameters: { amount: 6 }, position: [1936, 1600], webhookId: '651263ea-32a5-4d56-b7b9-3928e4a39f0e' }
});

const wf = workflow('B4W1yIHyEzwPx6AG', 'Chatbot Version Finale', { executionOrder: 'v1', binaryMode: 'separate', availableInMCP: true });

export default wf
  .add(declencheur_Chat_Visiteur)
  .to(agent_Assistant_Ooh_Foods)
  .to(verifier_Escalade.onTrue(preparer_Ticket_Escalade
    .to(message_Remerciement_Visiteur)
    .to(alerte_Email_Equipe)).onFalse(reponse_Directe_Visiteur))
  .add(declencheur_Reponse_Equipe_Email)
  .to(extraire_Reponse_Equipe_Email)
  .to(enregistrer_Reponse_Equipe_Supabase)
  .to(envoi_Reponse_Visiteur_Email)
  .add(lancement_Enrichissement_Manuel
  .to([
    telecharger_Catalogue_PDF
    .to(extraire_Texte_PDF)
    .to(lister_Lignes_Texte_PDF),
    lire_Sitemap_Site
    .to(convertir_Sitemap_XML)
    .to(lister_Pages_Sitemap)
    .to(lire_Chaque_Page_Site)
    .to(extraire_Texte_Page)]))
  .add(lister_Lignes_Texte_PDF.to(fusionner_Pages_Et_PDF.input(1)))
  .add(extraire_Texte_Page.to(fusionner_Pages_Et_PDF.input(0)))
  .add(fusionner_Pages_Et_PDF)
  .to(splitInBatches(boucle_Extraction_Questions)
  .onEachBatch(generer_Questions_Page
    .to(pause_Anti_Quota)
    .to(nextBatch(boucle_Extraction_Questions)))
  .onDone(lister_Questions_FAQ
    .to(splitInBatches(boucle_Insertion_FAQ)
    .onEachBatch(enregistrer_FAQ_Supabase
      .to(pause_Limite_Embeddings)
      .to(nextBatch(boucle_Insertion_FAQ))))))