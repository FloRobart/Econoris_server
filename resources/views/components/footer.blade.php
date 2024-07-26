{{--
footer.blade.php

Copyright (C) 2024 Floris Robart

Authors: Floris Robart <florisrobart.pro@gmail.com>

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

<footer class="colCenterContainer bgBleuSombre w-full">
    <!-- Lien de retour en haut de la page -->
    <div class="colCenterContainer">
        <div onclick="scrollToTop()" class="colCenterContainer cursor-pointer">
            <svg class="normalIcons normalTextReverse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clip-rule="evenodd" />
            </svg>
            <span class="normalTextReverse -mt-2 lg:-mt-4">Retour en haut de la page</span>
        </div>
    </div>

    <!-- Copiright -->
    <div class="rowCenterContainer space-x-1 mb-4">
        <span class="tinyTextReverse">© <script>document.write(new Date().getFullYear())</script> <a href="https://florobart.github.io/" target="_blank"><b>Floris Robart</b></a></span>
    </div>
</footer>