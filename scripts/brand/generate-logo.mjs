// Inuverse のロゴを作図の定義から生成する。
//   node scripts/brand/generate-logo.mjs          … public/brand/ に SVG を書き出す
//   node scripts/brand/generate-logo.mjs --png    … あわせて PNG と favicon.ico も作る（rsvg-convert と magick が必要）
// 仕様は docs/brand/README.md。数値を変えたら、この README の表も合わせて直す。
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "public/brand");
const require = createRequire(import.meta.url);
const fontFile = (w) => require.resolve(`@fontsource/outfit/files/outfit-latin-${w}-normal.woff`);
const loadFont = (w) => opentype.parse(new Uint8Array(readFileSync(fontFile(w))).buffer);
const OUTFIT_900 = loadFont(900); // 記号の中の文字
const OUTFIT_600 = loadFont(600); // ロゴタイプ

// ---------------------------------------------------------------- 定義（120 × 120 の枠）
export const COLOR = {
  deepField: "#0a0e24", // 宇宙・ロゴタイプ（白地）
  aka: "#d2742c", //       赤柴の毛色
  urajiro: "#f7ead6", //   裏白・ロゴタイプ（黒地）
  sumi: "#1b1420", //      目・鼻
  mono: "#111827", //      単色版
  monoUrajiro: "#9ca3af", // 単色版の裏白
  galaxies: ["#ffb35c", "#ff8a4c", "#ffe2b0", "#9cc0ff", "#c9d8ff", "#ff9aa8"],
};
export const FIELD = { c: [60, 60], r: 56, seed: 11, count: 52 };
export const STARS = [{ x: 92, y: 30, spike: 6, color: "#ffffff" }, { x: 24, y: 78, spike: 4, color: "#ffe9c4" }];
export const FACE = {
  head: { c: [60, 64], r: 31 },
  ear: { pos: 40, base: 22, len: 19, tilt: 18 }, // 角度は真上から時計回り（度）
  cheek: { dx: 12, y: 76, r: 14 },
  muzzle: { y: 82, rx: 13, ry: 11 },
  eye: { dx: 12.5, y: 61, rx: 3.4, ry: 4 },
  nose: { y: 76, w: 9, h: 6, round: 1 },
  brow: { dx: 11, y: 52, r: 2.6 }, // favicon のみ
  outline: 1.5, // 輪郭を外へ広げる幅（角を丸める）
};
export const TEXT = { word: "INUVERSE", size: 6.2, lead: 5.2, top: 20, track: 0.02, stagger: 17, repeat: 6 };
export const WORDMARK = { text: "Inuverse", track: -0.01 };

// ---------------------------------------------------------------- 幾何
const rad = (d) => (d * Math.PI) / 180;
const f = (x) => +x.toFixed(2);
const pol = (r, d) => [r * Math.sin(rad(d)), -r * Math.cos(rad(d))];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const pt = (q) => `${f(q[0])} ${f(q[1])}`;

// A から B へ向かう線分が円 (c, r) と最初に交わる点
function hit(A, B, c, r) {
  const d = [B[0] - A[0], B[1] - A[1]], m = [A[0] - c[0], A[1] - c[1]];
  const a = d[0] ** 2 + d[1] ** 2, b = 2 * (m[0] * d[0] + m[1] * d[1]), k = m[0] ** 2 + m[1] ** 2 - r * r;
  const t = (-b - Math.sqrt(b * b - 4 * a * k)) / (2 * a);
  return [A[0] + t * d[0], A[1] + t * d[1]];
}

