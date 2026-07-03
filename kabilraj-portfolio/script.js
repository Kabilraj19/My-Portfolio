
// Wait for DOM
window.addEventListener("DOMContentLoaded", () => {

  /* =========================
     YEAR
  ========================= */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* =========================
     MOBILE MENU
  ========================= */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }


  const text = [
    "Aspiring Data Scientist",
    "AIML Engineer"
];

let index = 0;
let charIndex = 0;
let deleting = false;

const typing = document.querySelector(".typing-text");


function typeEffect(){

    let current = text[index];


    if(!deleting){

        typing.textContent =
        current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1200);

            return;
        }

    }
    else{

        typing.textContent =
        current.substring(0,charIndex--);


        if(charIndex < 0){

            deleting=false;

            index=(index+1)%text.length;

        }

    }


    setTimeout(typeEffect,
        deleting ? 50 : 100
    );

}


typeEffect();

  /* =========================
     HEADER SCROLL
  ========================= */
  const header = document.getElementById('siteHeader');
  const backTop = document.getElementById('backTop');

  const onScroll = () => {
    if (header) {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    if (backTop) {
      if (window.scrollY > 600) backTop.classList.add('visible');
      else backTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* =========================
     REVEAL ANIMATION
  ========================= */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));


  /* =========================
     SKILLS BAR
  ========================= */
  document.querySelectorAll('.skill-rows').forEach((root) => {
    let skills = [];
    try {
      skills = JSON.parse(root.getAttribute('data-skills') || '[]');
    } catch (_) {}

    root.innerHTML = skills.map(s => `
      <div class="skill-row">
        <div class="label">
          <strong>${s.name}</strong>
          <span>${s.level}%</span>
        </div>
        <div class="bar">
          <div class="bar-fill" data-level="${s.level}"></div>
        </div>
      </div>
    `).join('');
  });

  const barIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const fill = e.target;
          const level = fill.getAttribute('data-level') || '0';
          requestAnimationFrame(() => {
            fill.style.width = level + '%';
          });
          barIO.unobserve(fill);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('.bar-fill').forEach((b) => barIO.observe(b));


  /* =========================
     ACTIVE NAV LINK
  ========================= */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const setActive = () => {
    const y = window.scrollY + 120;
    let current = '';

    sections.forEach((s) => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        current = s.id;
      }
    });

    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();


  /* =========================
   CONTACT LIST (AUTO BUILD)
========================= */
 const contact = $("#contactList");
  if (contact) {
    contact.innerHTML = channels.map(c => `
      <a href="${c.href}" class="contact-card glass reveal">
        <span class="contact-icon"><i class="icon-${c.icon}"></i></span>
        <div>
          <p class="label">${c.label}</p>
          <p class="val">${c.value}</p>
        </div>
      </a>
    `).join("");
  }


  /* =========================
     PARTICLE BACKGROUND
  ========================= */
  const canvas = document.getElementById("particles");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    let particles = [];
    const numParticles = 70;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = "rgba(0, 245, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < 10000) {
            ctx.strokeStyle = "rgba(122, 92, 255, 0.12)";
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connectParticles();
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

});
// ========== Certifications ==========
  const certGrid = $("#certGrid");
  if (certGrid) {
    certGrid.innerHTML = certifications.map(c => `
      <div class="cert-card reveal">
        <h3>${c.title}</h3>
        <p class="provider">${c.provider}</p>
        <p class="desc">${c.desc}</p>
        <div class="tags">
          ${c.tags.map(t => `<span>${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});
document.querySelectorAll(".copy-item").forEach(card => {
  card.addEventListener("click", () => {
    navigator.clipboard.writeText(card.dataset.copy);
    card.classList.add("copied");
    setTimeout(() => card.classList.remove("copied"), 1000);
  });
});

// RIPPLE EFFECT
document.querySelectorAll('.ripple').forEach(card => {
  card.addEventListener('click', function(e) {
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
    circle.classList.add("ripple");

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

// COPY EMAIL (fallback for devices with no default mail app)
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const text = btn.dataset.copy;
    const toast = document.getElementById('toast');

    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1000);

      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      }
    });
  });
});

// COPY EMAIL (legacy, unused elements guard)
document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();      // Prevent mailto link
        e.stopPropagation();     // Prevent parent <a> click

        navigator.clipboard.writeText(this.dataset.copy);

        this.textContent = "✓";

        setTimeout(() => {
            this.textContent = "⧉";
        }, 1500);
    });
});