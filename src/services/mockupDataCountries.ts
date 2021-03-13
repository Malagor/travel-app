export const countries = [
  {
    id: 1,
    name: {
      en: 'Belarus',
      ru: 'Беларусь',
      be: 'Жыве Вечна',
    },
    capital: {
      en: 'Minsk',
      ru: 'Минск',
      be: 'Мiнск',
    },
    currency: 'BYN',
    description: {
      en:
        'The Republic of Belarus is located in the center of Europe. The shortest transport links connecting the CIS countries with the states of Western Europe run through its territory. Belarus shares borders with Poland, Lithuania, Latvia, Russia and Ukraine.',
      ru:
        'Республика Беларусь расположена в центре Европы. По её территории пролегают самые короткие транспортные коммуникации, связывающие страны СНГ с государствами Западной Европы. Беларусь имеет общую границу с Польшей, Литвой, Латвией, Россией и Украиной.',
      be:
        'Рэспубліка Беларусь размешчана ў цэнтры Еўропы. Па яе тэрыторыі пралягаюць самыя кароткія транспартныя камунікацыі, якія звязваюць краіны СНД з дзяржавамі Заходняй Еўропы. Беларусь мае агульную мяжу з Польшчай, Літвой, Латвіяй, Расіяй і Украінай.',
    },
    photos: [
      `https://picsum.photos/id/500/400/300`
    ],
    videos: ['https://www.youtube-nocookie.com/embed/vE9S-6DNM5k'],
    attractions: [
      {
        photo: 'https://i.ibb.co/sy3mLbP/1.jpg',
        name: {
          en: 'Brest Fortress',
          ru: 'Брестская крепость',
          be: 'Брэсцкая крэпасць',
        },
        description: {
          en: 'Fortification complex of the XIX - early XX centuries in Brest.',
          ru: 'Комплекс оборонных сооружений XIX — начала XX веков в Бресте.',
          be:
            'Комплекс абарончых збудаванняў XIX — пачатку XX стагоддзяў у Брэсце.',
        },
      },
      {
        photo: 'https://i.ibb.co/fNjhXLK/2.jpg',
        name: {
          en: 'Mir Castle',
          ru: 'Мирский замок',
          be: 'Мірскі замак',
        },
        description: {
          en: 'A historic fortified castle and a UNESCO World Heritage site.',
          ru: 'Оборонительное укрепление и объект Всемирного наследия ЮНЭСКО.',
          be:
            'Замак які ўваходзіць у Спіс сусветнай культурнай і прыроднай спадчыны ЮНЕСКА.',
        },
      },
      {
        photo: 'https://i.ibb.co/ZSrm5ZG/3.jpg',
        name: {
          en: 'Belovezhskaya Pushcha',
          ru: 'Беловежская пуща',
          be: 'Белавежская пушча',
        },
        description: {
          en: 'One of the oldest reserved forests in Europe.',
          ru: 'Один из самых старых заповедных лесных массивов Европы.',
          be: 'Адзін з самых старых запаведных лясных масіваў Еўропы.',
        },
      },
      {
        photo: 'https://i.ibb.co/n6P7tf5/4.jpg',
        name: {
          en: 'Nesvizh Castle',
          ru: 'Несвижский замок',
          be: 'Нясвіжскі замак',
        },
        description: {
          en: 'An architectural monument of the XVI-XVIII centuries.',
          ru: 'Памятник архитектуры XVI—XVIII веков.',
          be: 'Помнік архітэктуры XVI—XVIII стагоддзяў.',
        },
      },
      {
        photo: 'https://i.ibb.co/WHWbtbs/5.jpg',
        name: {
          en: 'Puslovsky Palace',
          ru: 'Дворец Пусловских',
          be: 'Палац Пуслоўскіх',
        },
        description: {
          en: 'Neo-Gothic palace built in the form of a castle.',
          ru: 'Дворец в неоготическом стиле, выполненный в виде замка.',
          be: 'Неагатычны палац у выглядзе абарончага замка.',
        },
      },
      {
        photo: 'https://i.ibb.co/ypmpS82/6.jpg',
        name: {
          en: 'Rumyantsev-Paskevich Residence',
          ru: 'Дворец Румянцевых-Паскевичей',
          be: 'Палац Румянцавых і Паскевічаў',
        },
        description: {
          en:
            'An architectural monument of the XVIII-XIX centuries, the main attraction of Gomel city.',
          ru:
            'Памятник архитектуры XVIII—XIX веков, главная достопримечательность города Гомеля.',
          be:
            'Помнік архітэктуры XVIII—XIX стагоддзяў, галоўная славутасць горада Гомеля.',
        },
      },
      {
        photo: 'https://i.ibb.co/9sYVsZ1/7.jpg',
        name: {
          en: 'Church of Holy Trinity in Gervyaty',
          ru: 'Церковь Святой Троицы в Гервятах',
          be: 'Касцёл Найсвяцейшае Тройцы ў Гервятах',
        },
        description: {
          en: 'Neo-Gothic catholic church built in 1899-1903.',
          ru: 'Костёл в неоготическом стиле, построенный в 1899—1903 гг.',
          be:
            'Рымска-каталіцкі храм, пабудаваны ў 1899—1903 гадах у неагатычным стылі.',
        },
      },
      {
        photo: 'https://i.ibb.co/X7dcJ4c/8.jpg',
        name: {
          en: 'Narachanski National Park',
          ru: 'Нарочанский национальный парк',
          be: 'Нарачанскі нацыянальны парк',
        },
        description: {
          en:
            'A national park established in 1999 in an effort to preserve unique natural complexes.',
          ru:
            'Национальный парк, основанный в 1999 году в целях сохранения уникальных природных комплексов.',
          be:
            'Нацыянальны парк, створаны ў 1999 годзе ў мэтах захавання ўнікальных прыродных комплексаў.',
        },
      },
      {
        photo: 'https://i.ibb.co/XSpRLg8/9.jpg',
        name: {
          en: 'St. Francis Xavier Cathedral',
          ru: 'Кафедральный собор Св. Франциска Ксаверия',
          be: 'Кафедральны касцёл Св. Францішка Ксаверыя',
        },
        description: {
          en:
            'A Roman Catholic cathedral in Grodno, an architectural monument built in Baroque style.',
          ru:
            'Католический собор в городе Гродно, памятник архитектуры и декоративно-монументального искусства барокко.',
          be:
            'Каталіцкі сабор у горадзе Гродна, помнік архітэктуры і дэкаратыўна-манументальнага мастацтва барока.',
        },
      },
      {
        photo: 'https://i.ibb.co/jyB8Nvz/10.jpg',
        name: {
          en: 'The National Academic Grand Opera and Ballet Theatre',
          ru: 'Национальный академический Большой театр оперы и балета',
          be: 'Нацыянальны акадэмічны Вялікі тэатр оперы і балета',
        },
        description: {
          en:
            'The only theater of opera and ballet in Belarus, the leading musical and theatrical site in the country.',
          ru:
            'Единственный театр оперы и балета в Белоруссии, главная музыкальная и театральная площадка страны.',
          be:
            'Адзіны ў Беларусі тэатр оперы і балета, галоўная музычная і тэатральная пляцоўка краіны.',
        },
      },
    ],
  },
  {
    id: 2,
    name: {
      en: 'Ukraine',
      ru: 'Украина',
      be: 'Украiна',
    },
    capital: {
      en: 'Kiev',
      ru: 'Киев',
      be: 'Кiев',
    },
    currency: 'UAH',
    description: {
      en:
        'Ukraine is a large country in Eastern Europe, known for its Orthodox churches, Black Sea resorts, and wooded mountains. In Kiev, the capital of the country, there is the St. Sophia Cathedral, decorated with golden domes, mosaics of the XI century and frescoes. Above the Dnieper River rises the monastery of the Kiev-Pechersk Lavra, a place of pilgrimage for many Orthodox Christians. Religious relics are kept in its monasteries, and the mummified remains of Orthodox monks are kept in the catacombs.',
      ru:
        'Украина – это большая страна в Восточной Европе, известная православными церквями, черноморскими курортами и лесистыми горами. В Киеве, столице страны, расположен Софийский собор, украшенный золотыми куполами, мозаикой XI века и фресками. Над рекой Днепр возвышается монастырь Киево-Печерская лавра, место паломничества многих православных христиан. В ее скитах хранятся религиозные реликвии, а в катакомбах – мумифицированные останки православных монахов. ',
      be:
        'Украіна-гэта вялікая краіна ва Усходняй Еўропе, вядомая праваслаўнымі цэрквамі, чарнаморскімі курортамі і лясістымі гарамі. У Кіеве, сталіцы краіны, размешчаны Сафійскі сабор, упрыгожаны залатымі купаламі, мазаікай XI стагоддзя і фрэскамі. Над ракой Днепр узвышаецца манастыр Кіева-Пячэрская лаўра, месца паломніцтва многіх праваслаўных хрысціян. У яе скіт захоўваюцца рэлігійныя рэліквіі, а ў катакомбах – муміфікавалі астанкі праваслаўных манахаў.',
    },
    photos: [`https://picsum.photos/id/600/400/300`],
    videos: ['https://www.youtube-nocookie.com/embed/3sR_13IyHXg'],
    attractions: [
      {
        photo: 'https://i.ibb.co/j8SKYKW/1.jpg',
        name: {
          en: 'Kyiv-Pechersk Lavra',
          ru: 'Киево-Печерская лавра',
          be: 'Кіева-Пячэрская лаўра',
        },
        description: {
          en: "One of the very first monasteries founded in Kievan Rus'.",
          ru: 'Один из первых по времени основания монастырей Киевской Руси.',
          be: 'Адзін з першых па часу заснавання манастыроў Кіеўскай Русі.',
        },
      },
      {
        photo: 'https://i.ibb.co/2N88Thk/2.jpg',
        name: {
          en: 'The Khotyn Fortress',
          ru: 'Хотинская крепость',
          be: 'Хацінская крэпасць',
        },
        description: {
          en:
            'A XIII—XVII centuries fortress, located on the shores of the Dniester River.',
          ru: 'Крепость XIII—XVII веков на берегу Днестра.',
          be: 'Крэпасць XIII—XVIII стагоддзяў на беразе Днястра.',
        },
      },
      {
        photo: 'https://i.ibb.co/KGSmjHX/3.jpg',
        name: {
          en: 'Saint Sophia Cathedral',
          ru: 'Софийский собор',
          be: 'Сафійскі сабор',
        },
        description: {
          en: "One of the Kievan Rus' period buildings remained.",
          ru: 'Одно из немногих уцелевших зданий времён Киевской Руси.',
          be: 'Адзін з нешматлікіх ацалелых будынкаў часоў Кіеўскай Русі.',
        },
      },
      {
        photo: 'https://i.ibb.co/zbKNxzf/4.jpg',
        name: {
          en: 'Kamianets-Podilskyi Castle',
          ru: 'Каменец-Подольская крепость',
          be: 'Камянец-Падольскі замак',
        },
        description: {
          en: 'Medieval castle in Ukraine.',
          ru: 'Средневековый замок в Украине.',
          be: 'Cярэднявечны замак у Украіне.',
        },
      },
      {
        photo: 'https://i.ibb.co/vj1hDQD/5.jpg',
        name: {
          en: 'Lake Synevyr',
          ru: 'Озеро Синевир',
          be: 'Возера Сінявір',
        },
        description: {
          en:
            'The largest mountain lake in Ukraine and the most famous lake in the Carpathian Mountains of Ukraine.',
          ru:
            'Крупнейшее по площади горное озеро Украины, а также самое известное озеро в Украинских Карпатах.',
          be:
            'Найвялікшае па плошчы горнае возера Украіны, а таксама самае вядомае возера ў Украінскіх Карпатах.',
        },
      },
      {
        photo: 'https://i.ibb.co/5RnXg2s/6.jpg',
        name: {
          en: 'Lutsk Castle ',
          ru: 'Луцкий замок',
          be: 'Луцкі замак',
        },
        description: {
          en:
            'One of the largest, oldest and best preserved castles in Ukraine.',
          ru:
            'Один из крупнейших, старейших и наиболее хорошо сохранившихся на Украине замков.',
          be:
            "З'яўляцца адным з найбуйнейшых, найстарэйшых і найболей добра захаваных замкаў ва Украіне.",
        },
      },
      {
        photo: 'https://i.ibb.co/qMspZ3v/7.jpg',
        name: {
          en: 'Holy Dormition Pochayiv Lavra',
          ru: 'Свято-Успенская Почаевская лавра',
          be: 'Свята-Успенская Пачаіўская лаўра',
        },
        description: {
          en:
            'The foremost spiritual and ideological centre of various Orthodox denominations in Western Ukraine.',
          ru:
            'Крупнейший православный храмовый комплекс и монастырь на Западной Украине.',
          be:
            'Самая вялікая праваслаўная святыня Валыні і ўсёй Заходняй Украіны.',
        },
      },
      {
        photo: 'https://i.ibb.co/FYsHJzF/8.jpg',
        name: {
          en: 'Bilhorod-Dnistrovskyi fortress',
          ru: 'Белгород-Днестровская крепость',
          be: 'Белгарад-Днястроўская крэпасць',
        },
        description: {
          en:
            'A historical and architectural monument of the XIII-XV centuries.',
          ru: 'Памятник истории и градостроительства XIII—XV столетий.',
          be: 'Помнік гісторыі і горадабудаўніцтва XIII—XV стагоддзяў.',
        },
      },
      {
        photo: 'https://i.ibb.co/tL2PsMJ/9.jpg',
        name: {
          en: "Lviv's Old Town",
          ru: 'Исторический центр Львова',
          be: 'Гістарычны цэнтр Львова',
        },
        description: {
          en:
            'The oldest part of the Old Town is included in the World Heritage list.',
          ru:
            'Наиболее древняя часть Старого города внесена в список всемирного наследия ЮНЕСКО.',
          be:
            'Найбольш старажытная частка Старога горада занесена ў спіс Сусветнай спадчыны ЮНЕСКА.',
        },
      },
      {
        photo: 'https://i.ibb.co/sy5Sqsg/10.jpg',
        name: {
          en: 'Mukachevo Castle',
          ru: 'Мукачевский замок',
          be: 'Мукачаўскі замак',
        },
        description: {
          en: 'Castle located on a former 68 metre high volcanic hill.',
          ru:
            'Замок, расположенный на горе вулканического происхождения высотой 68 метров.',
          be:
            'Замак, размешчаны на высокім вулканічным конусе 68-мятровай гары.',
        },
      },
    ],
  },
];
