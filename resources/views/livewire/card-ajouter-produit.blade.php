{{--
card-ajouter-produit.blade.php

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

<a href="{{ route('public.ajouterProduit') }}" class="colBetweenContainer bgElement rounded-xl shadow-lg pt-2 cursor-pointer group" title="Proposer un produit">
    <!------------------------------------------------------------------------------->
    <!-- Carte de produit, affiché sur la page d'accueil et les pages de catégorie -->
    <!------------------------------------------------------------------------------->
    <!-- Nom du produit -->
    <div class="rowCenterContainer h-full px-1 sm:px-3 md:px-5">
        <!-- Nom du produit -->
        <div class="smallColCenterContainer">
            <span class="smallText group-hover:colorFontBleuLogo text-center">Proposer un produit</span>
        </div>
    </div>

    <!-- Image -->
    <div class="colCenterContainer">
        <div class="rowCenterContainer group-hover:normalScale py-4">
            <div class="w-11/12">
                <svg class="w-full colorFontBleuFonce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>

        <!-- Texte -->
        <div class="rowCenterContainer py-2">
            <span class="smallText group-hover:colorFontBleuLogo text-center px-1 min-[400px]:px-3">
                Proposer un produit
            </span>
        </div>
    </div>
</a>