// 頭の輪郭：円に三角の耳を 2 つ足した 1 本のパス
export function headPath() {
  const { c, r } = FACE.head, e = FACE.ear;
  const [L, R] = [-1, 1].map((s) => {
    const A = add(add(c, pol(r, s * e.pos)), pol(e.len, s * e.tilt));
    return {
      A,
      o: hit(A, add(c, pol(r, s * (e.pos + e.base))), c, r),
      i: hit(A, add(c, pol(r, s * (e.pos - e.base))), c, r),
    };
  });
  return `M${pt(L.o)} L${pt(L.A)} L${pt(L.i)} A${r} ${r} 0 0 1 ${pt(R.i)} L${pt(R.A)} L${pt(R.o)} A${r} ${r} 0 1 1 ${pt(L.o)} Z`;
}
const urajiroShapes = () => {
  const cx = FACE.head.c[0], { cheek, muzzle } = FACE;
  return `<circle cx="${cx - cheek.dx}" cy="${cheek.y}" r="${cheek.r}"/><circle cx="${cx + cheek.dx}" cy="${cheek.y}" r="${cheek.r}"/>` +
    `<ellipse cx="${cx}" cy="${muzzle.y}" rx="${muzzle.rx}" ry="${muzzle.ry}"/>`;
};
const features = (ink, eye = FACE.eye) => {
  const cx = FACE.head.c[0], n = FACE.nose;
  return [-1, 1].map((s) => `<ellipse cx="${cx + s * eye.dx}" cy="${eye.y}" rx="${eye.rx}" ry="${eye.ry}" fill="${ink}"/>`).join("") +
    `<path d="M${cx - n.w / 2} ${n.y - n.h / 2} H${cx + n.w / 2} L${cx} ${n.y + n.h / 2} Z" fill="${ink}" stroke="${ink}" stroke-width="${2 * n.round}" stroke-linejoin="round"/>`;
};

// ---------------------------------------------------------------- 銀河（ハッブル・ウルトラ・ディープ・フィールド）
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}
export function galaxies() {
  const r = rng(FIELD.seed), out = [];
  while (out.length < FIELD.count) {
    const [x, y] = add(FIELD.c, pol(Math.sqrt(r()) * (FIELD.r - 4), r() * 360));
    const t = r(), col = COLOR.galaxies[Math.floor(r() * COLOR.galaxies.length)];
    if (t < 0.45) out.push({ k: "dot", x, y, r: 0.4 + r() * 0.8, col });
    else if (t < 0.85) out.push({ k: "ell", x, y, rx: 1.2 + r() ** 2 * 4, q: 0.3 + r() * 0.6, rot: r() * 180, col });
    else out.push({ k: "spi", x, y, s: 2.4 + r() * 2.4, rot: r() * 360, col: COLOR.galaxies[3 + Math.floor(r() * 2)] });
  }
  return out;
}
function galaxySvg(id) {
  const gs = galaxies();
  const glow = [...new Set(gs.filter((g) => g.k === "ell").map((g) => g.col))].map((c, i) =>
    `<radialGradient id="${id}-g${i}"><stop offset="0" stop-color="#fff"/><stop offset="0.35" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`);
  const glowId = (c) => `${id}-g${[...new Set(gs.filter((g) => g.k === "ell").map((g) => g.col))].indexOf(c)}`;
  const body = gs.map((g) => {
    if (g.k === "dot") return `<circle cx="${f(g.x)}" cy="${f(g.y)}" r="${f(g.r)}" fill="${g.col}"/>`;
    if (g.k === "ell") return `<ellipse cx="${f(g.x)}" cy="${f(g.y)}" rx="${f(g.rx)}" ry="${f(g.rx * g.q)}" transform="rotate(${f(g.rot)} ${f(g.x)} ${f(g.y)})" fill="url(#${glowId(g.col)})"/>`;
    const s = g.s;
    return `<g transform="translate(${f(g.x)} ${f(g.y)}) rotate(${f(g.rot)}) scale(1 0.6)"><circle r="${f(s * 0.32)}" fill="#fff"/>` +
      `<path d="M${f(s * 0.3)} 0 A${f(s * 0.7)} ${f(s * 0.7)} 0 0 1 ${f(-s)} ${f(s * 0.2)} M${f(-s * 0.3)} 0 A${f(s * 0.7)} ${f(s * 0.7)} 0 0 1 ${f(s)} ${f(-s * 0.2)}" fill="none" stroke="${g.col}" stroke-width="0.7" stroke-linecap="round"/></g>`;
  }).join("");
  const stars = STARS.map(({ x, y, spike, color }) =>
    `<path d="M${x - spike} ${y} H${x + spike} M${x} ${y - spike} V${y + spike}" stroke="${color}" stroke-width="0.6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="1.4" fill="${color}"/>`).join("");
  return { defs: glow.join(""), body: body + stars };
}

