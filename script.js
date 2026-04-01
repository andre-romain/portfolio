const header = document.getElementById('main-header');
let dernierePositionScroll = 0;

window.addEventListener('scroll', () => {
    let positionActuelle = window.pageYOffset || document.documentElement.scrollTop;
    if (positionActuelle > dernierePositionScroll && positionActuelle > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    dernierePositionScroll = positionActuelle <= 0 ? 0 : positionActuelle;
});

const observeElements = document.querySelectorAll('.anim-prenom, .anim-nom, .sous-titre, .photo-block, .bio-block, .section-title, .projet-card, .categorie-card, .parcours-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const voletRouge = document.querySelector('.transition-volet-rouge');
    const voletNoir = document.querySelector('.transition-volet-noir');
    if (voletRouge && voletNoir) {
        setTimeout(() => {
            voletRouge.classList.add('ouvert');
            voletNoir.classList.add('ouvert');
            setTimeout(() => {
                observeElements.forEach(element => observer.observe(element));
            }, 750);
        }, 10);
    } else {
        observeElements.forEach(element => observer.observe(element));
    }
});

const liensNavigation = document.querySelectorAll('a');
liensNavigation.forEach(lien => {
    lien.addEventListener('click', function(e) {
        if (this.href.includes('mailto:')) return;
        if (this.classList.contains('projet-card')) {
            e.preventDefault();
            const projetModal = document.getElementById('projet-modal');
            if (projetModal) {
                projetModal.classList.add('show');
                setTimeout(() => {
                    projetModal.style.opacity = '1';
                    projetModal.querySelector('.modal-content-wrapper').style.transform = 'scale(1)';
                }, 10);
            }
            return;
        }
        const currentUrl = window.location.pathname;
        const targetUrl = this.pathname;
        const isSamePage = (currentUrl === targetUrl) || (currentUrl === '/' && targetUrl.endsWith('index.html')) || (currentUrl.endsWith('index.html') && targetUrl === '/');
        if (isSamePage && this.hash) return;
        if (this.hostname === window.location.hostname && this.getAttribute('target') !== '_blank' && this.id !== 'btn-photo' && !this.hasAttribute('download')) {
            e.preventDefault();
            const destination = this.href;
            const voletRouge = document.querySelector('.transition-volet-rouge');
            const voletNoir = document.querySelector('.transition-volet-noir');
            if (voletRouge && voletNoir) {
                voletRouge.classList.remove('ouvert');
                voletNoir.classList.remove('ouvert');
                voletRouge.classList.add('preparation');
                voletNoir.classList.add('preparation');
                void voletRouge.offsetWidth;
                voletRouge.classList.remove('preparation');
                voletNoir.classList.remove('preparation');
                voletRouge.classList.add('ferme');
                voletNoir.classList.add('ferme');
                setTimeout(() => { window.location.href = destination; }, 800);
            } else {
                window.location.href = destination;
            }
        }
    });
});

const modalPhoto = document.getElementById('photo-modal');
const photoBlock = document.getElementById('btn-photo');
const closeModalPhoto = document.querySelector('.close-modal');
if (photoBlock && modalPhoto && closeModalPhoto) {
    photoBlock.addEventListener('click', (e) => {
        e.preventDefault();
        modalPhoto.classList.add('show');
        setTimeout(() => {
            modalPhoto.style.opacity = '1';
            modalPhoto.querySelector('img').style.transform = 'scale(1)';
        }, 10);
    });
    const hideModalPhoto = () => {
        modalPhoto.style.opacity = '0';
        modalPhoto.querySelector('img').style.transform = 'scale(0.8)';
        setTimeout(() => modalPhoto.classList.remove('show'), 300);
    };
    closeModalPhoto.addEventListener('click', hideModalPhoto);
    modalPhoto.addEventListener('click', (e) => {
        if(e.target === modalPhoto) hideModalPhoto();
    });
}

