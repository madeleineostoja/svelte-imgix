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

### Adding Sizes

Svelte-Imgix automatically generates a responsive `srcset` for a huge range of viewport sizes. By adding a `sizes` attribute to your image you can instruct the browser to use the appropriate source based on media queries.

See the [MDN article on responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for a thorough walkthrough.