// ---------------------------------------------------------------- 文字をパスにする
function textPath(font, text, x, y, size, track) {
  // stringToGlyphs は Outfit の GSUB（lookupType 6 format 2）で止まるので、1 文字ずつ引く（英大文字と小文字だけなので置換は不要）
  const glyphs = [...text].map((ch) => font.charToGlyph(ch)), scale = size / font.unitsPerEm, parts = [];
  let cx = x;
  glyphs.forEach((g, i) => {
    parts.push({ x0: cx, x1: cx + g.advanceWidth * scale, d: g.getPath(cx, y, size).toPathData(2) });
    cx += g.advanceWidth * scale + track * size;
    if (i < glyphs.length - 1) cx += font.getKerningValue(g, glyphs[i + 1]) * scale;
  });
  return { parts, width: cx - x - track * size };
}
// 記号の中の文字の行。頭の外にはみ出す字は捨ててファイルを軽くする
function textRows() {
  const t = TEXT, ds = [];
  // y は丸めておく。46.000000000000004 のような値だと opentype.js の toPathData が NaN を出す
  for (let i = 0, y = t.top; y < 100; i++, y = f(t.top + i * t.lead)) {
    const x = -40 + ((i * t.stagger) % 40);
    for (const p of textPath(OUTFIT_900, t.word.repeat(t.repeat), x, y, t.size, t.track).parts)
      if (p.x1 > 24 && p.x0 < 96) ds.push(p.d);
  }
  return ds.join("");
}

// ---------------------------------------------------------------- 部品
const svg = (w, h, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(w)} ${f(h)}" width="${f(w)}" height="${f(h)}" role="img" aria-label="${label}">${body}</svg>\n`;

// T-1：INUVERSE の文字で埋めた柴の顔。mono = true で単色（背景の窓と銀河なし）
function markBody(id, { mono = false } = {}) {
  const coat = mono ? COLOR.mono : COLOR.aka, ura = mono ? COLOR.monoUrajiro : COLOR.urajiro, ink = mono ? COLOR.mono : COLOR.sumi;
  const head = headPath(), rows = textRows(), gal = mono ? null : galaxySvg(id);
  const defs = `<clipPath id="${id}-field"><circle cx="${FIELD.c[0]}" cy="${FIELD.c[1]}" r="${FIELD.r}"/></clipPath>` +
    `<clipPath id="${id}-head"><path d="${head}"/></clipPath>` +
    `<mask id="${id}-coat" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120"><path d="${head}" fill="#fff" stroke="#fff" stroke-width="${2 * FACE.outline}" stroke-linejoin="round"/><g fill="#000">${urajiroShapes()}</g></mask>` +
    `<mask id="${id}-ura" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120"><g clip-path="url(#${id}-head)" fill="#fff">${urajiroShapes()}</g></mask>` +
    `<path id="${id}-rows" d="${rows}"/>` + (gal ? gal.defs : "");
  const field = mono ? "" : `<g clip-path="url(#${id}-field)"><circle cx="${FIELD.c[0]}" cy="${FIELD.c[1]}" r="${FIELD.r}" fill="${COLOR.deepField}"/>${gal.body}</g>`;
  return `<defs>${defs}</defs>${field}` +
    `<use href="#${id}-rows" fill="${coat}" mask="url(#${id}-coat)"/><use href="#${id}-rows" fill="${ura}" mask="url(#${id}-ura)"/>` +
    features(ink);
}

// favicon：線で描いた顔（文字と銀河なし）。32px 以下で使う
function faviconBody(id) {
  const head = headPath(), cx = FACE.head.c[0], e = FACE.ear, { c, r } = FACE.head;
  const inner = [-1, 1].map((s) => {
    const A = add(add(c, pol(r, s * e.pos)), pol(e.len, s * e.tilt));
    const b1 = add(c, pol(r, s * (e.pos + e.base * 0.6))), b2 = add(c, pol(r, s * (e.pos - e.base * 0.6)));
    const g = [(A[0] + b1[0] + b2[0]) / 3, (A[1] + b1[1] + b2[1]) / 3], k = 0.55;
    const sh = (p) => [g[0] + (p[0] - g[0]) * k, g[1] + (p[1] - g[1]) * k];
    return `<path d="M${pt(sh(A))} L${pt(sh(b1))} L${pt(sh(b2))} Z" fill="${COLOR.urajiro}"/>`;
  }).join("");
  const brows = [-1, 1].map((s) => `<circle cx="${cx + s * FACE.brow.dx}" cy="${FACE.brow.y}" r="${FACE.brow.r}" fill="${COLOR.urajiro}"/>`).join("");
  return `<defs><clipPath id="${id}-head"><path d="${head}"/></clipPath></defs>` +
    `<circle cx="${FIELD.c[0]}" cy="${FIELD.c[1]}" r="${FIELD.r}" fill="${COLOR.deepField}"/>` +
    `<path d="${head}" fill="${COLOR.aka}" stroke="${COLOR.aka}" stroke-width="3" stroke-linejoin="round"/>${inner}` +
    `<g clip-path="url(#${id}-head)" fill="${COLOR.urajiro}">${urajiroShapes()}</g>${brows}` +
    features(COLOR.sumi, { dx: 12.5, y: 61, rx: 2.8, ry: 3.4 });
}

