'use strict';
const PRODUCTS = [
  {id:1,name:'ფინიკის ჩიზქეიქი',price:12,tags:['gf'],emoji:'🍰',w:'150 გ',kcal:260,ing:'ფინიკი, კეშიუ, ქოქოსის ზეთი, ლიმონი, მარწყვი',desc:'უშაქრო ჩიზქეიქი ფინიკისა და კეშიუს ბაზაზე.'},
  {id:2,name:'ავოკადოს მუსი',price:9,tags:['vegan','raw','gf'],emoji:'🥑',w:'120 გ',kcal:190,ing:'ავოკადო, კაკაო, ნეკერჩხლის სიროფი, ვანილი',desc:'ნაზი მუსი კაკაოთი და ნეკერჩხლის სიროფით.'},
  {id:3,name:'ქერის ბრაუნი',price:8,tags:['vegan'],emoji:'🍫',w:'90 გ',kcal:210,ing:'ქერის ფქვილი, მუქი შოკოლადი, ბანანი, ნიგოზი',desc:'მუქი შოკოლადის ბრაუნი ქერის ფქვილით.'},
  {id:4,name:'ენერჯი ბურთულები',price:10,tags:['vegan','raw','gf'],emoji:'🟤',w:'6 ცალი / 120 გ',kcal:300,ing:'თხილი, ფინიკი, ქოქოსის ქონი, კაკაო',desc:'ენერგიული სნექი თხილითა და ფინიკით.'},
  {id:5,name:'ჩიას პუდინგი',price:7,tags:['vegan','raw','gf'],emoji:'🍓',w:'180 გ',kcal:170,ing:'ჩიას თესლი, ბადრიჯნის რძე... ქოქოსის რძე, მარწყვი',desc:'მსუბუქი პუდინგი ხილით.'},
  {id:6,name:'ხილის სორბეტი',price:6,tags:['vegan','raw','gf'],emoji:'🍧',w:'100 გ',kcal:90,ing:'სეზონური ხილი, ლიმონის წვენი',desc:'100% ხილი, დამატებული შაქრის გარეშე.'}
];
PRODUCTS[4].ing = 'ჩიას თესლი, ქოქოსის რძე, მარწყვი, თაფლი';
const REVIEWS = [
  {t:'ბოლოს ვიპოვე დესერტი, რომელიც დანაშაულის გრძნობას არ მიტოვებს!',a:'ნინო, თბილისი'},
  {t:'ჩიზქეიქი საოცარია, შვილიც კი ვერ ხვდება, რომ უშაქროა.',a:'გიორგი, ბათუმი'},
  {t:'სწრაფი მიტანა და ულამაზესი შეფუთვა. რეკომენდებულია!',a:'მარიამი, ქუთაისი'}
];
const FREE_FROM = 40, DELIVERY = 5;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const money = n => n + ' ₾';
const find = id => PRODUCTS.find(p => p.id == id);
let cart = store.get('sm-cart', {});

function totals() {
  let count = 0, sum = 0;
  for (const [id, q] of Object.entries(cart)) { const p = find(id); if (p) { count += q; sum += q * p.price; } }
  const delivery = sum === 0 || sum >= FREE_FROM ? 0 : DELIVERY;
  return {count, sum, delivery, total: sum + delivery};
}
function saveCart() {
  store.set('sm-cart', cart);
  const t = totals();
  $('#cart-count').textContent = t.count;
  $('#cart-total').textContent = money(t.sum);
}
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 2000);
}
function addToCart(id, q = 1) { cart[id] = (cart[id] || 0) + q; saveCart(); toast('დაემატა კალათაში ✓'); }
const card = p => `<article class="card"><div class="emoji" aria-hidden="true">${p.emoji}</div>
  <h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p>${p.desc}</p><span class="price">${money(p.price)}</span>
  <button class="btn" data-add="${p.id}">კალათაში</button></article>`;

