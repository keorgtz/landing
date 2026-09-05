const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');

let browser, server, baseURL;
const project = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

before(async () => {
  server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(project, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(project + path.sep)) { response.writeHead(403).end(); return; }
    try {
      const data = await readFile(file);
      response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(data);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  baseURL = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    args: ['--no-sandbox']
  });
});

after(async () => {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
});

async function visit(options = {}, setup) {
  const context = await browser.newContext({ colorScheme: 'dark', reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 }, ...options });
  if (setup) await setup(context);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  return { context, page, errors };
}

test('theme follows the system, persists explicit choices and synchronizes tabs', async () => {
  const { context, page, errors } = await visit({ colorScheme: 'light' });
  try {
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    await page.getByRole('button', { name: 'Activar tema claro' }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem('keorsoft-theme')), 'light');
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    const second = await context.newPage();
    await second.goto(baseURL);
    await second.getByRole('button', { name: 'Activar tema oscuro' }).click();
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    assert.equal(await page.locator('#theme-color').getAttribute('content'), '#05070a');
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('theme and navigation work when storage is blocked', async () => {
  const { context, page, errors } = await visit({}, context => context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  }));
  try {
    await page.getByRole('button', { name: 'Activar tema claro' }).click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('mobile navigation opens, closes with Escape, links, outside click and desktop resize', async () => {
  const { context, page } = await visit({ viewport: { width: 390, height: 844 } });
  try {
    const button = page.locator('#menuToggle');
    const menu = page.locator('#mobile-menu');
    await button.click();
    assert.equal(await button.getAttribute('aria-expanded'), 'true');
    assert.equal(await menu.isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(await menu.isVisible(), false);
    assert.equal(await button.evaluate(element => document.activeElement === element), true);
    await button.click();
    await menu.getByRole('link', { name: 'Servicios', exact: true }).click();
    assert.equal(new URL(page.url()).hash, '#servicios');
    assert.equal(await menu.isVisible(), false);
    await button.click();
    await page.mouse.click(10, 500); // The page margin is outside the dropdown.
    assert.equal(await menu.isVisible(), false);
    await button.click();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForFunction(() => document.getElementById('menuToggle').getAttribute('aria-expanded') === 'false');
  } finally { await context.close(); }
});

test('ecosystem tabs support pointer, arrows, Home/End and responsive orientation', async () => {
  const { context, page } = await visit();
  try {
    await page.locator('#tab-software').click();
    assert.equal(await page.locator('#panel-software').isVisible(), true);
    assert.equal(await page.locator('#panel-design').isVisible(), false);
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('#tab-ai').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#panel-ai').isVisible(), true);
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#tab-design').getAttribute('aria-selected'), 'true');
    await page.keyboard.press('End');
    assert.equal(await page.locator('#tab-ai').getAttribute('aria-selected'), 'true');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => document.querySelector('[role="tablist"]').getAttribute('aria-orientation') === 'horizontal');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#tab-design').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('.experience-tab[tabindex="0"]').count(), 1);
    assert.equal(await page.locator('.experience-panel:visible').count(), 1);
  } finally { await context.close(); }
});

test('motion can be paused and respects live reduced-motion changes', async () => {
  const { context, page } = await visit({ reducedMotion: 'no-preference' });
  try {
    const pause = page.locator('#motionToggle');
    assert.equal(await pause.isVisible(), true);
    assert.equal(await page.locator('.architecture-stack').evaluate(element => getComputedStyle(element).animationName), 'stack-drift');
    await pause.click();
    assert.equal(await pause.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.architecture-stack').evaluate(element => getComputedStyle(element).animationPlayState), 'paused');
    await pause.click();
    assert.equal(await pause.getAttribute('aria-pressed'), 'false');
    await page.locator('#contacto').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('.hero-visual').classList.contains('scene-paused'));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.architecture-stack')).animationName === 'none');
    assert.equal(await pause.isVisible(), false);
    assert.equal(await page.locator('.terminal-line').count(), 3);
  } finally { await context.close(); }
});

test('contact prepares an encoded WhatsApp message, retains fields and offers a fallback', async () => {
  const { context, page } = await visit({}, context => context.addInitScript(() => {
    window.open = (...args) => { window.lastOpen = args; return null; };
  }));
  try {
    await page.locator('#name').fill('  ');
    await page.locator('#email').fill('ana@example.com');
    await page.locator('#message').fill('Un CRM & IA para mi negocio.\n¿Lo platicamos?');
    await page.locator('.btn-submit').click();
    assert.equal(await page.evaluate(() => Boolean(window.lastOpen)), false);
    await page.locator('#name').fill('Ana Pérez');
    await page.locator('.btn-submit').click();
    const args = await page.evaluate(() => window.lastOpen);
    const url = new URL(args[0]);
    assert.equal(url.origin + url.pathname, 'https://wa.me/523327633233');
    assert.equal(url.searchParams.get('text'), 'Hola, Keorsoft. Soy Ana Pérez.\nCorreo: ana@example.com\n\nUn CRM & IA para mi negocio.\n¿Lo platicamos?');
    assert.equal(args[2], 'noopener,noreferrer');
    assert.equal(await page.locator('#whatsapp-fallback').getAttribute('href'), args[0]);
    assert.equal(await page.locator('#form-success').isVisible(), true);
    assert.equal(await page.locator('#name').inputValue(), 'Ana Pérez');
    await page.locator('#message').fill('Otro proyecto');
    assert.equal(await page.locator('#form-success').isVisible(), false);
  } finally { await context.close(); }
});

test('both themes fit mobile, tablet and desktop and retain all local destinations', async () => {
  const { context, page, errors } = await visit();
  try {
    for (const theme of ['dark', 'light']) {
      if (theme === 'light') await page.locator('#themeToggle').click();
      for (const width of [320, 390, 600, 768, 900, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        // Chromium delivers media-query changes on the next rendering frame.
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const overflow = await page.evaluate(() => [...document.querySelectorAll('main a, main button, .product-card, .pillar-card, .oss-card, .experience-workspace, .hero-title')].filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.width && (rect.right > innerWidth + 1 || rect.left < -1);
        }).map(element => element.className));
        assert.deepEqual(overflow, [], `${theme} at ${width}px`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      }
    }
    for (const id of ['inicio', 'nosotros', 'servicios', 'productos', 'opensource', 'contacto']) assert.equal(await page.locator(`#${id}`).count(), 1);
    for (const title of ['MeridianUI', 'Controls & Libraries for .NET', 'REASP', 'RACSP']) assert.ok(await page.getByRole('heading', { name: title, exact: true }).count());
    const destinations = await page.locator('a[href]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')).filter(href => !/^(https?:|mailto:|tel:)/.test(href)))]);
    for (const href of destinations) {
      if (href === '#') continue; // Existing social placeholders are preserved.
      if (href.startsWith('#')) assert.equal(await page.locator(href).count(), 1, href);
      else assert.equal((await page.request.get(new URL(href, baseURL).href)).status(), 200, href);
    }
    assert.deepEqual(errors, []);
  } finally { await context.close(); }
});

