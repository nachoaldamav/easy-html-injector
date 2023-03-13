import benchmark from '@jsperf.dev/benchmark';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

benchmark.meta = {
  title: 'inject',
  description: 'Injects a script tag into the head',
};

benchmark.context = {
  html: '',
};

benchmark.beforeAll((context) => {
  Object.assign(context, {
    html: `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div id="app"></div>
        </body>
    </html>
    `,
  });
});

benchmark.run('inject', resolve(__dirname, 'inject.js'));
benchmark.run('cheerio', resolve(__dirname, 'cheerio.js'));

benchmark.afterAll(() => {
  console.log('Benchmark completed!');
  // read the results from the JSON file
  const results = benchmark.results as Map<string, PerformanceEntry[]>;

  const inject = results.get('inject');
  const cheerio = results.get('cheerio');

  if (inject.length === 0 || cheerio.length === 0) {
    return;
  }

  console.log('Inject', inject);

  const injectAvg =
    inject.reduce((acc, curr) => acc + curr.duration, 0) / inject.length;
  const cheerioAvg =
    cheerio.reduce((acc, curr) => acc + curr.duration, 0) / cheerio.length;

  const injectMin = Math.min(...inject.map((i) => i.duration));
  const cheerioMin = Math.min(...cheerio.map((i) => i.duration));

  const injectMax = Math.max(...inject.map((i) => i.duration));
  const cheerioMax = Math.max(...cheerio.map((i) => i.duration));

  const injectMedian = inject[Math.floor(inject.length / 2)].duration;
  const cheerioMedian = cheerio[Math.floor(cheerio.length / 2)].duration;

  const injectStdDev = Math.sqrt(
    inject.reduce(
      (acc, curr) => acc + Math.pow(curr.duration - injectAvg, 2),
      0
    ) / inject.length
  );
  const cheerioStdDev = Math.sqrt(
    cheerio.reduce(
      (acc, curr) => acc + Math.pow(curr.duration - cheerioAvg, 2),
      0
    ) / cheerio.length
  );

  const injectVariance = injectStdDev / injectAvg;
  const cheerioVariance = cheerioStdDev / cheerioAvg;

  const injectOps = 1000 / injectAvg;
  const cheerioOps = 1000 / cheerioAvg;

  const injectOpsPerSec = injectOps * 1000;
  const cheerioOpsPerSec = cheerioOps * 1000;

  // Now save the results to a Markdown table
  const table = `
| Benchmark | Average | Min | Max | Median | Std Dev | Variance | Ops | Ops/sec |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| inject | ${injectAvg.toPrecision(2)} | ${injectMin.toPrecision(
    2
  )} | ${injectMax.toPrecision(2)} | ${injectMedian.toPrecision(
    2
  )} | ${injectStdDev.toPrecision(2)} | ${injectVariance.toPrecision(
    2
  )} | ${injectOps.toFixed(0)} | ${injectOpsPerSec.toFixed(0)} |
| cheerio | ${cheerioAvg.toPrecision(2)} | ${cheerioMin.toPrecision(
    2
  )} | ${cheerioMax.toPrecision(2)} | ${cheerioMedian.toPrecision(
    2
  )} | ${cheerioStdDev.toPrecision(2)} | ${cheerioVariance.toPrecision(
    2
  )} | ${cheerioOps.toFixed(0)} | ${cheerioOpsPerSec.toFixed(0)} |
`;

  // write the table to the README.md file

  const oldContent = readFileSync(resolve(__dirname, '../README.md'), 'utf8');

  const newContent = oldContent.replace(
    /<!-- BENCHMARK RESULTS START -->[\s\S]*<!-- BENCHMARK RESULTS END -->/g,
    `<!-- BENCHMARK RESULTS START -->${table}<!-- BENCHMARK RESULTS END -->`
  );

  writeFileSync(resolve(__dirname, '../README.md'), newContent, 'utf8');

  console.log('Benchmark results saved to README.md');
  console.log(newContent);
});
