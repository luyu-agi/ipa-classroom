/* 英语音标教室 · 教学内容数据（DJ 音标体系，共 48 个音标） */

const MONOPHTHONGS = [
  {
    sym: "iː", cat: "前元音", len: "长元音",
    words: [
      { w: "see", ipa: "/siː/", zh: "看见" },
      { w: "tea", ipa: "/tiː/", zh: "茶" },
      { w: "read", ipa: "/riːd/", zh: "阅读" },
    ],
    tip: "嘴角用力向两边咧开，舌尖抵下齿，舌前部尽量抬高，声音拉长。",
    memo: "拍照喊 “cheese” 时的笑脸口型，像拉长的“衣——”。",
    q: { x: 74, y: 52 }, pair: "ɪ",
  },
  {
    sym: "ɪ", cat: "前元音", len: "短元音",
    words: [
      { w: "ship", ipa: "/ʃɪp/", zh: "船" },
      { w: "big", ipa: "/bɪɡ/", zh: "大的" },
      { w: "sit", ipa: "/sɪt/", zh: "坐" },
    ],
    tip: "舌位比 /iː/ 低一点、松一点，发音短促有力，不要拖长。",
    memo: "和 /iː/ 是“长短姐妹”：sheep 绵羊（长）— ship 船（短）。",
    q: { x: 118, y: 88 }, pair: "iː",
  },
  {
    sym: "e", cat: "前元音", len: "短元音",
    words: [
      { w: "bed", ipa: "/bed/", zh: "床" },
      { w: "pen", ipa: "/pen/", zh: "钢笔" },
      { w: "red", ipa: "/red/", zh: "红色" },
    ],
    tip: "舌尖抵下齿，口半开，上下齿之间大约能放下一根手指。",
    memo: "“一指宽”的口型，短促的“诶”，干脆利落。",
    q: { x: 92, y: 138 }, pair: "æ",
  },
  {
    sym: "æ", cat: "前元音", len: "短元音",
    words: [
      { w: "cat", ipa: "/kæt/", zh: "猫" },
      { w: "bag", ipa: "/bæɡ/", zh: "包" },
      { w: "apple", ipa: "/ˈæp.l̩/", zh: "苹果" },
    ],
    tip: "口张到最大，嘴角向两边拉扁，舌尖抵下齿，舌前部压低。",
    memo: "常叫“梅花音”，像咬一大口苹果时扁扁的“爱”。",
    q: { x: 84, y: 214 }, pair: "e",
  },
  {
    sym: "ɜː", cat: "中元音", len: "长元音",
    words: [
      { w: "bird", ipa: "/bɜːd/", zh: "鸟" },
      { w: "work", ipa: "/wɜːk/", zh: "工作" },
      { w: "nurse", ipa: "/nɜːs/", zh: "护士" },
    ],
    tip: "舌身平放在口腔中央，双唇自然扁平，发音平稳拉长。",
    memo: "像思考时拖长的“呃——”；美式英语里带卷舌（bir-d）。",
    q: { x: 192, y: 152 }, pair: "ə",
  },
  {
    sym: "ə", cat: "中元音", len: "短元音",
    words: [
      { w: "about", ipa: "/əˈbaʊt/", zh: "关于" },
      { w: "teacher", ipa: "/ˈtiː.tʃə/", zh: "老师" },
      { w: "banana", ipa: "/bəˈnɑː.nə/", zh: "香蕉" },
    ],
    tip: "全口腔最放松的音：舌、唇、下巴都不用力，只出现在非重读音节。",
    memo: "外号“懒音”——累了一天随口哼出的“呃”，是英语里出现最多的音。",
    q: { x: 206, y: 122 }, pair: "ɜː",
  },
  {
    sym: "ʌ", cat: "后元音", len: "短元音",
    words: [
      { w: "cup", ipa: "/kʌp/", zh: "杯子" },
      { w: "love", ipa: "/lʌv/", zh: "爱" },
      { w: "bus", ipa: "/bʌs/", zh: "公交车" },
    ],
    tip: "口半开，舌中部稍微抬起，发音短促，带点“闷”。",
    memo: "像被轻轻戳了一下发出的短“啊”，位置比 /ɑː/ 靠前靠上。",
    q: { x: 224, y: 190 }, pair: "ɑː",
  },
  {
    sym: "ɑː", cat: "后元音", len: "长元音",
    words: [
      { w: "car", ipa: "/kɑː/", zh: "汽车" },
      { w: "father", ipa: "/ˈfɑː.ðə/", zh: "父亲" },
      { w: "ask", ipa: "/ɑːsk/", zh: "问" },
    ],
    tip: "口尽量张大，舌身后缩、压平压低，声音饱满拉长。",
    memo: "看医生时张大嘴说的“啊——”，就是它。",
    q: { x: 262, y: 238 }, pair: "ʌ",
  },
  {
    sym: "ɒ", cat: "后元音", len: "短元音",
    words: [
      { w: "hot", ipa: "/hɒt/", zh: "热的" },
      { w: "dog", ipa: "/dɒɡ/", zh: "狗" },
      { w: "box", ipa: "/bɒks/", zh: "盒子" },
    ],
    tip: "口张大，双唇略微收圆，短促干脆（典型英式发音）。",
    memo: "短促的圆唇“哦”；美音常把它读成 /ɑː/（hot → hɑt）。",
    q: { x: 296, y: 232 }, pair: "ɔː",
  },
  {
    sym: "ɔː", cat: "后元音", len: "长元音",
    words: [
      { w: "door", ipa: "/dɔː/", zh: "门" },
      { w: "four", ipa: "/fɔː/", zh: "四" },
      { w: "talk", ipa: "/tɔːk/", zh: "谈话" },
    ],
    tip: "双唇收圆并向前突出，舌后部抬高，声音拉长。",
    memo: "拉长音的“哦——”；看到 al / au / or 常发此音。",
    q: { x: 300, y: 178 }, pair: "ɒ",
  },
  {
    sym: "ʊ", cat: "后元音", len: "短元音",
    words: [
      { w: "book", ipa: "/bʊk/", zh: "书" },
      { w: "good", ipa: "/ɡʊd/", zh: "好的" },
      { w: "put", ipa: "/pʊt/", zh: "放" },
    ],
    tip: "双唇稍圆但不前突，舌后部抬起，发音短促放松。",
    memo: "短促的“乌”；oo / ou 里很常见（book、could）。",
    q: { x: 308, y: 118 }, pair: "uː",
  },
  {
    sym: "uː", cat: "后元音", len: "长元音",
    words: [
      { w: "food", ipa: "/fuːd/", zh: "食物" },
      { w: "blue", ipa: "/bluː/", zh: "蓝色" },
      { w: "two", ipa: "/tuː/", zh: "二" },
    ],
    tip: "双唇收成最小的圆并用力前突，舌后部抬到最高，声音拉长。",
    memo: "火车汽笛“呜——”，是所有元音里嘴唇撮得最圆的。",
    q: { x: 330, y: 64 }, pair: "ʊ",
  },
];

