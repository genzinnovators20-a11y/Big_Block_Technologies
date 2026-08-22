import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import { fonts, motion } from '@/theme/tokens';

/**
 * The diagram families available for an engagement header.
 *
 * Each one depicts the actual architecture described in the corresponding case
 * study rather than being decorative — the ledger glyph really is double-entry
 * postings, the migration glyph really is a façade in front of a legacy system.
 */
export type GlyphKind = 'ledger' | 'migration' | 'chain' | 'contract' | 'retrieval' | 'pipeline';

/** Maps an engagement label to its diagram. */
export const glyphForEngagement = (engagement: string): GlyphKind => {
  const key = engagement.toLowerCase();
  if (key.includes('blockchain')) return 'chain';
  if (key.includes('contract')) return 'contract';
  if (key.includes('ai')) return 'retrieval';
  if (key.includes('devops') || key.includes('platform')) return 'pipeline';
  if (key.includes('legacy') || key.includes('modernisation')) return 'migration';
  return 'ledger';
};

const W = 400;
const H = 168;

const AZURE = 'var(--mui-palette-brandAzure)';
const LINE = 'var(--mui-palette-hairlineStrong)';
const FILL = 'var(--mui-palette-surfaceRaised)';
const TEXT = 'var(--mui-palette-text-disabled)';

const monoStyle = { fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.08em' } as const;

/** Small labelled box, the shared building unit across every diagram. */
function Node({
  x,
  y,
  w = 66,
  h = 30,
  label,
  active = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={FILL}
        stroke={active ? AZURE : LINE}
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 3}
        textAnchor="middle"
        fill={active ? AZURE : TEXT}
        style={monoStyle}
      >
        {label}
      </text>
    </g>
  );
}

const connector = (x1: number, y1: number, x2: number, y2: number, key: string) => (
  <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINE} strokeWidth={1} />
);

function LedgerGlyph() {
  // Postings of alternating sign, summing to a balance — the point being that
  // the balance is derived from the postings rather than stored alongside them.
  const bars = [22, 40, 30, 52, 36, 60, 44];
  return (
    <>
      {bars.map((value, i) => (
        <rect
          key={i}
          x={34 + i * 34}
          y={104 - value}
          width={18}
          height={value}
          rx={2}
          fill={i === bars.length - 1 ? AZURE : LINE}
          opacity={i === bars.length - 1 ? 0.9 : 0.55}
        />
      ))}
      <line x1={28} y1={104} x2={372} y2={104} stroke={LINE} strokeWidth={1} />
      <Node x={28} y={120} w={104} h={26} label="POSTINGS" />
      <Node x={148} y={120} w={104} h={26} label="RECONCILE" />
      <Node x={268} y={120} w={104} h={26} label="BALANCE" active />
      <text x={28} y={34} fill={TEXT} style={monoStyle}>
        DOUBLE-ENTRY LEDGER
      </text>
    </>
  );
}

function MigrationGlyph() {
  return (
    <>
      <text x={28} y={30} fill={TEXT} style={monoStyle}>
        STRANGLER FACADE
      </text>
      <Node x={28} y={46} w={82} label="CLIENTS" />
      {connector(110, 61, 152, 61, 'a')}
      <Node x={152} y={46} w={92} label="FACADE" active />
      {connector(244, 61, 290, 61, 'b')}
      {connector(244, 61, 244, 112, 'c')}
      {connector(244, 112, 290, 112, 'd')}
      <Node x={290} y={46} w={82} label="LEGACY" />
      <Node x={290} y={97} w={82} label="REBUILT" active />
      <text x={152} y={140} fill={TEXT} style={monoStyle}>
        ROUTED PER CAPABILITY
      </text>
    </>
  );
}

function ChainGlyph() {
  const blocks = ['9f2a', 'c4d1', '77be', 'e0a3'];
  return (
    <>
      <text x={28} y={34} fill={TEXT} style={monoStyle}>
        PERMISSIONED LEDGER
      </text>
      {blocks.map((hash, i) => (
        <g key={hash}>
          {i > 0 && connector(28 + i * 92 - 26, 82, 28 + i * 92, 82, `l${i}`)}
          <Node
            x={28 + i * 92}
            y={64}
            w={66}
            h={36}
            label={hash}
            active={i === blocks.length - 1}
          />
        </g>
      ))}
      <line x1={28} y1={124} x2={372} y2={124} stroke={LINE} strokeWidth={1} strokeDasharray="3 4" />
      <text x={28} y={144} fill={TEXT} style={monoStyle}>
        CUSTODY EVENTS · SHARED STATE
      </text>
    </>
  );
}

