export const LANGUAGE_TEMPLATES = [
  { id: 'python', label: 'Python', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', files: [
      { name: 'main.py', code: `print("Hello, World!")` },
    ] },
  { id: 'java', label: 'Java', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', files: [
      { name: 'Main.java', code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}` },
    ] },
  { id: 'c', label: 'C', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg', files: [
      { name: 'main.c', code: `#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}` },
    ] },
  { id: 'cpp', label: 'C++', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', files: [
      { name: 'main.cpp', code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}` },
    ] },
  { id: 'javascript', label: 'JavaScript', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', files: [
      { name: 'index.js', code: `console.log("Hello, World!");` },
    ] },
  { id: 'lua', label: 'Lua', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg', files: [
      { name: 'main.lua', code: `print("Hello, World!")` },
    ] },
  { id: 'php', label: 'PHP', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', files: [
      { name: 'index.php', code: `<?php
echo "Hello, World!";
?>` },
    ] },
  { id: 'nodejs', label: 'NodeJS', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', files: [
      { name: 'index.js', code: `console.log("Hello, Node.js!");` },
    ] },
  { id: 'csharp', label: 'C#', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', files: [
      { name: 'Program.cs', code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}` },
    ] },
  { id: 'assembly', label: 'Assembly', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/assembly/assembly-original.svg', files: [
      { name: 'main.asm', code: `section .data
    hello db "Hello, World!",0

section .text
    global _start

_start:
    mov eax, 4
    mov ebx, 1
    mov ecx, hello
    mov edx, 13
    int 0x80

    mov eax, 1
    xor ebx, ebx
    int 0x80` },
    ] },
  { id: 'bash', label: 'Bash', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', files: [
      { name: 'script.sh', code: `echo "Hello, World!"` },
    ] },
  { id: 'vbnet', label: 'VB.NET', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vbnet/vbnet-original.svg', files: [
      { name: 'main.vb', code: `Module MainModule
    Sub Main()
        Console.WriteLine("Hello, World!")
    End Sub
End Module` },
    ] },
  { id: 'kotlin', label: 'Kotlin', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', files: [
      { name: 'main.kt', code: `fun main() {
    println("Hello, World!")
}` },
    ] },
  { id: 'pascal', label: 'Pascal', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pascal/pascal-original.svg', files: [
      { name: 'main.pas', code: `program Hello;
begin
  writeln ('Hello, World!')
end.` },
    ] },
  { id: 'ruby', label: 'Ruby', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg', files: [
      { name: 'main.rb', code: `puts "Hello, World!"` },
    ] },
  { id: 'groovy', label: 'Groovy', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg', files: [
      { name: 'main.groovy', code: `println "Hello, World!"` },
    ] },
  { id: 'scala', label: 'Scala', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg', files: [
      { name: 'Main.scala', code: `object Main {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
  }
}` },
    ] },
  { id: 'prolog', label: 'Prolog', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prolog/prolog-original.svg', files: [
      { name: 'main.pl', code: `:- initialization(main).
main :- write('Hello, World!'), nl, halt.` },
    ] },
  { id: 'tcl', label: 'Tcl', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tcl/tcl-original.svg', files: [
      { name: 'main.tcl', code: `puts "Hello, World!"` },
    ] },
  { id: 'typescript', label: 'TypeScript', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', files: [
      { name: 'index.ts', code: `const greeting: string = "Hello, World!";
console.log(greeting);` },
    ] },
  { id: 'jshell', label: 'JShell', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jshell/jshell-original.svg', files: [
      { name: 'main.jsh', code: `System.out.println("Hello, World!");` },
    ] },
  { id: 'haskell', label: 'Haskell', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/haskell/haskell-original.svg', files: [
      { name: 'main.hs', code: `main :: IO ()
main = putStrLn "Hello, World!"` },
    ] },
  { id: 'ada', label: 'Ada', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ada/ada-original.svg', files: [
      { name: 'main.adb', code: `with Ada.Text_IO; use Ada.Text_IO;
procedure Main is
begin
    Put_Line("Hello, World!");
end Main;` },
    ] },
  { id: 'commonlisp', label: 'Common Lisp', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/commonlisp/commonlisp-original.svg', files: [
      { name: 'main.lisp', code: `(format t "Hello, World!~%~")` },
    ] },
  { id: 'd', label: 'D', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d/d-original.svg', files: [
      { name: 'main.d', code: `import std.stdio;

void main()
{
    writeln("Hello, World!");
}` },
    ] },
  { id: 'elixir', label: 'Elixir', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elixir/elixir-original.svg', files: [
      { name: 'main.exs', code: `IO.puts "Hello, World!"` },
    ] },
  { id: 'erlang', label: 'Erlang', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/erlang/erlang-original.svg', files: [
      { name: 'main.erl', code: `-module(main).
-export([start/0]).

start() ->
    io:format("Hello, World!~n").` },
    ] },
  { id: 'fsharp', label: 'F#', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fsharp/fsharp-original.svg', files: [
      { name: 'main.fs', code: `printfn "Hello, World!"` },
    ] },
  { id: 'fortran', label: 'Fortran', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fortran/fortran-original.svg', files: [
      { name: 'main.f90', code: `program hello
    print *, "Hello, World!"
end program hello` },
    ] },
  { id: 'python2', label: 'Python 2', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python2/python2-original.svg', files: [
      { name: 'main.py', code: `print "Hello, World!"` },
    ] },
  { id: 'perl', label: 'Perl', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg', files: [
      { name: 'main.pl', code: `print "Hello, World!\n";` },
    ] },
  { id: 'go', label: 'Go', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg', files: [
      { name: 'main.go', code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}` },
    ] },
  { id: 'r', label: 'R', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg', files: [
      { name: 'main.r', code: `print("Hello, World!")` },
    ] },
  { id: 'racket', label: 'Racket', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/racket/racket-original.svg', files: [
      { name: 'main.rkt', code: `#lang racket
(displayln "Hello, World!")` },
    ] },
  { id: 'ocaml', label: 'OCaml', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ocaml/ocaml-original.svg', files: [
      { name: 'main.ml', code: `print_endline "Hello, World!"` },
    ] },
  { id: 'basic', label: 'Basic', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', files: [
      { name: 'main.bas', code: `PRINT "Hello, World!"` },
    ] },
  { id: 'sh', label: 'Shell Script', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', files: [
      { name: 'script.sh', code: `echo "Hello, World!"` },
    ] },
  { id: 'clojure', label: 'Clojure', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg', files: [
      { name: 'main.clj', code: `(println "Hello, World!")` },
    ] },
  { id: 'cobol', label: 'COBOL', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cobol/cobol-original.svg', files: [
      { name: 'main.cob', code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "Hello, World!".
           STOP RUN.` },
    ] },
  { id: 'rust', label: 'Rust', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg', files: [
      { name: 'main.rs', code: `fn main() {
    println!("Hello, World!");
}` },
    ] },
  { id: 'swift', label: 'Swift', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg', files: [
      { name: 'main.swift', code: `print("Hello, World!")` },
    ] },
  { id: 'objectivec', label: 'Objective-C', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/objectivec/objectivec-original.svg', files: [
      { name: 'main.m', code: `#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, World!");
    }
    return 0;
}` },
    ] },
  { id: 'octave', label: 'Octave', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/octave/octave-original.svg', files: [
      { name: 'main.m', code: `disp("Hello, World!");` },
    ] },
  { id: 'text', label: 'Text', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', files: [
      { name: 'file.txt', code: `Hello, World!` },
    ] },
  { id: 'brainfk', label: 'BrainFK', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg', files: [
      { name: 'main.bf', code: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.` },
    ] },
  { id: 'coffeescript', label: 'CoffeeScript', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/coffeescript/coffeescript-original.svg', files: [
      { name: 'main.coffee', code: `console.log "Hello, World!"` },
    ] },
  { id: 'ejs', label: 'EJS', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ejs/ejs-original.svg', files: [
      { name: 'index.ejs', code: `<h1>Hello, World!</h1>` },
    ] },
  { id: 'dart', label: 'Dart', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg', files: [
      { name: 'main.dart', code: `void main() {
  print('Hello, World!');
}` },
    ] },
  { id: 'deno', label: 'Deno', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/deno/deno-original.svg', files: [
      { name: 'main.ts', code: `console.log("Hello from Deno!");` },
    ] },
  { id: 'bun', label: 'Bun', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg', files: [
      { name: 'main.ts', code: `console.log("Hello from Bun!");` },
    ] },
  { id: 'crystal', label: 'Crystal', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/crystal/crystal-original.svg', files: [
      { name: 'main.cr', code: `puts "Hello, World!"` },
    ] },
  { id: 'julia', label: 'Julia', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/julia/julia-original.svg', files: [
      { name: 'main.jl', code: `println("Hello, World!")` },
    ] },
  { id: 'zig', label: 'Zig', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zig/zig-original.svg', files: [
      { name: 'main.zig', code: `const std = @import("std");

pub fn main() !void {
    std.debug.print("Hello, World!\n", .{});
}` },
    ] },
  { id: 'awk', label: 'AWK', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/awk/awk-original.svg', files: [
      { name: 'main.awk', code: `BEGIN { print "Hello, World!" }` },
    ] },
  { id: 'ispc', label: 'ISPC', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ispc/ispc-original.svg', files: [
      { name: 'main.ispc', code: `export void main() {
    print("Hello, World!\n");
}` },
    ] },
  { id: 'smalltalk', label: 'Smalltalk', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/smalltalk/smalltalk-original.svg', files: [
      { name: 'main.st', code: `Transcript show: 'Hello, World!'; cr.` },
    ] },
  { id: 'nim', label: 'Nim', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nim/nim-original.svg', files: [
      { name: 'main.nim', code: `echo "Hello, World!"` },
    ] },
  { id: 'scheme', label: 'Scheme', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scheme/scheme-original.svg', files: [
      { name: 'main.scm', code: `(display "Hello, World!")
(newline)` },
    ] },
  { id: 'j', label: 'J', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/j/j-original.svg', files: [
      { name: 'main.ijs', code: `echo 'Hello, World!'` },
    ] },
  { id: 'vlang', label: 'V', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vlang/vlang-original.svg', files: [
      { name: 'main.v', code: `fn main() {
	println('Hello, World!')
}` },
    ] },
  { id: 'raku', label: 'Raku', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raku/raku-original.svg', files: [
      { name: 'main.raku', code: `say "Hello, World!";` },
    ] },
  { id: 'verilog', label: 'Verilog', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/verilog/verilog-original.svg', files: [
      { name: 'main.v', code: `module main;
    initial begin
        \$display("Hello, World!");
        \$finish;
    end
endmodule` },
    ] },
  { id: 'haxe', label: 'Haxe', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/haxe/haxe-original.svg', files: [
      { name: 'Main.hx', code: `class Main {
    static public function main():Void {
        trace("Hello, World!");
    }
}` },
    ] },
  { id: 'forth', label: 'Forth', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/forth/forth-original.svg', files: [
      { name: 'main.fth', code: `." Hello, World!" CR` },
    ] },
  { id: 'icon', label: 'Icon', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/icon/icon-original.svg', files: [
      { name: 'main.icn', code: `procedure main()
    write("Hello, World!")
end` },
    ] },
  { id: 'odin', label: 'Odin', category: 'programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/odin/odin-original.svg', files: [
      { name: 'main.odin', code: `package main

import "core:fmt"

main :: proc() {
    fmt.println("Hello, World!");
}` },
    ] },
  { id: 'html', label: 'HTML', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, HTML!</h1>
  <script src="script.js"></script>
</body>
</html>` },
      { name: 'style.css', code: `body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #1a1a2e;
  color: #fff;
}

h1 { color: #6c63ff; }` },
      { name: 'script.js', code: `console.log("Hello from JavaScript!");` },
    ] },
  { id: 'react', label: 'React', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', files: [
      { name: 'App.jsx', code: `import React from "react";

export default function App() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Hello from React!</h1>
    </div>
  );
}` },
      { name: 'index.html', code: `<!DOCTYPE html>
<html lang="en">
<body>
  <div id="root"></div>
</body>
</html>` },
    ] },
  { id: 'vue', label: 'Vue', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', files: [
      { name: 'App.vue', code: `<template>
  <div class="app">
    <h1>Hello from Vue!</h1>
  </div>
</template>

<style>
.app { text-align: center; color: #4FC08D; }
</style>` },
    ] },
  { id: 'angular', label: 'Angular', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Angular!</h1>
</body>
</html>` },
    ] },
  { id: 'materialize', label: 'Materialize', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialize/materialize-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Materialize!</h1>
</body>
</html>` },
    ] },
  { id: 'bootstrap', label: 'Bootstrap', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html lang="en">
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-dark text-light d-flex align-items-center justify-content-center vh-100">
  <h1 class="text-primary">Hello, Bootstrap!</h1>
</body>
</html>` },
    ] },
  { id: 'tailwindcss', label: 'Tailwind CSS', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white flex items-center justify-center h-screen">
  <h1 class="text-4xl font-bold text-cyan-400">Hello, Tailwind CSS!</h1>
</body>
</html>` },
    ] },
  { id: 'htmx', label: 'HTMX', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/htmx/htmx-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, HTMX!</h1>
</body>
</html>` },
    ] },
  { id: 'alpinejs', label: 'Alpine.js', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Alpine.js!</h1>
</body>
</html>` },
    ] },
  { id: 'chartjs', label: 'Chart.js', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Chart.js!</h1>
</body>
</html>` },
    ] },
  { id: 'd3js', label: 'D3.js', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, D3.js!</h1>
</body>
</html>` },
    ] },
  { id: 'jquery', label: 'jQuery', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, jQuery!</h1>
</body>
</html>` },
    ] },
  { id: 'foundation', label: 'Foundation', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/foundation/foundation-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Foundation!</h1>
</body>
</html>` },
    ] },
  { id: 'bulma', label: 'Bulma', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bulma/bulma-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Bulma!</h1>
</body>
</html>` },
    ] },
  { id: 'uikit', label: 'UIkit', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/uikit/uikit-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, UIkit!</h1>
</body>
</html>` },
    ] },
  { id: 'semanticui', label: 'Semantic UI', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/semanticui/semanticui-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Semantic UI!</h1>
</body>
</html>` },
    ] },
  { id: 'skeleton', label: 'Skeleton', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/skeleton/skeleton-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Skeleton!</h1>
</body>
</html>` },
    ] },
  { id: 'milligram', label: 'Milligram', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/milligram/milligram-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, Milligram!</h1>
</body>
</html>` },
    ] },
  { id: 'papercss', label: 'PaperCSS', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/papercss/papercss-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, PaperCSS!</h1>
</body>
</html>` },
    ] },
  { id: 'backbonejs', label: 'BackboneJS', category: 'web', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/backbonejs/backbonejs-original.svg', files: [
      { name: 'index.html', code: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, BackboneJS!</h1>
</body>
</html>` },
    ] },
  { id: 'mysql', label: 'MySQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', files: [
      { name: 'query.sql', code: `SELECT "Hello, MySQL!" AS greeting;` },
    ] },
  { id: 'oracle', label: 'Oracle DB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, Oracle DB!' AS greeting FROM dual;` },
    ] },
  { id: 'postgresql', label: 'PostgreSQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, PostgreSQL!' AS greeting;` },
    ] },
  { id: 'mongodb', label: 'MongoDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', files: [
      { name: 'query.js', code: `db.collection.insert({ message: "Hello, MongoDB!" });
db.collection.find();` },
    ] },
  { id: 'sqlite', label: 'SQLite', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', files: [
      { name: 'query.sql', code: `SELECT "Hello, SQLite!" AS greeting;` },
    ] },
  { id: 'redis', label: 'Redis', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', files: [
      { name: 'commands.txt', code: `SET greeting "Hello, Redis!"
GET greeting` },
    ] },
  { id: 'mariadb', label: 'MariaDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg', files: [
      { name: 'query.sql', code: `SELECT "Hello, MariaDB!" AS greeting;` },
    ] },
  { id: 'plsql', label: 'Oracle PL/SQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/plsql/plsql-original.svg', files: [
      { name: 'query.sql', code: `BEGIN
  DBMS_OUTPUT.PUT_LINE('Hello, PL/SQL!');
END;
/` },
    ] },
  { id: 'mssql', label: 'MS SQL Server', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mssql/mssql-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, MS SQL Server!' AS greeting;` },
    ] },
  { id: 'cassandra', label: 'Cassandra', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg', files: [
      { name: 'query.cql', code: `SELECT 'Hello, Cassandra!' AS greeting;` },
    ] },
  { id: 'questdb', label: 'QuestDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/questdb/questdb-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, QuestDB!' AS greeting;` },
    ] },
  { id: 'duckdb', label: 'DuckDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/duckdb/duckdb-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, DuckDB!' AS greeting;` },
    ] },
  { id: 'surrealdb', label: 'SurrealDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/surrealdb/surrealdb-original.svg', files: [
      { name: 'query.sql', code: `SELECT * FROM "Hello, SurrealDB!";` },
    ] },
  { id: 'firebird', label: 'Firebird', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebird/firebird-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, Firebird!' AS greeting FROM RDB\$DATABASE;` },
    ] },
  { id: 'clickhouse', label: 'ClickHouse', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clickhouse/clickhouse-original.svg', files: [
      { name: 'query.sql', code: `SELECT 'Hello, ClickHouse!' AS greeting;` },
    ] },
];