const projetModal = document.getElementById('projet-modal');
const closeProjetModal = document.querySelector('.close-projet-modal');
if (projetModal && closeProjetModal) {
    const hideProjetModal = () => {
        projetModal.style.opacity = '0';
        projetModal.querySelector('.modal-content-wrapper').style.transform = 'scale(0.8)';
        setTimeout(() => projetModal.classList.remove('show'), 300);
    };
    closeProjetModal.addEventListener('click', hideProjetModal);
    projetModal.addEventListener('click', (e) => {
        if(e.target === projetModal) hideProjetModal();
    });
    const cartesProjets = document.querySelectorAll('.projet-card');
    cartesProjets.forEach(carte => {
        carte.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('modal-titre').textContent = this.getAttribute('data-titre');
            document.getElementById('modal-contexte').textContent = this.getAttribute('data-contexte');
            document.getElementById('modal-mission').textContent = this.getAttribute('data-mission');
            document.getElementById('modal-role').textContent = this.getAttribute('data-role');
            document.getElementById('modal-duree').textContent = this.getAttribute('data-duree');
            document.getElementById('modal-outils').textContent = this.getAttribute('data-outils');
            document.getElementById('modal-technos').textContent = this.getAttribute('data-technos');
            const categories = this.getAttribute('data-categories');
            const catContainer = document.getElementById('modal-categories');
            catContainer.innerHTML = '';
            if(categories) {
                categories.split(',').forEach(cat => {
                    const span = document.createElement('span');
                    span.textContent = cat.trim();
                    catContainer.appendChild(span);
                });
            }
            const mediaUrl = this.getAttribute('data-media');
            const mediaContainer = document.getElementById('modal-media-container');
            const mediaBtn = document.getElementById('modal-media-btn');
            if (mediaUrl && mediaUrl.trim() !== "") {
                mediaBtn.href = mediaUrl;
                mediaContainer.style.display = 'block';
            } else {
                mediaContainer.style.display = 'none';
            }
            const galerieData = this.getAttribute('data-galerie');
            const galerieSection = document.getElementById('modal-galerie-section');
            const galerieContainer = document.getElementById('modal-galerie-container');
            if (galerieData && galerieData.trim() !== "") {
                galerieSection.style.display = 'block';
                galerieContainer.innerHTML = '';
                const images = galerieData.split(',');
                images.forEach(imgName => {
                    const imgEl = document.createElement('img');
                    imgEl.src = 'images/galerie/' + imgName.trim();
                    imgEl.addEventListener('click', () => {
                        const photoModal = document.getElementById('photo-modal');
                        photoModal.querySelector('img').src = imgEl.src;
                        photoModal.classList.add('show');
                        setTimeout(() => {
                            photoModal.style.opacity = '1';
                            photoModal.querySelector('img').style.transform = 'scale(1)';
                        }, 10);
                    });
                    galerieContainer.appendChild(imgEl);
                });
            } else {
                galerieSection.style.display = 'none';
            }
            projetModal.classList.add('show');
            setTimeout(() => {
                projetModal.style.opacity = '1';
                projetModal.querySelector('.modal-content-wrapper').style.transform = 'scale(1)';
            }, 10);
        });
    });
}

const hamburgerBtn = document.getElementById('hamburger-menu');
const navContainerMobile = document.querySelector('.nav-container');
if (hamburgerBtn && navContainerMobile) {
    const closeMenuBtn = document.createElement('div');
    closeMenuBtn.innerHTML = '&times;';
    closeMenuBtn.className = 'close-menu-mobile';
    navContainerMobile.appendChild(closeMenuBtn);
    const toggleMenu = () => {
        const isActive = navContainerMobile.classList.contains('active');
        if (isActive) {
            navContainerMobile.classList.remove('active');
            hamburgerBtn.style.opacity = '1';
            hamburgerBtn.style.pointerEvents = 'auto';
        } else {
            navContainerMobile.classList.add('active');
            hamburgerBtn.style.opacity = '0';
            hamburgerBtn.style.pointerEvents = 'none';
        }
    };
    hamburgerBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-item').forEach(lien => {
        lien.addEventListener('click', () => {
            navContainerMobile.classList.remove('active');
            hamburgerBtn.style.opacity = '1';
            hamburgerBtn.style.pointerEvents = 'auto';
        });
    });
}
// =========================================================
// EFFET GOUTTE D'EAU ROUGE AU CLIC
// =========================================================
window.addEventListener('click', (e) => {
    // Création de l'élément div dynamiquement
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';

    // Positionnement précis au centre du clic (clientX/Y sont les coordonnées de la souris)
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;

    // Ajout de l'élément au document (dans le body)
    document.body.appendChild(ripple);

    // Suppression automatique de l'élément après la fin de l'animation CSS (0.8s = 800ms)
    // C'est crucial pour garder le code HTML propre.
    setTimeout(() => {
        ripple.remove();
    }, 800);
});

