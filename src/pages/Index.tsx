import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const CDN = 'https://cdn.poehali.dev/projects/ada1da4d-277b-4f6e-9d53-af236ecc5a03/bucket/ignat';
const PH = {
  p1: `${CDN}/1.jpg`,
  p2: `${CDN}/2.jpg`,
  p3: `${CDN}/3.JPG`,
  p4: `${CDN}/4.JPG`,
  p5: `${CDN}/5.JPG`,
  p6: `${CDN}/6.jpeg`,
  p7: `${CDN}/7.jpeg`,
  p8: `${CDN}/8.jpeg`,
  p9: `${CDN}/9.jpeg`,
  p10: `${CDN}/10.jpg`,
};

const HERO = PH.p1;
const PORTRAIT = PH.p2;
const IMG1 = PH.p3;
const IMG2 = PH.p4;

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'blog', label: 'Блог' },
  { id: 'contacts', label: 'Контакты' },
];

const GALLERY = [
  { src: PH.p1, title: 'Кадр первый', cat: 'Улица' },
  { src: PH.p3, title: 'Лица улиц', cat: 'Портрет' },
  { src: PH.p4, title: 'Свет и тень', cat: 'Атмосфера' },
  { src: PH.p5, title: 'Городской ритм', cat: 'Улица' },
  { src: PH.p6, title: 'Мгновение', cat: 'Момент' },
  { src: PH.p7, title: 'Тихая сцена', cat: 'Атмосфера' },
  { src: PH.p8, title: 'Прохожий', cat: 'Портрет' },
  { src: PH.p9, title: 'Перекрёсток', cat: 'Улица' },
  { src: PH.p10, title: 'Финальный кадр', cat: 'Момент' },
];

const SERVICES = [
  { icon: 'Footprints', title: 'Street-прогулка', price: 'от 12 000 ₽', desc: 'Индивидуальная фотопрогулка по городу: живые кадры в естественной среде, 1.5–2 часа съёмки.' },
  { icon: 'User', title: 'Портретная сессия', price: 'от 18 000 ₽', desc: 'Характерный портрет с драматичным светом в студии или на локации. 30+ обработанных фото.' },
  { icon: 'Camera', title: 'Репортаж события', price: 'от 30 000 ₽', desc: 'Документальная съёмка мероприятий: эмоции, моменты, атмосфера без постановки.' },
  { icon: 'GraduationCap', title: 'Мастер-класс', price: 'от 8 000 ₽', desc: 'Обучение уличной фотографии: композиция, свет, работа с камерой и людьми.' },
];

const REVIEWS = [
  { name: 'Анна Кравцова', role: 'Портретная сессия', text: 'Игнат поймал меня настоящую — без позы, без фальши. Эти кадры теперь висят у меня дома в рамах. Магия и профессионализм.', work: PH.p6 },
  { name: 'Дмитрий Орлов', role: 'Street-прогулка', text: 'Прошли по старому центру за два часа — получил серию, которая выглядит как кадры из артхаусного фильма. Восторг.', work: PH.p7 },
  { name: 'Марина Лебедева', role: 'Репортаж свадьбы', text: 'Снимал нашу свадьбу так, что мы даже не замечали камеру. А потом увидели фото — и заплакали от эмоций. Спасибо!', work: PH.p8 },
];

