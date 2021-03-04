import { StateCountry } from 'types';

export const countries: StateCountry[] = [
  {
    id: 1,
    name: {
      en: 'Belarus',
      ru: 'Беларусь',
      be: 'Беларусь',
    },
    capital: {
      en: 'Minsk',
      ru: 'Минск',
      be: 'Мiнск',
    },
    description:
      'Республика Беларусь расположена в центре Европы. По её территории пролегают самые короткие транспортные коммуникации, связывающие страны СНГ с государствами Западной Европы. Беларусь имеет общую границу с Польшей, Литвой, Латвией, Россией и Украиной.',
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
    description:
      'vLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet blanditiis commodi dolor libero modi natus neque repellat. Debitis dicta eos natus neque perspiciatis porro rerum tempore ut! Cupiditate, quod, vitae.',
    photos: [`https://picsum.photos/id/${Math.floor(
      Math.random() * 1000
    )}/400/300`],
  }
];