test('content, contact alternatives and navigation remain usable without JavaScript', async () => {
  const { context, page } = await visit({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    assert.equal(await page.locator('#mobile-menu').isVisible(), true);
    assert.equal(await page.locator('#nosotros .section-title').isVisible(), true);
    assert.equal(await page.locator('#nosotros .section-title').evaluate(element => getComputedStyle(element.closest('.scroll-reveal')).opacity), '1');
    assert.equal(await page.locator('#panel-ai').isVisible(), true);
    assert.equal(await page.locator('.btn-submit').isVisible(), false);
    assert.equal(await page.locator('.form-note a[href^="mailto:"]').isVisible(), true);
    await page.locator('.faq-items summary').first().click();
    assert.equal(await page.locator('.faq-items details').first().getAttribute('open'), '');
  } finally { await context.close(); }
});

test('WCAG A/AA automated checks pass in both themes and all ecosystem panels', { timeout: 120000 }, async () => {
  const { context, page } = await visit();
  try {
    for (const theme of ['dark', 'light']) {
      if (theme === 'light') await page.locator('#themeToggle').click();
      for (const tab of ['design', 'software', 'ai']) {
        await page.locator(`#tab-${tab}`).click();
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        assert.deepEqual(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), [], `${theme}/${tab}`);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#menuToggle').click();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(result.violations.map(item => item.id), []);
  } finally { await context.close(); }
});
