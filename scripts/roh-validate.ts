import { getRohStats, loadRohJsonIndex, ROH_INDEX_DIR } from '../app/lib/roh/database';

function main(): void {
  const indexDir = process.env.ROH_INDEX_DIR || ROH_INDEX_DIR;
  const index = loadRohJsonIndex(indexDir);
  if (!index) {
    throw new Error(`ROH JSON index not found at ${indexDir}`);
  }

  const stats = getRohStats(index);
  const indexed = index.searchDocuments.length;
  const entityTotal = stats.records + stats.works + stats.productions + stats.performances;
  const performanceIds = new Set(index.dataset.performances.map((performance) => performance.id));
  const orphanCast = index.dataset.performances
    .flatMap((performance) => performance.cast)
    .filter((castMember) => !performanceIds.has(castMember.performanceId)).length;

  console.log({ ...stats, indexed });

  if (indexed !== entityTotal) {
    throw new Error(`FTS row count ${indexed} does not match entity total ${entityTotal}`);
  }
  if (orphanCast > 0) {
    throw new Error(`${orphanCast} cast row(s) do not have matching performance rows`);
  }
  if (entityTotal === 0) {
    throw new Error('ROH index contains no entities');
  }
}

main();
