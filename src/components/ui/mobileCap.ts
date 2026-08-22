import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

/**
 * Caps how many items of a homepage grid render on the smallest screens.
 *
 * The homepage carries a lot of real content, and at 375px a six-card
 * engagement grid alone ran to roughly thirteen screen-heights — long enough
 * that a reader stops scrolling before reaching the sections beneath it.
 *
 * The extra items are hidden with CSS rather than dropped from the render
 * tree: no `useMediaQuery`, so no second render pass and no layout shift on
 * load, and the full set reappears at `sm` with nothing to re-fetch. Every
 * section that uses this already carries an "All …" link to the complete list,
 * so nothing becomes unreachable.
 */
export const capItemsOnMobile = (visible: number): SystemStyleObject<Theme> => ({
  [`& > li:nth-of-type(n + ${visible + 1})`]: {
    display: { xs: 'none', sm: 'block' },
  },
});