function wordmark(size, x, baseline, color) {
  const { parts, width } = textPath(OUTFIT_600, WORDMARK.text, x, baseline, size, WORDMARK.track);
  return { d: `<path d="${parts.map((p) => p.d).join("")}" fill="${color}"/>`, width };
}
const capHeight = (font) => font.tables.os2.sCapHeight / font.unitsPerEm;

// ---------------------------------------------------------------- 書き出し
export const LOCKUP = {
  horizontal: { wordSize: 56, gap: 20 }, // 文字の大文字の高さの中心を記号の中心にそろえる
  vertical: { wordSize: 34, gap: 10 },
};
function build() {
  mkdirSync(OUT, { recursive: true });
  const files = {};
  files["inuverse-mark.svg"] = svg(120, 120, markBody("m"), "Inuverse");
  files["inuverse-mark-mono.svg"] = svg(120, 120, markBody("m", { mono: true }), "Inuverse");
  files["inuverse-favicon.svg"] = svg(120, 120, faviconBody("f"), "Inuverse");
  for (const [theme, color] of [["", COLOR.deepField], ["-dark", COLOR.urajiro]]) {
    const H = LOCKUP.horizontal, base = 60 + (capHeight(OUTFIT_600) * H.wordSize) / 2;
    const wh = wordmark(H.wordSize, 120 + H.gap, base, color);
    files[`inuverse-logo-horizontal${theme}.svg`] = svg(120 + H.gap + wh.width + 4, 120, markBody("m") + wh.d, "Inuverse");
    const V = LOCKUP.vertical, probe = wordmark(V.wordSize, 0, 0, color);
    const W = Math.max(120, probe.width), capV = capHeight(OUTFIT_600) * V.wordSize;
    const wv = wordmark(V.wordSize, (W - probe.width) / 2, 120 + V.gap + capV, color);
    files[`inuverse-logo-vertical${theme}.svg`] = svg(W, 120 + V.gap + capV + 0.25 * V.wordSize,
      `<g transform="translate(${f((W - 120) / 2)} 0)">${markBody("m")}</g>` + wv.d, "Inuverse");
    const S = 48, ww = wordmark(S, 0, capHeight(OUTFIT_600) * S, color);
    files[`inuverse-wordmark${theme}.svg`] = svg(ww.width, capHeight(OUTFIT_600) * S + 0.25 * S, ww.d, "Inuverse");
  }
  for (const [name, body] of Object.entries(files)) writeFileSync(join(OUT, name), body);
  console.log(Object.entries(files).map(([n, b]) => `${n}\t${(b.length / 1024).toFixed(1)} KB`).join("\n"));

  if (process.argv.includes("--png")) {
    const png = (src, w, out) => execFileSync("rsvg-convert", ["-w", String(w), join(OUT, src), "-o", join(OUT, out)]);
    for (const s of [16, 32, 48, 180, 192, 512]) png("inuverse-favicon.svg", s, `favicon-${s}.png`);
    for (const s of [256, 512]) png("inuverse-mark.svg", s, `inuverse-mark-${s}.png`);
    png("inuverse-logo-horizontal.svg", 960, "inuverse-logo-horizontal.png");
    png("inuverse-logo-horizontal-dark.svg", 960, "inuverse-logo-horizontal-dark.png");
    execFileSync("magick", [16, 32, 48].map((s) => join(OUT, `favicon-${s}.png`)).concat(join(OUT, "favicon.ico")));
    console.log("png: favicon-{16,32,48,180,192,512}.png, favicon.ico, inuverse-mark-{256,512}.png, inuverse-logo-horizontal{,-dark}.png");
  }
}
if (process.argv[1] === fileURLToPath(import.meta.url)) build();
