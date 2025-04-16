import harveyImgDark from '../../assets/pedals/harvey/harveyBlack@3x.png';
import harveyImgLight from '../../assets/pedals/harvey/harveyWhite@3x.png';
import Harvey from '../ProductCards/harvey';
import classes from './ProductDetail.module.css';

export const ProductCardArray = [
  {
    slug: 'harvey',
    title: 'harvey: full-fat fuzz',
    component: <Harvey />,
    description: (
      <>
        - a high gain fuzz based on a hot rodded suhr rufus - <br /> just in time for Pride Month
      </>
    ),
    price: 'pay what you want, minimum $85',
    imageLight: harveyImgLight,
    imageDark: harveyImgDark,
    longText: (
      <>
        The Rufus was already an incredibly versatile fuzz, capable of classic Hendrix Fuzz Face
        tones to soaring Gilmour leads. We decided to bring it up to par with some of the more
        modern demands of fuzz pedals, hot rodding the gain range to allow access to crushing doom
        riffage and the overly square tones of certain indie-rock darlings. Thus,{' '}
        <span style={{ fontFamily: 'Gotham Medium' }}>Harvey</span> was born, pushing forward a
        great fuzz circuit into the future in the true spirit of progressivism. We ditched the
        switchable octave-up in favor of more gain and more clarity, with a very musical two band EQ
        and switchable low-mid fatness and treble boosts. Just in time for Pride Month, Harvey is
        available for Pay What You Want, minimum $85 -{' '}
        <span style={{ fontFamily: 'Gotham Medium' }}>
          every dollar above the minimum will be donated to the{' '}
          <a
            className={classes.detailA}
            style={{ fontFamily: 'Gotham Black' }}
            href="https://www.thetrevorproject.org/"
          >
            Trevor Project
          </a>
          , dedicated to helping LGBTQ2A+ youth find alternatives to suicide.
        </span>
      </>
    ),
    li1: 'point-to-point hand soldered, hand assembled, and hand painted',
    li2: 'all pedals are tested for durability and expected functionality',
    li3: (
      <>
        built with high quality components including tested and <br />
        matched transistors and metal film resistors
      </>
    ),
    li4: 'limited to 20, individually numbered pedals',
  },
];
