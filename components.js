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
          <img src="${rootPath}assets/logo/logo-white.svg" alt="Tranberg Institut logo" class="logo-img" width="48" height="48" />
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
                <li><a href="${rootPath}behandlingar/rygg-nackbesvar.html">Rygg & Nackbesvär</a></li>
                <li><a href="${rootPath}behandlingar/huvudvark-migran.html">Huvudvärk & Migrän</a></li>
                <li><a href="${rootPath}behandlingar/stress-nervsystem.html">Stress & Utmattning</a></li>
                <li><a href="${rootPath}behandlingar/barn.html">Barn & Behandling</a></li>
                <li><a href="${rootPath}behandling-barn.html">Barn & Osteopati (lag & debatt)</a></li>
              </ul>
            </li>
            <li><a href="${rootPath}utbildningar.html">Utbildningar</a></li>
            <li><a href="${rootPath}foretagshalsa.html">Företagshälsa</a></li>
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
            <svg viewBox="81 125 70 70" width="48" height="48" aria-hidden="true">
              <!-- Forest Green elements (Delfin 1, ring, bottenprick, innerprick 2) -->
              <g fill="#26332B">
                <path d="M 101.2023,184.4129 c -0.50932,-0.38387 -1.802546,-1.58522 -2.873835,-2.66966 -8.261532,-8.36296 -10.235575,-20.63058 -5.010195,-31.13566 2.033362,-4.08786 5.508079,-8.13938 8.86374,-10.33512 0.87582,-0.57308 1.81734,-1.19209 2.09228,-1.37558 0.27494,-0.18348 -0.0359,-0.0785 -0.69074,0.23331 -6.631056,3.15744 -11.883699,10.22083 -13.552348,18.22427 -0.746988,3.58282 -0.554878,8.91626 0.443156,12.30312 1.736018,5.89124 5.292769,10.97902 10.198772,14.58893 0.65485,0.48184 1.25016,0.87344 1.32292,0.87021 0.0728,-0.003 -0.28443,-0.31994 -0.79375,-0.70382 z"/>
                <path d="M 104.78547,160.81232 c -0.0837,-0.13546 -0.0312,-0.32108 0.11668,-0.41249 0.14789,-0.0914 0.2689,0.0194 0.2689,0.2463 0,0.46475 -0.15877,0.53318 -0.38558,0.16619 z"/>
                <path d="M 105.9648,151.82025 c 0,-0.32499 0.17084,-0.55121 0.41627,-0.55121 0.24639,0 0.38137,0.18001 0.33073,0.4411 -0.12873,0.66377 -0.747,0.75492 -0.747,0.11011 z"/>
                <path fill="none" stroke="#26332B" stroke-width="1.2" d="M 133.64121,171.26896 c 0.24629,-0.64182 -0.6489,-1.96812 -2.01857,-2.99068 -0.7239,-0.54043 -1.31617,-1.17668 -1.31617,-1.41388 0,-0.2372 0.22077,-1.07499 0.49061,-1.86175 0.26984,-0.78677 0.57843,-2.02032 0.68576,-2.74122 l 0.19515,-1.31073 0.49898,0.64927 0.49898,0.64928 0.006,-1.36189 c 0.004,-1.02472 -0.21674,-1.81075 -0.89336,-3.175 -0.49459,-0.99721 -1.16841,-2.5104 -1.49737,-3.36263 -1.0779,-2.79245 -3.77563,-5.87531 -6.5973,-7.53913 -0.65379,-0.38552 -2.13681,-1.02123 -3.2956,-1.41271 -2.44878,-0.82728 -2.94398,-1.45626 -1.96606,-2.4972 0.49377,-0.52561 0.52422,-0.67305 0.21574,-1.04474 -0.27254,-0.3284 -0.68074,-0.40545 -1.69248,-0.31947 -1.83878,0.15626 -3.21079,0.87862 -4.19991,2.21123 -0.63756,0.85898 -1.11328,1.19947 -1.99216,1.42586 -1.8962,0.48845 -4.26258,1.82576 -5.79462,3.2747 -1.55635,1.47193 -2.26853,2.64785 -2.55306,4.21549 -0.0996,0.54881 -0.54521,1.41252 -0.99022,1.91936 -0.6486,0.73871 -0.773,1.06532 -0.62714,1.64651 0.19616,0.78156 0.60764,1.38941 0.94054,1.38941 0.11393,0 0.7172,-0.42613 1.34058,-0.94695 2.27645,-1.90192 4.85245,-2.75722 8.30424,-2.75722 1.54531,0 1.66418,0.0482 2.66339,1.08006 1.33824,1.38197 2.87192,2.28572 4.2538,2.50665 1.34106,0.2144 1.64218,-0.14606 0.95324,-1.14112 -0.95429,-1.37831 -0.9515,-1.39823 0.14161,-1.01256 2.16917,0.76533 4.2197,2.02165 5.50671,3.37385 1.72185,1.80906 2.14301,2.50983 2.62841,4.37339 0.70472,2.7056 0.15446,3.91962 -2.45267,5.41127 -1.59619,0.91325 -2.97376,2.00896 -2.97376,2.36532 0,0.13258 0.98686,0.24106 2.19302,0.24106 1.61207,0 2.44757,-0.12978 3.15395,-0.48991 0.93239,-0.47536 0.98369,-0.47551 1.72707,-0.005 0.42138,0.2668 1.41312,0.5924 2.20387,0.72357 2.0547,0.34082 2.10082,0.33933 2.25892,-0.0727 z"/>
                <path d="M 116.16328,190.04253 c 0.35719,-0.35719 0.64944,-0.89297 0.64944,-1.19063 0,-0.76015 -0.92627,-1.59953 -1.76511,-1.59953 -1.63137,0 -2.26604,1.87752 -0.97734,2.89122 0.90323,0.71047 1.30067,0.69128 2.09301,-0.10106 z"/>
                <path d="M 115.96605,165.50362 c 0.17462,-0.17462 0.3175,-0.62706 0.3175,-1.00541 0,-0.83199 -0.44184,-1.32292 -1.19063,-1.32292 -0.74878,0 -1.19062,0.49093 -1.19062,1.32292 0,0.83198 0.44184,1.32291 1.19062,1.32291 0.3056,0 0.6985,-0.14287 0.87313,-0.3175 z"/>
              </g>
              <!-- Gold elements (Delfin 2, topprick, innerprick 1) -->
              <g fill="#B28C5A">
                <path d="M 130.57105,183.40021 c 3.27747,-2.50653 6.01426,-5.91072 7.78675,-9.68564 1.88213,-4.00842 2.40218,-6.47827 2.38628,-11.33303 -0.0113,-3.44335 -0.11212,-4.46171 -0.62878,-6.35 -1.98446,-7.25275 -6.89153,-13.57265 -12.91769,-16.63689 -1.62172,-0.82463 -1.38268,-0.53103 0.5277,0.64812 0.9087,0.56088 2.6444,1.97236 3.85712,3.13662 3.791,3.63952 6.4474,8.33024 7.7278,13.6459 0.75708,3.14308 0.83925,8.3629 0.1775,11.27533 -1.42974,6.29248 -4.95207,11.81635 -10.2396,16.0582 -1.39399,1.11831 -0.34397,0.51619 1.32292,-0.75861 z"/>
                <path d="M 112.69428,183.04605 c 0.73128,-0.34136 1.92293,-0.54705 3.72156,-0.64235 4.14924,-0.21985 6.57102,-1.24645 9.58468,-4.06295 1.32769,-1.24083 1.68064,-1.74469 1.81968,-2.59775 l 0.1725,-1.05833 -0.76134,0.70916 c -0.41875,0.39004 -1.65096,1.13418 -2.73826,1.65365 -1.67029,0.79799 -2.25742,0.94448 -3.78544,0.94448 -0.9947,0 -2.33224,-0.13187 -2.97232,-0.29305 -1.02764,-0.25876 -1.28591,-0.48781 -2.20763,-1.95787 -1.01536,-1.61939 -2.35213,-2.68886 -3.96297,-3.17052 -0.60698,-0.1815 -0.61006,-0.17297 -0.17653,0.48868 0.24268,0.37037 0.40161,0.86928 0.35318,1.10868 -0.0689,0.34055 -0.46228,0.14547 -1.80784,-0.89654 -4.11206,-3.18436 -5.82868,-6.86243 -4.64697,-9.9567 0.59172,-1.54939 2.51072,-3.26266 3.90401,-3.48545 0.61276,-0.098 1.1345,-0.3655 1.29397,-0.66347 0.42777,-0.7993 0.0374,-1.08649 -1.22029,-0.89788 -0.69119,0.10365 -1.20297,0.0618 -1.30725,-0.10694 -0.24156,-0.39085 -1.4057,-0.34436 -2.96389,0.11837 -2.82067,0.83765 -5.119166,3.95831 -5.705496,7.74633 -0.236134,1.52555 -0.209131,2.25653 0.1503,4.06873 0.955856,4.81931 3.557816,8.30363 7.856666,10.52094 1.23314,0.63605 2.29442,1.20171 2.3584,1.25703 0.064,0.0553 -0.16157,0.29523 -0.50122,0.53313 -0.59011,0.41333 -0.59597,0.44833 -0.13191,0.78766 0.69399,0.50746 2.42033,0.43837 3.67441,-0.14704 z"/>
                <path d="M 122.22883,179.31887 c 0.56654,-0.28884 1.07903,-0.47621 1.13886,-0.41638 0.14445,0.14444 -1.40929,0.94155 -1.83528,0.94155 -0.18352,0 0.12987,-0.23632 0.69642,-0.52517 z"/>
                <path d="M 116.16328,135.80294 c 0.35719,-0.35719 0.64944,-0.89838 0.64944,-1.20265 0,-0.65112 -1.11519,-1.85208 -1.7198,-1.85208 -0.6046,0 -1.71979,1.20096 -1.71979,1.85208 0,0.65112 1.11519,1.85208 1.71979,1.85208 0.23151,0 0.71318,-0.29224 1.07036,-0.64943 z"/>
                <path d="M 123.31001,156.76642 c -0.22653,-0.32342 -0.41188,-0.69519 -0.41188,-0.82615 0,-0.32388 0.76129,0.32999 1.08209,0.92941 0.37627,0.70306 -0.16371,0.61987 -0.67021,-0.10326 z"/>
              </g>
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
            <li><a href="${rootPath}behandling-barn.html">Barn &amp; Osteopati</a></li>
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

