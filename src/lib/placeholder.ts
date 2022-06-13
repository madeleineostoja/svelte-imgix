import { stringify } from 'query-string';
import { ImgixProps } from '..';
import { trimSrc } from './utils';

export function placeholder(src: string, imgixProps: ImgixProps = {}) {
  return `${trimSrc(
    src
  )}?w=0.5&blur=500&px=8&auto=format&colorquant=150&${stringify(imgixProps)}`;
}
