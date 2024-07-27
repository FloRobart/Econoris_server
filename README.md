# Finance dashboard

**Finance dashboard** est une application web de gestion de finances personnelles. Elle permet de suivre ses dépenses, ses revenus, ses investissements et bien d'autre chose.

Toute-fois, cette application n'est pas déstinée à remplacer un logiciel de comptabilité professionel ni même l'application de votre banque. Elle est plutôt déstinée à vous aider à mieux gérer vos finances personnelles, à suivre vos dépenses, vos revenus, vos abonnements, vos investissements et autres.

Finance dashboard à été conçue pour être utilisé par plusieurs personnes, c'est pourquoi elle permet de créer plusieurs comptes utilisateurs. Chaque utilisateur peut donc avoir son propre compte et gérer ses finances personnelles de manière indépendante. Si vous êtes seul à utiliser l'application et que vous ne voulez pas créer de compte utilisateur, vous devrez modifier le code source (ce qui est tout à fait possible).

**Finance dashboard** n'est pas disponible en ligne, si vous voulez l'utiliser, vous devrez l'installer sur votre propre serveur. Si vous voulez créer un serveur personnel vous pouvez suivre les instructions de ma documentation sur la [création d'un serveur personnel](https://florobart.github.io/Documentations/src/doc_creation_serveur_local.html). Si vous avez déjà un serveur personnel, vous pouvez suivre les [instructions d'installation de **Finance dashboard**](#installation).

**Grâce à cette application vous pourrez :**

- Suivre vos revenus (même si vous avez plusieurs sources de revenus)
- Suivre vos épargnes (l'argent que vous avez mis de côté)
- Suivre vos dépenses
- Suivre vos abonnements (téléphonie, internet, électricité, eau, gaz, etc.)
- Suivre vos emprunts (l'argent que vous avez emprunté)
- Suivre vos prêts (l'argent que vous avez prêté)
- Suivre vos investissements (quelque soit leur nature [immobilier, bourse, cryptomonnaie, etc.])
  - En se qui concerne les investissements le logiciel vous permet de créer des catégories d'investissements et donc de suivre vos investissements dans chaque catégorie même les plus inatendus.

**Finance dashboard** est une application web open-source, elle est donc gratuite et libre d'utilisation. Vous pouvez l'utiliser, la modifier, la distribuer, la partager, etc. comme bon vous semble. Par contre, vous ne pouvez pas la vendre, ni la commercialiser, ni la distribuer sans en donner l'accès gratuit.

## Technologies utilisées

**Finance dashboard** est une application web développée avec les technologies suivantes :

- **Langages :**
  - PHP
  - MySQL
  - JavaScript
  - *HTML*
  - *CSS*
- **Frameworks et librairies :**
  - Laravel
  - Tailwind CSS
  - Livewire

## Installation

Pour installer **Finance dashboard** sur votre serveur, vous avez deux options :

1. [L'installé avec son écosystème complet](#installation-complète)
  - Finance dashboard à été conçu pour être intégré à un autre projet qui s'appelle **[Home Server Maison](https://github.com/FloRobart/HomeServerMaison)** qui gère tout le système de gestion de compte utilisateur et de connexion, ainsi qu'une page d'accueil qui regroupe toutes les applications qui sont installées sur le serveur. Si vous voulez installer **Finance dashboard** avec son écosystème complet, vous devez dabord installer **[Home Server Maison](https://github.com/FloRobart/HomeServerMaison)** et ensuite suivre les instructions d'installation de **Finance dashboard**.
2. [L'installé seul](#installation-seule)
  - J'ai également prévu une version de **Finance dashboard** qui peut être installée seule, sans **[Home Server Maison](https://github.com/FloRobart/HomeServerMaison)**. Si vous installez la version autonome de **Finance dashboard**, vous devrez quand même créer un compte utilisateur pour pouvoir vous connecter à l'application.

### Prérequis

Pour installer **Finance dashboard** sur votre serveur, vous devez avoir les prérequis suivants :

- [Un serveur sous Linux de préférence](https://florobart.github.io/Documentations/src/doc_creation_serveur_local.html)
  - Vous pouvez également l'installer sur un ordinateur de bureau ou un hébergement web sous Linux, Windows ou MacOS, mais vous devrez adapter vous-même les instructions d'installation.
- [PHP 8.x](https://florobart.github.io/Documentations/src/doc_developpement_web.html#php) (avec les extensions suivantes)
- [Composer](https://florobart.github.io/Documentations/src/doc_developpement_web.html#composer)
- [Node.js](https://florobart.github.io/Documentations/src/doc_developpement_web.html#installation-de-nodejs---linux)
- [NPM](https://florobart.github.io/Documentations/src/doc_developpement_web.html#installation-de-npm---linux)
- [XAMPP](https://florobart.github.io/Documentations/src/doc_developpement_web.html#xampp)
  - Vous pouvez également utiliser un autre serveur web, mais vous devrez adapter vous-même les instructions d'installation.
  - Vous pouvez aussi [installer Apache](https://florobart.github.io/Documentations/src/doc_developpement_web.html#apache) et [MySQL](https://florobart.github.io/Documentations/src/doc_developpement_web.html#mysql) séparément, mais XAMPP vous facilitera grandement l'installation et la configuration de ces deux logiciels.

### Installation complète

- [Installer Home Server Maison]()
- [Lancer Home Server Maison]()
- [Installer Finance dashboard]()
- Copier le fichier `.env.example` dans le fichier `.env`
- Remplacer `<nom_de_la_base_de_données>` par le nom que vous voulez donner à la base de données de **Finance dashboard**.
  - Vous pouvez modifier le nom de la base de données, le nom d'utilisateur et le mot de passe dans le fichier `.env` pour s'adapter à votre configuration. Si vous avez laissé les valeurs par défaut lors de l'installation de XAMPP, vous n'avez pas besoin de modifier le fichier `.env`.
- Créer les base de données

  ```bash
  php artisan migrate --database=finance_dashboard
  ```

- Modifier le fichier `routes/web.php` pour remplacer <IP Home Server Maison> pour l'adresse IP et le port de votre serveur Home Server Maison
  - Par exemple, si votre serveur Home Server Maison est accessible à l'adresse `192.168.1.30:3000`, vous devez remplacer `<IP Home Server Maison>` par `http://192.168.1.30:3000` dans le fichier `routes/web.php`.

### Lancer Finance dashboard

- Lancer le serveur

  ```bash
  php artisan serve --host=0.0.0.0 --port=2000
  ```

- Vous pouvez maintenant accéder à l'application à l'adresse `http://<IP Serveur>:2000` (remplacer `<IP Serveur>` par l'adresse IP de votre serveur sur lequel vous avez installé **Finance dashboard**).
  - Notez qu'en suivant ces instructions, vous aurez accès à **Finance dashboard** uniquement si vous êtes connecté au même réseau que votre serveur. Si vous voulez accéder à **Finance dashboard** depuis un autre réseau, vous devrez configurer votre serveur pour qu'il soit accessible depuis l'extérieur. Mais **ATTENTION** je ne recommande pas de le faire si vous n'avez pas les compétences, car cela peut poser des problèmes de sécurité.

### Installation seule

- [Installer Finance dashboard]()
- Copier le fichier `.env.example` dans le fichier `.env`
- Vous pouvez modifier le nom de la base de données si vous le souhaitez, mais ce n'est pas obligatoire. Par défaut, le nom de la base de données est `finance_dashboard`.
  - Vous pouvez modifier le nom de la base de données, le nom d'utilisateur et le mot de passe dans le fichier `.env` pour s'adapter à votre configuration. Si vous avez laissé les valeurs par défaut lors de l'installation de XAMPP, vous n'avez pas besoin de modifier le fichier `.env`.
- Créer les base de données

  ```bash
  php artisan migrate
  ```

- Modifier le fichier `routes/web.php` pour remplacer <IP Home Server Maison> pour l'adresse IP et le port de votre serveur Home Server Maison
  - Par exemple, si votre serveur Home Server Maison est accessible à l'adresse `192.168.1.30:3000`, vous devez remplacer `<IP Home Server Maison>` par `http://192.168.1.30:3000` dans le fichier `routes/web.php`.

### Lancer Finance dashboard seul

- Lancer le serveur

  ```bash
  php artisan serve --host=0.0.0.0 --port=2000
  ```

- Vous pouvez maintenant accéder à l'application à l'adresse `http://<IP Serveur>:2000` (remplacer `<IP Serveur>` par l'adresse IP de votre serveur sur lequel vous avez installé **Finance dashboard**).
  - Notez qu'en suivant ces instructions, vous aurez accès à **Finance dashboard** uniquement si vous êtes connecté au même réseau que votre serveur. Si vous voulez accéder à **Finance dashboard** depuis un autre réseau, vous devrez configurer votre serveur pour qu'il soit accessible depuis l'extérieur. Mais **ATTENTION** je ne recommande pas de le faire si vous n'avez pas les compétences, car cela peut poser des problèmes de sécurité.

## Autheur

Finance dashboard est un projet open-source développé seulement par [Floris Robart](https://florobart.github.io/)

## Report de bug et suggestions

Si vous découvrez une erreur, quelquelle soit, cela peut êgre une faute de frappe ou d'orthographe, une erreur de calcul, une erreur de conception, un bug qui empêche le bon fonctionnement de l'application, ou tout autre problème, Merci de me le signaler par mail à l'adresse [florisrobart.pro@gmail.com](mailto:florisrobart.pro@gmail.com). Toutes les erreurs, quelque soit leur nature ou leur importance, seront traitées le plus rapidement possible.

Si vous avez une une **suggestion**, une **idée**, une **amélioration**, ou une **demande de fonctionnalité**, merci de me la communiquer par mail à l'adresse [florisrobart.pro@gmail.com](mailto:florisrobart.pro@gmail.com). Toutes les suggestions, quelque soit leur nature ou leur importance, seront étudiées et prises en compte dans la mesure du possible.

## License

Finance dashboard est un projet open-source sous licence [GNU General Public License v3.0](https://opensource.org/licenses/GPL-3.0).
