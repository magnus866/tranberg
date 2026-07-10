/**
 * Tranberg Institut AB - Shared Components Loader
 * Dynamically injects header, footer, mobile navigation, active states, and GDPR dialog
 */
document.addEventListener('DOMContentLoaded', () => {
  // Resolve path depth helper (to handle links from /behandlingar/ subpages correctly)
  const isSubpage = window.location.pathname.includes('/behandlingar/');
  const rootPath = isSubpage ? '../' : './';
  const subpagePrefix = isSubpage ? '' : 'behandlingar/';

  /* -------------------------------------------------------------
   * 1. Header HTML Definition & Injection
   * ------------------------------------------------------------- */
  const headerContainer = document.getElementById('main-header');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="header-container">
        <a href="${rootPath}index.html" class="logo-area" id="logo-link">
          <svg class="logo-svg" viewBox="0 0 100 100" width="48" height="48" aria-hidden="true">
            <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="1.5" fill="none" />
            <path d="M 50,15 A 35,35 0 0, 1 85,50 A 35,35 0 0, 1 50,85 A 35,35 0 0, 1 30,70 A 20,20 0 0, 0 50,80 A 30,30 0 0, 0 80,50 A 30,30 0 0, 0 50,20 A 30,30 0 0, 0 20,50 A 10,10 0 0, 0 25,58 A 12,12 0 0, 1 20,50 A 25,25 0 0, 1 50,25 Z" fill="currentColor" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
          <div class="logo-text">
            <span class="logo-title">TRANBERG</span>
            <span class="logo-subtitle">INSTITUT AB</span>
          </div>
        </a>
        
        <button class="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
          <span class="sr-only">Meny</span>
          <span class="hamburger"></span>
        </button>

        <nav id="primary-navigation" class="nav-menu">
          <ul>
            <li><a href="${rootPath}index.html">Startsida</a></li>
            <li><a href="${rootPath}vad-ar-osteopati.html">Vad är osteopati?</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle">Om oss <svg class="chevron-icon" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
              <ul class="dropdown-menu">
                <li><a href="${rootPath}om-institutet.html">Om institutet</a></li>
                <li><a href="${rootPath}om-christer.html">Om Christer</a></li>
                <li><a href="${rootPath}jorgen-tranberg.html">Jörgen Tranbergs arv</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="${rootPath}biodynamisk-kraniosakralosteopati.html" class="dropdown-toggle">Behandlingar <svg class="chevron-icon" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
              <ul class="dropdown-menu">
                <li><a href="${rootPath}biodynamisk-kraniosakralosteopati.html">Metod & Info</a></li>
                <li><a href="${rootPath}${subpagePrefix}rygg-nackbesvar.html">Rygg & Nackbesvär</a></li>
                <li><a href="${rootPath}${subpagePrefix}huvudvark-migran.html">Huvudvärk & Migrän</a></li>
                <li><a href="${rootPath}${subpagePrefix}stress-nervsystem.html">Stress & Utmattning</a></li>
                <li><a href="${rootPath}${subpagePrefix}barn.html">Barn & Behandling</a></li>
              </ul>
            </li>
            <li><a href="${rootPath}utbildningar.html">Utbildningar</a></li>
            <li><a href="${rootPath}kunskapsbank.html">Kunskapsbank</a></li>
            <li><a href="${rootPath}forelasningar.html">Föreläsningar</a></li>
            <li><a href="${rootPath}boka.html" class="nav-btn-cta">Boka</a></li>
          </ul>
        </nav>
      </div>
    `;
  }

  /* -------------------------------------------------------------
   * 2. Footer & GDPR Modal HTML Definition & Injection
   * ------------------------------------------------------------- */
  const footerContainer = document.getElementById('kontakt');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="container footer-grid section-padding">
        <div class="footer-info fade-in">
          <div class="footer-logo">
            <svg viewBox="0 0 100 100" width="48" height="48" aria-hidden="true">
              <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="1.5" fill="none" />
              <path d="M 50,15 A 35,35 0 0, 1 85,50 A 35,35 0 0, 1 50,85 A 35,35 0 0, 1 30,70 A 20,20 0 0, 0 50,80 A 30,30 0 0, 0 80,50 A 30,30 0 0, 0 50,20 A 30,30 0 0, 0 20,50 A 10,10 0 0, 0 25,58 A 12,12 0 0, 1 20,50 A 25,25 0 0, 1 50,25 Z" fill="currentColor" />
            </svg>
            <div>
              <span class="logo-title">TRANBERG</span>
              <span class="logo-subtitle">INSTITUT AB</span>
            </div>
          </div>
          <p class="footer-tagline">I symbios med människans natur.</p>
          <p class="footer-desc">En akademisk plattform där klinisk behandling, professionell utbildning och forskningsbaserad kunskap förenas.</p>
        </div>

        <div class="footer-links fade-in">
          <h4>Navigering</h4>
          <ul>
            <li><a href="${rootPath}vad-ar-osteopati.html">Vad är osteopati</a></li>
            <li><a href="${rootPath}om-institutet.html">Om institutet</a></li>
            <li><a href="${rootPath}biodynamisk-kraniosakralosteopati.html">Biodynamisk Osteopati</a></li>
            <li><a href="${rootPath}utbildningar.html">Våra utbildningar</a></li>
            <li><a href="${rootPath}kunskapsbank.html">Kunskapsbank</a></li>
            <li><a href="${rootPath}forelasningar.html">Föreläsningar</a></li>
            <li><a href="${rootPath}boka.html">Boka behandling</a></li>
          </ul>
        </div>

        <div class="footer-contact fade-in">
          <h4>Kontakt & Öppettider</h4>
          <p><strong>Adress:</strong> Exempelgatan 1, 123 45 Göteborg</p>
          <p><strong>Telefon:</strong> 070-12 45 67</p>
          <p><strong>E-post:</strong> <a href="mailto:info@tranberginstitut.se">info@tranberginstitut.se</a></p>
          <p><strong>Administration:</strong> <a href="mailto:magnus@houseofkroon.se">magnus@houseofkroon.se</a></p>
          <p><strong>Öppettider:</strong> Mån – Fre: 08:00 – 15:00</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container flex-space-between">
          <p>&copy; 2026 Tranberg Institut AB. Alla rättigheter förbehållna.</p>
          <p><a href="#gdpr-info" id="gdpr-link">Integritetspolicy & GDPR</a></p>
        </div>
      </div>
    `;

    // Append GDPR Dialog markup to body dynamically if not present
    if (!document.getElementById('gdpr-dialog')) {
      const dialog = document.createElement('dialog');
      dialog.id = 'gdpr-dialog';
      dialog.className = 'gdpr-dialog-box';
      dialog.innerHTML = `
        <div class="dialog-content">
          <h3>Integritetspolicy & GDPR-efterlevnad</h3>
          <p>På Tranberg Institut AB värnar vi om din integritet och datasekretess. Vi följer reglerna i dataskyddsförordningen (GDPR) noggrant.</p>
          
          <h4>Hur vi hanterar dina bokningsuppgifter:</h4>
          <ul>
            <li><strong>Säkerhet:</strong> När du gör en bokning skickas dina uppgifter krypterade direkt till vår administratör (magnus@houseofkroon.se). Ingen obehörig kan läsa din information.</li>
            <li><strong>Anonymitet:</strong> I bokningssystemet visas bokade tider endast som "Upptagen". Ingen personlig information exponeras någonsin offentligt.</li>
            <li><strong>Syfte:</strong> Vi samlar endast in namn, e-post, telefonnummer samt eventuell frivillig hälsoinformation i syfte att administrera din bokade tid samt förbereda din osteopatiska behandling.</li>
            <li><strong>Rensning:</strong> Dina personuppgifter sparas endast så länge det är nödvändigt för behandlingen och enligt lagstadgade krav för journalföring. Du har rätt att begära registerutdrag eller rättelse.</li>
          </ul>
          
          <button id="close-gdpr-dialog-btn" class="btn btn-secondary">Stäng</button>
        </div>
      `;
      document.body.appendChild(dialog);
    }
  }

  /* -------------------------------------------------------------
   * 3. Navigation Interactions (Hamburger & Dropdowns)
   * ------------------------------------------------------------- */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNavigation = document.querySelector('#primary-navigation');

  if (mobileNavToggle && primaryNavigation) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpened = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isOpened);
      primaryNavigation.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Handle Dropdowns on Mobile click
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1200) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    });
  }

  // Handle active navigation states
  const navLinks = document.querySelectorAll('.nav-menu a');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      // Resolve link path to absolute comparison
      const tempLink = document.createElement('a');
      tempLink.href = link.href;
      
      if (currentPath === tempLink.pathname) {
        link.classList.add('active-nav-item');
        // If nested in dropdown, highlight the parent dropdown toggle
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          parentDropdown.querySelector('.dropdown-toggle').classList.add('active-nav-item');
        }
      }
    }
  });

  /* -------------------------------------------------------------
   * 4. Header Scroll Effect
   * ------------------------------------------------------------- */
  const header = document.querySelector('#main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* -------------------------------------------------------------
   * 5. GDPR Dialog Opening/Closing
   * ------------------------------------------------------------- */
  const gdprDialog = document.getElementById('gdpr-dialog');
  const gdprLink = document.getElementById('gdpr-link');
  const closeGdprBtn = document.getElementById('close-gdpr-dialog-btn');

  if (gdprDialog && gdprLink && closeGdprBtn) {
    gdprLink.addEventListener('click', (e) => {
      e.preventDefault();
      gdprDialog.showModal();
    });

    closeGdprBtn.addEventListener('click', () => {
      gdprDialog.close();
    });

    // Close on clicking backdrop
    gdprDialog.addEventListener('click', (e) => {
      const rect = gdprDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        gdprDialog.close();
      }
    });
  }

  /* -------------------------------------------------------------
   * 6. Shared Intersection Observer (Fade-In Reveal Animations)
   * ------------------------------------------------------------- */
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });
});
