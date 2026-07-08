// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-detail, .project-type');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form → HubSpot (Formspree action remains as a no-JS fallback)
const HUBSPOT_FORM_ENDPOINT = 'https://api-na2.hsforms.com/submissions/v3/integration/submit/246703061/6141e9e7-43e5-4a2b-a767-c818f5760b6d';

function hubspotFields(values) {
    const name = (values.name || '').trim();
    const firstname = name.split(/\s+/)[0] || name;
    const lastname = name.split(/\s+/).slice(1).join(' ');
    const fields = [
        { objectTypeId: '0-1', name: 'firstname', value: firstname },
        { objectTypeId: '0-1', name: 'email', value: values.email },
        { objectTypeId: '0-1', name: 'phone', value: values.phone },
        { objectTypeId: '0-1', name: 'jurisdiction', value: values.jurisdiction },
        { objectTypeId: '0-1', name: 'parcel_or_tax_id', value: values.parcel_or_tax_id },
        // HubSpot dropdown has "Not Sure"; site/chatbot labels may be longer
        { objectTypeId: '0-1', name: 'service', value: values.service.indexOf('Not Sure') === 0 ? 'Not Sure' : values.service }
    ];
    if (lastname) fields.push({ objectTypeId: '0-1', name: 'lastname', value: lastname });
    if (values.message) fields.push({ objectTypeId: '0-1', name: 'message', value: values.message });
    return fields;
}

function submitToHubspot(values) {
    return fetch(HUBSPOT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fields: hubspotFields(values),
            context: { pageUri: location.href, pageName: document.title }
        })
    }).then(res => {
        if (!res.ok) throw new Error('HubSpot submission failed: ' + res.status);
        return res;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    let fallbackToNative = false;
    form.addEventListener('submit', (e) => {
        if (fallbackToNative) return; // let the browser post to Formspree
        e.preventDefault();
        const data = new FormData(form);
        // Fold optional fields into the message so HubSpot needs no extra properties
        const extras = [];
        if (data.get('address')) extras.push('Address: ' + data.get('address'));
        if (data.get('project_name')) extras.push('Project name: ' + data.get('project_name'));
        let message = (data.get('message') || '').trim();
        if (extras.length) message = (message ? message + '\n\n' : '') + extras.join('\n');
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending…';
        submitToHubspot({
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            jurisdiction: data.get('jurisdiction'),
            parcel_or_tax_id: data.get('parcel_or_tax_id'),
            service: data.get('service'),
            message: message
        }).then(() => {
            form.innerHTML = '<p class="form-success">✅ Request received! We just emailed you our services and pricing — check your inbox (and spam folder) for an email from Dennis Lytkine. We\'ll follow up personally within one business day.</p>';
        }).catch(() => {
            // If HubSpot is unreachable, post natively to Formspree so no lead is lost
            fallbackToNative = true;
            form.submit();
        });
    });
});
