/**
 * Tranberg Institut AB - Shared Components Loader
 * Dynamically injects header, footer, mobile navigation, active states, and GDPR dialog
 */
document.addEventListener('DOMContentLoaded', () => {
  // Resolve path depth helper (to handle links from /behandlingar/ subpages correctly)
  const isSubpage = window.location.pathname.includes('/behandlingar/');
  const rootPath = isSubpage ? '../' : './';

  /* -------------------------------------------------------------
   * 1. Header HTML Definition & Injection
   * ------------------------------------------------------------- */
  const headerContainer = document.getElementById('main-header');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="header-container">
        <a href="${rootPath}index.html" class="logo-area" id="logo-link">
          <!-- Dark background logo per brand guidelines -->
          <img src="${rootPath}assets/logo/Tranberg-Institut-Logo-Master-darkbg.svg" alt="Tranberg Institut" class="logo-master-header" />
        </a>

        <button class="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false" aria-label="Meny">
          <span class="sr-only">Meny</span>
          <svg class="hamburger-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>

        <nav id="primary-navigation" class="nav-menu" role="menubar">
          <ul>
            <li><a href="${rootPath}index.html" role="menuitem">Startsida</a></li>
            <li class="dropdown"><a href="#" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" role="menuitem">Om Institutet <svg class="chevron-icon" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="${rootPath}om-institutet.html" role="menuitem">Om institutet</a></li>
                <li><a href="${rootPath}om-christer.html" role="menuitem">Om Christer</a></li>

              </ul>
            </li>
            <li class="dropdown"><a href="#" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" role="menuitem">Behandlingar <svg class="chevron-icon" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="${rootPath}biodynamisk-kraniosakralosteopati.html" role="menuitem">Metod & Info</a></li>
                <li><a href="${rootPath}behandlingar/rygg-nackbesvar.html" role="menuitem">Rygg & Nackbesvär</a></li>
                <li><a href="${rootPath}behandlingar/huvudvark-migran.html" role="menuitem">Huvudvärk & Migrän</a></li>
                <li><a href="${rootPath}behandlingar/stress-nervsystem.html" role="menuitem">Stress & Utmattning</a></li>
                <li><a href="${rootPath}behandling-av-barn.html" role="menuitem">Barn &amp; Osteopati</a></li>
              </ul>
            </li>
            <li><a href="${rootPath}utbildningar.html" role="menuitem">Utbildningar</a></li>
            <li><a href="${rootPath}kunskapsbank.html" role="menuitem">Kunskapsbank</a></li>
            <li><a href="${rootPath}forelasningar.html" role="menuitem">Föreläsningar</a></li>
            <li><a href="${rootPath}foretagshalsa.html" role="menuitem">Företagshälsa</a></li>
            <li><a href="${rootPath}boka.html" class="nav-btn-cta" role="menuitem">Boka</a></li>
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
            <a href="${rootPath}index.html" class="footer-logo-link" style="display: inline-block;">
              <!-- Dark background logo per brand guidelines -->
            <img src="${rootPath}assets/logo/Tranberg-Institut-Logo-Master-darkbg.svg" alt="Tranberg Institut" class="logo-master-footer" width="200" height="84" style="height: auto; width: 200px; max-width: 100%; display: block;" />
            </a>
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
            <li><a href="${rootPath}behandling-av-barn.html">Barn &amp; Osteopati</a></li>
            <li><a href="${rootPath}utbildningar.html">Våra utbildningar</a></li>
            <li><a href="${rootPath}kunskapsbank.html">Kunskapsbank</a></li>
            <li><a href="${rootPath}forelasningar.html">Föreläsningar</a></li>
            <li><a href="${rootPath}boka.html">Boka behandling</a></li>
          </ul>
        </div>

        <div class="footer-contact fade-in">
          <h4>Kontakt</h4>
          <p><strong>Besöksadress:</strong><br>Eklandagatan 9, 412 55 Göteborg</p>
          <p style="margin-top: 0.35rem;"><a href="https://www.google.com/maps/search/?api=1&query=Eklandagatan%209%2C%20412%2055%20G%C3%B6teborg" target="_blank" rel="noopener noreferrer" style="color: var(--color-patinated-brass); font-size: 0.88rem; font-weight: 500;">Visa karta och vägbeskrivning &rarr;</a></p>
          <p style="margin-top: 0.6rem;"><strong>Telefon:</strong> <a href="tel:+46734416538">0734-416538</a></p>
          <p><strong>E-post:</strong> <a href="mailto:boka@tranberginstitut.se">boka@tranberginstitut.se</a></p>
<div class="footer-payment fade-in">
  <h4>Betalningsalternativ</h4>
  <p>Vi accepterar Swish och bankgiro.</p>
  <p>Vi är anslutna till Epassi.</p>
</div>
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
          <p>Vi hanterar dina bokningsuppgifter på ett säkert och konfidentiellt sätt i enlighet med GDPR.</p>
          
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
  
  if ('IntersectionObserver' in window) {
    const fadeObserverOptions = {
      threshold: 0.05, // Lower threshold to ensure triggering on small screens
      rootMargin: '0px 0px -30px 0px'
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
  } else {
    // Immediate fallback for browsers without IntersectionObserver support
    fadeElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // Safety fallback: ensure ALL fade-in elements are visible after a short delay
  // in case of layout engine lag, local file loading quirks, or viewport glitches.
  setTimeout(() => {
    document.querySelectorAll('.fade-in:not(.visible)').forEach(element => {
      element.classList.add('visible');
    });
  }, 600);
});

