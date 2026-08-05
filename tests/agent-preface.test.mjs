import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const onboardingHtml = readFileSync(join(repositoryRoot, 'onboarding/index.html'), 'utf8');
const indexHtml = readFileSync(join(repositoryRoot, 'index.html'), 'utf8');

test('agent-first preface appears before the app chooser', () => {
  const prefacePosition = onboardingHtml.indexOf('class="agent-preface"');
  const chooserPosition = onboardingHtml.indexOf('id="s0"');

  assert.notEqual(prefacePosition, -1, 'missing agent-first preface');
  assert.notEqual(chooserPosition, -1, 'missing existing app chooser');
  assert.ok(prefacePosition < chooserPosition, 'agent-first preface must precede the app chooser');
});

test('agent-first preface exposes the install path and both routes', () => {
  assert.match(onboardingHtml, /npx setup-sogni-agent-skill/);
  assert.match(onboardingHtml, /aria-label="Copy install command"/);
  assert.match(onboardingHtml, /href="https:\/\/www\.sogni\.ai\/agent"/);
  assert.match(onboardingHtml, /href="#s0"/);
  assert.match(onboardingHtml, /src="assets\/agent-campaign-mosaic\.jpg"/);
});

test('root index features onboarding before preserving the three-card grid', () => {
  const featurePosition = indexHtml.indexOf('class="featured-guide');
  const gridPosition = indexHtml.indexOf('class="bento"');

  assert.notEqual(featurePosition, -1, 'missing featured onboarding guide');
  assert.ok(featurePosition < gridPosition, 'featured guide must precede the existing card grid');
  assert.match(indexHtml, /href="onboarding\/"/);
  assert.match(indexHtml, /src="assets\/agent-campaign-mosaic\.jpg"/);
  assert.equal((indexHtml.match(/class="card reveal"/g) || []).length, 3);
});

test('optimized campaign mosaic exists for both page-relative paths', () => {
  for (const relativePath of [
    'onboarding/assets/agent-campaign-mosaic.jpg',
    'assets/agent-campaign-mosaic.jpg',
  ]) {
    const absolutePath = join(repositoryRoot, relativePath);
    assert.ok(existsSync(absolutePath), `${relativePath} does not exist`);
    assert.ok(statSync(absolutePath).size > 0, `${relativePath} is empty`);
  }
});
