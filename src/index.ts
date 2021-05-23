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

export default function imgix(img: HTMLImageElement, src: string) {
  let intersected = false;
  const observer = new IntersectionObserver((entries, observer) => {
    intersected = entries[0].isIntersecting;
    if (entries[0].intersectionRatio > 0) {
      img.src = src;
      img.srcset = srcset(src);
    }
    if (intersected) {
      observer.unobserve(img);
    }
  });

  img.src = placeholder(src);
  observer.observe(img);

  return {
    destroy() {
      observer.unobserve(img);
    }
  };
}