const DIPHTHONGS = [
  {
    sym: "eɪ", cat: "合口双元音", slide: "e → ɪ",
    words: [
      { w: "day", ipa: "/deɪ/", zh: "天、日子" },
      { w: "name", ipa: "/neɪm/", zh: "名字" },
      { w: "cake", ipa: "/keɪk/", zh: "蛋糕" },
    ],
    tip: "由 /e/ 滑向 /ɪ/，口型由半开慢慢合拢，前长后短、前重后轻。",
    memo: "就是字母 A 的读音：A = /eɪ/。",
  },
  {
    sym: "aɪ", cat: "合口双元音", slide: "a → ɪ",
    words: [
      { w: "my", ipa: "/maɪ/", zh: "我的" },
      { w: "time", ipa: "/taɪm/", zh: "时间" },
      { w: "like", ipa: "/laɪk/", zh: "喜欢" },
    ],
    tip: "由 /a/ 滑向 /ɪ/，口型由大收到小，滑动要连贯。",
    memo: "就是字母 I 的读音，像中文的“爱”。",
  },
  {
    sym: "ɔɪ", cat: "合口双元音", slide: "ɔ → ɪ",
    words: [
      { w: "boy", ipa: "/bɔɪ/", zh: "男孩" },
      { w: "toy", ipa: "/tɔɪ/", zh: "玩具" },
      { w: "enjoy", ipa: "/ɪnˈdʒɔɪ/", zh: "享受" },
    ],
    tip: "由 /ɔ/ 滑向 /ɪ/，唇形由圆滑向扁。",
    memo: "看到 oi / oy 就读它，像惊喜时的“噢—咦”。",
  },
  {
    sym: "əʊ", cat: "合口双元音", slide: "ə → ʊ",
    words: [
      { w: "go", ipa: "/ɡəʊ/", zh: "去" },
      { w: "home", ipa: "/həʊm/", zh: "家" },
      { w: "no", ipa: "/nəʊ/", zh: "不" },
    ],
    tip: "由 /ə/ 滑向 /ʊ/，双唇由放松渐渐收圆。",
    memo: "字母 O 的英式读音，先松后圆；美音常写作 /oʊ/。",
  },
  {
    sym: "aʊ", cat: "合口双元音", slide: "a → ʊ",
    words: [
      { w: "now", ipa: "/naʊ/", zh: "现在" },
      { w: "house", ipa: "/haʊs/", zh: "房子" },
      { w: "cow", ipa: "/kaʊ/", zh: "奶牛" },
    ],
    tip: "由 /a/ 滑向 /ʊ/，口型由大渐渐收成小圆。",
    memo: "像被烫到的“啊呜”；ou / ow 是它的常见拼写。",
  },
  {
    sym: "ɪə", cat: "集中双元音", slide: "ɪ → ə",
    words: [
      { w: "ear", ipa: "/ɪə/", zh: "耳朵" },
      { w: "here", ipa: "/hɪə/", zh: "这里" },
      { w: "idea", ipa: "/aɪˈdɪə/", zh: "主意" },
    ],
    tip: "由 /ɪ/ 滑向中央的 /ə/，口型由扁到放松。",
    memo: "“耳朵”ear 里就藏着它——用 ear 听“伊尔”。",
  },
  {
    sym: "eə", cat: "集中双元音", slide: "e → ə",
    words: [
      { w: "air", ipa: "/eə/", zh: "空气" },
      { w: "where", ipa: "/weə/", zh: "哪里" },
      { w: "hair", ipa: "/heə/", zh: "头发" },
    ],
    tip: "由 /e/ 滑向 /ə/，口型由半开放松到自然。",
    memo: "“空气”air——先“诶”再懒懒收成的“尔”。",
  },
  {
    sym: "ʊə", cat: "集中双元音", slide: "ʊ → ə",
    words: [
      { w: "tour", ipa: "/tʊə/", zh: "旅行" },
      { w: "poor", ipa: "/pʊə/", zh: "贫穷的" },
      { w: "sure", ipa: "/ʃʊə/", zh: "确定的" },
    ],
    tip: "由 /ʊ/ 滑向 /ə/，双唇由稍圆到放松。",
    memo: "tour（旅行）时一路感叹的“乌—尔”。",
  },
];

