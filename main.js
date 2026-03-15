// main logic for the portfolio

'use strict';

// boot sequence lines
const BOOT_LINES = [
  { text: 'BIOS v2.4.1 – Faziluddin Systems Inc.', cls: 'dim', delay: 0 },
  { text: 'Checking memory ... {MEM} OK', cls: 'ok', delay: 80 },
  { text: 'Loading kernel image ... /boot/vmlinuz-6.7.0-fazi', cls: 'dim', delay: 160 },
  { text: '[    0.000000] Booting {OS} kernel 6.7.0-fazi #1 SMP PREEMPT', cls: 'dim', delay: 280 },
  { text: '[    0.012341] CPU: {CPU} cores @ 2.80GHz', cls: 'dim', delay: 360 },
  { text: '[    0.023100] PCI: Probing PCI hardware', cls: 'dim', delay: 440 },
  { text: '[    0.041200] ACPI: Power Button [PWRF]', cls: 'dim', delay: 510 },
  { text: '[    0.119800] NET: Registered PF_INET protocol family', cls: 'dim', delay: 570 },
  { text: '[    0.200000] Loading OpenGL drivers ... done', cls: 'ok', delay: 650 },
  { text: '[    0.231500] mmc0: SDHC card at address 0001', cls: 'dim', delay: 720 },
  { text: '[    0.315000] EXT4-fs: recovery complete', cls: 'ok', delay: 790 },
  { text: '[    0.400000] Mounting /proc ... done', cls: 'ok', delay: 860 },
  { text: '[    0.450000] Starting udev ... done', cls: 'ok', delay: 920 },
  { text: '[    0.512000] Loading portfolio modules ...', cls: 'info', delay: 1000 },
  { text: '[    0.523000]   ↳ module: graphing-calculator       [ LOADED ]', cls: 'ok', delay: 1080 },
  { text: '[    0.534000]   ↳ module: web-browser-c              [ LOADED ]', cls: 'ok', delay: 1150 },
  { text: '[    0.545000]   ↳ module: bloodlink-flutter          [ LOADED ]', cls: 'ok', delay: 1220 },
  { text: '[    0.556000]   ↳ module: embedded-systems           [ LOADED ]', cls: 'ok', delay: 1290 },
  { text: '[    0.601000] Checking network interfaces ... eth0: UP', cls: 'ok', delay: 1370 },
  { text: '[    0.637000] Connecting to github.com ... 200 OK', cls: 'ok', delay: 1450 },
  { text: '[    0.710000] Fetching repository metadata ...', cls: 'info', delay: 1520 },
  { text: '[    0.755000] Found 27 repositories across 7 languages', cls: 'bright', delay: 1600 },
  { text: '[    0.803000] Running diagnostics ...', cls: 'info', delay: 1680 },
  { text: '[    0.812000]   Code quality:    PASS', cls: 'ok', delay: 1740 },
  { text: '[    0.814000]   Sleep schedule:  FAIL  (expected)', cls: 'warn', delay: 1800 },
  { text: '[    0.816000]   Coffee supply:   CRITICAL', cls: 'warn', delay: 1860 },
  { text: '[    0.900000] All systems operational.', cls: 'ok', delay: 1940 },
  { text: '[    0.940000] Launching portfolio ...', cls: 'bright', delay: 2040 },
];

function getDeviceInfo() {
  const info = {
    os: 'Linux',
    cpu: navigator.hardwareConcurrency || 8,
    mem: (navigator.deviceMemory || 8) + 'GB'
  };

  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) info.os = 'Windows';
  else if (ua.includes('mac')) info.os = 'macOS';
  else if (ua.includes('android')) info.os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad')) info.os = 'iOS';

  return info;
}

