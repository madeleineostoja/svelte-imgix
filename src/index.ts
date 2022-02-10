import { placeholder } from './lib/placeholder';
import { srcset } from './lib/srcset';

export type ImgixProps = { [key: string]: string };
export type SvelteImgixOptions =
  | {
      src: string;
      lazyload: boolean;
      imgixProps: ImgixProps;
    }
  | string;

const DEFAULTS = {
  src: '',
  lazyload: false,
  imgixProps: {}
};

export default function imgix(img: HTMLImageElement, opts: SvelteImgixOptions) {
  const src = typeof opts === 'string' ? opts : opts.src,
    { imgixProps, lazyload } = Object.assign(
      DEFAULTS,
      typeof opts === 'object' ? opts : {}
    );

  function hydrate(s: string) {
    img.src = s;
    img.srcset = srcset(s, imgixProps);
  }

  function reset(s: string) {
    img.srcset = '';
    img.src = placeholder(s, imgixProps);
  }

  function lazyImg(s: string) {
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        hydrate(s);
        observer.unobserve(img);
      }
    });
    return observer;
  }

  let observer = lazyImg(src);

  if (lazyload) {
    reset(src);
    observer.observe(img);
  } else {
    hydrate(src);
  }

  return {
    update(newSrc: string) {
      if (lazyload) {
        reset(src);
        observer.unobserve(img);
        observer = lazyImg(newSrc);
      } else {
        hydrate(newSrc);
      }
    },
    destroy() {
      observer.unobserve(img);
    }
  };
}

export { placeholder } from './lib/placeholder';
export { srcset } from './lib/srcset';
