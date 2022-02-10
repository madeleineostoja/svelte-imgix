# Svelt Imgix

[![NPM](https://img.shields.io/npm/v/svelte-imgix)](https://www.npmjs.com/package/svelte-imgix) [![License](https://img.shields.io/npm/l/svelte-imgix)](https://github.com/peppercorntsudio/svelte-imgix/blob/master/LICENSE.md)

Svelte action for generating responsive, lazily-loaded images with Imgix

### Features

- Generate responsive image `srcsets` automatically
- Optional lazy loading with automatic LQIP placeholders

### Basic Usage

```sh
npm i svelte-imgix
```

```svelte
<script>
  import imgix from 'svelte-imgix';
</script>

<img use:imgix="https://assets.imgix.net/unsplash/vintagecameras.jpg" />
```

### With config

Rather than passing a `src` image to `use:imgix`, you can pass a full configuration object with the following properties

| Property     | Default | Description                                         |
| ------------ | ------- | --------------------------------------------------- |
| `src`        | `''`    | Src of the image                                    |
| `lazyload`   | `false` | Delay loading the full res image until it's in view |
| `imgixProps` | `{}`    | Additional imgix properties to pass to the image    |

```svelte
<img use:imgix={{
  src: 'https://assets.imgix.net/unsplash/vintagecameras.jpg',
  lazyload: false,
  imgixParams: {
    fit: 'crop',
    ar:  '16:9'
  }
}} />
```

### Helper functions

Svelte Imgix exports 2 additional helpers that you can use to create responsive source sets and LQIP placeholders yourself, `srcset(src)` and `placeholder(src)`;

```svelte
<script>
  import { placeholder, srcset } from 'svelte-imgix';
  import { invew } from 'svelte-inview';

  let src = '';
  let intersected = false;
</script>

<img src={intersected ? src : placeholder(src)} srcset={intersected ? srcset(src} : ''} use:invew on:enter={() => intersected = true} />
```

### SSR Support

Until Svelte [supports actions running in SSR](https://github.com/sveltejs/svelte/issues/4375), you might notice images don't have a src at all until `svelte-imgix` has hydrated. As a workaround, use the `placeholder` helper function to SSR an LQIP placeholder image manually. Svelte-imgix will then hydrate from there, with the same placeholder image, and load your full srcset once the image enters the viewport.

```svelte
<img use:imgix={src} src={placeholder(src)} />
```

### Adding Sizes

Svelte-Imgix automatically generates a responsive `srcset` for a huge range of viewport sizes. By adding a `sizes` attribute to your image you can instruct the browser to use the appropriate source based on media queries.

See the [MDN article on responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for a thorough walkthrough.
