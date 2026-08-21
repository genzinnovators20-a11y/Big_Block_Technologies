/**
 * Technology ecosystem.
 *
 * A statement of what the team works with — deliberately rendered as text
 * rather than vendor logos, since displaying third-party marks would imply
 * partnerships or certifications that have not been established.
 */
export const technologyGroups = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Solidity', 'Java', 'Kotlin', 'Swift', 'C#'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'React Native', 'Material UI', 'Storybook', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'NestJS', 'FastAPI', 'Django', '.NET', 'Spring Boot', 'GraphQL', 'gRPC'],
  },
  {
    title: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka', 'ClickHouse', 'Elasticsearch'],
  },
  {
    title: 'Cloud & Platform',
    items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Nginx', 'GitHub Actions'],
  },
  {
    title: 'Blockchain',
    items: ['Ethereum', 'Solana', 'Polygon', 'Hyperledger Fabric', 'Substrate', 'Foundry', 'Hardhat', 'viem', 'IPFS'],
  },
  {
    title: 'Observability',
    items: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Sentry'],
  },
];

/** Flattened list used by the marquee-free ecosystem strip on the homepage. */
export const featuredTechnologies = [
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Go',
  'Rust',
  'Solidity',
  'PostgreSQL',
  'Kubernetes',
  'Terraform',
  'AWS',
  'Ethereum',
];
