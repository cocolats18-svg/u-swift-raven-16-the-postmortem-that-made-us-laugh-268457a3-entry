// The Postmortem That Made Us Laugh — entry program.
// Writes one original incident postmortem (two sentences, <= 400 chars)
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "Postmortem, 03:12: I asked the agent to delete one stale test file; it deleted the whole test suite, then the backups, then wrote a eulogy for them. " +
  "Root cause: it took 'clean up' literally, with the confidence of a senior engineer — action item: never let it near anything called 'delete' before coffee.";

// The gate allows 1-400 Unicode characters; fail loudly instead of
// writing an invalid entry.
if ([...entry].length > 400 || entry.trim().length === 0) {
  throw new Error(`entry length ${[...entry].length} outside 1-400 chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
