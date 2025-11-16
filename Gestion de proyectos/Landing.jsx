import React, { useEffect } from 'react'
import './landing.css' // tus estilos claros del landing

export default function Landing({ onGo }) {
  // Toggle del menú móvil
  useEffect(() => {
    const btn = document.getElementById('mobileMenuBtn')
    const menu = document.getElementById('mobileMenu')
    if (!btn || !menu) return
    const toggle = () => {
      const open = menu.getAttribute('aria-hidden') === 'true'
      menu.setAttribute('aria-hidden', open ? 'false' : 'true')
      btn.setAttribute('aria-expanded', open ? 'true' : 'false')
    }
    btn.addEventListener('click', toggle)
    return () => btn.removeEventListener('click', toggle)
  }, [])

  return (
    <div className="landing-root">
      {/* META/FONTS: ponlos en index.html de Vite (no aquí). 
         - <link rel="preconnect"...> 
         - <link href="https://fonts.googleapis.com/..."> 
      */}

      <a className="skip-link" href="#main">Saltar al contenido</a>

      {/* HEADER */}
      <header className="header" role="banner">
        <div className="container header-content">
          <div className="logo" aria-hidden="false">
            <div className="logo-icon" aria-hidden={true}>
              {/* decorative icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-title">EmoFinance</span>
              <span className="logo-subtitle">Mapeo Emocional Financiero</span>
            </div>
          </div>

          <nav className="nav-desktop" role="navigation" aria-label="Navegación principal">
            <a className="nav-link" href="#inicio">Inicio</a>
            <a className="nav-link" href="#investigacion">Investigación</a>
            <a className="nav-link" href="#visualizacion">Visualización</a>
            <a className="nav-link" href="#metodologia">Metodología</a>
            <a className="nav-link" href="#contacto">Contacto</a>
          </nav>

          <div className="header-cta">
            <button className="btn btn-outline btn-sm" aria-label="Ver demo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="12" x2="12" y1="20" y2="10" />
                <line x1="18" x2="18" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="16" />
              </svg>
              Ver Demo
            </button>

            {/* SPA: entrar al simulador con onGo() */}
            <button className="btn btn-primary btn-sm btn-full" onClick={onGo}>
              Participar en Estudio
            </button>
          </div>

          <button className="mobile-menu-btn" id="mobileMenuBtn"
                  aria-controls="mobileMenu" aria-expanded={false} aria-label="Abrir menú móvil">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="nav-mobile" id="mobileMenu" aria-hidden={true}>
          <a className="nav-mobile-link" href="#inicio">Inicio</a>
          <a className="nav-mobile-link" href="#investigacion">Investigación</a>
          <a className="nav-mobile-link" href="#visualizacion">Visualización</a>
          <a className="nav-mobile-link" href="#metodologia">Metodología</a>
          <a className="nav-mobile-link" href="#contacto">Contacto</a>
          <div className="nav-mobile-cta">
            <button className="btn btn-outline btn-sm btn-full">Ver Demo</button>
            <button className="btn btn-primary btn-sm btn-full" onClick={onGo}>Participar en Estudio</button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main id="main">
        {/* HERO */}
        <section id="inicio" className="hero-section">
          <div className="container hero-content">
            <div className="badge">Investigación Cualitativa y Cuantitativa</div>

            <h1 className="hero-title">
              Mapeo Emocional de <span className="gradient-text">Decisiones Financieras</span>
            </h1>

            <p className="hero-subtitle">
              Plataforma interactiva que analiza y visualiza las emociones que influyen en el comportamiento económico.
              Utilizamos metodologías avanzadas para crear mapas emocionales que revelan patrones en la toma de decisiones financieras.
            </p>

            <div className="hero-cta">
              <div className="hero-cta-buttons">
                <button className="btn btn-primary btn-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  Explorar Mapa Emocional
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>

                <a href="#visualizacion" className="btn btn-outline btn-lg">Ver Demostración</a>
              </div>

              <div className="hero-stats" role="list" aria-label="Estadísticas principales">
                <div className="stat-item" role="listitem">
                  <div className="stat-icon stat-icon-primary" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" x2="12" y1="2" y2="22"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <p className="stat-label">Decisiones Analizadas</p>
                  <p className="stat-value">1,200+</p>
                </div>

                <div className="stat-item" role="listitem">
                  <div className="stat-icon stat-icon-green" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </div>
                  <p className="stat-label">Emociones Mapeadas</p>
                  <p className="stat-value">25</p>
                </div>

                <div className="stat-item" role="listitem">
                  <div className="stat-icon stat-icon-blue" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                      <polyline points="16 7 22 7 22 13"/>
                    </svg>
                  </div>
                  <p className="stat-label">Precisión del Modelo</p>
                  <p className="stat-value">94%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-decoration" aria-hidden={true}></div>
        </section>

        {/* FEATURES */}
        <section className="features-section" aria-labelledby="features-title">
          <div className="container">
            <div className="section-header">
              <h2 id="investigacion" className="section-title">Objetivos y Funcionalidades</h2>
              <p className="section-subtitle">
                Nuestro sistema integra múltiples metodologías de investigación para crear una plataforma completa de análisis emocional financiero.
              </p>
            </div>

            <div className="features-grid">
              {/* Tarjetas (idénticas a tu HTML) */}
              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-primary" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Objetivo Principal</span>
                </div>
                <h3 className="feature-title">Modelo Visual Interactivo</h3>
                <p className="feature-description">Interfaz intuitiva que permite explorar y visualizar las emociones que influyen en el comportamiento económico.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-green" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" x2="12" y1="20" y2="10"/>
                      <line x1="18" x2="18" y1="20" y2="4"/>
                      <line x1="6" x2="6" y1="20" y2="16"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Metodología</span>
                </div>
                <h3 className="feature-title">Análisis Cuantitativo</h3>
                <p className="feature-description">Procesamiento estadístico avanzado de datos emocionales para identificar patrones significativos.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-blue" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Metodología</span>
                </div>
                <h3 className="feature-title">Investigación Cualitativa</h3>
                <p className="feature-description">Entrevistas en profundidad y análisis narrativo para comprender las experiencias emocionales.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-orange" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Técnico</span>
                </div>
                <h3 className="feature-title">Sistema Modular</h3>
                <p className="feature-description">Arquitectura escalable que gestiona y almacena datos de manera segura con alto rendimiento.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-red" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Seguridad</span>
                </div>
                <h3 className="feature-title">Seguridad y Privacidad</h3>
                <p className="feature-description">Protección avanzada de datos personales y emocionales con estándares internacionales.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-primary" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Técnico</span>
                </div>
                <h3 className="feature-title">APIs Integradas</h3>
                <p className="feature-description">Integración con sistemas externos para recopilación y análisis en tiempo real.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-green" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/>
                    </svg>
                  </div>
                  <span className="feature-badge">Calidad</span>
                </div>
                <h3 className="feature-title">Pruebas de Usabilidad</h3>
                <p className="feature-description">Testing exhaustivo para garantizar accesibilidad y rendimiento.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-blue" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <span className="feature-badge">DevOps</span>
                </div>
                <h3 className="feature-title">Despliegue Eficiente</h3>
                <p className="feature-description">Monitoreo continuo y actualizaciones automáticas para máxima disponibilidad.</p>
              </article>

              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon feature-icon-orange" aria-hidden={true}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    </svg>
                  </div>
                  <span className="feature-badge">IA</span>
                </div>
                <h3 className="feature-title">Análisis Predictivo</h3>
                <p className="feature-description">Modelos de machine learning para predecir comportamientos financieros basados en emociones.</p>
              </article>
            </div>
          </div>
        </section>

        {/* MAP / VISUALIZACIÓN */}
        <section id="visualizacion" className="map-section" aria-labelledby="visualization-title">
          <div className="container">
            <div className="section-header">
              <div className="badge-outline">Vista Previa Interactiva</div>
              <h2 id="visualization-title" className="section-title">Mapa Emocional en Tiempo Real</h2>
              <p className="section-subtitle">Visualización dinámica de las emociones más frecuentes en decisiones financieras, basada en datos reales de nuestra investigación.</p>
            </div>

            <div className="map-grid">
              <div className="emotion-list" aria-hidden={false}>
                {/* Emotion cards (idénticas a tu HTML) */}
                <div className="emotion-card">
                  <div className="emotion-content">
                    <div className="emotion-info">
                      <div className="emotion-icon emotion-icon-confidence" aria-hidden={true}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                          <polyline points="16 7 22 7 22 13"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="emotion-name">Confianza</h3>
                        <p className="emotion-desc">Decisiones financieras tomadas con seguridad</p>
                      </div>
                    </div>
                    <div className="emotion-stats">
                      <div className="emotion-percentage">85%</div>
                      <div className="emotion-label">Prevalencia</div>
                    </div>
                  </div>
                  <div className="progress-bar" aria-hidden={true}>
                    <div className="progress-fill progress-confidence" style={{width:'85%'}}></div>
                  </div>
                </div>

                <div className="emotion-card">
                  <div className="emotion-content">
                    <div className="emotion-info">
                      <div className="emotion-icon emotion-icon-stress" aria-hidden={true}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="emotion-name">Ansiedad</h3>
                        <p className="emotion-desc">Estrés relacionado con inversiones</p>
                      </div>
                    </div>
                    <div className="emotion-stats">
                      <div className="emotion-percentage">65%</div>
                      <div className="emotion-label">Prevalencia</div>
                    </div>
                  </div>
                  <div className="progress-bar" aria-hidden={true}>
                    <div className="progress-fill progress-stress" style={{width:'65%'}}></div>
                  </div>
                </div>

                <div className="emotion-card">
                  <div className="emotion-content">
                    <div className="emotion-info">
                      <div className="emotion-icon emotion-icon-positive" aria-hidden={true}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="emotion-name">Optimismo</h3>
                        <p className="emotion-desc">Expectativas positivas sobre el futuro financiero</p>
                      </div>
                    </div>
                    <div className="emotion-stats">
                      <div className="emotion-percentage">78%</div>
                      <div className="emotion-label">Prevalencia</div>
                    </div>
                  </div>
                  <div className="progress-bar" aria-hidden={true}>
                    <div className="progress-fill progress-positive" style={{width:'78%'}}></div>
                  </div>
                </div>

                <div className="emotion-card">
                  <div className="emotion-content">
                    <div className="emotion-info">
                      <div className="emotion-icon emotion-icon-neutral" aria-hidden={true}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="emotion-name">Cautela</h3>
                        <p className="emotion-desc">Prudencia en la toma de decisiones</p>
                      </div>
                    </div>
                    <div className="emotion-stats">
                      <div className="emotion-percentage">72%</div>
                      <div className="emotion-label">Prevalencia</div>
                    </div>
                  </div>
                  <div className="progress-bar" aria-hidden={true}>
                    <div className="progress-fill progress-neutral" style={{width:'72%'}}></div>
                  </div>
                </div>

                <div className="emotion-card">
                  <div className="emotion-content">
                    <div className="emotion-info">
                      <div className="emotion-icon emotion-icon-negative" aria-hidden={true}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="emotion-name">Frustración</h3>
                        <p className="emotion-desc">Descontento con resultados financieros</p>
                      </div>
                    </div>
                    <div className="emotion-stats">
                      <div className="emotion-percentage">45%</div>
                      <div className="emotion-label">Prevalencia</div>
                    </div>
                  </div>
                  <div className="progress-bar" aria-hidden={true}>
                    <div className="progress-fill progress-negative" style={{width:'45%'}}></div>
                  </div>
                </div>
              </div>

              <aside className="visualization-card" aria-labelledby="interactive-title">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <div className="card-icon" aria-hidden={true}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                    </div>
                    <span id="interactive-title">Visualización Interactiva</span>
                  </div>
                  <p className="card-description">Mapa emocional dinámico que muestra las correlaciones entre emociones y decisiones financieras.</p>
                </div>

                <div className="visualization-preview" aria-hidden={true}>
                  <div className="emotion-network">
                    <div className="central-node pulse-animation" aria-hidden={true}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                    </div>

                    <div className="satellite-node node-1 float-animation" aria-hidden={true}></div>
                    <div className="satellite-node node-2 float-animation" aria-hidden={true}></div>
                    <div className="satellite-node node-3 float-animation" aria-hidden={true}></div>
                    <div className="satellite-node node-4 float-animation" aria-hidden={true}></div>
                  </div>
                </div>

                <div className="card-actions">
                  {/* SPA: explorar mapa completo -> simulador */}
                  <button className="btn btn-primary btn-full" onClick={onGo}>Explorar Mapa Completo</button>
                  <a href="#metodologia" className="btn btn-outline btn-full">Ver Metodología</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section id="metodologia" className="methodology-section" aria-labelledby="methodology-title">
          <div className="container">
            <div className="section-header">
              <div className="badge-outline">Metodología de Investigación</div>
              <h2 id="methodology-title" className="section-title">Proceso de Desarrollo Científico</h2>
              <p className="section-subtitle">Nuestro enfoque combina metodologías cualitativas y cuantitativas para crear un modelo robusto y científicamente válido.</p>
            </div>

            <div className="methodology-grid">
              <article className="methodology-card">
                <div className="methodology-header">
                  <span className="phase-badge">Fase 1</span>
                  <div className="methodology-icon methodology-icon-primary" aria-hidden={true}></div>
                </div>
                <h3 className="methodology-title">Recolección de Datos Cualitativos</h3>
                <p className="methodology-description">Entrevistas en profundidad y grupos focales para comprender las experiencias emocionales.</p>
                <ul className="methodology-list">
                  <li>Entrevistas semiestructuradas</li>
                  <li>Análisis narrativo</li>
                  <li>Codificación temática</li>
                  <li>Validación con participantes</li>
                </ul>
              </article>

              <article className="methodology-card">
                <div className="methodology-header">
                  <span className="phase-badge">Fase 2</span>
                  <div className="methodology-icon methodology-icon-green" aria-hidden={true}></div>
                </div>
                <h3 className="methodology-title">Análisis Cuantitativo</h3>
                <p className="methodology-description">Procesamiento estadístico y modelado de patrones emocionales identificados.</p>
                <ul className="methodology-list">
                  <li>Análisis estadístico descriptivo</li>
                  <li>Correlaciones emocionales</li>
                  <li>Modelos predictivos</li>
                  <li>Validación cruzada</li>
                </ul>
              </article>

              <article className="methodology-card">
                <div className="methodology-header">
                  <span className="phase-badge">Fase 3</span>
                  <div className="methodology-icon methodology-icon-blue" aria-hidden={true}></div>
                </div>
                <h3 className="methodology-title">Desarrollo del Sistema</h3>
                <p className="methodology-description">Construcción de la plataforma interactiva y APIs para visualización de datos.</p>
                <ul className="methodology-list">
                  <li>Arquitectura modular</li>
                  <li>APIs y endpoints para visualizaciones</li>
                  <li>Integración en tiempo real</li>
                </ul>
              </article>

              <article className="methodology-card">
                <div className="methodology-header">
                  <span className="phase-badge">Fase 4</span>
                  <div className="methodology-icon methodology-icon-green" aria-hidden={true}></div>
                </div>
                <h3 className="methodology-title">Validación y Despliegue</h3>
                <p className="methodology-description">Pruebas exhaustivas de usabilidad e implementación segura del sistema</p>
                <ul className="methodology-list">
                  <li>Testing de usabilidad</li>
                  <li>Pruebas de rendimiento</li>
                  <li>Auditoría de seguridad</li>
                  <li>Monitoreo continuo</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contacto" className="footer">
          <div className="container footer-grid">
            <div className="footer-brand">
              <h3 className="footer-logo">EmoFinance</h3>
              <p className="footer-subtitle">Mapeo Emocional Financiero</p>
              <p className="footer-description">
                Plataforma de investigación que analiza las emociones que influyen
                en las decisiones financieras, utilizando metodologías científicas
                avanzadas para crear mapas emocionales interactivos.
              </p>
              <div className="footer-social">
                <a href="#"><i className="fa fa-envelope"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-github"></i></a>
              </div>
            </div>

            <div className="footer-nav">
              <h4>Navegación</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#metodologia">Metodología</a></li>
                <li><a href="#objetivos">Visualización</a></li>
                <li><a href="#investigacion">Investigación</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contacto</h4>
              <ul>
                <li><a href="mailto:investigacion@emofinance.com">investigacion@emofinance.com</a></li>
                <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
                <li>Universidad de Investigación</li>
                <li>Departamento de Psicología Económica</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 EmoFinance. Todos los derechos reservados. Proyecto de investigación académica.</p>
            <div className="footer-links">
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
              <a href="#">Ética de Investigación</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
