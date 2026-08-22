import Box from '@mui/material/Box';
import { fonts } from '@/theme/tokens';

const W = 520;
const H = 360;

/** Satellite positions around the central block. */
const NODES = [
  { x: 92, y: 78, label: 'node.a' },
  { x: 428, y: 96, label: 'node.b' },
  { x: 74, y: 268, label: 'node.c' },
  { x: 438, y: 274, label: 'node.d' },
];

const CENTRE = { x: 260, y: 176 };

/**
 * Isometric block at the centre of a peer network.
 *
 * Drawn as three parallelograms sharing an origin — the same extruded cube as
 * the brand mark, which is where the company name comes from. Built from
 * explicit face paths rather than a 3D library: it is six polygons, and
 * shipping a WebGL runtime to render six polygons would be indefensible.
 */
function CentreBlock() {
  const s = 46;
  const { x, y } = CENTRE;
  const top = `${x},${y - s} ${x + s},${y - s / 2} ${x},${y} ${x - s},${y - s / 2}`;
  const left = `${x - s},${y - s / 2} ${x},${y} ${x},${y + s * 0.86} ${x - s},${y + s * 0.36}`;
  const right = `${x + s},${y - s / 2} ${x},${y} ${x},${y + s * 0.86} ${x + s},${y + s * 0.36}`;

  return (
    <g>
      <polygon points={top} fill="var(--mui-palette-primary-light)" opacity={0.9} />
      <polygon points={left} fill="var(--mui-palette-primary-dark)" opacity={0.95} />
      <polygon points={right} fill="var(--mui-palette-primary-main)" opacity={0.95} />
      <polygon
        points={top}
        fill="none"
        stroke="var(--mui-palette-brandAzure)"
        strokeWidth={1}
        opacity={0.6}
      />
    </g>
  );
}

/**
 * The blockchain practice figure.
 *
 * Four peers holding one record between them — the only problem a distributed
 * ledger actually solves, drawn rather than asserted. Deliberately contains no
 * coins, chains, rockets or padlocks: the imagery a serious ledger practice
 * has to avoid.
 *
 * One animation: a signal travelling the four edges, expressed as a
 * `stroke-dashoffset` cycle on four short paths. It is disabled outright under
 * `prefers-reduced-motion`, and it is the only moving element in its section.
 */
export function NodeNetwork() {
  return (
    <Box
      component="svg"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Four peer nodes connected to a single shared block at the centre, illustrating one authoritative record held between parties that do not trust each other."
      sx={{
        width: '100%',
        height: 'auto',
        display: 'block',
        '@keyframes bb-signal': {
          from: { strokeDashoffset: 44 },
          to: { strokeDashoffset: 0 },
        },
        '.bb-signal': {
          strokeDasharray: '6 38',
          animation: 'bb-signal 2.8s linear infinite',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '.bb-signal': { animation: 'none', opacity: 0 },
        },
      }}
    >
      {/* Edges */}
      {NODES.map((node, i) => (
        <g key={node.label}>
          <line
            x1={node.x}
            y1={node.y}
            x2={CENTRE.x}
            y2={CENTRE.y}
            stroke="var(--mui-palette-hairlineStrong)"
            strokeWidth={1}
          />
          <line
            className="bb-signal"
            x1={node.x}
            y1={node.y}
            x2={CENTRE.x}
            y2={CENTRE.y}
            stroke="var(--mui-palette-brandAzure)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        </g>
      ))}

      <CentreBlock />

      {/* Peers */}
      {NODES.map((node) => (
        <g key={`peer-${node.label}`}>
          <rect
            x={node.x - 34}
            y={node.y - 15}
            width={68}
            height={30}
            rx={4}
            fill="var(--mui-palette-surfaceRaised)"
            stroke="var(--mui-palette-hairlineStrong)"
            strokeWidth={1}
          />
          <circle cx={node.x - 22} cy={node.y} r={3} fill="var(--mui-palette-success-main)" />
          <text
            x={node.x + 6}
            y={node.y + 4}
            textAnchor="middle"
            fill="var(--mui-palette-text-secondary)"
            style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.04em' }}
          >
            {node.label}
          </text>
        </g>
      ))}

      <text
        x={CENTRE.x}
        y={H - 26}
        textAnchor="middle"
        fill="var(--mui-palette-text-disabled)"
        style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.14em' }}
      >
        ONE RECORD · NO SINGLE OPERATOR
      </text>
    </Box>
  );
}
