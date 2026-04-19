/* ═══════════════════════════════════════════════════════════
 *  LANGUAGE REGISTRY — All supported languages
 * ═══════════════════════════════════════════════════════════ */

/**
 * Each entry: { id, label, ext, monacoLang, ocLang, defaultFile, icon?, category }
 *   id         — internal key (lowercase, unique)
 *   label      — display name
 *   ext        — primary file extension (without dot)
 *   monacoLang — Monaco editor language identifier
 *   ocLang     — OneCompiler API language ID
 *   defaultFile— default filename for execution
 *   category   — 'programming' | 'web' | 'database'
 *   color      — brand colour for icon badge
 */
export const ALL_LANGUAGES = [
  // ── Programming Languages ──────────────────────────────────
  { id: 'python',       label: 'Python',       ext: 'py',    monacoLang: 'python',      ocLang: 'python',       defaultFile: 'main.py',        category: 'programming', color: '#3776AB' },
  { id: 'java',         label: 'Java',         ext: 'java',  monacoLang: 'java',        ocLang: 'java',         defaultFile: 'Main.java',      category: 'programming', color: '#E76F00' },
  { id: 'c',            label: 'C',            ext: 'c',     monacoLang: 'c',           ocLang: 'c',            defaultFile: 'main.c',         category: 'programming', color: '#A8B9CC' },
  { id: 'cpp',          label: 'C++',          ext: 'cpp',   monacoLang: 'cpp',         ocLang: 'cpp',          defaultFile: 'main.cpp',       category: 'programming', color: '#659AD2' },
  { id: 'javascript',   label: 'JavaScript',   ext: 'js',    monacoLang: 'javascript',  ocLang: 'nodejs',       defaultFile: 'index.js',       category: 'programming', color: '#F7DF1E' },
  { id: 'lua',          label: 'Lua',          ext: 'lua',   monacoLang: 'lua',         ocLang: 'lua',          defaultFile: 'main.lua',       category: 'programming', color: '#000080' },
  { id: 'php',          label: 'PHP',          ext: 'php',   monacoLang: 'php',         ocLang: 'php',          defaultFile: 'index.php',      category: 'programming', color: '#777BB4' },
  { id: 'nodejs',       label: 'NodeJS',       ext: 'js',    monacoLang: 'javascript',  ocLang: 'nodejs',       defaultFile: 'index.js',       category: 'programming', color: '#68A063' },
  { id: 'csharp',       label: 'C#',           ext: 'cs',    monacoLang: 'csharp',      ocLang: 'csharp',       defaultFile: 'Program.cs',     category: 'programming', color: '#239120' },
  { id: 'assembly',     label: 'Assembly',     ext: 'asm',   monacoLang: 'plaintext',   ocLang: 'assembly',     defaultFile: 'main.asm',       category: 'programming', color: '#6E4C13' },
  { id: 'bash',         label: 'Bash',         ext: 'sh',    monacoLang: 'shell',       ocLang: 'bash',         defaultFile: 'script.sh',      category: 'programming', color: '#4EAA25' },
  { id: 'vbnet',        label: 'VB.NET',       ext: 'vb',    monacoLang: 'vb',          ocLang: 'vb',           defaultFile: 'main.vb',        category: 'programming', color: '#00539C' },
  { id: 'kotlin',       label: 'Kotlin',       ext: 'kt',    monacoLang: 'kotlin',      ocLang: 'kotlin',       defaultFile: 'main.kt',        category: 'programming', color: '#7F52FF' },
  { id: 'pascal',       label: 'Pascal',       ext: 'pas',   monacoLang: 'pascal',      ocLang: 'pascal',       defaultFile: 'main.pas',       category: 'programming', color: '#E3F171' },
  { id: 'ruby',         label: 'Ruby',         ext: 'rb',    monacoLang: 'ruby',        ocLang: 'ruby',         defaultFile: 'main.rb',        category: 'programming', color: '#CC342D' },
  { id: 'groovy',       label: 'Groovy',       ext: 'groovy',monacoLang: 'plaintext',   ocLang: 'groovy',       defaultFile: 'main.groovy',    category: 'programming', color: '#4298B8' },
  { id: 'scala',        label: 'Scala',        ext: 'scala', monacoLang: 'scala',       ocLang: 'scala',        defaultFile: 'Main.scala',     category: 'programming', color: '#DC322F' },
  { id: 'prolog',       label: 'Prolog',       ext: 'pl',    monacoLang: 'plaintext',   ocLang: 'prolog',       defaultFile: 'main.pl',        category: 'programming', color: '#E61B23' },
  { id: 'tcl',          label: 'Tcl',          ext: 'tcl',   monacoLang: 'tcl',         ocLang: 'tcl',          defaultFile: 'main.tcl',       category: 'programming', color: '#E2781D' },
  { id: 'typescript',   label: 'TypeScript',   ext: 'ts',    monacoLang: 'typescript',  ocLang: 'typescript',   defaultFile: 'index.ts',       category: 'programming', color: '#3178C6' },
  { id: 'jshell',       label: 'JShell',       ext: 'jsh',   monacoLang: 'java',        ocLang: 'jshell',       defaultFile: 'main.jsh',       category: 'programming', color: '#5382A1' },
  { id: 'haskell',      label: 'Haskell',      ext: 'hs',    monacoLang: 'haskell',     ocLang: 'haskell',      defaultFile: 'main.hs',        category: 'programming', color: '#5E5086' },
  { id: 'ada',          label: 'Ada',          ext: 'adb',   monacoLang: 'plaintext',   ocLang: 'ada',          defaultFile: 'main.adb',       category: 'programming', color: '#02F88C' },
  { id: 'commonlisp',   label: 'Common Lisp',  ext: 'lisp',  monacoLang: 'plaintext',   ocLang: 'commonlisp',   defaultFile: 'main.lisp',      category: 'programming', color: '#3FB68B' },
  { id: 'd',            label: 'D',            ext: 'd',     monacoLang: 'plaintext',   ocLang: 'd',            defaultFile: 'main.d',         category: 'programming', color: '#B03931' },
  { id: 'elixir',       label: 'Elixir',       ext: 'exs',   monacoLang: 'elixir',      ocLang: 'elixir',       defaultFile: 'main.exs',       category: 'programming', color: '#6E4A7E' },
  { id: 'erlang',       label: 'Erlang',       ext: 'erl',   monacoLang: 'plaintext',   ocLang: 'erlang',       defaultFile: 'main.erl',       category: 'programming', color: '#A90533' },
  { id: 'fsharp',       label: 'F#',           ext: 'fs',    monacoLang: 'fsharp',      ocLang: 'fsharp',       defaultFile: 'main.fs',        category: 'programming', color: '#378BBA' },
  { id: 'fortran',      label: 'Fortran',      ext: 'f90',   monacoLang: 'fortran',     ocLang: 'fortran',      defaultFile: 'main.f90',       category: 'programming', color: '#734F96' },
  { id: 'python2',      label: 'Python 2',     ext: 'py',    monacoLang: 'python',      ocLang: 'python2',      defaultFile: 'main.py',        category: 'programming', color: '#FFD43B' },
  { id: 'perl',         label: 'Perl',         ext: 'pl',    monacoLang: 'perl',        ocLang: 'perl',         defaultFile: 'main.pl',        category: 'programming', color: '#39457E' },
  { id: 'go',           label: 'Go',           ext: 'go',    monacoLang: 'go',          ocLang: 'go',           defaultFile: 'main.go',        category: 'programming', color: '#00ADD8' },
  { id: 'r',            label: 'R',            ext: 'r',     monacoLang: 'r',           ocLang: 'r',            defaultFile: 'main.r',         category: 'programming', color: '#276DC3' },
  { id: 'racket',       label: 'Racket',       ext: 'rkt',   monacoLang: 'plaintext',   ocLang: 'racket',       defaultFile: 'main.rkt',       category: 'programming', color: '#9F1D20' },
  { id: 'ocaml',        label: 'OCaml',        ext: 'ml',    monacoLang: 'plaintext',   ocLang: 'ocaml',        defaultFile: 'main.ml',        category: 'programming', color: '#EC6813' },
  { id: 'basic',        label: 'Basic',        ext: 'bas',   monacoLang: 'plaintext',   ocLang: 'basic',        defaultFile: 'main.bas',       category: 'programming', color: '#2A6496' },
  { id: 'sh',           label: 'Shell Script', ext: 'sh',    monacoLang: 'shell',       ocLang: 'sh',           defaultFile: 'script.sh',      category: 'programming', color: '#89E051' },
  { id: 'clojure',      label: 'Clojure',      ext: 'clj',   monacoLang: 'clojure',     ocLang: 'clojure',      defaultFile: 'main.clj',       category: 'programming', color: '#5881D8' },
  { id: 'cobol',        label: 'COBOL',        ext: 'cob',   monacoLang: 'plaintext',   ocLang: 'cobol',        defaultFile: 'main.cob',       category: 'programming', color: '#005CA5' },
  { id: 'rust',         label: 'Rust',         ext: 'rs',    monacoLang: 'rust',        ocLang: 'rust',         defaultFile: 'main.rs',        category: 'programming', color: '#CE422B' },
  { id: 'swift',        label: 'Swift',        ext: 'swift', monacoLang: 'swift',       ocLang: 'swift',        defaultFile: 'main.swift',     category: 'programming', color: '#F05138' },
  { id: 'objectivec',   label: 'Objective-C',  ext: 'm',     monacoLang: 'objective-c', ocLang: 'objc',         defaultFile: 'main.m',         category: 'programming', color: '#438EFF' },
  { id: 'octave',       label: 'Octave',       ext: 'm',     monacoLang: 'plaintext',   ocLang: 'octave',       defaultFile: 'main.m',         category: 'programming', color: '#0790C0' },
  { id: 'text',         label: 'Text',         ext: 'txt',   monacoLang: 'plaintext',   ocLang: 'text',         defaultFile: 'file.txt',       category: 'programming', color: '#6B7280' },
  { id: 'brainfk',      label: 'BrainFK',      ext: 'bf',    monacoLang: 'plaintext',   ocLang: 'brainfuck',    defaultFile: 'main.bf',        category: 'programming', color: '#F0DB4F' },
  { id: 'coffeescript', label: 'CoffeeScript', ext: 'coffee',monacoLang: 'coffeescript',ocLang: 'coffeescript',  defaultFile: 'main.coffee',    category: 'programming', color: '#28334C' },
  { id: 'ejs',          label: 'EJS',          ext: 'ejs',   monacoLang: 'html',        ocLang: 'ejs',          defaultFile: 'index.ejs',      category: 'programming', color: '#A91E50' },
  { id: 'dart',         label: 'Dart',         ext: 'dart',  monacoLang: 'dart',        ocLang: 'dart',         defaultFile: 'main.dart',      category: 'programming', color: '#0175C2' },
  { id: 'deno',         label: 'Deno',         ext: 'ts',    monacoLang: 'typescript',  ocLang: 'deno',         defaultFile: 'main.ts',        category: 'programming', color: '#000000' },
  { id: 'bun',          label: 'Bun',          ext: 'ts',    monacoLang: 'typescript',  ocLang: 'bun',          defaultFile: 'main.ts',        category: 'programming', color: '#FBF0DF' },
  { id: 'crystal',      label: 'Crystal',      ext: 'cr',    monacoLang: 'plaintext',   ocLang: 'crystal',      defaultFile: 'main.cr',        category: 'programming', color: '#000000' },
  { id: 'julia',        label: 'Julia',        ext: 'jl',    monacoLang: 'julia',       ocLang: 'julia',        defaultFile: 'main.jl',        category: 'programming', color: '#9558B2' },
  { id: 'zig',          label: 'Zig',          ext: 'zig',   monacoLang: 'plaintext',   ocLang: 'zig',          defaultFile: 'main.zig',       category: 'programming', color: '#F7A41D' },
  { id: 'awk',          label: 'AWK',          ext: 'awk',   monacoLang: 'plaintext',   ocLang: 'awk',          defaultFile: 'main.awk',       category: 'programming', color: '#4B6C88' },
  { id: 'ispc',         label: 'ISPC',         ext: 'ispc',  monacoLang: 'plaintext',   ocLang: 'ispc',         defaultFile: 'main.ispc',      category: 'programming', color: '#4B8BBE' },
  { id: 'smalltalk',    label: 'Smalltalk',    ext: 'st',    monacoLang: 'plaintext',   ocLang: 'smalltalk',    defaultFile: 'main.st',        category: 'programming', color: '#596706' },
  { id: 'nim',          label: 'Nim',          ext: 'nim',   monacoLang: 'plaintext',   ocLang: 'nim',          defaultFile: 'main.nim',       category: 'programming', color: '#FFE953' },
  { id: 'scheme',       label: 'Scheme',       ext: 'scm',   monacoLang: 'scheme',      ocLang: 'scheme',       defaultFile: 'main.scm',       category: 'programming', color: '#1E4AEC' },
  { id: 'j',            label: 'J',            ext: 'ijs',   monacoLang: 'plaintext',   ocLang: 'j',            defaultFile: 'main.ijs',       category: 'programming', color: '#9EEDFF' },
  { id: 'vlang',        label: 'V',            ext: 'v',     monacoLang: 'plaintext',   ocLang: 'v',            defaultFile: 'main.v',         category: 'programming', color: '#5D87BF' },
  { id: 'raku',         label: 'Raku',         ext: 'raku',  monacoLang: 'plaintext',   ocLang: 'raku',         defaultFile: 'main.raku',      category: 'programming', color: '#0298D6' },
  { id: 'verilog',      label: 'Verilog',      ext: 'v',     monacoLang: 'plaintext',   ocLang: 'verilog',      defaultFile: 'main.v',         category: 'programming', color: '#B2B7F8' },
  { id: 'haxe',         label: 'Haxe',         ext: 'hx',    monacoLang: 'plaintext',   ocLang: 'haxe',         defaultFile: 'Main.hx',        category: 'programming', color: '#EA8220' },
  { id: 'forth',        label: 'Forth',        ext: 'fth',   monacoLang: 'plaintext',   ocLang: 'forth',        defaultFile: 'main.fth',       category: 'programming', color: '#1E573E' },
  { id: 'icon',         label: 'Icon',         ext: 'icn',   monacoLang: 'plaintext',   ocLang: 'icon',         defaultFile: 'main.icn',       category: 'programming', color: '#1C1C1C' },
  { id: 'odin',         label: 'Odin',         ext: 'odin',  monacoLang: 'plaintext',   ocLang: 'odin',         defaultFile: 'main.odin',      category: 'programming', color: '#60B5CC' },

  // ── Web Languages ──────────────────────────────────────────
  { id: 'html',         label: 'HTML',         ext: 'html',  monacoLang: 'html',        ocLang: 'html',         defaultFile: 'index.html',     category: 'web', color: '#E44D26' },
  { id: 'react',        label: 'React',        ext: 'jsx',   monacoLang: 'javascript',  ocLang: 'react',        defaultFile: 'App.jsx',        category: 'web', color: '#61DAFB' },
  { id: 'vue',          label: 'Vue',          ext: 'vue',   monacoLang: 'html',        ocLang: 'vue',          defaultFile: 'App.vue',        category: 'web', color: '#4FC08D' },
  { id: 'angular',      label: 'Angular',      ext: 'ts',    monacoLang: 'typescript',  ocLang: 'angular',      defaultFile: 'main.ts',        category: 'web', color: '#DD0031' },
  { id: 'materialize',  label: 'Materialize',  ext: 'html',  monacoLang: 'html',        ocLang: 'materialize',  defaultFile: 'index.html',     category: 'web', color: '#EB7077' },
  { id: 'bootstrap',    label: 'Bootstrap',    ext: 'html',  monacoLang: 'html',        ocLang: 'bootstrap',    defaultFile: 'index.html',     category: 'web', color: '#7952B3' },
  { id: 'tailwindcss',  label: 'Tailwind CSS', ext: 'html',  monacoLang: 'html',        ocLang: 'tailwindcss',  defaultFile: 'index.html',     category: 'web', color: '#06B6D4' },
  { id: 'htmx',         label: 'HTMX',         ext: 'html',  monacoLang: 'html',        ocLang: 'htmx',         defaultFile: 'index.html',     category: 'web', color: '#3366CC' },
  { id: 'alpinejs',     label: 'Alpine.js',    ext: 'html',  monacoLang: 'html',        ocLang: 'alpinejs',     defaultFile: 'index.html',     category: 'web', color: '#8BC0D0' },
  { id: 'chartjs',      label: 'Chart.js',     ext: 'html',  monacoLang: 'html',        ocLang: 'chartjs',      defaultFile: 'index.html',     category: 'web', color: '#FF6384' },
  { id: 'd3js',         label: 'D3.js',        ext: 'html',  monacoLang: 'html',        ocLang: 'd3js',         defaultFile: 'index.html',     category: 'web', color: '#F9A03C' },
  { id: 'jquery',       label: 'jQuery',       ext: 'html',  monacoLang: 'html',        ocLang: 'jquery',       defaultFile: 'index.html',     category: 'web', color: '#0769AD' },
  { id: 'foundation',   label: 'Foundation',   ext: 'html',  monacoLang: 'html',        ocLang: 'foundation',   defaultFile: 'index.html',     category: 'web', color: '#14679E' },
  { id: 'bulma',        label: 'Bulma',        ext: 'html',  monacoLang: 'html',        ocLang: 'bulma',        defaultFile: 'index.html',     category: 'web', color: '#00D1B2' },
  { id: 'uikit',        label: 'UIkit',        ext: 'html',  monacoLang: 'html',        ocLang: 'uikit',        defaultFile: 'index.html',     category: 'web', color: '#2396F3' },
  { id: 'semanticui',   label: 'Semantic UI',  ext: 'html',  monacoLang: 'html',        ocLang: 'semanticui',   defaultFile: 'index.html',     category: 'web', color: '#35BDB2' },
  { id: 'skeleton',     label: 'Skeleton',     ext: 'html',  monacoLang: 'html',        ocLang: 'skeleton',     defaultFile: 'index.html',     category: 'web', color: '#333333' },
  { id: 'milligram',    label: 'Milligram',    ext: 'html',  monacoLang: 'html',        ocLang: 'milligram',    defaultFile: 'index.html',     category: 'web', color: '#A25BCC' },
  { id: 'papercss',     label: 'PaperCSS',     ext: 'html',  monacoLang: 'html',        ocLang: 'papercss',     defaultFile: 'index.html',     category: 'web', color: '#41403E' },
  { id: 'backbonejs',   label: 'BackboneJS',   ext: 'html',  monacoLang: 'html',        ocLang: 'backbonejs',   defaultFile: 'index.html',     category: 'web', color: '#002A41' },

  // ── Database Languages ─────────────────────────────────────
  { id: 'mysql',           label: 'MySQL',           ext: 'sql', monacoLang: 'sql', ocLang: 'mysql',        defaultFile: 'query.sql', category: 'database', color: '#4479A1' },
  { id: 'oracle',          label: 'Oracle DB',       ext: 'sql', monacoLang: 'sql', ocLang: 'oracle',       defaultFile: 'query.sql', category: 'database', color: '#F80000' },
  { id: 'postgresql',      label: 'PostgreSQL',      ext: 'sql', monacoLang: 'sql', ocLang: 'postgresql',   defaultFile: 'query.sql', category: 'database', color: '#336791' },
  { id: 'mongodb',         label: 'MongoDB',         ext: 'js',  monacoLang: 'javascript', ocLang: 'mongodb',defaultFile: 'query.js',  category: 'database', color: '#47A248' },
  { id: 'sqlite',          label: 'SQLite',          ext: 'sql', monacoLang: 'sql', ocLang: 'sqlite',       defaultFile: 'query.sql', category: 'database', color: '#003B57' },
  { id: 'redis',           label: 'Redis',           ext: 'txt', monacoLang: 'plaintext', ocLang: 'redis',   defaultFile: 'commands.txt', category: 'database', color: '#DC382D' },
  { id: 'mariadb',         label: 'MariaDB',         ext: 'sql', monacoLang: 'sql', ocLang: 'mariadb',      defaultFile: 'query.sql', category: 'database', color: '#003545' },
  { id: 'plsql',           label: 'Oracle PL/SQL',   ext: 'sql', monacoLang: 'sql', ocLang: 'plsql',        defaultFile: 'query.sql', category: 'database', color: '#F80000' },
  { id: 'mssql',           label: 'MS SQL Server',   ext: 'sql', monacoLang: 'sql', ocLang: 'mssql',        defaultFile: 'query.sql', category: 'database', color: '#CC2927' },
  { id: 'cassandra',       label: 'Cassandra',       ext: 'cql', monacoLang: 'sql', ocLang: 'cassandra',    defaultFile: 'query.cql', category: 'database', color: '#1287B1' },
  { id: 'questdb',         label: 'QuestDB',         ext: 'sql', monacoLang: 'sql', ocLang: 'questdb',      defaultFile: 'query.sql', category: 'database', color: '#CA0303' },
  { id: 'duckdb',          label: 'DuckDB',          ext: 'sql', monacoLang: 'sql', ocLang: 'duckdb',       defaultFile: 'query.sql', category: 'database', color: '#FFF000' },
  { id: 'surrealdb',       label: 'SurrealDB',       ext: 'sql', monacoLang: 'sql', ocLang: 'surrealdb',    defaultFile: 'query.sql', category: 'database', color: '#FF00A0' },
  { id: 'firebird',        label: 'Firebird',        ext: 'sql', monacoLang: 'sql', ocLang: 'firebird',     defaultFile: 'query.sql', category: 'database', color: '#F6C915' },
  { id: 'clickhouse',      label: 'ClickHouse',      ext: 'sql', monacoLang: 'sql', ocLang: 'clickhouse',   defaultFile: 'query.sql', category: 'database', color: '#FFCC21' },
];