/* 辅音：成对的清浊音放在一起，便于对比教学 */
const CONSONANT_GROUPS = [
  {
    name: "爆破音", en: "Plosives", desc: "气流先被完全堵住，再突然冲开，像小小的“爆炸”。",
    pairs: [
      {
        voiceless: "p", voiced: "b",
        items: [
          { sym: "p", words: [{ w: "pen", ipa: "/pen/", zh: "钢笔" }, { w: "map", ipa: "/mæp/", zh: "地图" }], tip: "双唇紧闭后突然张开，气流冲出，不振动声带。", memo: "像吹灭蜡烛的“噗”，手放嘴前能感觉到气流。" },
          { sym: "b", words: [{ w: "book", ipa: "/bʊk/", zh: "书" }, { w: "job", ipa: "/dʒɒb/", zh: "工作" }], tip: "口型和 /p/ 一样，但声带振动、气流弱。", memo: "摸喉咙：/b/ 嗡嗡振动，/p/ 安静无振。" },
        ],
      },
      {
        voiceless: "t", voiced: "d",
        items: [
          { sym: "t", words: [{ w: "tea", ipa: "/tiː/", zh: "茶" }, { w: "cat", ipa: "/kæt/", zh: "猫" }], tip: "舌尖抵上齿龈，突然放开让气流冲出。", memo: "像轻轻打响舌头的“特”，短促清脆。" },
          { sym: "d", words: [{ w: "dog", ipa: "/dɒɡ/", zh: "狗" }, { w: "bed", ipa: "/bed/", zh: "床" }], tip: "与 /t/ 同位置，但声带振动。", memo: "“特 / 的”一对：d 是带振动的 t。" },
        ],
      },
      {
        voiceless: "k", voiced: "g",
        items: [
          { sym: "k", words: [{ w: "kite", ipa: "/kaɪt/", zh: "风筝" }, { w: "back", ipa: "/bæk/", zh: "后面" }], tip: "舌后部抬起抵住软腭，突然放开。", memo: "咳嗽前的那个“咳”声母，干脆有力。" },
          { sym: "g", words: [{ w: "go", ipa: "/ɡəʊ/", zh: "去" }, { w: "egg", ipa: "/eɡ/", zh: "鸡蛋" }], tip: "与 /k/ 同位置，但声带振动。", memo: "“哥”的声母，是带振动的 k。" },
        ],
      },
    ],
  },
  {
    name: "摩擦音", en: "Fricatives", desc: "留出一条窄缝，让气流挤过去发出“嘶嘶”的摩擦声。",
    pairs: [
      {
        voiceless: "f", voiced: "v",
        items: [
          { sym: "f", words: [{ w: "fish", ipa: "/fɪʃ/", zh: "鱼" }, { w: "leaf", ipa: "/liːf/", zh: "树叶" }], tip: "上齿轻咬下唇，气流从缝隙挤出。", memo: "像吹凉热汤时唇间漏气的“夫”。" },
          { sym: "v", words: [{ w: "very", ipa: "/ˈver.i/", zh: "非常" }, { w: "five", ipa: "/faɪv/", zh: "五" }], tip: "与 /f/ 同口型，但声带振动。", memo: "咬唇说“呜——”带振动，摩托启动的“vvv”。" },
        ],
      },
      {
        voiceless: "s", voiced: "z",
        items: [
          { sym: "s", words: [{ w: "sun", ipa: "/sʌn/", zh: "太阳" }, { w: "bus", ipa: "/bʌs/", zh: "公交车" }], tip: "舌尖靠近齿龈，气流从窄缝挤出成丝。", memo: "蛇吐信的“嘶嘶嘶”。" },
          { sym: "z", words: [{ w: "zoo", ipa: "/zuː/", zh: "动物园" }, { w: "nose", ipa: "/nəʊz/", zh: "鼻子" }], tip: "与 /s/ 同位置，但声带振动。", memo: "蜜蜂飞过的“嗡嗡（zzz）”。" },
        ],
      },
      {
        voiceless: "θ", voiced: "ð",
        items: [
          { sym: "θ", words: [{ w: "think", ipa: "/θɪŋk/", zh: "思考" }, { w: "three", ipa: "/θriː/", zh: "三" }], tip: "舌尖轻吐在上下齿之间，吹出气流，不振动声带。", memo: "“咬舌音”：th 一出现，先轻轻咬住舌尖。" },
          { sym: "ð", words: [{ w: "this", ipa: "/ðɪs/", zh: "这个" }, { w: "mother", ipa: "/ˈmʌð.ə/", zh: "妈妈" }], tip: "同样咬舌，但声带振动。", memo: "this、that、mother——最常见的 th 其实是浊音。" },
        ],
      },
      {
        voiceless: "ʃ", voiced: "ʒ",
        items: [
          { sym: "ʃ", words: [{ w: "ship", ipa: "/ʃɪp/", zh: "船" }, { w: "English", ipa: "/ˈɪŋ.ɡlɪʃ/", zh: "英语" }], tip: "舌前部抬向硬腭，双唇稍前突，气流宽缝摩擦。", memo: "示意别人安静时的“嘘——”。" },
          { sym: "ʒ", words: [{ w: "vision", ipa: "/ˈvɪʒ.ən/", zh: "视野" }, { w: "usually", ipa: "/ˈjuː.ʒu.ə.li/", zh: "通常" }], tip: "与 /ʃ/ 同位置，但声带振动。", memo: "television 中间那个音，是带振动的“嘘”。" },
        ],
      },
      {
        voiceless: "h", voiced: null,
        items: [
          { sym: "h", words: [{ w: "hat", ipa: "/hæt/", zh: "帽子" }, { w: "hello", ipa: "/həˈləʊ/", zh: "你好" }], tip: "口型随意，气流从喉咙自然呼出，不振动声带。", memo: "冬天往玻璃上哈气的“呵——”。" },
        ],
      },
    ],
  },
  {
    name: "破擦音", en: "Affricates", desc: "先堵住再摩擦，爆破音和摩擦音“二合一”。",
    pairs: [
      {
        voiceless: "tʃ", voiced: "dʒ",
        items: [
          { sym: "tʃ", words: [{ w: "chair", ipa: "/tʃeə/", zh: "椅子" }, { w: "watch", ipa: "/wɒtʃ/", zh: "手表" }], tip: "先发 /t/ 立刻滑入 /ʃ/，一气呵成。", memo: "火车进站的“吃——”，ch 常发此音。" },
          { sym: "dʒ", words: [{ w: "job", ipa: "/dʒɒb/", zh: "工作" }, { w: "juice", ipa: "/dʒuːs/", zh: "果汁" }], tip: "先发 /d/ 立刻滑入 /ʒ/，声带振动。", memo: "“橘子”juice 的第一个音，像“知”。" },
        ],
      },
      {
        voiceless: "tr", voiced: "dr",
        items: [
          { sym: "tr", words: [{ w: "tree", ipa: "/triː/", zh: "树" }, { w: "train", ipa: "/treɪn/", zh: "火车" }], tip: "舌尖抵齿龈后缩，/t/ 与 /r/ 快速连读。", memo: "像“戳”：truck、tree 都是它。" },
          { sym: "dr", words: [{ w: "dream", ipa: "/driːm/", zh: "梦" }, { w: "drink", ipa: "/drɪŋk/", zh: "喝" }], tip: "与 /tr/ 同位置，但声带振动。", memo: "像“捉”：drum、drop 开头都有它。" },
        ],
      },
      {
        voiceless: "ts", voiced: "dz",
        items: [
          { sym: "ts", words: [{ w: "cats", ipa: "/kæts/", zh: "猫（复数）" }, { w: "hats", ipa: "/hæts/", zh: "帽子（复数）" }], tip: "/t/ 和 /s/ 快速相连，常出现在名词复数词尾。", memo: "像“次”的声母；词尾 -ts 一滑而过。" },
          { sym: "dz", words: [{ w: "beds", ipa: "/bedz/", zh: "床（复数）" }, { w: "hands", ipa: "/hændz/", zh: "手（复数）" }], tip: "/d/ 和 /z/ 快速相连，声带振动。", memo: "像“资”的浊音版；复数 -ds 的读法。" },
        ],
      },
    ],
  },
  {
    name: "鼻音", en: "Nasals", desc: "口腔堵住，让声音从鼻腔出来，声带都振动。",
    pairs: [
      {
        voiceless: null, voiced: null,
        items: [
          { sym: "m", words: [{ w: "man", ipa: "/mæn/", zh: "男人" }, { w: "mum", ipa: "/mʌm/", zh: "妈妈" }], tip: "双唇紧闭，声音从鼻腔出来。", memo: "吃到美食时满足的“嗯——姆”。" },
          { sym: "n", words: [{ w: "nose", ipa: "/nəʊz/", zh: "鼻子" }, { w: "ten", ipa: "/ten/", zh: "十" }], tip: "舌尖抵上齿龈，声音从鼻腔出来。", memo: "“呢”的声母；捏住鼻子就发不出它。" },
          { sym: "ŋ", words: [{ w: "sing", ipa: "/sɪŋ/", zh: "唱歌" }, { w: "morning", ipa: "/ˈmɔː.nɪŋ/", zh: "早晨" }], tip: "舌后部抬起抵软腭（像发 k/g 的位置），声音走鼻腔。", memo: "英-ing 的结尾：sing 后不能加“g”的音。" },
        ],
      },
    ],
  },
  {
    name: "舌侧音与半元音", en: "Lateral & Semi-vowels", desc: "气流从舌头两侧溜走，或像元音一样顺滑地滑过去。",
    pairs: [
      {
        voiceless: null, voiced: null,
        items: [
          { sym: "l", words: [{ w: "leg", ipa: "/leɡ/", zh: "腿" }, { w: "ball", ipa: "/bɔːl/", zh: "球" }], tip: "舌尖抵上齿龈，气流从舌头两侧流出。", memo: "“了”的声母；词尾的 l（ball）舌尖别放下。" },
          { sym: "j", words: [{ w: "yes", ipa: "/jes/", zh: "是" }, { w: "music", ipa: "/ˈmjuː.zɪk/", zh: "音乐" }], tip: "舌前部抬向硬腭，快速滑向后面的元音。", memo: "像很短的“耶”；字母 u 常自带它（music）。" },
          { sym: "w", words: [{ w: "we", ipa: "/wiː/", zh: "我们" }, { w: "water", ipa: "/ˈwɔː.tə/", zh: "水" }], tip: "双唇收圆前突，快速滑向后面的元音。", memo: "像很短的“乌”滑出去：we = w + /iː/。" },
          { sym: "r", words: [{ w: "red", ipa: "/red/", zh: "红色" }, { w: "read", ipa: "/riːd/", zh: "阅读" }], tip: "舌尖卷起但不碰上腭，双唇稍圆，声带振动。", memo: "不是中文的“日”——舌头悬空、不摩擦。" },
        ],
      },
    ],
  },
];

