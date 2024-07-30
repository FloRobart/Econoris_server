{{--
password-modal.blade.php

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

<dialog id="password_modal" class="modal rounded-xl p-6">
    <div class="modal-box">
        <form method="dialog" class="flex justify-end items-center w-full">
            <button class="cursor-pointer">
                <svg class="fontSizeIcons" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </form>

        <form method="POST" action="{{ route('connexionSave') }}" class="smallColCenterContainer w-full">
            @csrf
            <input type="hidden" id="email" name="email" value="{{ $email }}">

            <!-- Mot de passe -->
            <div>
                <livewire:password-input :confirmation="'false'" :newPassword="'false'" />

                <!-- lien vers la page de mot de passe oublié -->
                <div class="smallRowEndContainer">
                    <a href="{{ route('resetPassword.emailRequest') }}" class="font fontSizeSmall colorFontBleuLogo font-bold hover:underline" title="Cliquez si vous avez oublié votre mot de passe">Mot de passe oublié ?</a>
                </div>
            </div>

            <!-- Bouton de validation -->
            <button type="submit" class="buttonForm mt-6">Valider</button>
        </form>
    </div>
</dialog>
