{{--
head.blade.php

Copyright (C) 2024 Floris Robart

Authors: Floris Robart <florobart.github.com>

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation; either version 2.1 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston MA 02110-1301, USA.
--}}

<!DOCTYPE html>
<html lang="fr" class="w-full h-full bgPage">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Titre de la page -->
        <!---------------------->
        <title>Finances dashboard - @yield('title')</title>

        <!-- Fonts -->
        <!----------->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" />

        <!-- Styles CSS -->
        <!---------------->
        <link rel="stylesheet" href="{{ asset('css/scrollToTop.css') }}">
        @vite('resources/css/app.css')
        @yield('styles')

        <!-- Scripts JavaScript -->
        <!------------------------>
        <script src="{{ asset('js/scrollToTop.js') }}"></script>
        @yield('scripts')
    </head>