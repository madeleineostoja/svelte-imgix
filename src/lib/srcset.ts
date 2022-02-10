import { stringify } from 'query-string';
import { ImgixProps } from '..';
import { trimSrc } from './utils';

export function srcset(src: string, imgixProps: ImgixProps = {}) {
  const resolutions: number[] = [],
    sets = [];

  let prev = 100;

  while (prev <= 8192) {
    resolutions.push(2 * Math.round(prev / 2));
    prev *= 1 + 0.08 * 2;
  }

  for (var i = 0; i < resolutions.length; i++) {
    const params = {
      w: resolutions[i],
      ...imgixProps
    };

    sets.push(`${trimSrc(src)}?${stringify(params)} ${resolutions[i]}w`);
  }

  return sets.join(', ');
}
