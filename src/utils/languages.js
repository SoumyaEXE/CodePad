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
  { id: 'python',       label: 'Python',       ext: 'py',    monacoLang: 'python',      ocLang: 'python',       defaultFile: 'main.py',        category: 'programming', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', },
  { id: 'java',         label: 'Java',         ext: 'java',  monacoLang: 'java',        ocLang: 'java',         defaultFile: 'Main.java',      category: 'programming', color: '#E76F00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', },
  { id: 'c',            label: 'C',            ext: 'c',     monacoLang: 'c',           ocLang: 'c',            defaultFile: 'main.c',         category: 'programming', color: '#A8B9CC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg', },
  { id: 'cpp',          label: 'C++',          ext: 'cpp',   monacoLang: 'cpp',         ocLang: 'cpp',          defaultFile: 'main.cpp',       category: 'programming', color: '#659AD2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', },
  { id: 'javascript',   label: 'JavaScript',   ext: 'js',    monacoLang: 'javascript',  ocLang: 'nodejs',       defaultFile: 'index.js',       category: 'programming', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', },
  { id: 'lua',          label: 'Lua',          ext: 'lua',   monacoLang: 'lua',         ocLang: 'lua',          defaultFile: 'main.lua',       category: 'programming', color: '#000080', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg', },
  { id: 'php',          label: 'PHP',          ext: 'php',   monacoLang: 'php',         ocLang: 'php',          defaultFile: 'index.php',      category: 'programming', color: '#777BB4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', },
  { id: 'nodejs',       label: 'NodeJS',       ext: 'js',    monacoLang: 'javascript',  ocLang: 'nodejs',       defaultFile: 'index.js',       category: 'programming', color: '#68A063', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', },
  { id: 'csharp',       label: 'C#',           ext: 'cs',    monacoLang: 'csharp',      ocLang: 'csharp',       defaultFile: 'Program.cs',     category: 'programming', color: '#239120', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', },
  { id: 'assembly',     label: 'Assembly',     ext: 'asm',   monacoLang: 'plaintext',   ocLang: 'assembly',     defaultFile: 'main.asm',       category: 'programming', color: '#6E4C13', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/assembly/assembly-original.svg', },
  { id: 'bash',         label: 'Bash',         ext: 'sh',    monacoLang: 'shell',       ocLang: 'bash',         defaultFile: 'script.sh',      category: 'programming', color: '#4EAA25', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', },
  { id: 'vbnet',        label: 'VB.NET',       ext: 'vb',    monacoLang: 'vb',          ocLang: 'vb',           defaultFile: 'main.vb',        category: 'programming', color: '#00539C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vbnet/vbnet-original.svg', },
  { id: 'kotlin',       label: 'Kotlin',       ext: 'kt',    monacoLang: 'kotlin',      ocLang: 'kotlin',       defaultFile: 'main.kt',        category: 'programming', color: '#7F52FF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', },
  { id: 'pascal',       label: 'Pascal',       ext: 'pas',   monacoLang: 'pascal',      ocLang: 'pascal',       defaultFile: 'main.pas',       category: 'programming', color: '#E3F171', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pascal/pascal-original.svg', },
  { id: 'ruby',         label: 'Ruby',         ext: 'rb',    monacoLang: 'ruby',        ocLang: 'ruby',         defaultFile: 'main.rb',        category: 'programming', color: '#CC342D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg', },
  { id: 'groovy',       label: 'Groovy',       ext: 'groovy',monacoLang: 'plaintext',   ocLang: 'groovy',       defaultFile: 'main.groovy',    category: 'programming', color: '#4298B8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg', },
  { id: 'scala',        label: 'Scala',        ext: 'scala', monacoLang: 'scala',       ocLang: 'scala',        defaultFile: 'Main.scala',     category: 'programming', color: '#DC322F', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg', },
  { id: 'prolog',       label: 'Prolog',       ext: 'pl',    monacoLang: 'plaintext',   ocLang: 'prolog',       defaultFile: 'main.pl',        category: 'programming', color: '#E61B23', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prolog/prolog-original.svg', },
  { id: 'tcl',          label: 'Tcl',          ext: 'tcl',   monacoLang: 'tcl',         ocLang: 'tcl',          defaultFile: 'main.tcl',       category: 'programming', color: '#E2781D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tcl/tcl-original.svg', },
  { id: 'typescript',   label: 'TypeScript',   ext: 'ts',    monacoLang: 'typescript',  ocLang: 'typescript',   defaultFile: 'index.ts',       category: 'programming', color: '#3178C6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', },
  { id: 'jshell',       label: 'JShell',       ext: 'jsh',   monacoLang: 'java',        ocLang: 'jshell',       defaultFile: 'main.jsh',       category: 'programming', color: '#5382A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jshell/jshell-original.svg', },
  { id: 'haskell',      label: 'Haskell',      ext: 'hs',    monacoLang: 'haskell',     ocLang: 'haskell',      defaultFile: 'main.hs',        category: 'programming', color: '#5E5086', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/haskell/haskell-original.svg', },
  { id: 'ada',          label: 'Ada',          ext: 'adb',   monacoLang: 'plaintext',   ocLang: 'ada',          defaultFile: 'main.adb',       category: 'programming', color: '#02F88C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ada/ada-original.svg', },
  { id: 'commonlisp',   label: 'Common Lisp',  ext: 'lisp',  monacoLang: 'plaintext',   ocLang: 'commonlisp',   defaultFile: 'main.lisp',      category: 'programming', color: '#3FB68B', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/commonlisp/commonlisp-original.svg', },
  { id: 'd',            label: 'D',            ext: 'd',     monacoLang: 'plaintext',   ocLang: 'd',            defaultFile: 'main.d',         category: 'programming', color: '#B03931', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d/d-original.svg', },
  { id: 'elixir',       label: 'Elixir',       ext: 'exs',   monacoLang: 'elixir',      ocLang: 'elixir',       defaultFile: 'main.exs',       category: 'programming', color: '#6E4A7E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elixir/elixir-original.svg', },
  { id: 'erlang',       label: 'Erlang',       ext: 'erl',   monacoLang: 'plaintext',   ocLang: 'erlang',       defaultFile: 'main.erl',       category: 'programming', color: '#A90533', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/erlang/erlang-original.svg', },
  { id: 'fsharp',       label: 'F#',           ext: 'fs',    monacoLang: 'fsharp',      ocLang: 'fsharp',       defaultFile: 'main.fs',        category: 'programming', color: '#378BBA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fsharp/fsharp-original.svg', },
  { id: 'fortran',      label: 'Fortran',      ext: 'f90',   monacoLang: 'fortran',     ocLang: 'fortran',      defaultFile: 'main.f90',       category: 'programming', color: '#734F96', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fortran/fortran-original.svg', },
  { id: 'python2',      label: 'Python 2',     ext: 'py',    monacoLang: 'python',      ocLang: 'python2',      defaultFile: 'main.py',        category: 'programming', color: '#FFD43B', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python2/python2-original.svg', },
  { id: 'perl',         label: 'Perl',         ext: 'pl',    monacoLang: 'perl',        ocLang: 'perl',         defaultFile: 'main.pl',        category: 'programming', color: '#39457E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg', },
  { id: 'go',           label: 'Go',           ext: 'go',    monacoLang: 'go',          ocLang: 'go',           defaultFile: 'main.go',        category: 'programming', color: '#00ADD8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', },
  { id: 'r',            label: 'R',            ext: 'r',     monacoLang: 'r',           ocLang: 'r',            defaultFile: 'main.r',         category: 'programming', color: '#276DC3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg', },
  { id: 'racket',       label: 'Racket',       ext: 'rkt',   monacoLang: 'plaintext',   ocLang: 'racket',       defaultFile: 'main.rkt',       category: 'programming', color: '#9F1D20', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/racket/racket-original.svg', },
  { id: 'ocaml',        label: 'OCaml',        ext: 'ml',    monacoLang: 'plaintext',   ocLang: 'ocaml',        defaultFile: 'main.ml',        category: 'programming', color: '#EC6813', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ocaml/ocaml-original.svg', },
  { id: 'basic',        label: 'Basic',        ext: 'bas',   monacoLang: 'plaintext',   ocLang: 'basic',        defaultFile: 'main.bas',       category: 'programming', color: '#2A6496', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', },
  { id: 'sh',           label: 'Shell Script', ext: 'sh',    monacoLang: 'shell',       ocLang: 'sh',           defaultFile: 'script.sh',      category: 'programming', color: '#89E051', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', },
  { id: 'clojure',      label: 'Clojure',      ext: 'clj',   monacoLang: 'clojure',     ocLang: 'clojure',      defaultFile: 'main.clj',       category: 'programming', color: '#5881D8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg', },
  { id: 'cobol',        label: 'COBOL',        ext: 'cob',   monacoLang: 'plaintext',   ocLang: 'cobol',        defaultFile: 'main.cob',       category: 'programming', color: '#005CA5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cobol/cobol-original.svg', },
  { id: 'rust',         label: 'Rust',         ext: 'rs',    monacoLang: 'rust',        ocLang: 'rust',         defaultFile: 'main.rs',        category: 'programming', color: '#CE422B', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg', },
  { id: 'swift',        label: 'Swift',        ext: 'swift', monacoLang: 'swift',       ocLang: 'swift',        defaultFile: 'main.swift',     category: 'programming', color: '#F05138', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', },
  { id: 'objectivec',   label: 'Objective-C',  ext: 'm',     monacoLang: 'objective-c', ocLang: 'objc',         defaultFile: 'main.m',         category: 'programming', color: '#438EFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/objectivec/objectivec-original.svg', },
  { id: 'octave',       label: 'Octave',       ext: 'm',     monacoLang: 'plaintext',   ocLang: 'octave',       defaultFile: 'main.m',         category: 'programming', color: '#0790C0', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/octave/octave-original.svg', },
  { id: 'text',         label: 'Text',         ext: 'txt',   monacoLang: 'plaintext',   ocLang: 'text',         defaultFile: 'file.txt',       category: 'programming', color: '#6B7280', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', },
  { id: 'brainfk',      label: 'BrainFK',      ext: 'bf',    monacoLang: 'plaintext',   ocLang: 'brainfuck',    defaultFile: 'main.bf',        category: 'programming', color: '#F0DB4F', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', },
  { id: 'coffeescript', label: 'CoffeeScript', ext: 'coffee',monacoLang: 'coffeescript',ocLang: 'coffeescript',  defaultFile: 'main.coffee',    category: 'programming', color: '#28334C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/coffeescript/coffeescript-original.svg', },
  { id: 'ejs',          label: 'EJS',          ext: 'ejs',   monacoLang: 'html',        ocLang: 'ejs',          defaultFile: 'index.ejs',      category: 'programming', color: '#A91E50', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ejs/ejs-original.svg', },
  { id: 'dart',         label: 'Dart',         ext: 'dart',  monacoLang: 'dart',        ocLang: 'dart',         defaultFile: 'main.dart',      category: 'programming', color: '#0175C2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg', },
  { id: 'deno',         label: 'Deno',         ext: 'ts',    monacoLang: 'typescript',  ocLang: 'deno',         defaultFile: 'main.ts',        category: 'programming', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/deno/deno-original.svg', },
  { id: 'bun',          label: 'Bun',          ext: 'ts',    monacoLang: 'typescript',  ocLang: 'bun',          defaultFile: 'main.ts',        category: 'programming', color: '#FBF0DF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg', },
  { id: 'crystal',      label: 'Crystal',      ext: 'cr',    monacoLang: 'plaintext',   ocLang: 'crystal',      defaultFile: 'main.cr',        category: 'programming', color: '#000000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/crystal/crystal-original.svg', },
  { id: 'julia',        label: 'Julia',        ext: 'jl',    monacoLang: 'julia',       ocLang: 'julia',        defaultFile: 'main.jl',        category: 'programming', color: '#9558B2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/julia/julia-original.svg', },
  { id: 'zig',          label: 'Zig',          ext: 'zig',   monacoLang: 'plaintext',   ocLang: 'zig',          defaultFile: 'main.zig',       category: 'programming', color: '#F7A41D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zig/zig-original.svg', },
  { id: 'awk',          label: 'AWK',          ext: 'awk',   monacoLang: 'plaintext',   ocLang: 'awk',          defaultFile: 'main.awk',       category: 'programming', color: '#4B6C88', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/awk/awk-original.svg', },
  { id: 'ispc',         label: 'ISPC',         ext: 'ispc',  monacoLang: 'plaintext',   ocLang: 'ispc',         defaultFile: 'main.ispc',      category: 'programming', color: '#4B8BBE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ispc/ispc-original.svg', },
  { id: 'smalltalk',    label: 'Smalltalk',    ext: 'st',    monacoLang: 'plaintext',   ocLang: 'smalltalk',    defaultFile: 'main.st',        category: 'programming', color: '#596706', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/smalltalk/smalltalk-original.svg', },
  { id: 'nim',          label: 'Nim',          ext: 'nim',   monacoLang: 'plaintext',   ocLang: 'nim',          defaultFile: 'main.nim',       category: 'programming', color: '#FFE953', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nim/nim-original.svg', },
  { id: 'scheme',       label: 'Scheme',       ext: 'scm',   monacoLang: 'scheme',      ocLang: 'scheme',       defaultFile: 'main.scm',       category: 'programming', color: '#1E4AEC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scheme/scheme-original.svg', },
  { id: 'j',            label: 'J',            ext: 'ijs',   monacoLang: 'plaintext',   ocLang: 'j',            defaultFile: 'main.ijs',       category: 'programming', color: '#9EEDFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/j/j-original.svg', },
  { id: 'vlang',        label: 'V',            ext: 'v',     monacoLang: 'plaintext',   ocLang: 'v',            defaultFile: 'main.v',         category: 'programming', color: '#5D87BF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vlang/vlang-original.svg', },
  { id: 'raku',         label: 'Raku',         ext: 'raku',  monacoLang: 'plaintext',   ocLang: 'raku',         defaultFile: 'main.raku',      category: 'programming', color: '#0298D6', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raku/raku-original.svg', },
  { id: 'verilog',      label: 'Verilog',      ext: 'v',     monacoLang: 'plaintext',   ocLang: 'verilog',      defaultFile: 'main.v',         category: 'programming', color: '#B2B7F8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/verilog/verilog-original.svg', },
  { id: 'haxe',         label: 'Haxe',         ext: 'hx',    monacoLang: 'plaintext',   ocLang: 'haxe',         defaultFile: 'Main.hx',        category: 'programming', color: '#EA8220', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/haxe/haxe-original.svg', },
  { id: 'forth',        label: 'Forth',        ext: 'fth',   monacoLang: 'plaintext',   ocLang: 'forth',        defaultFile: 'main.fth',       category: 'programming', color: '#1E573E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/forth/forth-original.svg', },
  { id: 'icon',         label: 'Icon',         ext: 'icn',   monacoLang: 'plaintext',   ocLang: 'icon',         defaultFile: 'main.icn',       category: 'programming', color: '#1C1C1C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/icon/icon-original.svg', },
  { id: 'odin',         label: 'Odin',         ext: 'odin',  monacoLang: 'plaintext',   ocLang: 'odin',         defaultFile: 'main.odin',      category: 'programming', color: '#60B5CC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/odin/odin-original.svg', },

  // ── Web Languages ──────────────────────────────────────────
  { id: 'html',         label: 'HTML',         ext: 'html',  monacoLang: 'html',        ocLang: 'html',         defaultFile: 'index.html',     category: 'web', color: '#E44D26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', },
  { id: 'react',        label: 'React',        ext: 'jsx',   monacoLang: 'javascript',  ocLang: 'react',        defaultFile: 'App.jsx',        category: 'web', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', },
  { id: 'vue',          label: 'Vue',          ext: 'vue',   monacoLang: 'html',        ocLang: 'vue',          defaultFile: 'App.vue',        category: 'web', color: '#4FC08D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', },
  { id: 'angular',      label: 'Angular',      ext: 'ts',    monacoLang: 'typescript',  ocLang: 'angular',      defaultFile: 'main.ts',        category: 'web', color: '#DD0031', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', },
  { id: 'materialize',  label: 'Materialize',  ext: 'html',  monacoLang: 'html',        ocLang: 'materialize',  defaultFile: 'index.html',     category: 'web', color: '#EB7077', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialize/materialize-original.svg', },
  { id: 'bootstrap',    label: 'Bootstrap',    ext: 'html',  monacoLang: 'html',        ocLang: 'bootstrap',    defaultFile: 'index.html',     category: 'web', color: '#7952B3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', },
  { id: 'tailwindcss',  label: 'Tailwind CSS', ext: 'html',  monacoLang: 'html',        ocLang: 'tailwindcss',  defaultFile: 'index.html',     category: 'web', color: '#06B6D4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', },
  { id: 'htmx',         label: 'HTMX',         ext: 'html',  monacoLang: 'html',        ocLang: 'htmx',         defaultFile: 'index.html',     category: 'web', color: '#3366CC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/htmx/htmx-original.svg', },
  { id: 'alpinejs',     label: 'Alpine.js',    ext: 'html',  monacoLang: 'html',        ocLang: 'alpinejs',     defaultFile: 'index.html',     category: 'web', color: '#8BC0D0', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg', },
  { id: 'chartjs',      label: 'Chart.js',     ext: 'html',  monacoLang: 'html',        ocLang: 'chartjs',      defaultFile: 'index.html',     category: 'web', color: '#FF6384', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg', },
  { id: 'd3js',         label: 'D3.js',        ext: 'html',  monacoLang: 'html',        ocLang: 'd3js',         defaultFile: 'index.html',     category: 'web', color: '#F9A03C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg', },
  { id: 'jquery',       label: 'jQuery',       ext: 'html',  monacoLang: 'html',        ocLang: 'jquery',       defaultFile: 'index.html',     category: 'web', color: '#0769AD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg', },
  { id: 'foundation',   label: 'Foundation',   ext: 'html',  monacoLang: 'html',        ocLang: 'foundation',   defaultFile: 'index.html',     category: 'web', color: '#14679E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/foundation/foundation-original.svg', },
  { id: 'bulma',        label: 'Bulma',        ext: 'html',  monacoLang: 'html',        ocLang: 'bulma',        defaultFile: 'index.html',     category: 'web', color: '#00D1B2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bulma/bulma-original.svg', },
  { id: 'uikit',        label: 'UIkit',        ext: 'html',  monacoLang: 'html',        ocLang: 'uikit',        defaultFile: 'index.html',     category: 'web', color: '#2396F3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/uikit/uikit-original.svg', },
  { id: 'semanticui',   label: 'Semantic UI',  ext: 'html',  monacoLang: 'html',        ocLang: 'semanticui',   defaultFile: 'index.html',     category: 'web', color: '#35BDB2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/semanticui/semanticui-original.svg', },
  { id: 'skeleton',     label: 'Skeleton',     ext: 'html',  monacoLang: 'html',        ocLang: 'skeleton',     defaultFile: 'index.html',     category: 'web', color: '#333333', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/skeleton/skeleton-original.svg', },
  { id: 'milligram',    label: 'Milligram',    ext: 'html',  monacoLang: 'html',        ocLang: 'milligram',    defaultFile: 'index.html',     category: 'web', color: '#A25BCC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/milligram/milligram-original.svg', },
  { id: 'papercss',     label: 'PaperCSS',     ext: 'html',  monacoLang: 'html',        ocLang: 'papercss',     defaultFile: 'index.html',     category: 'web', color: '#41403E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/papercss/papercss-original.svg', },
  { id: 'backbonejs',   label: 'BackboneJS',   ext: 'html',  monacoLang: 'html',        ocLang: 'backbonejs',   defaultFile: 'index.html',     category: 'web', color: '#002A41', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/backbonejs/backbonejs-original.svg', },

  // ── Database Languages ─────────────────────────────────────
  { id: 'mysql',           label: 'MySQL',           ext: 'sql', monacoLang: 'sql', ocLang: 'mysql',        defaultFile: 'query.sql', category: 'database', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', },
  { id: 'oracle',          label: 'Oracle DB',       ext: 'sql', monacoLang: 'sql', ocLang: 'oracle',       defaultFile: 'query.sql', category: 'database', color: '#F80000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg', },
  { id: 'postgresql',      label: 'PostgreSQL',      ext: 'sql', monacoLang: 'sql', ocLang: 'postgresql',   defaultFile: 'query.sql', category: 'database', color: '#336791', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', },
  { id: 'mongodb',         label: 'MongoDB',         ext: 'js',  monacoLang: 'javascript', ocLang: 'mongodb',defaultFile: 'query.js',  category: 'database', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', },
  { id: 'sqlite',          label: 'SQLite',          ext: 'sql', monacoLang: 'sql', ocLang: 'sqlite',       defaultFile: 'query.sql', category: 'database', color: '#003B57', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', },
  { id: 'redis',           label: 'Redis',           ext: 'txt', monacoLang: 'plaintext', ocLang: 'redis',   defaultFile: 'commands.txt', category: 'database', color: '#DC382D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', },
  { id: 'mariadb',         label: 'MariaDB',         ext: 'sql', monacoLang: 'sql', ocLang: 'mariadb',      defaultFile: 'query.sql', category: 'database', color: '#003545', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg', },
  { id: 'plsql',           label: 'Oracle PL/SQL',   ext: 'sql', monacoLang: 'sql', ocLang: 'plsql',        defaultFile: 'query.sql', category: 'database', color: '#F80000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plsql/plsql-original.svg', },
  { id: 'mssql',           label: 'MS SQL Server',   ext: 'sql', monacoLang: 'sql', ocLang: 'mssql',        defaultFile: 'query.sql', category: 'database', color: '#CC2927', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mssql/mssql-original.svg', },
  { id: 'cassandra',       label: 'Cassandra',       ext: 'cql', monacoLang: 'sql', ocLang: 'cassandra',    defaultFile: 'query.cql', category: 'database', color: '#1287B1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg', },
  { id: 'questdb',         label: 'QuestDB',         ext: 'sql', monacoLang: 'sql', ocLang: 'questdb',      defaultFile: 'query.sql', category: 'database', color: '#CA0303', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/questdb/questdb-original.svg', },
  { id: 'duckdb',          label: 'DuckDB',          ext: 'sql', monacoLang: 'sql', ocLang: 'duckdb',       defaultFile: 'query.sql', category: 'database', color: '#FFF000', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/duckdb/duckdb-original.svg', },
  { id: 'surrealdb',       label: 'SurrealDB',       ext: 'sql', monacoLang: 'sql', ocLang: 'surrealdb',    defaultFile: 'query.sql', category: 'database', color: '#FF00A0', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/surrealdb/surrealdb-original.svg', },
  { id: 'firebird',        label: 'Firebird',        ext: 'sql', monacoLang: 'sql', ocLang: 'firebird',     defaultFile: 'query.sql', category: 'database', color: '#F6C915', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebird/firebird-original.svg', },
  { id: 'clickhouse',      label: 'ClickHouse',      ext: 'sql', monacoLang: 'sql', ocLang: 'clickhouse',   defaultFile: 'query.sql', category: 'database', color: '#FFCC21', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clickhouse/clickhouse-original.svg', },
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

export const WEB_LANGS = new Set(['html', 'react', 'vuejs', 'angular', 'bootstrap', 'tailwindcss', 'htmx', 'alpinejs', 'chartjs', 'd3js', 'jquery', 'foundation', 'bulma', 'uikit', 'semanticui', 'skeleton', 'milligram', 'papercss', 'backbonejs', 'materialize', 'ejs', 'coffeescript']);


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