function runBootScreen() {
  const screen = document.getElementById('boot-screen');
  if (!screen) return;

  const device = getDeviceInfo();
  const container = document.getElementById('boot-lines');
  let baseDelay = 300; // offset after DOM ready

  BOOT_LINES.forEach((line, i) => {
    let text = line.text
      .replace('{OS}', device.os)
      .replace('{CPU}', device.cpu)
      .replace('{MEM}', device.mem);

    const el = document.createElement('div');
    el.className = 'boot-line';
    el.innerHTML = `<span class="${line.cls}">${text}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('show');
    }, baseDelay + line.delay);
  });

  const totalTime = baseDelay + BOOT_LINES[BOOT_LINES.length - 1].delay + 600;

  setTimeout(() => {
    const promptEl = document.getElementById('boot-prompt');
    if (promptEl) {
      promptEl.style.opacity = '1';
      promptEl.style.transition = 'opacity 0.4s ease';
    }
  }, totalTime - 100);

  setTimeout(() => {
    screen.classList.add('done');
    setTimeout(() => {
      screen.style.display = 'none';
      document.body.style.overflow = '';
    }, 900);
  }, totalTime + 800);

  document.body.style.overflow = 'hidden';
}

// local project data and colors
const LANG_COLORS = {
  'C': { color: '#f0a500' },
  'C++': { color: '#00599c' },
  'Python': { color: '#5da8dc' },
  'JavaScript': { color: '#f1e05a' },
  'Dart': { color: '#00b4ab' },
  'MATLAB': { color: '#e66581' },
  'Processing': { color: '#0096d8' },
  'Other': { color: '#8b949e' },
};

const PROJECTS = [
  {
    name: 'graphing-calculator-cpp',
    desc: 'A graphing calculator in C++. It does implicit curves, polar plots, derivatives, and more. This has been a rabbit hole.',
    lang: 'C++', updated: '2 days ago',
    url: 'https://github.com/mashedpotato0/graphing-calculator-cpp',
  },
  {
    name: 'web-c',
    desc: 'Writing a web browser from scratch in C. No libraries, no shortcuts — just raw sockets, HTTP parsing, and a lot of pain.',
    lang: 'C', updated: '2 weeks ago',
    url: 'https://github.com/mashedpotato0/web-c',
    featured: true, status: 'wip',
    tags: ['Systems', 'Networking', 'C', 'Browser'],
    banner: 'linear-gradient(90deg, #f0a500, #f78166)',
  },
  {
    name: 'taskmanager-android',
    desc: 'Building an android task manager in C. Not the most traditional choice for building an android application, but it works.',
    lang: 'C', updated: 'Jan 31',
    url: 'https://github.com/mashedpotato0/taskmanager-android',
  },
  {
    name: 'taskmanager',
    desc: 'A simple task manager application, built in JavaScript from start to finish. Quick project, does the job.',
    lang: 'JavaScript', updated: 'Jan 30',
    url: 'https://github.com/mashedpotato0/taskmanager',
  },
  {
    name: 'bloodlink',
    desc: 'Flutter app that connects blood donors with recipients. Made this for an actual use case, not just to practice.',
    lang: 'Dart', updated: 'Oct 2025',
    url: 'https://github.com/mashedpotato0/bloodlink',
    featured: true, status: 'active',
    tags: ['Flutter', 'Dart', 'Mobile', 'Healthcare'],
    banner: 'linear-gradient(90deg, #00b4ab, #7ee8a2)',
  },
  {
    name: 'trading-bot',
    desc: 'Python bot to watch the market and make trades. Experimented with different algorithms.',
    lang: 'Python', updated: 'Jun 2025',
    url: 'https://github.com/mashedpotato0/trading-bot',
  },
  {
    name: 'sudoku',
    desc: 'Sudoku game made with JavaScript. Clean UI with different difficulty levels.',
    lang: 'JavaScript', updated: 'Jun 2025',
    url: 'https://github.com/mashedpotato0/sudoku',
  },
  {
    name: '2048',
    desc: '2048 in OpenGL. Wrote the rendering, animations, and game logic from scratch — no game engine.',
    lang: 'C++', updated: 'Jun 2025',
    url: 'https://github.com/mashedpotato0/2048',
    featured: true, status: 'active',
    tags: ['OpenGL', 'Game', 'C++'],
    banner: 'linear-gradient(90deg, #00599c, #d2a8ff)',
  },
  {
    name: 'maze',
    desc: 'Maze generator with OpenGL. Uses depth-first search algorithm. Everything is rendered real-time.',
    lang: 'C++', updated: 'Jun 2025',
    url: 'https://github.com/mashedpotato0/maze',
  },
  {
    name: 'scientific-calc',
    desc: 'Scientific calculator made with C. No big math libraries used. Good practice with parsing and math.',
    lang: 'C', updated: 'May 2025',
    url: 'https://github.com/mashedpotato0/scientific-calc',
  },
  {
    name: 'todo',
    desc: 'Todo list app with Python backend and SQLite database. Nothing too fancy, but good practice with databases.',
    lang: 'Python', updated: 'Mar 2025',
    url: 'https://github.com/mashedpotato0/todo',
  },
  {
    name: 'image-encryption-using-base54-matrix-transforms',
    desc: 'Image encryption with Base54 matrix transforms. A project I did with MATLAB on image processing.',
    lang: 'MATLAB', updated: 'Dec 2024',
    url: 'https://github.com/mashedpotato0/image-encryption-using-base54-matrix-transforms',
  },
  {
    name: 'rubicscube_solver',
    desc: 'Rubik\'s cube solver with 3D JavaScript. Solves the cube by layer.',
    lang: 'JavaScript', updated: 'Sep 2024',
    url: 'https://github.com/mashedpotato0/rubicscube_solver',
  },
  {
    name: 'double-pendulum',
    desc: 'Double pendulum simulation. Chaos theory is freaky stuff.',
    lang: 'JavaScript', updated: 'Aug 2024',
    url: 'https://github.com/mashedpotato0/double-pendulum',
  },
  {
    name: 'Mandelbrot-set',
    desc: 'Mandelbrot set explorer with Processing. You can zoom in as much as you like. Never gets boring.',
    lang: 'Processing', updated: 'Jul 2024',
    url: 'https://github.com/mashedpotato0/Mandelbrot-set',
  },
  {
    name: 'flowfields',
    desc: 'Flow fields with Processing. Particle simulation with thousands of particles.',
    lang: 'Processing', updated: 'Jul 2024',
    url: 'https://github.com/mashedpotato0/flowfields',
  },
  {
    name: 'EMBEDDED-COURSE-FOR-HEARTRATEMONITOR',
    desc: 'A microcontroller-based heart rate monitor. A C++ program for an embedded systems course.',
    lang: 'C++', updated: 'Oct 2023',
    url: 'https://github.com/mashedpotato0/EMBEDDED-COURSE-FOR-HEARTRATEMONITOR',
  },
];

// icons for skills and project categories
const SKILL_ICONS = {
  'C': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-5.2261.034-8.1602-2.97-2.938-3.0101-3.436-5.9302-3.436-8.8002 0-2.8701.556-6.6702 4.047-9.5502C7.444.72 9.849 0 12.254 0c10.0422 0 10.7172 9.2602 10.7172 9.2602z"/></svg>`,
  'C++': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/></svg>`,
  'Python': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>`,
  'JavaScript': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>`,
  'Dart / Flutter': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/></svg>`,
  'OpenGL': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.607 13.88c1.32 1.197 3.862 2.008 6.781 2.008 2.375 0 4.503-.481 5.923-1.325-1.555 1.413-4.328 2.41-7.495 2.41C3.947 16.972 0 14.745 0 11.999c0-2.747 3.948-4.973 8.818-4.972 3.179.001 5.96 1.001 7.511 2.425-1.421-.85-3.558-1.34-5.941-1.34-2.828 0-5.303.761-6.655 1.897.01-.004.019-.008.028-.013.253-.119.548-.179.885-.179.336 0 .631.06.885.179.253.12.465.28.635.48.171.201.298.431.383.691.086.26.128.531.128.812 0 .282-.042.553-.128.813-.085.26-.212.49-.383.691-.17.2-.382.359-.635.477-.254.117-.549.176-.885.176-.337 0-.632-.059-.885-.176a2.2 2.2 0 0 1-.154-.08"/></svg>`,
  'MATLAB': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.323 16.248C3.13 15.354 1.64 14.31 0 13.118l5.814-2.236 2.385 1.789c-1.789 2.087-2.981 2.832-3.876 3.578zm15.95-6.26c-.447-1.193-.745-2.385-1.193-3.578-.447-1.342-.894-2.534-1.64-3.578-.298-.447-.894-1.491-1.64-1.491-.149 0-.298.149-.447.149-.447.149-1.043 1.043-1.193 1.64-.447.745-1.342 1.938-1.938 2.683-.149.298-.447.596-.596.745-.447.298-.894.745-1.491 1.043-.149 0-.298.149-.447.149-.447 0-.745.298-1.043.447-.447.447-.894 1.043-1.342 1.491 0 .149-.149.298-.298.447l2.236 1.64c1.64-1.938 3.578-3.876 4.919-7.602 0 0-.447 4.025-4.025 8.348-2.236 2.534-4.025 3.876-4.323 4.174 0 0 .596-.149 1.193.149 1.193.447 1.789 2.087 2.236 3.279.298.894.745 1.64 1.043 2.534 1.193-.298 1.938-.745 2.683-1.491s1.491-1.64 2.236-2.385c1.342-1.64 2.981-3.727 5.068-2.683.298.149.745.447.894.596.447.298.745.596 1.193 1.043.745.596 1.043 1.043 1.64 1.342-1.491-2.981-2.534-5.963-3.727-9.093z"/></svg>`,
  'Processing': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13h2v10h-2zm4 0h1a2 2 0 0 1 0 4h-1z"/></svg>`,
  'SQL': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698z"/></svg>`,
  'Deep Learning': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 6.5 10 10M14 10l4-3.5M6 17.5 10 14M14 14l4 3.5"/></svg>`,
  'Embedded Systems': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="14" height="14" rx="1"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>`,
  'Linux': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.39.605C10.376 3.092 9.764 4.72 8.635 7.132c.693.734 1.543 1.589 2.923 2.554-1.484-.61-2.496-1.224-3.252-1.86C6.86 10.842 4.596 15.138 0 23.395c3.612-2.085 6.412-3.37 9.021-3.862a6.61 6.61 0 01-.171-1.547l.003-.115c.058-2.315 1.261-4.095 2.687-3.973 1.426.12 2.534 2.096 2.478 4.409a6.52 6.52 0 01-.146 1.243c2.58.505 5.352 1.787 8.914 3.844-.702-1.293-1.33-2.459-1.929-3.57-.943-.73-1.926-1.682-3.933-2.713 1.38.359 2.367.772 3.137 1.234-6.09-11.334-6.582-12.84-8.67-17.74z"/></svg>`,
};

const PROJECT_ICONS = {
  game: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
  calc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /></svg>`,
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>`,
  bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M12 8V4H8" /><path d="M9 13v2" /><path d="M15 13v2" /></svg>`,
  blood: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>`,
  fractal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 21-3-6h-4" /><path d="m17 3-3 6 1.5 3" /><path d="M22 12h-6.5L14 15" /><path d="m7 3 3 6h4" /></svg>`,
  puzzle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.618 5.984A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 0 0-.382-3.016z"/></svg>`,
  embed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="14" height="14" rx="1"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>`,
  mobile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 5h8" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="m3 17 2 2 4-4" /><rect x="3" y="4" width="6" height="6" rx="1" /></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
};

const SKILLS = [
  { name: 'C', level: 'Advanced', pct: 88, c1: '#f0a500', c2: '#f78166' },
  { name: 'C++', level: 'Advanced', pct: 85, c1: '#00599c', c2: '#58a6ff' },
  { name: 'Python', level: 'Intermediate', pct: 78, c1: '#3572a5', c2: '#7ee8a2' },
  { name: 'JavaScript', level: 'Intermediate', pct: 72, c1: '#f1e05a', c2: '#f0a500' },
  { name: 'Dart / Flutter', level: 'Intermediate', pct: 65, c1: '#00b4ab', c2: '#7ee8a2' },
  { name: 'OpenGL', level: 'Intermediate', pct: 70, c1: '#5da8dc', c2: '#d2a8ff' },
  { name: 'MATLAB', level: 'Basic', pct: 50, c1: '#e66581', c2: '#f0a500' },
  { name: 'Processing', level: 'Intermediate', pct: 60, c1: '#0096d8', c2: '#58a6ff' },
  { name: 'SQL', level: 'Basic', pct: 55, c1: '#7ee8a2', c2: '#00b4ab' },
  { name: 'Deep Learning', level: 'Learning', pct: 40, c1: '#d2a8ff', c2: '#f78166' },
  { name: 'Embedded Systems', level: 'Intermediate', pct: 65, c1: '#f0a500', c2: '#e66581' },
  { name: 'Linux', level: 'Advanced', pct: 82, c1: '#8b949e', c2: '#58a6ff' },
];

// helper to pick the right icon for a project
function getProjectIconSVG(p) {
  const nm = p.name.toLowerCase();

  // High priority / Specific categories
  if (nm.includes('2048') || nm.includes('game') || nm.includes('maze') || nm.includes('sudoku')) return PROJECT_ICONS.game;
  if (nm.includes('android')) return PROJECT_ICONS.mobile;
  if (nm.includes('task') || nm.includes('todo')) return PROJECT_ICONS.list;
  if (nm.includes('rubic')) return PROJECT_ICONS.box;
  if (nm.includes('calc') || nm.includes('math')) return PROJECT_ICONS.calc;
  if (nm.includes('blood')) return PROJECT_ICONS.blood;

  // Tech categories
  if (nm.includes('web')) return PROJECT_ICONS.web;
  if (nm.includes('bot') || nm.includes('trading')) return PROJECT_ICONS.bot;
  if (nm.includes('mandelbrot') || nm.includes('flow') || nm.includes('pendulum') || nm.includes('fractal')) return PROJECT_ICONS.fractal;
  if (nm.includes('embed') || nm.includes('heart')) return PROJECT_ICONS.embed;
  if (nm.includes('encrypt') || nm.includes('lock') || nm.includes('image')) return PROJECT_ICONS.lock;
  if (nm.includes('graph') || nm.includes('chart')) return PROJECT_ICONS.chart;

  return PROJECT_ICONS.code;
}

// background particle effect for hero section
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = 60;
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    });
  }

  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(88,166,255,${p.alpha})`;
      ctx.fill();
    }
    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(88,166,255,${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// render skills grid from data
function buildSkills() {
  const sg = document.getElementById('skills-grid');
  if (!sg) return;
  SKILLS.forEach(s => {
    const svgIcon = SKILL_ICONS[s.name] || SKILL_ICONS['Linux'];
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.cssText = `--s-c1:${s.c1};--s-c2:${s.c2}`;
    card.innerHTML = `
      <div class="skill-icon" style="color:${s.c1}">${svgIcon}</div>
      <div>
        <div class="skill-name">${s.name}</div>
        <div class="skill-level">${s.level}</div>
      </div>
      <div class="skill-bar"><div class="skill-bar-fill" data-pct="${s.pct}"></div></div>`;
    sg.appendChild(card);
  });
}

// render featured projects section
function buildFeatured() {
  const fg = document.getElementById('featured-grid');
  if (!fg) return;
  PROJECTS.filter(p => p.featured).forEach(p => {
    const div = document.createElement('div');
    div.className = 'featured-card';
    div.innerHTML = `
      <div class="featured-banner" style="background:${p.banner}"></div>
      <div class="featured-body">
        <div class="featured-badge ${p.status === 'active' ? 'active' : 'wip'}">
          ${p.status === 'active' ? '● Active' : '⚡ In Progress'}
        </div>
        <div class="featured-name">${p.name}</div>
        <div class="featured-desc">${p.desc}</div>
        <div class="featured-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <a href="${p.url}" target="_blank" class="featured-link">View on GitHub <span>→</span></a>
      </div>`;
    fg.appendChild(div);
  });
}

// all projects grid with filtering logic
let activeFilter = 'All';

function buildFilters() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;
  const langs = ['All', ...Object.keys(LANG_COLORS)];
  bar.innerHTML = '';
  langs.forEach(lang => {
    const count = lang === 'All'
      ? PROJECTS.length
      : PROJECTS.filter(p => p.lang === lang).length;
    if (count === 0) return;
    const lc = LANG_COLORS[lang];
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (lang === activeFilter ? ' active' : '');
    btn.innerHTML = lang !== 'All'
      ? `<span class="lang-dot" style="background:${lc.color}"></span>${lang} (${count})`
      : `All (${count})`;
    btn.addEventListener('click', () => {
      activeFilter = lang;
      buildFilters();
      filterProjects();
    });
    bar.appendChild(btn);
  });
}

function filterProjects() {
  document.querySelectorAll('.project-card').forEach(card => {
    const hidden = activeFilter !== 'All' && card.dataset.lang !== activeFilter;
    card.classList.toggle('hidden', hidden);
  });
}

function buildProjects() {
  const pg = document.getElementById('projects-grid');
  if (!pg) return;
  pg.innerHTML = '';
  PROJECTS.forEach((p, i) => {
    const lc = LANG_COLORS[p.lang] || LANG_COLORS['Other'];
    const icon = getProjectIconSVG(p);
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.lang = p.lang;
    card.dataset.projectName = p.name;
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <div class="project-header">
        <span class="project-icon">${icon}</span>
        <div class="project-links">
          <a href="${p.url}" target="_blank" class="proj-link" data-tip="GitHub" aria-label="GitHub">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          </a>
        </div>
      </div>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-footer">
        <span class="lang-badge">
          <span class="lang-dot" style="background:${lc.color}"></span>${p.lang}
        </span>
        <span class="project-updated">${p.updated}</span>
      </div>
      <div class="card-demo" aria-hidden="true">
        <div class="card-demo-inner">
          <div class="card-demo-label">DEMO</div>
          <div class="card-demo-scanlines"></div>
        </div>
      </div>`;
    pg.appendChild(card);
  });
}

// search for demo assets in the background
// All candidate filenames to probe for, in priority order.
// Add more names here if you use a different naming convention.
const DEMO_CANDIDATES = [
  { name: 'demo.mp4', isVideo: true },
  { name: 'demo.webm', isVideo: true },
  { name: 'polar_demo.gif', isVideo: false },
  { name: 'demo.gif', isVideo: false },
  { name: 'derivative_demo.png', isVideo: false },
  { name: 'demo.png', isVideo: false },
  { name: 'demo.jpg', isVideo: false },
];
const _demoCache = {}; // projectName -> { type, url } | null

async function probeDemo(name) {
  if (name in _demoCache) return _demoCache[name];
  const dir = `assets/${encodeURIComponent(name)}`;
  for (const { name: fname, isVideo } of DEMO_CANDIDATES) {
    const url = `${dir}/${fname}`;
    try {
      const r = await fetch(url, { method: 'HEAD' });
      if (r.ok) {
        _demoCache[name] = { type: isVideo ? 'video' : 'image', url };
        return _demoCache[name];
      }
    } catch { /* 404 or network – try next */ }
  }
  _demoCache[name] = null;
  return null;
}

function injectMedia(slot, asset) {
  const inner = slot.querySelector('.card-demo-inner');
  if (!inner || !asset) return;
  inner.querySelectorAll('video,img').forEach(el => el.remove());
  let el;
  if (asset.type === 'video') {
    el = document.createElement('video');
    el.src = asset.url;
    el.autoplay = true;
    el.loop = true;
    el.muted = true;
    el.playsInline = true;
    el.className = 'card-demo-media';
  } else {
    el = document.createElement('img');
    el.src = asset.url;
    el.alt = 'demo';
    el.className = 'card-demo-media';
  }
  inner.appendChild(el);
}

function initDemoAssets() {
  document.querySelectorAll('.project-card[data-project-name]').forEach(card => {
    const name = card.dataset.projectName;
    const slot = card.querySelector('.card-demo');
    if (!slot) return;
    let loaded = false;

    const loadAsset = async () => {
      if (loaded) return;
      loaded = true;
      const asset = await probeDemo(name);
      if (asset) injectMedia(slot, asset);
      else slot.style.display = 'none'; // no demo available – keep hidden
    };

    card.addEventListener('mouseenter', loadAsset, { passive: true });
    card.addEventListener('touchstart', loadAsset, { passive: true });
  });
}

// scroll animations handler
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      // animate skill bars
      entry.target.querySelectorAll('.skill-bar-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
}

// navbar scroll state handler
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// custom cursor glow effect tracking
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// stats counter animation logic
function animateCounter(el, target) {
  let current = 0;
  const inc = target / 42;
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 28);
}

function initCounters() {
  const el = document.getElementById('stat-repos');
  if (!el) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(el, 27); obs.disconnect(); }
    });
  });
  obs.observe(el);
}

// tabs for the magnum opus section
function opusTab(btn, targetId) {
  const area = document.getElementById('opus-canvas-area');
  if (!area) return;
  area.querySelectorAll('.opus-demo-panel').forEach(p => p.style.display = 'none');
  area.querySelectorAll('.opus-tab').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(targetId);
  if (panel) panel.style.display = '';
  btn.classList.add('active');
}

// start everything on load
document.addEventListener('DOMContentLoaded', () => {
  runBootScreen();
  buildSkills();
  buildFeatured();
  buildFilters();
  buildProjects();
  initReveal();
  initNavbar();
  initCursorGlow();
  initCounters();
  initHeroParticles();
  initDemoAssets();
});
