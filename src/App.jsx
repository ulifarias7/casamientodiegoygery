import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Baby, CalendarDays, Heart, Music2, Plus, Send, ShieldCheck, Shirt, Sparkles, Sprout, Utensils, Upload, X } from 'lucide-react';

const weddingDate = new Date('2027-01-24T19:00:00-03:00');
const youtubeEmbedUrl = 'https://www.youtube.com/embed/DPHtuiq6jeM?autoplay=1&playsinline=1&controls=0&rel=0&enablejsapi=1';
const googleDriveFolderUrl = 'https://drive.google.com/drive/folders/16rqfAPbNwYFLa4YaBVXNPEkCr7Psz3ss?usp=sharing'; // Pegá aquí el enlace compartido de la carpeta de fotos.
const menuOptions = [
  { value: 'celiaco', name: 'Menú celíaco', note: 'Opción sin TACC', icon: ShieldCheck },
  { value: 'infantil', name: 'Menú infantil', note: 'Para los más chicos', icon: Baby },
  { value: 'general', name: 'Menú general', note: 'Opción clásica', icon: Utensils },
  { value: 'vegano', name: 'Menú vegano', note: 'Opción basada en plantas', icon: Sprout },
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
  const nextGuestId = useRef(2);
  const [familyName, setFamilyName] = useState('');
  const [attendees, setAttendees] = useState([{ id: 1, name: '', menu: 'general' }]);
  const [formError, setFormError] = useState('');
  const [songSuggestion, setSongSuggestion] = useState('');
  const [suggestedBy, setSuggestedBy] = useState('');
  const [songError, setSongError] = useState('');
  const songInputRef = useRef(null);

  function toggleMusic() {
    playerRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
  }

  function startMusicOnLoad() {
    playerRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
  }

  function updateAttendee(id, field, value) {
    setAttendees(current => current.map(person => person.id === id ? { ...person, [field]: value } : person));
  }

  function addAttendee() {
    setAttendees(current => [...current, { id: nextGuestId.current++, name: '', menu: 'general' }]);
  }

  function removeAttendee(id) {
    setAttendees(current => current.length > 1 ? current.filter(person => person.id !== id) : current);
  }

  function confirmAttendance(event) {
    event.preventDefault();
    if (!familyName.trim()) {
      setFormError('Escribí el nombre de tu familia para continuar.');
      return;
    }
    setFormError('');
    const menuNames = Object.fromEntries(menuOptions.map(option => [option.value, option.name]));
    const guestLines = attendees.map((person, index) => `   ♡ ${person.name.trim() || `Invitado/a ${index + 1}`}  ·  ${menuNames[person.menu]}`);
    const message = [
      '╭────────── 💌 ──────────╮',
      '*CONFIRMACIÓN DE ASISTENCIA*',
      '*DIEGO & GERY*',
      '╰────────────────────────╯',
      '',
      '¡Sí, obvio que vamos! 💚',
      'Qué alegría acompañarlos en este día tan especial.',
      '',
      `👨‍👩‍👧‍👦 *FAMILIA:* ${familyName.trim()}`,
      `👥 *INVITADOS:* ${attendees.length} ${attendees.length === 1 ? 'persona' : 'personas'}`,
      '',
      '🍽️ *MENÚ ELEGIDO POR PERSONA*',
      '──────────────',
      ...guestLines,
      '',
      '──────────────',
      '¡Gracias por invitarnos! Ya queremos celebrar con ustedes. ✨',
    ].join('\n');
    window.open(`https://wa.me/5491168132737?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  function sendSongSuggestion(event) {
    event.preventDefault();
    if (!songSuggestion.trim()) {
      setSongError('Por favor, escribí el nombre de la canción o pegá su enlace.');
      songInputRef.current?.focus();
      return;
    }
    setSongError('');
    const message = [
      '¡Hola, Diego y Gery! 🎶',
      '',
      'Les quiero recomendar este tema para la fiesta:',
      `🎵 ${songSuggestion.trim()}`,
      suggestedBy.trim() ? `💚 De parte de ${suggestedBy.trim()}.` : '',
      '',
      '¡Ojalá suene esa noche! ✨',
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/5491168132737?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <main>
    <nav className="nav"><a className="monogram" href="#inicio">D<span><Heart size={11}/></span>G</a><a href="#detalles" className="nav-link">LA CELEBRACIÓN <ArrowRight size={14}/></a></nav>

    <section className="hero" id="inicio">
      <div className="hero-image" role="img" aria-label="Pareja abrazada en un jardín al atardecer" />
      <div className="hero-wash" />
      <div className="hero-content">
        <p className="eyebrow light"><span/> AMARNOS ES NUESTRO PLAN PERFECTO <span/></p>
        <h1>Diego <i>&</i><br/>Gery</h1>
        <p className="hero-date">24 <span>·</span> ENERO <span>·</span> 2027</p>
        <a className="hero-cta" href="#historia">NOS CASAMOS <ArrowDown size={15}/></a>
      </div>
      <div className="hero-note"><span>SAN LUIS CAPITAL, ARGENTINA</span><span>24.01.27</span></div>
      {/* <div className="hero-side">EL COMIENZO DE SIEMPRE</div> */}
    </section>

    <section className="intro section-pad" id="historia">
      <p className="eyebrow reveal"><span/> 21 AÑOS DE HISTORIAS COMPARTIDAS <span/></p>
      <h2 className="story-heading reveal"><span>21 años caminando juntos,</span><br/><em>eligiéndonos cada día.</em></h2>
      <p className="intro-copy reveal">Compartimos la vida, los sueños y la alegría de una familia maravillosa. Hoy decidimos dar el sí y queremos celebrar este nuevo capítulo con vos.</p>
      <div className="story-seal reveal"><span><Heart size={25} strokeWidth={1.5}/></span><small>JUNTOS, SIEMPRE</small></div>
    </section>

    <section className="wish-section" aria-label="Una frase sobre el amor">
      <div className="wish-glow wish-glow-one"/><div className="wish-glow wish-glow-two"/>
      <div className="wish-orbit wish-orbit-one"/><div className="wish-orbit wish-orbit-two"/>
      <div className="wish-stars" aria-hidden="true">{Array.from({ length: 26 }, (_, index) => { const heart = index % 7 === 0; const sparkle = !heart && index % 5 === 0; return <span className={`wish-star ${heart ? 'heart-star' : sparkle ? 'spark-star' : 'dot-star'}`} key={index} style={{ left: `${(index * 47 + 13) % 100}%`, top: `${(index * 31 + 9) % 100}%`, '--delay': `${(index % 9) * -0.8}s`, '--duration': `${5 + (index % 6)}s` }}>{heart ? <Heart size={12}/> : sparkle ? <Sparkles size={12}/> : null}</span>; })}</div>
      <div className="wish-content"><p className="eyebrow"><span/> UN AMOR PARA TODA LA VIDA <span/></p><h2>Nos elegimos cada día.<br/><em>Hoy, para toda la vida.</em></h2><div className="wish-divider"><span/><Heart size={13}/><span/></div><p className="wish-signature">DIEGO <i>&</i> GERY</p></div>
      <span className="wish-coordinate">24° 01′ 2027 — EL COMIENZO</span>
    </section>

    <section className="countdown section-pad reveal">
      <div className="countdown-title"><span className="eyebrow">FALTA CADA VEZ MENOS</span><h2>Hasta nuestro<br/><em>gran día.</em></h2><p className="countdown-subtitle">Cada día nos acerca a nuestro “sí, quiero”.</p><div className="countdown-date-chip"><span><Heart size={10}/></span> DOMINGO · 24 ENERO 2027 <span><Heart size={10}/></span></div></div>
      <div className="timer">{[[days,'DÍAS'],[hours,'HORAS'],[minutes,'MIN'],[seconds,'SEG']].map(([num,label])=><div className="time-unit" key={label}><strong>{String(num).padStart(2,'0')}</strong><span>{label}</span></div>)}</div>
      <div className="countdown-flower"><Sparkles size={80} strokeWidth={0.8}/></div>
    </section>

    <section className="menus section-pad" id="menus">
      <div className="menus-heading reveal"><p className="eyebrow"><span/> PENSAMOS EN CADA UNO <span/></p><h2>Un menú para cada invitado</h2><p>Al confirmar, elegí la opción que corresponde a cada persona de tu familia.</p></div>
      <div className="menu-options">{menuOptions.map((option, index) => { const Icon = option.icon; return <article className="menu-option reveal" key={option.value}><span className="menu-number">0{index + 1}</span><span className="menu-icon"><Icon size={22} strokeWidth={1.6}/></span><h3>{option.name}</h3><p>{option.note}</p></article>; })}</div>
      <a className="menu-jump" href="#confirmar">ELEGIR MENÚS Y CONFIRMAR <ArrowDown size={15}/></a>
    </section>

    <section className="details section-pad" id="detalles">
      <div className="details-heading reveal"><p className="eyebrow"><span/> EL DÍA QUE SOÑAMOS <span/></p><h2>Guardá la fecha</h2><p>Nos encantaría que seas parte de este momento.</p></div>
      <div className="detail-grid">
        <article className="detail-card detail-card-dark reception-card reveal"><div className="detail-top"><span>EL GRAN ENCUENTRO</span><CalendarDays size={20}/></div><div className="detail-icon"><Heart size={25} strokeWidth={1.5}/></div><h3>Recepción</h3><p className="detail-date">DOMINGO, 24 DE ENERO DE 2027<br/>19:00 HS</p><div className="rule"/><p className="reception-address"><span>LUGAR</span>Av. del Fundador 1100<br/>San Luis Capital</p><p className="reception-venue">Salón Las Marías<br/><em>Guiñez Eventos</em></p><a className="text-link" href="https://maps.google.com/?q=Sal%C3%B3n+Las+Mar%C3%ADas+Gui%C3%B1ez+Eventos%2C+Av.+del+Fundador+1100%2C+San+Luis+Capital" target="_blank" rel="noreferrer">CÓMO LLEGAR <ArrowRight size={14}/></a></article>
      </div>
      <p className="details-foot reveal">El mejor regalo será tenerte cerca. <i>Lo demás lo pone el amor.</i></p>
    </section>

    <section className="dress-code section-pad" id="vestimenta">
      <div className="dress-code-card reveal">
        <p className="eyebrow"><span/> UN TOQUE DE ELEGANCIA <span/></p>
        <div className="dress-code-mark" aria-hidden="true"><Shirt size={30} strokeWidth={1.4}/></div>
        <p className="dress-code-label">DRESS CODE</p>
        <h2>Elegante <em>sport</em></h2>
        <div className="dress-code-divider" aria-hidden="true"><span/><Heart size={12}/><span/></div>
        <p className="dress-code-note">Un estilo elegante y relajado, ideal para celebrar,<br/> bailar y disfrutar juntos.</p>
      </div>
    </section>

    <section className="song-suggestions section-pad" id="temas">
      <div className="song-suggestion-card reveal">
        <div className="song-record" aria-hidden="true"><span><Music2 size={20}/></span></div>
        <p className="eyebrow"><span/> UNA CANCIÓN PARA ESA NOCHE <span/></p>
        <h2>La música también<br/><em>la elegimos entre todos.</em></h2>
        <p className="song-suggestion-copy">¿Qué tema te gustaría escuchar en la fiesta?<br/>Puede ser el título o un enlace de YouTube o Spotify.</p>
        <form className="song-suggestion-form" onSubmit={sendSongSuggestion} noValidate>
          <label className="song-field"><span>TEMA O ENLACE</span><input ref={songInputRef} type="text" value={songSuggestion} onChange={event => { setSongSuggestion(event.target.value); setSongError(''); }} placeholder="Título, artista o link de YouTube / Spotify" aria-invalid={Boolean(songError)} aria-describedby={songError ? 'song-error' : undefined}/></label>
          {songError && <p className="song-error" id="song-error" role="alert">{songError}</p>}
          <label className="song-field"><span>¿QUIÉN LA PIDE? <small>OPCIONAL</small></span><input type="text" value={suggestedBy} onChange={event => setSuggestedBy(event.target.value)} placeholder="Tu nombre o familia"/></label>
          <button className="song-send-button" type="submit">ENVIAR CANCIÓN <Send size={15}/></button>
        </form>
      </div>
    </section>

    <section className="rsvp" id="confirmar"><div className="rsvp-image"/><div className="rsvp-content reveal"><p className="eyebrow light"><span/> NOS ENCANTARÍA VERTE <span/></p><h2>¿Venís a<br/><i>celebrar?</i></h2><p className="rsvp-intro">Tu abrazo, tu risa y tu compañía van a ser el regalo más lindo.</p>
      <form className="attendance-form" onSubmit={confirmAttendance}>
        <label className="family-field">Nombre de tu familia o grupo<input type="text" value={familyName} onChange={event => { setFamilyName(event.target.value); setFormError(''); }} placeholder="Ej.: Familia González" autoComplete="family-name" required/></label>
        <div className="attendee-list"><p className="attendee-heading">MENÚ DE CADA PERSONA</p>{attendees.map((person, index) => <div className="attendee-row" key={person.id}>
          <span className="attendee-number">{String(index + 1).padStart(2, '0')}</span>
          <label className="attendee-name"><span>INVITADO/A</span><input value={person.name} onChange={event => updateAttendee(person.id, 'name', event.target.value)} placeholder={`Nombre ${index + 1}`}/></label>
          <label className="attendee-menu"><span>MENÚ</span><select value={person.menu} onChange={event => updateAttendee(person.id, 'menu', event.target.value)}>{menuOptions.map(option => <option value={option.value} key={option.value}>{option.name}</option>)}</select></label>
          <button className="remove-attendee" type="button" onClick={() => removeAttendee(person.id)} disabled={attendees.length === 1} aria-label={`Quitar invitado ${index + 1}`}><X size={16}/></button>
        </div>)}</div>
        <button className="add-attendee" type="button" onClick={addAttendee}><Plus size={15}/> AGREGAR PERSONA</button>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <button className="rsvp-button" type="submit">CONFIRMAR POR WHATSAPP <ArrowRight size={16}/></button>
      </form>
      </div><span className="rsvp-stamp">D <span><Heart size={11} strokeWidth={1.7}/></span> G</span></section>

    <section className="guest-photos section-pad" id="fotos">
      <div className="photos-heading reveal"><p className="eyebrow"><span/> MOMENTOS PARA VOLVER A VER <span/></p><h2>Compartí tus fotos</h2><p>Ayudanos a guardar cada sonrisa, cada abrazo y cada instante de este día tan nuestro.</p></div>
      {googleDriveFolderUrl
        ? <a className="upload-button" href={googleDriveFolderUrl} target="_blank" rel="noreferrer"><Upload size={16}/>SUBIR FOTOS</a>
        : <button className="upload-button is-disabled" type="button" disabled><Upload size={16}/>SUBIR FOTOS</button>}
      <p className="photo-status">{googleDriveFolderUrl ? 'Se abrirá la carpeta compartida de Google Drive.' : 'El álbum de fotos estará disponible pronto.'}</p>
    </section>

    <footer className="footer"><a className="monogram" href="#inicio">D<span><Heart size={11}/></span>G</a><p>HECHO CON AMOR, PARA COMPARTIR CON VOS</p><a className="back-top" href="#inicio">VOLVER ARRIBA ↑</a></footer>
    <button className="music-button" onClick={toggleMusic} aria-label="Reproducir canción" title="Reproducir canción"><Music2 size={21} strokeWidth={1.7}/></button>
    <iframe className="youtube-audio" ref={playerRef} title="Reproductor de música" src={youtubeEmbedUrl} allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" aria-hidden="true" tabIndex={-1} onLoad={startMusicOnLoad} />
  </main>;
}

export default App;
