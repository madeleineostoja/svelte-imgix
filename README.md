# Svelt Imgix

[![NPM](https://img.shields.io/npm/v/svelte-imgix)](https://www.npmjs.com/package/svelte-imgix) [![License](https://img.shields.io/npm/l/svelte-imgix)](https://github.com/peppercorntsudio/svelte-imgix/blob/master/LICENSE.md)

Svelte action for responsive, lazily-loaded images with Imgix

### Features

- Lazy loading with automatic LQIP placeholders
- Generate responsive image `srcsets` automatically

### Basic Usage

```sh
npm i svelte-imgix
```

```svelte
<script>
  import imgix from 'svelte-imgix';
</script>

<img use:imgix="some-imgix-img.jpeg" />
```

### Helper functions

Svelte Imgix exports 2 additional helper functions that you can use to create LQIP placeholders and responsive srcsets yourself, `placeholder(src)` and `srcset(src`;

```svelte
<script>
  import { placeholder, srcset } from 'svelte-imgix';
  import { invew } from 'svelte-inview';

  let intersected = false;
</script>

<img src={intersected ? srcset(imgixImg) : placeholder(imgixImg)} use:invew on:enter={() => intersected = true} />
```

### Adding Sizes

Svelte-Imgix automatically generates a responsive `srcset` for a huge range of viewport sizes. By adding a `sizes` attribute to your image you can instruct the browser to use the appropriate source based on media queries.

See the [MDN article on responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for a thorough walkthrough.
