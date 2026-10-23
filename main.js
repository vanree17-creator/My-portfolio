// main.js — reads CONTENT (from content.js) and builds the page.
// Students do not need to edit this file.

const C = CONTENT;
const $ = (id) => document.getElementById(id);

// Escape text so characters like < or & show correctly and safely.
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
));

// A link that opens in a new tab (used for external sites).
const extLink = (url, label, cls = "") =>
  `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;

// ---- Header and hero ----
$("name").textContent = C.name;
$("title").textContent = C.title;
$("shortBio").textContent = C.shortBio;
document.title = `${C.name} · Portfolio`;

// Show the photo if one is set; otherwise show initials (e.g. "EK").
if (C.photo) {
  $("avatar").innerHTML = `<img src="${esc(C.photo)}" alt="Photo of ${esc(C.name)}">`;
} else {
  const parts = C.name.split(" ");
  $("avatar").textContent = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Round social icons. Each icon is a small SVG drawing (no extra files needed).
const ICONS = {
  GitHub: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>',
  LinkedIn: '<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5z"/>',
  Zindi: '<path d="M5 4h14v3.2L9.6 17H19v3H5v-3.2L14.4 7H5z"/>',
  Location: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
  Email: '<path d="M2 5h20v14H2V5zm2 2v.5l8 5 8-5V7H4zm16 2.8-8 5-8-5V17h16V9.8z"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.Email}</svg>`;
$("socials").innerHTML =
  C.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}">${icon(l.label)}</a>`).join("") +
  `<a href="mailto:${esc(C.email)}" aria-label="Email">${icon("Email")}</a>`;

// Main buttons: Download CV (only if a file is set) and Contact Me.
$("heroButtons").innerHTML = [
  C.cv ? `<a class="btn primary" href="${esc(C.cv)}" download>Download CV</a>` : "",
  `<a class="btn${C.cv ? "" : " primary"}" href="#contact">Contact Me</a>`,
].join("");

// ---- About ----
$("about-text").innerHTML = C.about.map((p) => `<p>${esc(p)}</p>`).join("");
$("openTo").innerHTML = C.openTo.map((t) => `<li>${esc(t)}</li>`).join("");
$("languages").textContent = `Languages: ${C.languages}`;

// ---- Projects with category filter ----
function renderProjects(filter) {
  const list = C.projects.filter((p) => filter === "All" || p.category.includes(filter));
  $("projectList").innerHTML = list.map((p) => `
    <article class="card">
      <div class="badges">${p.category.map((c) => `<span class="badge">${esc(c)}</span>`).join("")}</div>
      <h3>${esc(p.name)}</h3>
      <p><strong>Problem:</strong> ${esc(p.problem)}</p>
      <p><strong>What I did:</strong> ${esc(p.did)}</p>
      <p><strong>Result:</strong> ${esc(p.result)}</p>
      <ul class="tags small">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      ${p.link ? extLink(p.link, "View project →", "more") : ""}
    </article>`).join("");
}

const categories = ["All", "ML", "AI", "Web"];
$("filters").innerHTML = categories
  .map((c) => `<button class="chip${c === "All" ? " active" : ""}" data-cat="${c}">${c}</button>`)
  .join("");
$("filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((b) => b.classList.toggle("active", b === btn));
  renderProjects(btn.dataset.cat);
});
renderProjects("All");

// ---- Skills ----
$("skillList").innerHTML = C.skills.map((s) => `
  <div class="card">
    <h3>${esc(s.group)}</h3>
    <ul class="tags small">${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </div>`).join("");

// ---- Education ----
$("eduList").innerHTML = C.education.map((e) => `
  <div class="card">
    <h3>${esc(e.degree)}</h3>
    <p class="muted">${esc(e.school)} · ${esc(e.years)}</p>
    <p>${esc(e.details)}</p>
  </div>`).join("");

// ---- Communities (e.g. Signi AI Hub) ----
$("communityList").innerHTML = (C.communities || []).map((m) => `
  <div class="card">
    <h3>${esc(m.name)}</h3>
    <p class="muted">${esc(m.role)}</p>
    <p>${esc(m.details)}</p>
    ${m.link ? extLink(m.link, "Visit →", "more") : ""}
  </div>`).join("");

