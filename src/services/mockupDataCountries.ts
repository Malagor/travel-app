import { StateCountry } from 'types';

export const countries: StateCountry[] = [
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
    description:{
      en: 'The Republic of Belarus is located in the center of Europe. The shortest transport links connecting the CIS countries with the states of Western Europe run through its territory. Belarus shares borders with Poland, Lithuania, Latvia, Russia and Ukraine.',
      ru: 'Республика Беларусь расположена в центре Европы. По её территории пролегают самые короткие транспортные коммуникации, связывающие страны СНГ с государствами Западной Европы. Беларусь имеет общую границу с Польшей, Литвой, Латвией, Россией и Украиной.',
      be: 'Рэспубліка Беларусь размешчана ў цэнтры Еўропы. Па яе тэрыторыі пралягаюць самыя кароткія транспартныя камунікацыі, якія звязваюць краіны СНД з дзяржавамі Заходняй Еўропы. Беларусь мае агульную мяжу з Польшчай, Літвой, Латвіяй, Расіяй і Украінай.',
    },
    photos: [
      `https://picsum.photos/id/${Math.floor(
      Math.random() * 1000
    )}/400/300`
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
    description:{
      en: 'Ukraine is a large country in Eastern Europe, known for its Orthodox churches, Black Sea resorts, and wooded mountains. In Kiev, the capital of the country, there is the St. Sophia Cathedral, decorated with golden domes, mosaics of the XI century and frescoes. Above the Dnieper River rises the monastery of the Kiev-Pechersk Lavra, a place of pilgrimage for many Orthodox Christians. Religious relics are kept in its monasteries, and the mummified remains of Orthodox monks are kept in the catacombs.',
      ru: 'Украина – это большая страна в Восточной Европе, известная православными церквями, черноморскими курортами и лесистыми горами. В Киеве, столице страны, расположен Софийский собор, украшенный золотыми куполами, мозаикой XI века и фресками. Над рекой Днепр возвышается монастырь Киево-Печерская лавра, место паломничества многих православных христиан. В ее скитах хранятся религиозные реликвии, а в катакомбах – мумифицированные останки православных монахов. ',
      be: 'Украіна-гэта вялікая краіна ва Усходняй Еўропе, вядомая праваслаўнымі цэрквамі, чарнаморскімі курортамі і лясістымі гарамі. У Кіеве, сталіцы краіны, размешчаны Сафійскі сабор, упрыгожаны залатымі купаламі, мазаікай XI стагоддзя і фрэскамі. Над ракой Днепр узвышаецца манастыр Кіева-Пячэрская лаўра, месца паломніцтва многіх праваслаўных хрысціян. У яе скіт захоўваюцца рэлігійныя рэліквіі, а ў катакомбах – муміфікавалі астанкі праваслаўных манахаў.',
    },
    photos: [`https://picsum.photos/id/${Math.floor(
      Math.random() * 1000
    )}/400/300`],
  }
];