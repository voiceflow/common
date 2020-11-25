/* eslint-disable sonarjs/no-duplicate-string */

export const VALID_UTTERANCES =
  "a-zA-Z\xC0-\xFF\u0100-\u017F\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF9F\u4E00-\u9FAF\u3400-\u4DBF._'\\- \\[\\]";

export const INTERFACE_INTENTS = {
  // Reference: https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#intents
  AUDIO_PLAYER: [
    {
      name: 'AMAZON.LoopOffIntent',
    },
    {
      name: 'AMAZON.LoopOnIntent',
    },
    {
      name: 'AMAZON.NextIntent',
    },
    {
      name: 'AMAZON.PauseIntent',
    },
    {
      name: 'AMAZON.PreviousIntent',
    },
    {
      name: 'AMAZON.ResumeIntent',
    },
    {
      name: 'AMAZON.ShuffleOffIntent',
    },
    {
      name: 'AMAZON.ShuffleOnIntent',
    },
    {
      name: 'AMAZON.StartOverIntent',
    },
  ],
};

export const BUILT_IN_INTENTS_ALEXA = [
  {
    name: 'AMAZON.CancelIntent',
    slots: [],
  },
  {
    name: 'AMAZON.FallbackIntent',
    slots: [],
  },
  {
    name: 'AMAZON.HelpIntent',
    slots: [],
  },
  {
    name: 'AMAZON.LoopOffIntent',
    slots: [],
  },
  {
    name: 'AMAZON.LoopOnIntent',
    slots: [],
  },
  {
    name: 'AMAZON.MoreIntent',
    slots: [],
  },
  {
    name: 'AMAZON.NavigateHomeIntent',
    slots: [],
  },
  {
    name: 'AMAZON.NavigateSettingsIntent',
    slots: [],
  },
  {
    name: 'AMAZON.NextIntent',
    slots: [],
  },
  {
    name: 'AMAZON.NoIntent',
    slots: [],
  },
  {
    name: 'AMAZON.PageDownIntent',
    slots: [],
  },
  {
    name: 'AMAZON.PageUpIntent',
    slots: [],
  },
  {
    name: 'AMAZON.PauseIntent',
    slots: [],
  },
  {
    name: 'AMAZON.PreviousIntent',
    slots: [],
  },
  {
    name: 'AMAZON.RepeatIntent',
    slots: [],
  },
  {
    name: 'AMAZON.ResumeIntent',
    slots: [],
  },
  {
    name: 'AMAZON.ScrollDownIntent',
    slots: [],
  },
  {
    name: 'AMAZON.ScrollLeftIntent',
    slots: [],
  },
  {
    name: 'AMAZON.ScrollRightIntent',
    slots: [],
  },
  {
    name: 'AMAZON.ScrollUpIntent',
    slots: [],
  },
  {
    name: 'AMAZON.SelectIntent',
    slots: ['Anaphor', 'ListPosition', 'PositionRelation', 'VisualModeTrigger'],
  },
  {
    name: 'AMAZON.ShuffleOffIntent',
    slots: [],
  },
  {
    name: 'AMAZON.ShuffleOnIntent',
    slots: [],
  },
  {
    name: 'AMAZON.StartOverIntent',
    slots: [],
  },
  {
    name: 'AMAZON.StopIntent',
    slots: [],
  },
  {
    name: 'AMAZON.YesIntent',
    slots: [],
  },
];