// ---- Contact and footer ----
// Each contact is one row: round icon, name, and the address. Rows stack downwards.
const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");   // "github.com/..." instead of "https://github.com/..."
const contactRow = (iconName, label, value, href, external) => `
  <a class="contact-item" href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ""}>
    <span class="contact-icon">${icon(iconName)}</span>
    <span><strong>${esc(label)}</strong><small>${esc(value)}</small></span>
  </a>`;
$("contactButtons").innerHTML = [
  contactRow("Email", "Email", C.email, `mailto:${C.email}`, false),
  ...C.links.map((l) => contactRow(l.label, l.label, shortUrl(l.url), l.url, true)),
  `<div class="contact-item">
     <span class="contact-icon">${icon("Location")}</span>
     <span><strong>Location</strong><small>${esc(C.location)}</small></span>
   </div>`,
].join("");
$("footer").textContent = `© ${new Date().getFullYear()} ${C.name} · ${C.location}`;

// ============================================================
//  ANIMATIONS
// ============================================================
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- 1. Typing effect: types each role, deletes it, then types the next ----
(function typeRoles() {
  const roles = C.roles || [];
  if (!roles.length) return;
  if (reduceMotion) { $("typed").textContent = roles[0]; return; }
  let r = 0, i = 0, deleting = false;
  function tick() {
    const word = roles[r];
    i += deleting ? -1 : 1;                       // add or remove one letter
    $("typed").textContent = word.slice(0, i);
    let delay = deleting ? 45 : 90;               // deleting is faster than typing
    if (!deleting && i === word.length) { deleting = true; delay = 1500; }   // pause on full word
    else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
})();

// ---- 2. Reveal: items in a tab fade up one after another when the tab opens ----
document.querySelectorAll(".page h2, .page .card, .page > p, .page .tags, .page .filters, .page h3, .page .contact-item")
  .forEach((el) => el.classList.add("reveal"));

function revealItems(page) {
  const items = page.querySelectorAll(".reveal");
  items.forEach((el) => el.classList.remove("show"));
  void page.offsetWidth;                         // force the browser to restart the animation
  items.forEach((el, n) => setTimeout(() => el.classList.add("show"), 80 * n));   // stagger
}

// Cards drawn again by the project filter should appear straight away.
$("filters").addEventListener("click", () => {
  document.querySelectorAll("#projectList .card").forEach((el) => el.classList.add("reveal", "show"));
});

// ---- 3. "Neural network" background: moving dots joined by lines ----
(function network() {
  const canvas = $("network");
  const ctx = canvas.getContext("2d");
  let dots = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const count = Math.min(70, Math.floor(canvas.width / 18));   // fewer dots on phones
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,          // small random speed
      vy: (Math.random() - 0.5) * 0.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > canvas.width) d.vx *= -1;   // bounce off the edges
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      ctx.fillStyle = "rgba(0, 171, 240, 0.6)";
      ctx.beginPath(); ctx.arc(d.x, d.y, 2, 0, Math.PI * 2); ctx.fill();
    }
    // Join dots that are close together. O(n²) checks, fine for ≤ 70 dots.
    for (let a = 0; a < dots.length; a++) {
      for (let b = a + 1; b < dots.length; b++) {
        const dx = dots[a].x - dots[b].x, dy = dots[a].y - dots[b].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(0, 171, 240, ${0.25 * (1 - dist / 120)})`;   // fainter when further
          ctx.beginPath(); ctx.moveTo(dots[a].x, dots[a].y); ctx.lineTo(dots[b].x, dots[b].y); ctx.stroke();
        }
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
})();

// ---- 4. Tabs: show ONE section at a time instead of scrolling ----
// The address bar keeps the tab name (e.g. .../#projects), so the browser's
// Back button works and a link can open a tab directly.
const pages = document.querySelectorAll(".page");
const menuLinks = document.querySelectorAll("#menu a");

function openTab() {
  const id = location.hash.slice(1) || "home";             // no hash = Home
  const target = document.getElementById(id);
  const page = target && target.classList.contains("page") ? target : $("home");
  pages.forEach((p) => p.classList.toggle("active", p === page));
  menuLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${page.id}`));
  window.scrollTo(0, 0);                                   // start each tab at the top
  if (page.id !== "home") revealItems(page);
}

window.addEventListener("hashchange", openTab);            // runs when a tab link is clicked
openTab();                                                 // open the right tab on first load