// ვალიდაცია
const rules = {
  name: v => v.trim().split(/\s+/).length >= 2 || 'შეიყვანეთ სახელი და გვარი',
  cname: v => v.trim().length >= 2 || 'შეიყვანეთ სახელი',
  phone: v => /^(\+995)?5\d{8}$/.test(v.replace(/\s|-/g, '')) || 'არასწორი ნომერი (5xx xxx xxx)',
  address: v => v.trim().length >= 8 || 'მიუთითეთ სრული მისამართი',
  date: v => (v && v >= new Date().toISOString().slice(0, 10)) || 'აირჩიეთ დღევანდელი ან მომავალი თარიღი',
  cemail: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'არასწორი ელ-ფოსტა',
  cmsg: v => v.trim().length >= 10 || 'მინ. 10 სიმბოლო'
};
function validate(form) {
  let ok = true;
  for (const el of form.querySelectorAll('input,textarea')) {
    const rule = rules[el.id]; if (!rule) continue;
    const r = rule(el.value), err = form.querySelector(`[data-for="${el.id}"]`);
    if (err) err.textContent = r === true ? '' : r;
    el.classList.toggle('invalid', r !== true);
    if (r !== true) ok = false;
  }
  return ok;
}

// მენიუ
const btn = $('.menu-btn'), nav = $('#nav');
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', nav.classList.toggle('open')));
document.addEventListener('click', e => { const id = e.target.dataset?.add; if (id) addToCart(+id); });