export const DEFAULT_INTENTS = {
  // English (AU,CA,US,UK,IN)
  en: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: ['cancel'],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: ['help'],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: ['stop'],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['yes', 'yea', 'ok', 'okay', 'yup', 'ya', 'sure'],
        keep: ['yes'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['no', 'nope', 'nay', 'nah', 'no way', 'negative'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: ['repeat', 'again', 'say again'],
      },
    ],
  },
  // French (CA,FR)
  fr: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: ['annuler', 'annule'],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: ['aidez-moi', 'aider', 'aide', 'aide moi', 'assistance', "j'ai besoin d'aide", 'je ne comprends pas'],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: ["s'arrêter", 'arrêter', 'arrête', 'stop', 'fin', 'cesser', 'mettre fin', 'stopper', 'mettre un terme', 'interrompre'],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['oui', 'yep', 'ok', 'bien sûr', 'ouais', 'ouaip', 'exactement', 'correct', 'okay', "d'accord"],
        keep: ['oui'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['non', 'nan', 'absolument pas', 'hors de question', 'bien sûr que non'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: [
          'repeat',
          'est-ce que tu peux répéter',
          'répète',
          'tu peux répéter',
          'dis-le à nouveau',
          'tu peux le redire',
          'redire ça',
          'répéter ça',
        ],
      },
    ],
  },
  // Japanese (JA)
  ja: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: ['取り消す', 'キャンセル', '取り消し', '取消'],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: [
          '助ける',
          '手伝う',
          'アシスト',
          '裏付ける',
          '手助け',
          '手伝い',
          '救済',
          '応援',
          '助',
          '手伝',
          '救い',
          '力添え',
          '扶助',
          '加勢',
          '援護',
          '佐',
          '介添え',
        ],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: [
          '止める',
          '立ち止まる',
          '止む',
          '打ち切る',
          '停める',
          '留める',
          '阻む',
          '途絶える',
          '句切る',
          '停まる',
          'ストップ',
          '終止',
          '停留',
          '止まること',
        ],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['yes', 'はい', 'ええ', 'そうです'],
        keep: ['はい'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['no', 'いいえ', 'そうだはない', 'いやそれどころか', 'ノン', '否', '否や'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: ['repeat', '繰り返す', '引き返す', '折れ返る', '返す'],
      },
    ],
  },
  // Italian (IT)
  it: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: ['cancellare', 'annullare', 'disdire', 'sopprimere', 'rescindre', 'chiudere', 'abrogare', 'obliterare'],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: [
          'la assistenza',
          'il aiuto',
          'il soccorso',
          'lo manforte',
          'la persona di servizio',
          'aiutare',
          'fare a meno di',
          'contribuire a',
          'assistere',
          'servire',
        ],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: [
          'la fermata',
          'il fermo',
          'lo stop',
          'la sosta',
          'la tappa',
          'fermare',
          'interrompere',
          'smettere',
          'fermarsi',
          'arrestare',
          'cessare',
          'sostare',
          'finire',
          'stoppare',
          'fare una fermata',
        ],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['yes', 'si', 'certo'],
        keep: ['si'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['il no', 'no', 'il rifiuto', 'la negazione', 'nessuno'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: ['repeat', '繰り返す', '引き返す', '折れ返る', '返す'],
      },
    ],
  },
  // Spanish (ES,MX)
  es: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: [
          'cancelar',
          'anular',
          'suprimir',
          'abolir',
          'dar anulación',
          'realizar anulación',
          'hacer anulación',
          'hacer dar anulación',
          'noun la cancelación',
          'la anulación',
        ],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: ['la ayuda', 'el favor', 'ei auxilio', 'el socorro', 'el empleado', 'la criada', 'ayudar', 'servir', 'auxiliar', 'socorrer'],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: ['detener', 'dejar', 'parar', 'suspender', 'cesar', 'pararse', 'terminar', 'de alto'],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['yes', 'si', 'sí', 'decir si'],
        keep: ['sí'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['no', 'ninguno', 'imposible', 'prohibido', 'la negativa', 'el voto negativo', 'el voto en contra'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: ['repeat', 'repetir', 'repetirse', 'reiterar', 'recitar', 'volver a dar'],
      },
    ],
  },
  // German (DE)
  de: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: ['stornieren', 'aufheben', 'kündigen', 'annullieren', 'beenden', 'absagen', 'abbestellen', 'abmelden', 'auflösen', 'zurücknehmen'],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: ['die hilfe', 'der beistand', 'die aushilfe', 'helfen', 'beitragen', 'behilflich sein', 'hilfe leisten'],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: [
          'der stopp',
          'der anschlag',
          'die haltestelle',
          'der registerzug',
          'stoppen',
          'aufhören',
          'beenden',
          'anhalten',
          'halten',
          'verhindern',
          'aufhalten',
          'unterbrechen',
          'abbrechen',
          'unterbinden',
          'einstellen',
          'abbestellen',
          'absetzen',
        ],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['yes', 'ja', 'doch', 'jawohl'],
        keep: ['ja'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['no', 'nein', 'kein', 'nicht'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: ['repeat', 'wiederholen', 'wiedergeben', 'repetieren', 'weitersagen'],
      },
    ],
  },
  // Portuguese (PT)
  pt: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: ['cancelar', 'anular', 'suspender'],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: ['ajudar', 'socorrer', 'auxiliar'],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: ['parar', 'terminar', 'impedir', 'fazer parar'],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: ['yes', 'sim', 'o sim', 'dizer sim'],
        keep: ['sim'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['no', 'não', 'negativa'],
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: ['repeat', 'repetir', 'reiterar', 'refazer', 'amiudar', 'recitar de cor'],
      },
    ],
  },
  // Hindi (IN)
  hi: {
    defaults: [
      {
        name: 'AMAZON.CancelIntent',
        samples: [
          'रद्द करो',
          'रद्द करना',
          'रद्द कर दो',
          'निरस्त करो',
          'निरस्त करना',
          'निरस्त कर दो',
          'काट दे',
          'काट दो',
          'काट देना',
          'वापस ले',
          'वापस लो',
          'वापस लेना',
          'कैन्सल्', // cancel and variations below
          'कैन्सल् करो',
          'कैन्सल् करना',
          'कैन्सल् कर दो',
        ],
      },
      {
        name: 'AMAZON.HelpIntent',
        samples: [
          'मदद',
          'मदद करो',
          'मदद करना',
          'मदद कर दो',
          'सहायता',
          'सहायता करो',
          'सहायता करना',
          'सहायता कर दो',
          'सहयोग',
          'सहयोग करो',
          'सहयोग करना',
          'सहयोग कर दो',
          'हेल्प्', // help and variations below
          'हेल्प् करो',
          'हेल्प् करना',
        ],
      },
      {
        name: 'AMAZON.StopIntent',
        samples: [
          'रुकें',
          'रोकना',
          'विराम',
          'रुको',
          'रुक',
          'रुकना',
          'रुक जाना',
          'बंद',
          'बंद करो',
          'बंद कर दो',
          'बंद करना',
          'स्टॉप्', // stop
        ],
      },
      {
        name: 'AMAZON.YesIntent',
        samples: [
          'हां',
          'हाँ',
          'ज़रूर',
          'अवश्य',
          'ठीक है',
          'ठीक',
          'अच्छा है',
          'अच्छा',
          'सही है',
          'सही',
          'अच्छी बात है',
          'पक्का',
          'बिल्कुल',
          'ऑल राइट्', // alright
          'डेफ़िनिट्ली', // definitely
          'येस्', // yes
          'येअ', // yeah
          'यप्', // yup
          'येप्', // yep
          'शुअ', // sure
          'ओके', // okay
        ],
        keep: ['हां'],
      },
      {
        name: 'AMAZON.NoIntent',
        samples: ['नहीं', 'ना', 'नेगटिव़्', 'नो', 'नोप्'], // negative, no, nope
      },
    ],
    built_ins: [
      {
        name: 'AMAZON.RepeatIntent',
        samples: [
          'फिर से',
          'फिर बोलाना',
          'फिर से बोलाना',
          'फिर बोलो',
          'फिर से बोलो',
          'फिर कहो',
          'फिर से कहना',
          'दुबारा से',
          'दुबारा कहो',
          'दुबारा से कहो',
          'दुबारा कहना',
          'दुबारा से कहना',
          'दुबारा बोलो',
          'दुबारा से बोलो',
          'दुबारा बोलाना',
          'दुबारा से बोलाना',
          'दुहराना',
          'एक बार और',
          'रिपीट्', // repeat and variations below
          'रिपीट् करना',
        ],
      },
    ],
  },
};

export const CATCH_ALL_INTENT = {
  en: {
    name: 'VoiceFlowIntent',
    samples: ['voice flow'],
  },
  fr: {
    name: 'VoiceFlowIntent',
    samples: ['Flux de voix'],
  },
  es: {
    name: 'VoiceFlowIntent',
    samples: ['Flujo de voz'],
  },
  de: {
    name: 'VoiceFlowIntent',
    samples: ['Sprachfluss'],
  },
  it: {
    name: 'VoiceFlowIntent',
    samples: ['Flusso vocale'],
  },
  ja: {
    name: 'VoiceFlowIntent',
    samples: ['音声フロー'],
  },
  pt: {
    name: 'VoiceFlowIntent',
    samples: ['Fluxo de voz'],
  },
  hi: {
    name: 'VoiceFlowIntent',
    samples: ['आवाज का प्रवाह'],
  },
};

export const BUILT_IN_INTENTS_GOOGLE = [];

/* eslint-enable sonarjs/no-duplicate-string */
