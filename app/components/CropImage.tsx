import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * Art-directed crops of the supplied photography.
 *
 * Two source photos (cafe-detail, drinks-table) carry a third-party sticker in their
 * lower-right corner, so they are only ever shown through these crop windows.
 * Coordinates are in the source image's natural pixels.
 */

type Crop = { x: number; y: number; w: number; h: number };
type Source = { src: string; w: number; h: number };

const DETAIL: Source = { src: '/images/cafe-detail.webp', w: 1200, h: 1600 };
const DRINKS: Source = { src: '/images/drinks-table.webp', w: 1171, h: 1208 };
const EXTERIOR: Source = { src: '/images/cafe-exterior.webp', w: 1200, h: 1600 };

export const crops = {
  /** Pendant lamps and beams — moody portrait. */
  lamps: { ...DETAIL, crop: { x: 660, y: 330, w: 540, h: 600 } },
  /** The illustrated street-café mural. */
  mural: { ...DETAIL, crop: { x: 0, y: 880, w: 520, h: 440 } },
  /** A round of coolers, seen from above. */
  drinks: { ...DRINKS, crop: { x: 200, y: 110, w: 800, h: 640 } },
  /** Tighter drinks crop for the hero inset. */
  drinksInset: { ...DRINKS, crop: { x: 240, y: 240, w: 700, h: 500 } },
  /** The porch and doorway, lights on. */
  storefront: { ...EXTERIOR, crop: { x: 380, y: 420, w: 760, h: 1000 } },
} satisfies Record<string, Source & { crop: Crop }>;

export type CropKey = keyof typeof crops;

export const cropAspect = (key: CropKey): CSSProperties => {
  const { crop } = crops[key];
  return { aspectRatio: `${crop.w} / ${crop.h}` };
};

/**
 * Renders a source image positioned so that only `crop` is visible inside a
 * positioned, overflow-hidden parent whose aspect ratio matches the crop.
 * `frameSizes` describes the *frame* width; it is scaled up so the browser
 * picks an appropriately sharp source.
 */
export function CropImage({
  name,
  alt,
  frameSizes,
  priority,
}: {
  name: CropKey;
  alt: string;
  /** Approximate rendered frame width, e.g. { mobile: 90, desktop: 40 } in vw. */
  frameSizes: { mobile: number; desktop: number };
  priority?: boolean;
}) {
  const { src, w, h, crop } = crops[name];
  const scale = w / crop.w;
  const style: CSSProperties = {
    position: 'absolute',
    maxWidth: 'none',
    width: `${scale * 100}%`,
    height: `${(h / crop.h) * 100}%`,
    left: `${(-crop.x / crop.w) * 100}%`,
    top: `${(-crop.y / crop.h) * 100}%`,
  };
  const sizes = `(max-width: 767px) ${Math.round(frameSizes.mobile * scale)}vw, ${Math.round(
    frameSizes.desktop * scale,
  )}vw`;

  return (
    <Image src={src} alt={alt} width={w} height={h} sizes={sizes} priority={priority} style={style} className="crop-img" />
  );
}

