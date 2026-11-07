import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, CalendarDays, Sparkles, Upload } from 'lucide-react';

const weddingDate = new Date('2027-01-24T16:30:00-03:00');
const youtubeEmbedUrl = 'https://www.youtube.com/embed/DPHtuiq6jeM?autoplay=1&playsinline=1&controls=0&rel=0&enablejsapi=1';
const googleDriveFolderUrl = ''; // Pegá aquí el enlace compartido de la carpeta de fotos.
const tableStatus = [
  // Editá esta lista: { name: 'Mesa 1', capacity: 8, occupied: 5 }
];

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const total = Math.max(0, weddingDate.getTime() - now);
  return [Math.floor(total / 86400000), Math.floor(total / 3600000) % 24, Math.floor(total / 60000) % 60, Math.floor(total / 1000) % 60];
}

function App() {
  const [days, hours, minutes, seconds] = useCountdown();
  const playerRef = useRef(null);
  const occupiedSeats = tableStatus.reduce((sum, table) => sum + table.occupied, 0);
  const totalSeats = tableStatus.reduce((sum, table) => sum + table.capacity, 0);

  function toggleMusic() {
    playerRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <main>
    <nav className="nav"><a className="monogram" href="#inicio">D<span>✳</span>G</a><a href="#detalles" className="nav-link">LA CELEBRACIÓN <ArrowRight size={14}/></a></nav>

    <section className="hero" id="inicio">
      <div className="hero-image" role="img" aria-label="Pareja abrazada en un jardín al atardecer" />
      <div className="hero-wash" />
      <div className="hero-content">
        <p className="eyebrow light"><span/> AMARNOS ES NUESTRO PLAN PERFECTO <span/></p>
        <h1>Diego <i>&</i><br/>Gery</h1>
        <p className="hero-date">24 <span>·</span> ENERO <span>·</span> 2027</p>
        <a className="hero-cta" href="#historia">NOS CASAMOS <ArrowDown size={15}/></a>
      </div>
      <div className="hero-note"><span>LA PUNTA, SAN LUIS, ARGENTINA</span><span>24.01.27</span></div>
      {/* <div className="hero-side">EL COMIENZO DE SIEMPRE</div> */}
    </section>

    <section className="intro section-pad" id="historia">
      <p className="eyebrow reveal"><span/> 21 AÑOS DE HISTORIAS COMPARTIDAS <span/></p>
      <h2 className="story-heading reveal"><span>21 años caminando juntos,</span><br/><em>eligiéndonos cada día.</em></h2>
      <p className="intro-copy reveal">Compartimos la vida, los sueños y la alegría de una familia maravillosa. Hoy decidimos dar el sí y queremos celebrar este nuevo capítulo con vos.</p>
      <div className="story-seal reveal"><span>♡</span><small>JUNTOS, SIEMPRE</small></div>
    </section>

    <section className="wish-section" aria-label="Una frase sobre el amor">
      <div className="wish-glow wish-glow-one"/><div className="wish-glow wish-glow-two"/>
      <div className="wish-orbit wish-orbit-one"/><div className="wish-orbit wish-orbit-two"/>
      <div className="wish-stars" aria-hidden="true">{Array.from({ length: 26 }, (_, index) => <span className={index % 7 === 0 ? 'heart-star' : ''} key={index} style={{ left: `${(index * 47 + 13) % 100}%`, top: `${(index * 31 + 9) % 100}%`, '--delay': `${(index % 9) * -0.8}s`, '--duration': `${5 + (index % 6)}s` }}>{index % 7 === 0 ? '♡' : index % 5 === 0 ? '✦' : '·'}</span>)}</div>
      <div className="wish-content"><p className="eyebrow"><span/> UN AMOR PARA TODA LA VIDA <span/></p><h2>Nos elegimos cada día.<br/><em>Hoy, para toda la vida.</em></h2><div className="wish-divider"><span/>♡<span/></div><p className="wish-signature">DIEGO <i>&</i> GERY</p></div>
      <span className="wish-coordinate">24° 01′ 2027 — EL COMIENZO</span>
    </section>

    <section className="countdown section-pad reveal">
      <div className="countdown-title"><span className="eyebrow">FALTA CADA VEZ MENOS</span><h2>Hasta nuestro<br/><em>gran día.</em></h2><p className="countdown-subtitle">Cada día nos acerca a nuestro “sí, quiero”.</p><div className="countdown-date-chip"><span>♡</span> DOMINGO · 24 ENERO 2027 <span>♡</span></div></div>
      <div className="timer">{[[days,'DÍAS'],[hours,'HORAS'],[minutes,'MIN'],[seconds,'SEG']].map(([num,label])=><div className="time-unit" key={label}><strong>{String(num).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>
      <div className="countdown-flower">✳</div>
    </section>

    <section className="tables section-pad" id="mesas">
      <div className="tables-heading reveal"><p className="eyebrow"><span/> CADA LUGAR, CON CARIÑO <span/></p><h2>Una noche para guardar en el corazón</h2><p>Estamos preparando cada detalle para compartirla con vos.</p></div>
      <div className="table-stats reveal"><article><strong>{tableStatus.length}</strong><span>MESAS</span></article><article><strong>{occupiedSeats}</strong><span>LUGARES OCUPADOS</span></article><article><strong>{totalSeats - occupiedSeats}</strong><span>LUGARES DISPONIBLES</span></article></div>
      <div className="floor-layout reveal">
        <div className="floor-layout-header"><div><span className="floor-kicker">DISTRIBUCIÓN DEL SALÓN</span><strong>Plano de mesas</strong></div><div className="seat-legend"><span><i className="legend-dot is-occupied"/> OCUPADO</span><span><i className="legend-dot"/> DISPONIBLE</span></div></div>
      {tableStatus.length > 0
        ? <div className="table-plan" aria-label="Plano de las mesas">{tableStatus.map(table => {
          const capacity = Math.max(0, Math.floor(table.capacity));
          const occupied = Math.min(capacity, Math.max(0, Math.floor(table.occupied)));
          return <article className="table-plan-card" key={table.name}>
            <div className="round-table" aria-label={`${table.name}: ${occupied} de ${capacity} lugares ocupados`}>
              <div className="table-surface"><span>{table.name}</span><small>{occupied}/{capacity}</small></div>
              {Array.from({ length: capacity }, (_, index) => {
                const angle = index * 360 / capacity;
                return <span key={index} className={`chair ${index < occupied ? 'chair-occupied' : ''}`} style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-55px) rotate(${-angle}deg)` }} />;
              })}
            </div>
            <p>{occupied} de {capacity} lugares ocupados</p>
          </article>;
        })}</div>
        : <div className="table-plan-empty"><div className="empty-table-drawing"><i/><i/><i/><i/><i/><i/><i/><i/><span>MESA</span></div><p>El plano de las mesas va a aparecer acá.</p></div>}
        <div className="floor-layout-footer"><span>✳</span> Cada detalle, pensado para compartir <span>✳</span></div>
      </div>
    </section>

    <section className="details section-pad" id="detalles">
      <div className="details-heading reveal"><p className="eyebrow"><span/> EL DÍA QUE SOÑAMOS <span/></p><h2>Guardá la fecha</h2><p>Nos encantaría que seas parte de este momento.</p></div>
      <div className="detail-grid">
        <article className="detail-card reveal"><div className="detail-top"><span>01 / CEREMONIA</span><CalendarDays size={20}/></div><div className="detail-icon">✳</div><h3>La ceremonia</h3><p className="detail-date">DOMINGO, 24 DE ENERO<br/>16:30 H</p><div className="rule"/><p>La Punta<br/>San Luis, Argentina</p><a className="text-link" href="https://maps.google.com/?q=La+Punta+San+Luis+Argentina" target="_blank" rel="noreferrer">CÓMO LLEGAR <ArrowRight size={14}/></a></article>
        <article className="detail-card detail-card-dark reveal"><div className="detail-top"><span>02 / CELEBRACIÓN</span><Sparkles size={20}/></div><div className="detail-icon">✳</div><h3>La fiesta</h3><p className="detail-date">BRINDIS, CENA<br/>Y BAILE HASTA TARDE</p><div className="rule"/><p>En el mismo lugar<br/>Después de la ceremonia</p><a className="text-link" href="#confirmar">CONFIRMÁ TU ASISTENCIA <ArrowRight size={14}/></a></article>
      </div>
      <p className="details-foot reveal">El mejor regalo será tenerte cerca. <i>Lo demás lo pone el amor.</i></p>
    </section>

    <section className="rsvp" id="confirmar"><div className="rsvp-image"/><div className="rsvp-content reveal"><p className="eyebrow light"><span/> NOS ENCANTARÍA VERTE <span/></p><h2>¿Venís a<br/><i>celebrar?</i></h2><p>Tu abrazo, tu risa y tu compañía van a ser el regalo más lindo.</p><a className="rsvp-button" href="https://wa.me/?text=Hola%2C%20confirmo%20mi%20asistencia%20a%20la%20boda%20de%20Diego%20y%20Gery." target="_blank" rel="noreferrer">CONFIRMAR POR WHATSAPP <ArrowRight size={16}/></a></div><span className="rsvp-stamp">D <span>♡</span> G</span></section>

    <section className="guest-photos section-pad" id="fotos">
      <div className="photos-heading reveal"><p className="eyebrow"><span/> MOMENTOS PARA VOLVER A VER <span/></p><h2>Compartí tus fotos</h2><p>Ayudanos a guardar cada sonrisa, cada abrazo y cada instante de este día tan nuestro.</p></div>
      {googleDriveFolderUrl
        ? <a className="upload-button" href={googleDriveFolderUrl} target="_blank" rel="noreferrer"><Upload size={16}/>SUBIR FOTOS</a>
        : <button className="upload-button is-disabled" type="button" disabled><Upload size={16}/>SUBIR FOTOS</button>}
      <p className="photo-status">{googleDriveFolderUrl ? 'Se abrirá la carpeta compartida de Google Drive.' : 'El álbum de fotos estará disponible pronto.'}</p>
    </section>

    <footer className="footer"><a className="monogram" href="#inicio">D<span>✳</span>G</a><p>HECHO CON AMOR, PARA COMPARTIR CON VOS</p><a className="back-top" href="#inicio">VOLVER ARRIBA ↑</a></footer>
    <button className="music-button" onClick={toggleMusic} aria-label="Reproducir canción" title="Reproducir canción">🎵</button>
    <iframe className="youtube-audio" ref={playerRef} title="Reproductor de música" src={youtubeEmbedUrl} allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" aria-hidden="true" tabIndex={-1} />
  </main>;
}

export default App;
