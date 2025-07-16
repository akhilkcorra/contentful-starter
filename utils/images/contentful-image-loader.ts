/**
 * Based on `next-image-contentful-loader`:
 * https://github.com/delicious-simplicity/next-image-contentful-loader/tree/master
 */
import type { ImageLoaderProps } from 'next/image';

export type ContentfulImageParams = {
  fm?: 'jpg' | 'png' | 'webp' | 'gif' | 'avif';
  fl?: 'progressive' | 'png8';
  w?: number;
  h?: number;
  fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  f?:
    | 'face'
    | 'faces'
    | 'center'
    | 'top'
    | 'right'
    | 'left'
    | 'bottom'
    | 'top_right'
    | 'top_left'
    | 'bottom_right'
    | 'bottom_left';
  r?: number | 'max';
  q?: number;
  bg?: string;
};

const defaultFiletype = 'webp';
const defaultQuality = 75;

export default function contentfulLoader(
  loaderProps: ImageLoaderProps,
  ImageParams: ContentfulImageParams
) {
  ImageParams = {
    fm: defaultFiletype,
    q: loaderProps.quality ? loaderProps.quality : defaultQuality,
    w: loaderProps.width,
  };

  if (typeof ImageParams['h'] === 'undefined') delete ImageParams['h'];

  // remove width and height if requesting a gif
  if (/\.gif$/gim.test(loaderProps.src)) {
    delete ImageParams['w'];
    delete ImageParams['h'];
    delete ImageParams['fit'];
  }

  return `${loaderProps.src}?${new URLSearchParams(
    ImageParams as { [key: string]: string }
  ).toString()}`;
}
