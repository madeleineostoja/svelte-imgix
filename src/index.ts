import { stringify } from 'query-string';

function trimSrc(src: string) {
  return src.split(/[?#]/)[0];
}

export function srcset(src: string) {
  const resolutions: number[] = [],
    sets = [];

  let prev = 100;

  while (prev <= 8192) {
    resolutions.push(2 * Math.round(prev / 2));
    prev *= 1 + 0.08 * 2;
  }

  for (var i = 0; i < resolutions.length; i++) {
    const params = {
      w: resolutions[i]
    };

    sets.push(`${trimSrc(src)}?${stringify(params)} ${resolutions[i]}w`);
  }

  return sets.join(', ');
}

export function placeholder(src: string) {
  return `${trimSrc(src)}?w=0.5&blur=200&px=16&auto=format&colorquant=150`;
}

function lazyImg(img: HTMLImageElement, src: string) {
  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      img.src = src;
      img.srcset = srcset(src);
      observer.unobserve(img);
    }
  });

  img.srcset = '';
  img.src = placeholder(src);
  observer.observe(img);

  return observer;
}

export default function imgix(img: HTMLImageElement, src: string) {
  let observer = lazyImg(img, src);

  return {
    update(newSrc: string) {
      observer.unobserve(img);
      observer = lazyImg(img, newSrc);
    },
    destroy() {
      observer.unobserve(img);
    }
  };
}
