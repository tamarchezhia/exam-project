# 🍓 Sweet Memories — ჯანსაღი დესერტების ონლაინ მაღაზია

ფრონტენდ-პროექტი (HTML5, CSS3, JavaScript). მაღაზია გთავაზობთ უშაქრო, ბუნებრივი ინგრედიენტებით დამზადებულ დესერტებს.

## 1. პროექტის მიზანი
შეიქმნას სემანტიკური, რესპონსიული და ინტერაქტიული ვებგვერდი, რომელიც წარმოადგენს ჯანსაღი დესერტების ონლაინ მაღაზიას და ეხმარება მომხმარებელს პროდუქციის შერჩევაში და შეკვეთაში.

## 2. დაგეგმვა

### ეტაპები და ვადები (4 კვირა)
| # | ეტაპი | აქტივობები | ვადა |
|---|-------|-----------|------|
| 1 | ანალიზი და დაგეგმვა | თემის არჩევა, კონკურენტების ანალიზი, ბიზნეს მოდელი, wireframe | კვირა 1 |
| 2 | დიზაინი | ფერთა პალიტრა, ტიპოგრაფია, მობილურის და დესკტოპის მაკეტი | კვირა 1–2 |
| 3 | HTML სტრუქტურა | სემანტიკური მარკაფი (header, nav, main, section, footer) | კვირა 2 |
| 4 | CSS სტილი | Flexbox/Grid, media queries, mobile-first | კვირა 2–3 |
| 5 | JavaScript | მენიუ, ფილტრი, კალათა, სლაიდერი, ფორმის ვალიდაცია | კვირა 3 |
| 6 | ტესტირება და ოპტიმიზაცია | Lighthouse, W3C ვალიდატორი, ბრაუზერები, მოწყობილობები | კვირა 4 |
| 7 | გამოქვეყნება და ანგარიში | GitHub Pages, README, პრეზენტაცია | კვირა 4 |

### რისკები
| რისკი | ალბათობა | გავლენა | შემარბილებელი ზომა |
|-------|---------|---------|--------------------|
| ვადების გადაჭარბება | საშუალო | მაღალი | ამოცანების დაყოფა, MVP-ის პრიორიტეტი |
| ცუდი ჩვენება მობილურზე | საშუალო | მაღალი | Mobile-first მიდგომა, რეალურ მოწყობილობაზე ტესტი |
| ფორმის ვალიდაციის შეცდომები | დაბალი | საშუალო | ტესტ-სცენარები, რეგულარული გამოსახულებები |
| კოდის დაკარგვა | დაბალი | მაღალი | Git/GitHub, ხშირი commit |
| ნელი ჩატვირთვა | საშუალო | საშუალო | მინიმალური რესურსები, ემოჯი/SVG სურათების ნაცვლად |

### რესურსები და მეთოდები
- **ინსტრუმენტები:** VS Code, Git, GitHub, Chrome DevTools, Lighthouse, W3C Validator, Figma (მაკეტი)
- **მეთოდოლოგია:** Mobile-first, ინკრემენტული განვითარება (Agile-ის მსგავსი ციკლები), BEM-ს მსგავსი კლასების სახელდება
- **ადამიანური რესურსი:** 1 დეველოპერი/დიზაინერი

## 3. ბიზნესმოდელი
სრული ბიზნესმოდელი (8 პუნქტი) იხ. [BUSINESS_MODEL.md](BUSINESS_MODEL.md).

## 4. ვებგვერდის გვერდები და ფუნქციონალი
| გვერდი | ფუნქცია |
|---|---|
| `index.html` | მთავარი, ჩვენ შესახებ, პოპულარული პროდუქტები, შეფასებების სლაიდერი |
| `products.html` | პროდუქციის ბადე, ფილტრი (ვეგანური/უგლუტენო/უმი), ძებნა, ფასით დალაგება |
| `product.html?id=N` | პროდუქტის დეტალური გვერდი: ინგრედიენტები, წონა, კალორია, რაოდენობა |
| `cart.html` | კალათა (+/−/წაშლა), მიტანის გამოთვლა, შეკვეთის გაფორმება ვალიდაციით |
| `contact.html` | კონტაქტი და უკუკავშირის ფორმა |

- სემანტიკური HTML5, ARIA, მობილური/პლანშეტი/დესკტოპი (Grid + Flexbox + media query)
- ჰამბურგერ-მენიუ მობილურზე

### ⚠️ სერვერის იმიტაცია
სერვერი არ გამოიყენება. შეკვეთები (`sm-orders`) და შეტყობინებები (`sm-messages`) ინახება ბრაუზერის `localStorage`-ში; კალათა — `sm-cart`-ში. რეალურ გარემოში ამას ჩაანაცვლებს Node.js/Express + მონაცემთა ბაზა და გადახდის API.

## 5. სტრუქტურა
```
sweet-memories/
├── index.html  products.html  product.html  cart.html  contact.html
├── css/style.css
├── js/script.js
├── docs/adr/ (არქიტექტურული გადაწყვეტილებები) · docs/screenshots/
├── BUSINESS_MODEL.md
└── README.md
```

## 6. ოპტიმიზაცია
- CSS ცვლადები (`:root`) — კოდის გამეორების შემცირება
- ერთი CSS და ერთი JS ფაილი, `defer`; ერთი სკრიპტი ყველა გვერდისთვის (`pages` ობიექტი)
- Event delegation (ერთი listener პროდუქციის ბადეზე)
- სურათების ნაცვლად ემოჯი — 0 დამატებითი HTTP მოთხოვნა
- `clamp()` ადაპტური ტიპოგრაფიისთვის, მინიმალური DOM
- `try/catch` localStorage-ზე უსაფრთხო წვდომისთვის

## 7. Git / GitHub
თითო ფუნქციას ცალკე ბრენჩი აქვს, ისინი Pull Request-ით ერწყმის `main`-ს:
```bash
git init && git add . && git commit -m "chore: initial project structure"
git branch -M main && git remote add origin https://github.com/<username>/sweet-memories.git && git push -u origin main

git checkout -b feature/html-pages
git add *.html && git commit -m "feat: add semantic HTML5 pages"
git push -u origin feature/html-pages        # → Pull Request → merge to main

git checkout main && git pull && git checkout -b feature/styles
git add css && git commit -m "style: add responsive layout (Grid, Flexbox)"

git checkout main && git pull && git checkout -b feature/cart-checkout
git add js && git commit -m "feat: add filters, product details, cart and checkout validation"

git checkout main && git pull && git checkout -b docs/documentation
git add docs README.md BUSINESS_MODEL.md && git commit -m "docs: add README, ADR and business model"

git checkout main && git pull && git checkout -b perf/optimization
git commit -am "perf: optimize code after Lighthouse audit"
```
გამოქვეყნება: GitHub Pages (Settings → Pages → `main`) ან Vercel (Import Git Repository → Deploy).

## 8. გაშვება
გახსენით `index.html` ბრაუზერში (სერვერი საჭირო არ არის).

## 9. შესაძლო განვითარება
ონლაინ გადახდა, ადმინ-პანელი, ბექენდი (Node.js), რეალური ფოტოები (WebP), მრავალენოვანი ვერსია.
