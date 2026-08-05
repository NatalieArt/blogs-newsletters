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
  assert.match(onboardingHtml, /src="\.\.\/assets\/agent\/agent-claude-batch\.jpg"/);
});

test('root index features onboarding before preserving the three-card grid', () => {
  const featurePosition = indexHtml.indexOf('class="featured-guide');
  const gridPosition = indexHtml.indexOf('class="bento"');

  assert.notEqual(featurePosition, -1, 'missing featured onboarding guide');
  assert.ok(featurePosition < gridPosition, 'featured guide must precede the existing card grid');
  assert.match(indexHtml, /href="onboarding\/"/);
  assert.match(indexHtml, /src="assets\/agent\/agent-claude-batch\.jpg"/);
  assert.equal((indexHtml.match(/class="card reveal"/g) || []).length, 3);
});

test('agent proof uses one screenshot and a dense mixed wall of shared results', () => {
  const mediaFiles = [
    'assets/agent/agent-claude-batch.jpg',
    'assets/agent/agent-result-shark-ceo.mp4',
    'assets/agent/agent-result-sumo-chihuahua.mp4',
    'assets/agent/agent-result-rollerskate-nun.mp4',
    'assets/agent/agent-result-boxing-ballerina.mp4',
    'assets/agent/agent-still-dog-crown.jpg',
    'assets/agent/agent-still-tv-popcorn.jpg',
    'assets/agent/agent-still-mermaid-gym.jpg',
    'assets/agent/agent-still-horse-selfie.jpg',
    'assets/agent/agent-still-popcorn-cannonball.jpg',
    'assets/agent/agent-still-breakdancer.jpg',
    'assets/agent/agent-still-pigeon-chess.jpg',
    'assets/agent/agent-still-chef-donuts.jpg',
    'assets/agent/agent-poster-shark-ceo.jpg',
    'assets/agent/agent-poster-sumo-chihuahua.jpg',
    'assets/agent/agent-poster-rollerskate-nun.jpg',
    'assets/agent/agent-poster-boxing-ballerina.jpg',
  ];

  for (const relativePath of mediaFiles) {
    const absolutePath = join(repositoryRoot, relativePath);
    assert.ok(existsSync(absolutePath), `${relativePath} does not exist`);
    assert.ok(statSync(absolutePath).size > 0, `${relativePath} is empty`);
  }

  for (const html of [onboardingHtml, indexHtml]) {
    assert.equal((html.match(/class="agent-result-tile/g) || []).length, 12);
    assert.equal((html.match(/class="agent-result-image"/g) || []).length, 8);
    assert.equal((html.match(/class="agent-result-video"/g) || []).length, 4);
    assert.equal((html.match(/class="agent-result-poster"/g) || []).length, 4);
    assert.match(html, /autoplay loop muted playsinline/);
    assert.match(html, /1 prompt &middot; 30 assets generated in moments/);
    assert.doesNotMatch(html, /agent-campaign-mosaic\.jpg/);
  }
});

test('onboarding hero crop keeps the model mouth in frame', () => {
  assert.match(onboardingHtml, /object-position:center 68%/);
});

test('secondary route is text-only', () => {
  assert.match(onboardingHtml, /\.agent-preface-actions \.agent-secondary\{min-height:0;border:0;border-radius:0;background:transparent/);
});
