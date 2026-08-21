import Box from '@mui/material/Box';
import { fonts } from '@/theme/tokens';

const LAYERS = [
  {
    label: 'Interface',
    y: 26,
    nodes: ['Wallet & network', 'Transaction states', 'On-chain views'],
  },
  {
    label: 'Contracts',
    y: 156,
    nodes: ['Protocol logic', 'Access & upgrade'],
  },
  {
    label: 'Infrastructure',
    y: 286,
    nodes: ['Nodes & RPC', 'Indexing', 'Key custody'],
  },
];

const WIDTH = 560;
const BOX_H = 62;
const GAP = 16;

/**
 * Layered diagram of a Web3 system.
 *
 * The point it makes is that on-chain products are mostly conventional
 * engineering: three layers, each with its own failure modes. It is inline SVG
 * — no chart library, no images, scales cleanly and inherits theme colours.
 */
export function Web3StackDiagram() {
  const layerBoxes = LAYERS.map((layer) => {
    const count = layer.nodes.length;
    const boxW = (WIDTH - GAP * (count - 1)) / count;
    return layer.nodes.map((node, i) => ({
      node,
      x: i * (boxW + GAP),
      w: boxW,
      y: layer.y,
    }));
  });

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${WIDTH} 380`}
      role="img"
      aria-label="Three-layer diagram of a Web3 system: an interface layer handling wallets, transaction states and on-chain views; a contract layer holding protocol logic and access control; and an infrastructure layer of nodes, indexing and key custody."
      sx={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
    >
      {/* Connectors drawn first so the boxes sit above them.
          Each gap uses a bus rail rather than every-node-to-every-node lines,
          which would read as noise instead of structure. */}
      {[0, 1].map((gapIndex) => {
        const from = layerBoxes[gapIndex];
        const to = layerBoxes[gapIndex + 1];
        const busY = (from[0].y + BOX_H + to[0].y) / 2;
        const stroke = 'var(--mui-palette-hairlineStrong)';

        return (
          <g key={`gap-${gapIndex}`}>
            <line
              x1={from[0].x + from[0].w / 2}
              y1={busY}
              x2={from[from.length - 1].x + from[from.length - 1].w / 2}
              y2={busY}
              stroke={stroke}
              strokeWidth={1}
            />
            {from.map((a) => (
              <line
                key={`u-${gapIndex}-${a.node}`}
                x1={a.x + a.w / 2}
                y1={a.y + BOX_H}
                x2={a.x + a.w / 2}
                y2={busY}
                stroke={stroke}
                strokeWidth={1}
              />
            ))}
            {to.map((b) => (
              <line
                key={`d-${gapIndex}-${b.node}`}
                x1={b.x + b.w / 2}
                y1={busY}
                x2={b.x + b.w / 2}
                y2={b.y}
                stroke={stroke}
                strokeWidth={1}
              />
            ))}
          </g>
        );
      })}

      {LAYERS.map((layer, li) => (
        <g key={layer.label}>
          {/* Knockout so the label never collides with a connector rail. */}
          <rect
            x={-4}
            y={layer.y - 24}
            width={layer.label.length * 9 + 12}
            height={16}
            fill="var(--mui-palette-background-default)"
          />
          <text
            x={0}
            y={layer.y - 12}
            fill="var(--mui-palette-text-disabled)"
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {layer.label}
          </text>

          {layerBoxes[li].map((box) => (
            <g key={box.node}>
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={BOX_H}
                rx={4}
                fill="var(--mui-palette-surfaceRaised)"
                stroke={li === 1 ? 'var(--mui-palette-brandAzure)' : 'var(--mui-palette-hairlineStrong)'}
                strokeWidth={1}
              />
              <text
                x={box.x + box.w / 2}
                y={box.y + BOX_H / 2 + 4}
                textAnchor="middle"
                fill="var(--mui-palette-text-primary)"
                style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 500 }}
              >
                {box.node}
              </text>
            </g>
          ))}
        </g>
      ))}
    </Box>
  );
}
