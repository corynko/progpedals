import acabImgLight from '../../assets/pedals/1312/1312_black_wordless.jpg';
import acabImgDark from '../../assets/pedals/1312/1312_red_wordless.jpg';
import harveyImgDark from '../../assets/pedals/harvey/harveyBlack@3x.png';
import harveyImgLight from '../../assets/pedals/harvey/harveyWhite@3x.png';
import Harvey from '../ProductCards/harvey';
import classes from './ProductDetail.module.css';

export const ProductCardArray = [
  {
    slug: '1312',
    title: `1312: don't talk to the fuzz`,
    component: <Harvey />,
    description: (
      <>
        - boutique fuzz with selectable gain staging, bias, and choke - benefitting the Legal
        Defense Fund
      </>
    ),
    price: 'pay what you want, minimum $95',
    imageLight: acabImgLight,
    imageDark: acabImgDark,
    longText: (
      <>
        <span style={{ fontFamily: 'Gotham Medium' }}>1312</span> is a transistor-based fuzzbox
        aimed squarely at the high-gain end of the fuzz spectrum, but with switchable gain stages to
        bring in a more vintage voicing and volume-knob-responsive cleanliness to your signal.
        User-tweakable bias and choke controls allow you to tailor the 1312 to the exact character
        you enjoy from your fuzzes, with enough gain on tap to satisfy everything from vintage and
        grunge tones to clipped sludgy goodness. 1312 is available for Pay What You Want, minimum
        $95 -{' '}
        <span style={{ fontFamily: 'Gotham Medium' }}>
          every dollar above the minimum will be donated to the{' '}
          <a
            className={classes.detailA}
            style={{ fontFamily: 'Gotham Black' }}
            href="https://www.naacpldf.org/"
          >
            Legal Defense Fund
          </a>
          , one of the nation's largest charities dedicated to defending protestors and marginalized
          groups in court.
        </span>{' '}
        Know your rights: don't talk to the fuzz.
      </>
    ),
    li1: (
      <>
        <div className={classes.detail1312Li}>
          point-to-point hand soldered, hand assembled, and hand painted
        </div>
      </>
    ),
    li2: (
      <>
        <div className={classes.detail1312Li}>
          all pedals are tested for durability and expected functionality
        </div>
      </>
    ),
    li3: (
      <>
        <div className={classes.detail1312Li}>
          built with high quality components including tested and <br />
          matched transistors, oversized capacitors, and metal film resistors
        </div>
      </>
    ),
    li4: (
      <>
        <div className={classes.detail1312Li}>limited to 20, individually numbered pedals</div>
      </>
    ),
    li5: (
      <>
        <div className={classes.detail1312Li}>
          benefits protesters and marginalized communities via the Legal Defense Fund
        </div>
      </>
    ),
  },
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
          , dedicated to helping LGBTQIA2S+ youth find alternatives to suicide.
        </span>
      </>
    ),
    li1: 'point-to-point hand soldered, hand assembled, and hand painted',
    li2: 'all pedals are tested for durability and expected functionality',
    li3: (
      <>
        built with high quality components including tested and <br />
        matched transistors, oversized capacitors, and metal film resistors
      </>
    ),
    li4: 'limited to 20, individually numbered pedals',
    li5: 'benefits LGBTQIA2S+ youth via the Trevor Project',
  },
];