function ContractGlyph() {
  const rows = ['UNIT', 'FORK', 'INVARIANT'];
  return (
    <>
      <text x={28} y={30} fill={TEXT} style={monoStyle}>
        TEST MATRIX
      </text>
      <Node x={28} y={44} w={120} h={38} label="SPECIFICATION" />
      {connector(148, 63, 186, 63, 'a')}
      <Node x={186} y={44} w={120} h={38} label="CONTRACT" active />
      {rows.map((row, i) => (
        <g key={row}>
          <rect
            x={28}
            y={100 + i * 20}
            width={10}
            height={10}
            rx={1}
            fill={AZURE}
            opacity={0.85}
          />
          <text x={46} y={109 + i * 20} fill={TEXT} style={monoStyle}>
            {row}
          </text>
          <line
            x1={132}
            y1={105 + i * 20}
            x2={372}
            y2={105 + i * 20}
            stroke={LINE}
            strokeWidth={1}
          />
        </g>
      ))}
    </>
  );
}

function RetrievalGlyph() {
  return (
    <>
      <text x={28} y={30} fill={TEXT} style={monoStyle}>
        GROUNDED RETRIEVAL
      </text>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={28 + i * 8}
          y={52 + i * 6}
          width={72}
          height={54}
          rx={4}
          fill={FILL}
          stroke={LINE}
          strokeWidth={1}
        />
      ))}
      {connector(108, 86, 148, 86, 'a')}
      <Node x={148} y={68} w={86} h={36} label="INDEX" />
      {connector(234, 86, 274, 86, 'b')}
      <Node x={274} y={68} w={98} h={36} label="CITED" active />
      <text x={148} y={140} fill={TEXT} style={monoStyle}>
        SOURCE REQUIRED PER ANSWER
      </text>
    </>
  );
}

function PipelineGlyph() {
  const stages = ['BUILD', 'TEST', 'GATE', 'SHIP'];
  return (
    <>
      <text x={28} y={30} fill={TEXT} style={monoStyle}>
        ONE ARTEFACT · PROMOTED
      </text>
      {stages.map((stage, i) => (
        <g key={stage}>
          {i > 0 && connector(28 + i * 90 - 24, 76, 28 + i * 90, 76, `c${i}`)}
          <Node x={28 + i * 90} y={58} w={66} h={36} label={stage} active={i === stages.length - 1} />
        </g>
      ))}
      {stages.map((stage, i) => (
        <rect
          key={`bar-${stage}`}
          x={28 + i * 90}
          y={112}
          width={66}
          height={4}
          rx={2}
          fill={AZURE}
          opacity={0.25 + i * 0.22}
        />
      ))}
      <text x={28} y={142} fill={TEXT} style={monoStyle}>
        FLAG-CONTROLLED ROLLOUT
      </text>
    </>
  );
}

const GLYPHS: Record<GlyphKind, () => ReactElement> = {
  ledger: LedgerGlyph,
  migration: MigrationGlyph,
  chain: ChainGlyph,
  contract: ContractGlyph,
  retrieval: RetrievalGlyph,
  pipeline: PipelineGlyph,
};

interface CaseStudyGlyphProps {
  kind: GlyphKind;
  /** Read by screen readers in place of the drawing. */
  title: string;
}

/**
 * Technical header artwork for an engagement card.
 *
 * Inline SVG rather than an image: it inherits theme colours in both schemes,
 * costs nothing to download, stays crisp at any density, and can be diffed in
 * review. Six diagrams cover the six engagement types, so cards in a grid look
 * related without looking identical.
 *
 * The whole drawing is one `role="img"` with a text alternative — the
 * individual labels inside it are decoration, and exposing them would make a
 * screen reader recite "9f2a c4d1 77be" for no benefit.
 */
export function CaseStudyGlyph({ kind, title }: CaseStudyGlyphProps) {
  const Glyph = GLYPHS[kind];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'hairline',
        // The drawing brightens fractionally as the parent card is hovered.
        '.glyph-svg': {
          transition: `opacity ${motion.duration.base}ms ${motion.easing.standard}`,
          opacity: 0.88,
        },
        '@media (hover: hover)': {
          'a:hover &  .glyph-svg, &:hover .glyph-svg': { opacity: 1 },
        },
      }}
    >
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${theme.vars.palette.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${theme.vars.palette.gridLine} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.5,
        })}
      />

      <Box
        className="glyph-svg"
        component="svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Architecture diagram: ${title}`}
        preserveAspectRatio="xMidYMid meet"
        sx={{ position: 'relative', width: '100%', height: 'auto', display: 'block' }}
      >
        <Glyph />
      </Box>
    </Box>
  );
}