const pages = {
  home() {
    $('#featured').innerHTML = PRODUCTS.slice(0, 3).map(card).join('');
    let cur = 0, timer;
    const show = i => {
      cur = (i + REVIEWS.length) % REVIEWS.length;
      $('#slides').innerHTML = `<q>${REVIEWS[cur].t}</q><b>${REVIEWS[cur].a}</b>`;
      $$('#dots button').forEach((d, k) => d.classList.toggle('on', k === cur));
    };
    const restart = () => { clearInterval(timer); timer = setInterval(() => show(cur + 1), 5000); };
    $('#dots').innerHTML = REVIEWS.map((_, i) => `<button aria-label="სლაიდი ${i + 1}" data-i="${i}"></button>`).join('');
    $('#prev').onclick = () => { show(cur - 1); restart(); };
    $('#next').onclick = () => { show(cur + 1); restart(); };
    $('#dots').onclick = e => { if (e.target.dataset.i) { show(+e.target.dataset.i); restart(); } };
    show(0); restart();
  },
  products() {
    let filter = 'all';
    const render = () => {
      const q = $('#search').value.trim().toLowerCase(), s = $('#sort').value;
      let list = PRODUCTS.filter(p => (filter === 'all' || p.tags.includes(filter)) && p.name.toLowerCase().includes(q));
      if (s !== 'def') list.sort((a, b) => s === 'asc' ? a.price - b.price : b.price - a.price);
      $('#grid').innerHTML = list.map(card).join('');
      $('#empty').hidden = list.length > 0;
    };
    $$('.chip').forEach(c => c.onclick = () => {
      $$('.chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); filter = c.dataset.filter; render();
    });
    $('#search').oninput = render; $('#sort').onchange = render; render();
  },
  product() {
    const p = find(new URLSearchParams(location.search).get('id'));
    if (!p) { $('#detail').innerHTML = '<p>პროდუქტი ვერ მოიძებნა.</p>'; return; }
    document.title = p.name + ' | Sweet Memories';
    const names = {vegan: 'ვეგანური', gf: 'უგლუტენო', raw: 'უმი'};
    $('#detail').innerHTML = `<div class="big" aria-hidden="true">${p.emoji}</div><div>
      <h1>${p.name}</h1><p class="price">${money(p.price)}</p><p>${p.desc}</p>
      <p class="badges">${p.tags.map(t => `<span>${names[t]}</span>`).join('')}</p>
      <p><b>ინგრედიენტები:</b> ${p.ing}</p><p><b>წონა:</b> ${p.w} • <b>კალორია:</b> ${p.kcal} კკალ</p>
      <div class="buy"><div class="qty"><button id="m" aria-label="შემცირება">−</button>
      <input id="q" type="number" min="1" max="20" value="1" aria-label="რაოდენობა"><button id="pl" aria-label="გაზრდა">+</button></div>
      <button class="btn" id="add">კალათაში დამატება</button></div></div>`;
    const q = $('#q'), clamp = v => Math.min(20, Math.max(1, parseInt(v) || 1));
    $('#m').onclick = () => q.value = clamp(+q.value - 1);
    $('#pl').onclick = () => q.value = clamp(+q.value + 1);
    $('#add').onclick = () => addToCart(p.id, clamp(q.value));
  },
  cart() {
    const box = $('#cart-box');
    const render = () => {
      const t = totals(), ids = Object.keys(cart).filter(find);
      $('#checkout').hidden = !ids.length;
      if (!ids.length) { box.innerHTML = '<p>კალათა ცარიელია. <a href="products.html">გადადით პროდუქციაზე</a></p>'; return; }
      box.innerHTML = `<div class="table-wrap"><table><thead><tr><th>პროდუქტი</th><th>ფასი</th><th>რაოდ.</th><th>ჯამი</th><th></th></tr></thead><tbody>
        ${ids.map(id => { const p = find(id), q = cart[id]; return `<tr><td>${p.emoji} ${p.name}</td><td>${money(p.price)}</td>
        <td><span class="qty"><button data-d="-1" data-id="${id}" aria-label="შემცირება">−</button>${q}<button data-d="1" data-id="${id}" aria-label="გაზრდა">+</button></span></td>
        <td>${money(p.price * q)}</td><td><button class="link-btn" data-rm="${id}">წაშლა</button></td></tr>`; }).join('')}</tbody></table></div>
        <div class="sum">პროდუქცია: ${money(t.sum)}<br>მიტანა: ${t.delivery ? money(t.delivery) : 'უფასო'} <small>(უფასოა ${FREE_FROM} ₾-დან)</small><br>
        სულ: <strong>${money(t.total)}</strong></div>`;
    };
    box.onclick = e => {
      const {d, id, rm} = e.target.dataset;
      if (d) { cart[id] += +d; if (cart[id] < 1) delete cart[id]; }
      else if (rm) delete cart[rm]; else return;
      saveCart(); render();
    };
    const dt = $('#date'); dt.min = new Date().toISOString().slice(0, 10);
    $('#order').onsubmit = e => {
      e.preventDefault();
      if (!validate(e.target) || !Object.keys(cart).length) return;
      const t = totals(), no = 'SM-' + Date.now().toString().slice(-6);
      const orders = store.get('sm-orders', []);
      orders.push({no, items: cart, ...t, name: $('#name').value, phone: $('#phone').value, address: $('#address').value, date: dt.value, pay: $('#pay').value});
      store.set('sm-orders', orders);
      cart = {}; saveCart();
      box.hidden = true; $('#checkout').hidden = true;
      const done = $('#done'); done.hidden = false;
      done.innerHTML = '<h2>✅ შეკვეთა მიღებულია!</h2><p></p><p><a class="btn" href="products.html">გაგრძელება</a></p>';
      done.querySelector('p').textContent = `შეკვეთის ნომერი: ${no}. ჯამი: ${money(t.total)}. მიტანა: ${dt.value}.`;
    };
    render();
  },
  contact() {
    $('#contact').onsubmit = e => {
      e.preventDefault();
      const ok = validate(e.target); $('#ok').hidden = !ok;
      if (ok) {
        const m = store.get('sm-messages', []);
        m.push({name: $('#cname').value, email: $('#cemail').value, msg: $('#cmsg').value, at: new Date().toISOString()});
        store.set('sm-messages', m); e.target.reset();
      }
    };
  }
};
saveCart();
pages[document.body.dataset.page]?.();
