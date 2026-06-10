// Private Provider SWFL — guided intake chatbot.
// Fully client-side and rule-based: no API keys (nothing to leak on a static site),
// all user input rendered via textContent (no XSS), honeypot field for bot spam.
// Submits to the same Formspree endpoint as the contact form.
(function () {
    'use strict';

    var FORM_ENDPOINT = 'https://formspree.io/f/mbdarwrb';

    var css = '' +
        '.ppc-launcher{position:fixed;bottom:24px;right:24px;z-index:9999;background:#c8a45d;color:#1a2433;border:none;border-radius:50px;padding:14px 22px;font-family:Montserrat,sans-serif;font-weight:700;font-size:15px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.3)}' +
        '.ppc-launcher:hover{transform:translateY(-2px)}' +
        '.ppc-window{position:fixed;bottom:90px;right:24px;z-index:9999;width:340px;max-width:calc(100vw - 32px);height:480px;max-height:calc(100vh - 120px);background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.35);display:none;flex-direction:column;overflow:hidden;font-family:"Open Sans",sans-serif}' +
        '.ppc-window.ppc-open{display:flex}' +
        '.ppc-header{background:#1a2433;color:#fff;padding:14px 16px;font-family:Montserrat,sans-serif;font-weight:700;display:flex;justify-content:space-between;align-items:center}' +
        '.ppc-header button{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1}' +
        '.ppc-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}' +
        '.ppc-msg{max-width:85%;padding:10px 13px;border-radius:12px;font-size:14px;line-height:1.45;white-space:pre-line}' +
        '.ppc-bot{background:#eef1f5;color:#1a2433;align-self:flex-start;border-bottom-left-radius:4px}' +
        '.ppc-user{background:#c8a45d;color:#1a2433;align-self:flex-end;border-bottom-right-radius:4px}' +
        '.ppc-choices{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start}' +
        '.ppc-choices button{background:#fff;border:1.5px solid #c8a45d;color:#1a2433;border-radius:18px;padding:7px 13px;font-size:13px;cursor:pointer;font-family:inherit}' +
        '.ppc-choices button:hover{background:#c8a45d}' +
        '.ppc-input{display:flex;border-top:1px solid #ddd}' +
        '.ppc-input input{flex:1;border:none;padding:13px;font-size:14px;font-family:inherit;outline:none}' +
        '.ppc-input button{background:#1a2433;color:#fff;border:none;padding:0 18px;cursor:pointer;font-family:Montserrat,sans-serif;font-weight:600}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var launcher = document.createElement('button');
    launcher.className = 'ppc-launcher';
    launcher.type = 'button';
    launcher.textContent = '💬 Get a Quote';
    document.body.appendChild(launcher);

    var win = document.createElement('div');
    win.className = 'ppc-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Quote assistant');
    document.body.appendChild(win);

    var header = document.createElement('div');
    header.className = 'ppc-header';
    var title = document.createElement('span');
    title.textContent = 'Private Provider SWFL';
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close chat');
    closeBtn.textContent = '×';
    header.appendChild(title);
    header.appendChild(closeBtn);
    win.appendChild(header);

    var messages = document.createElement('div');
    messages.className = 'ppc-messages';
    win.appendChild(messages);

    var inputBar = document.createElement('div');
    inputBar.className = 'ppc-input';
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your answer…';
    var sendBtn = document.createElement('button');
    sendBtn.type = 'button';
    sendBtn.textContent = 'Send';
    inputBar.appendChild(input);
    inputBar.appendChild(sendBtn);
    win.appendChild(inputBar);

    // Honeypot: real users never fill this; bots auto-filling hidden inputs do.
    var honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website_url';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.style.cssText = 'position:absolute;left:-9999px;height:0;opacity:0';
    win.appendChild(honeypot);

    var answers = {};
    var stepIndex = 0;
    var started = false;

    var steps = [
        {
            key: 'service',
            prompt: "Hi! I can get you a fast quote for plan review or inspections under Florida's Private Provider law (FS 553.791).\n\nWhat do you need?",
            choices: ['Plan Review', 'Building Inspections', 'Both', 'Not Sure — Need Guidance']
        },
        {
            key: 'jurisdiction',
            prompt: 'Which county or city will issue the permit?',
            choices: ['Lee County', 'Collier County', 'Charlotte County', 'Other / Not sure']
        },
        {
            key: 'parcel_or_tax_id',
            prompt: 'What is the project address (or parcel/tax ID)?'
        },
        {
            key: 'message',
            prompt: 'Briefly, what is the project? (e.g. "new single-family home", "pool + screen enclosure", "warehouse build-out")'
        },
        {
            key: 'name',
            prompt: 'Great — almost done. What is your name?'
        },
        {
            key: 'email',
            prompt: 'What email should the quote go to?',
            validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'That doesn’t look like an email address — mind re-typing it?'; }
        },
        {
            key: 'phone',
            prompt: 'And the best phone number?',
            validate: function (v) { return v.replace(/\D/g, '').length >= 7 || 'That doesn’t look like a phone number — mind re-typing it?'; }
        }
    ];

    function addMsg(text, who) {
        var div = document.createElement('div');
        div.className = 'ppc-msg ' + (who === 'user' ? 'ppc-user' : 'ppc-bot');
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showChoices(options) {
        var wrap = document.createElement('div');
        wrap.className = 'ppc-choices';
        options.forEach(function (opt) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = opt;
            b.addEventListener('click', function () {
                wrap.remove();
                handleAnswer(opt);
            });
            wrap.appendChild(b);
        });
        messages.appendChild(wrap);
        messages.scrollTop = messages.scrollHeight;
    }

    function ask() {
        var step = steps[stepIndex];
        addMsg(step.prompt, 'bot');
        if (step.choices) showChoices(step.choices);
    }

    function handleAnswer(value) {
        value = value.trim();
        if (!value) return;
        var step = steps[stepIndex];
        if (step.validate) {
            var ok = step.validate(value);
            if (ok !== true) {
                addMsg(value, 'user');
                addMsg(ok, 'bot');
                return;
            }
        }
        addMsg(value, 'user');
        answers[step.key] = value;
        stepIndex++;
        if (stepIndex < steps.length) {
            setTimeout(ask, 350);
        } else {
            submitLead();
        }
    }

    function submitLead() {
        if (honeypot.value) { addMsg('Thanks!', 'bot'); return; }
        addMsg('Sending your request…', 'bot');
        var payload = {
            _subject: 'Chatbot lead: ' + answers.name + ' — ' + answers.service,
            source: 'website chatbot',
            name: answers.name,
            email: answers.email,
            phone: answers.phone,
            jurisdiction: answers.jurisdiction,
            parcel_or_tax_id: answers.parcel_or_tax_id,
            service: answers.service,
            message: answers.message
        };
        fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (res) {
            if (res.ok) {
                addMsg('✅ Got it, ' + answers.name + '! Your request is in. We’ll review it and get back to you at ' + answers.email + ' — usually within one business day.', 'bot');
            } else {
                fallback();
            }
        }).catch(fallback);
    }

    function fallback() {
        addMsg('Hmm, something went wrong sending that. Please use the contact form below, or email service.privateproviderswfl@gmail.com — sorry about that!', 'bot');
    }

    launcher.addEventListener('click', function () {
        win.classList.toggle('ppc-open');
        if (win.classList.contains('ppc-open') && !started) {
            started = true;
            ask();
        }
        if (win.classList.contains('ppc-open')) input.focus();
    });
    closeBtn.addEventListener('click', function () { win.classList.remove('ppc-open'); });
    sendBtn.addEventListener('click', function () { handleAnswer(input.value); input.value = ''; });
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { handleAnswer(input.value); input.value = ''; }
    });
})();