/* 最小对立对：只差一个音，意思完全不同 */
const MINIMAL_PAIRS = [
  { a: { w: "ship", ipa: "/ʃɪp/", zh: "船" }, b: { w: "sheep", ipa: "/ʃiːp/", zh: "绵羊" }, focus: "ɪ vs iː" },
  { a: { w: "bad", ipa: "/bæd/", zh: "坏的" }, b: { w: "bed", ipa: "/bed/", zh: "床" }, focus: "æ vs e" },
  { a: { w: "full", ipa: "/fʊl/", zh: "满的" }, b: { w: "fool", ipa: "/fuːl/", zh: "傻瓜" }, focus: "ʊ vs uː" },
  { a: { w: "cat", ipa: "/kæt/", zh: "猫" }, b: { w: "cut", ipa: "/kʌt/", zh: "切" }, focus: "æ vs ʌ" },
  { a: { w: "walk", ipa: "/wɔːk/", zh: "走路" }, b: { w: "work", ipa: "/wɜːk/", zh: "工作" }, focus: "ɔː vs ɜː" },
  { a: { w: "think", ipa: "/θɪŋk/", zh: "思考" }, b: { w: "sink", ipa: "/sɪŋk/", zh: "下沉" }, focus: "θ vs s" },
];

/* 听音辨词小测验题库 */
const QUIZ_POOL = [
  { word: "sheep", zh: "绵羊", answer: "iː", options: ["iː", "ɪ", "eɪ"] },
  { word: "cat", zh: "猫", answer: "æ", options: ["æ", "e", "ʌ"] },
  { word: "food", zh: "食物", answer: "uː", options: ["ʊ", "uː", "əʊ"] },
  { word: "think", zh: "思考", answer: "θ", options: ["s", "θ", "ð"] },
  { word: "bird", zh: "鸟", answer: "ɜː", options: ["ə", "ɜː", "ʌ"] },
  { word: "boy", zh: "男孩", answer: "ɔɪ", options: ["aɪ", "əʊ", "ɔɪ"] },
  { word: "ship", zh: "船", answer: "ɪ", options: ["iː", "ɪ", "e"] },
  { word: "chair", zh: "椅子", answer: "tʃ", options: ["tʃ", "dʒ", "ʃ"] },
  { word: "sing", zh: "唱歌", answer: "ŋ", options: ["n", "m", "ŋ"] },
  { word: "house", zh: "房子", answer: "aʊ", options: ["əʊ", "aʊ", "ɔː"] },
];