const BLOG = [
  { date: '12 июня 2026', title: 'Как ловить момент: 5 принципов уличной съёмки', tag: 'Гайд', img: PH.p9 },
  { date: '28 мая 2026', title: 'Свет ночного города: работа с неоном и тенями', tag: 'Техника', img: PH.p10 },
  { date: '14 мая 2026', title: 'Истории улиц: как незнакомцы становятся героями кадра', tag: 'Эссе', img: PH.p5 },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border py-3' : 'py-6'}`}>
        <div className="container flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-display text-2xl tracking-wide">
            Игнат <span className="text-gold">Шевченко</span>
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="font-cond text-sm uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border mt-3 animate-fade-up">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="block w-full text-left container py-3 font-cond uppercase tracking-widest text-muted-foreground hover:text-gold">
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center grain">
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO} alt="Уличная фотография" className="w-full h-full object-cover animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="font-cond uppercase tracking-[0.4em] text-gold text-sm mb-6 animate-fade-up">Уличный фотограф</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            Истории,<br /><span className="gold-gradient italic">снятые на ходу</span>
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Кинематографичные кадры реальной жизни — свет, тени и характеры городских улиц.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.45s' }}>
            <Button onClick={() => scrollTo('gallery')} className="font-cond uppercase tracking-widest rounded-none px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Смотреть работы
            </Button>
            <Button onClick={() => scrollTo('contacts')} variant="outline" className="font-cond uppercase tracking-widest rounded-none px-8 py-6 border-foreground/30 hover:border-gold hover:text-gold bg-transparent">
              Заказать съёмку
            </Button>
          </div>
        </div>
        <button onClick={() => scrollTo('gallery')} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 container">
        <SectionTitle kicker="Портфолио" title="Избранные работы" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-14">
          {GALLERY.map((g, i) => (
            <div key={i} className="group relative overflow-hidden cursor-pointer aspect-[4/5]">
              <img src={g.src} alt={g.title} className="w-full h-full object-cover img-cinematic" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-cond uppercase tracking-widest text-gold text-xs mb-1">{g.cat}</p>
                <h3 className="font-display text-2xl">{g.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-secondary/30">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={PORTRAIT} alt="Игнат Шевченко" className="w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden md:block border border-gold/40 w-full h-full -z-0" />
          </div>
          <div>
            <SectionTitle kicker="Обо мне" title="Игнат Шевченко" align="left" />
            <p className="text-muted-foreground text-lg leading-relaxed mt-8 mb-6">
              Более 10 лет я хожу по улицам с камерой и собираю мгновения, которые иначе исчезли бы навсегда. Меня вдохновляют настоящие эмоции, неожиданный свет и красота обыденного.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Моя философия проста: лучшая фотография рождается там, где её не ждут. Я не режиссирую жизнь — я учусь её замечать.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[['10+', 'лет опыта'], ['350+', 'съёмок'], ['18', 'наград']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl text-gold">{n}</div>
                  <div className="font-cond uppercase tracking-widest text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 container">
        <SectionTitle kicker="Что я предлагаю" title="Услуги и цены" />
        <div className="grid md:grid-cols-2 gap-px bg-border mt-14">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-background p-10 hover:bg-secondary/40 transition-colors group">
              <div className="flex items-start justify-between mb-6">
                <Icon name={s.icon} size={36} className="text-gold" />
                <span className="font-cond text-gold text-lg">{s.price}</span>
              </div>
              <h3 className="font-display text-3xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-secondary/30">
        <div className="container">
          <SectionTitle kicker="Клиенты" title="Отзывы и их кадры" />
          <div className="grid lg:grid-cols-3 gap-8 mt-14">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-background border border-border overflow-hidden flex flex-col">
                <div className="aspect-[3/2] overflow-hidden group">
                  <img src={r.work} alt={r.name} className="w-full h-full object-cover img-cinematic" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <Icon name="Quote" size={28} className="text-gold/40 mb-4" />
                  <p className="text-muted-foreground leading-relaxed flex-1">{r.text}</p>
                  <div className="flex items-center gap-1 text-gold mt-6 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="Star" size={15} fill="currentColor" />)}
                  </div>
                  <div className="font-display text-xl">{r.name}</div>
                  <div className="font-cond uppercase tracking-widest text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-28 container">
        <SectionTitle kicker="Журнал" title="Заметки фотографа" />
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {BLOG.map((b) => (
            <article key={b.title} className="group cursor-pointer">
              <div className="aspect-[3/2] overflow-hidden mb-5">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover img-cinematic" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-cond uppercase tracking-widest text-xs text-gold border border-gold/40 px-2 py-0.5">{b.tag}</span>
                <span className="font-cond uppercase tracking-widest text-xs text-muted-foreground">{b.date}</span>
              </div>
              <h3 className="font-display text-2xl leading-tight group-hover:text-gold transition-colors">{b.title}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 bg-secondary/30">
        <div className="container max-w-2xl text-center">
          <SectionTitle kicker="Связаться" title="Давайте создадим кадр" />
          <p className="text-muted-foreground text-lg mt-8 mb-10">
            Расскажите о вашей идее — я предложу формат съёмки и свободные даты.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="tel:+79990000000"><Button variant="outline" className="rounded-none border-foreground/30 hover:border-gold hover:text-gold bg-transparent font-cond uppercase tracking-widest px-6 py-6"><Icon name="Phone" size={18} className="mr-2" />+7 999 000-00-00</Button></a>
            <a href="mailto:hello@ignat.photo"><Button variant="outline" className="rounded-none border-foreground/30 hover:border-gold hover:text-gold bg-transparent font-cond uppercase tracking-widest px-6 py-6"><Icon name="Mail" size={18} className="mr-2" />hello@ignat.photo</Button></a>
          </div>
          <div className="flex justify-center gap-6">
            {['Instagram', 'Send', 'Youtube'].map((s) => (
              <a key={s} href="#" className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors">
                <Icon name={s} size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl">Игнат <span className="text-gold">Шевченко</span></div>
          <p className="font-cond uppercase tracking-widest text-xs text-muted-foreground">© 2026 — Уличная фотография</p>
        </div>
      </footer>
    </div>
  );
};

function SectionTitle({ kicker, title, align = 'center' }: { kicker: string; title: string; align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="font-cond uppercase tracking-[0.35em] text-gold text-sm mb-3">{kicker}</p>
      <h2 className="font-display text-5xl md:text-6xl">{title}</h2>
    </div>
  );
}

export default Index;