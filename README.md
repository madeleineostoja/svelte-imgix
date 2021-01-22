# Svelte Imgix

Responsive, lazily-loaded images with Svelte and Imgix

### Features

- Lazy loading with automatic LQIP placeholders
- Generate responsive image `srcsets` automatically

### Basic Usage

```sh
npm i svelte-imgix
```

```svelte
<script>
  import Imgix from 'svelte-imgix';
</script>

<Imgix
  src="https://assets.imgix.com/image.jpg"
  sizes="(max-width: 800px) 100vw, 50vw"
/>
```

### Adding Sizes

Svelte-Imgix automatically generates a responsive `srcset` for a huge range of viewport sizes. By adding a `sizes` attribute to your image you can instruct the browser to use the appropriate source based on media queries.

See the [MDN article on responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for a thorough walkthrough.

### Setting Imgix Parameters

You can either provide a full Imgix URL (with query parameters) to `svelte-imgix`, or define parameters to override anything set on the src with the `imgixParams` prop. All valid [Imgix properties](https://docs.imgix.com/apis/rendering) are avaiable.

```svelte
<Imgix
  src="https://assets.imgix.com/image.jpg"
  imgixParams={{
    auto: 'format',
    fit: 'facearea'
  }}
/>
```

### Properties

| Property      | Type      | Description                                                                                                                          |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `src`         | `string`  | Imgix source of the image                                                                                                            |
| `alt`         | `string`  | Alt text for the image                                                                                                               |
| `lqip`        | `boolean` | Whether to generate a Low Quality Image Placeholder that blurs up to the full resolution image when lazyloading (defaults to `true`) |
| `ImgixParams` | `object`  | Object of Imgix parameters to set on the image, overrides any defaults given in `src`                                                |
