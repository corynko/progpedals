import harveyImgDark from '../../assets/pedals/harvey/harveyBlack@3x.png';
import harveyImgLight from '../../assets/pedals/harvey/harveyWhite@3x.png';
import Harvey from '../ProductCards/harvey';

export const ProductCardArray = [
  {
    slug: 'harvey',
    title: 'harvey: full-fat fuzz',
    component: <Harvey />,
    description:
      'a high gain fuzz based off of a hot rodded suhr rufus, just in time for Pride Month',
    price: 'pay what you want, minimum $85',
    imageLight: harveyImgLight,
    imageDark: harveyImgDark,
  },
];