/* ── Lookup maps (built once) ─────────────────────────── */

const _byId = {};
for (const lang of ALL_LANGUAGES) _byId[lang.id] = lang;

/** Get language config by ID */
export function getLangById(id) {
  return _byId[id] || null;
}

/* ── Extension → language id ──────────────────────────── */

const EXTENSION_MAP = {
  py: 'python', js: 'javascript', jsx: 'javascript',
  ts: 'typescript', tsx: 'typescript',
  java: 'java', cpp: 'cpp', cc: 'cpp', cxx: 'cpp',
  c: 'c', h: 'cpp', hpp: 'cpp',
  cs: 'csharp', rb: 'ruby', go: 'go', rs: 'rust',
  html: 'html', css: 'css', json: 'json', md: 'markdown',
  txt: 'text', php: 'php', lua: 'lua', kt: 'kotlin',
  scala: 'scala', hs: 'haskell', swift: 'swift',
  dart: 'dart', jl: 'julia', r: 'r',
  sql: 'mysql', sh: 'bash', pl: 'perl',
  clj: 'clojure', exs: 'elixir', erl: 'erlang',
  fs: 'fsharp', f90: 'fortran', nim: 'nim',
  zig: 'zig', v: 'vlang', coffee: 'coffeescript',
  asm: 'assembly', vb: 'vbnet', pas: 'pascal',
  groovy: 'groovy',
};

export function getLanguageFromExtension(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return EXTENSION_MAP[ext] || 'text';
}

export function getMonacoLanguage(langId) {
  const lang = _byId[langId];
  return lang?.monacoLang || langId || 'plaintext';
}

/* ── Categorised lists for the modal ──────────────────── */

export const CATEGORIES = [
  { key: 'programming', label: 'Programming Languages', icon: '⌨️' },
  { key: 'web',         label: 'Web Languages',         icon: '🌐' },
  { key: 'database',    label: 'Database Languages',     icon: '🗄️' },
];

export function getLanguagesByCategory(category) {
  return ALL_LANGUAGES.filter((l) => l.category === category);
}
