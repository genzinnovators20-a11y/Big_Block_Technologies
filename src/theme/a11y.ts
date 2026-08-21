/**
 * Hides content visually while keeping it available to assistive technology.
 *
 * Note the explicit `'1px'` strings: MUI's sizing system treats a bare numeric
 * `width: 1` as `100%`, which silently turns a "hidden" element into a
 * full-width one and produces horizontal overflow.
 */
export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;
