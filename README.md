# Éconoris

# Table des matières

<details>
<summary>Expand contents</summary>

- [Éconoris](#éconoris)
- [Table des matières](#table-des-matières)
- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Architecture de l'application](#architecture-de-lapplication)
- [Architecture de la base de données](#architecture-de-la-base-de-données)
  - [Modèle Conceptuel de Données (MCD)](#modèle-conceptuel-de-données-mcd)
  - [Modèle Logique de Données (MLD)](#modèle-logique-de-données-mld)
- [Routes available](#routes-available)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Autheur](#autheur)
- [Report de bug et suggestions](#report-de-bug-et-suggestions)
- [License](#license)

</details>

# Présentation

Éconoris est une API web de gestion de finances personnelles. Elle permet de suivre ses dépenses, ses revenus, ses investissements, ses horaires et bien d'autre chose.

Toute-fois, cette API n'est pas déstinée à remplacer un logiciel de comptabilité professionel ni même l'application de votre banque. Elle est plutôt déstinée à vous aider à mieux gérer vos finances personnelles, à suivre vos dépenses, vos revenus, vos abonnements, vos investissements et autres.

# Fonctionnalités

- [x] Gestion des dépenses
- [x] Gestion des revenus
- [x] Gestion des investissements
- [x] Gestion des abonnements
- [x] Gestion des horaires
- [x] Gestion automatique des revenues en fonction des horaires et du taux horaire
- [x] Gestion automatique des dépenses en fonction des abonnements
- [x] Indice de satisfaction financière
- [x] Conseils financiers
- [x] Gestion des objectifs financiers
- [x] Gestion des prêts

# Architecture de l'application

```mermaid
flowchart RL

A[(Database)] <--> |SQL| B[Models]
B <==> C[Controllers]
C -.-> |HTTP Response: JSON| F{Client}
F --> |HTTP Request| C
```

# Architecture de la base de données

## Modèle Conceptuel de Données (MCD)

```mermaid
classDiagram
  direction TB

  class operations{
    **id** : Interger
    **operations_date** : Date
    **amount** : Numeric
    **source** : Varchar
    **dest** : Varchar
    **costs** : Numeric
    **categ** : Varchar
    **validate** : Boolean
    **redundancy** : Varchar
  }

  class loans {
    **id** : Interger
    **loans_date** : Date
    **borrower** : Varchar
    **amount** : Numeric
    **refunded_amount** : Numeric
    **loan_reason** : Varchar
  }

  class timetable{
    **id** : Interger
    **timetable_date** : Date
    **hours_number** : Numeric
    **hourly_rate** : Numeric
  }
```

## Modèle Logique de Données (MLD)

- **operations**(<u>operations_id</u>, operations_date, operations_amount, operations_source, operations_dest, operations_costs, operations_categ, operations_validate, operations_redundancy, loans_createdat, operations_userid)
- **loans**(<u>loans_id</u>, loans_date, loans_borrower, loans_amount, loans_refundedamount, loans_loanreason, loans_createdat, loans_userid)
- **timetable**(<u>timetable_id</u>, timetable_date, timetable_hoursnumber, timetable_hourlyrate, timetable_createdat, timetable_userid)

# Routes available

**For full documentation please see [https://domaine.name/api-docs](#routes-available) or read '`/docs/swagger.json`' in [Swagger editor](https://editor.swagger.io/)**

| Action | Méthode | Route | Type de données retournée | Description |
|:------:|:-------:|:------|:--------------------------|:------------|
| Select | GET | /operations | JSON | Get all operations |
| Select | POST | /operations/get | JSON | Get a part of the operations |
| Create | POST | /operations | JSON | Create one or multiple operations |
| Create | POST | /operation | JSON | Create only one operation |
| Update | PUT | /operations | JSON | Update one or multiple operations |
| Delete | DELETE | /operations | JSON | Delete one or multiple operations |

# Technologies utilisées

Éconoris est une application web développée avec les technologies suivantes :

- Langages :
  - [JavaScript (TypeScript)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
  - [*HTML*](https://developer.mozilla.org/fr/docs/Web/HTML)
  - [*CSS*](https://developer.mozilla.org/fr/docs/Web/CSS)
- Frameworks et librairies :
  - [ExpressJS](https://www.npmjs.com/package/express)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [strftime](https://www.npmjs.com/package/strftime)
  - [path](https://www.npmjs.com/package/path)
  - [node postgres](https://www.npmjs.com/package/pg)
- Base de données :
  - [PostgreSQL](https://www.postgresql.org/)
- Deployement :
  - [Docker](https://www.docker.com/)

# Installation

comming soon...

# Autheur

Éconoris est un projet open-source développé uniquement par [Floris Robart](https://florobart.github.io/)

# Report de bug et suggestions

Si vous découvrez une erreur, quelquelle soit, cela peut êgre une faute de frappe ou d'orthographe, une erreur de calcul, une erreur de conception, un bug qui empêche le bon fonctionnement de l'application, ou tout autre problème, Merci de me le signaler par mail à l'adresse [florobart.github@gmail.com](mailto:florobart.github@gmail.com). Toutes les erreurs, quelque soit leur nature ou leur importance, seront traitées le plus rapidement possible.

Si vous avez une une **suggestion**, une **idée**, une **amélioration**, ou une **demande de fonctionnalité**, merci de me la communiquer par mail à l'adresse [florobart.github@gmail.com](mailto:florobart.github@gmail.com). Toutes les suggestions, quelque soit leur nature ou leur importance, seront étudiées et prises en compte dans la mesure du possible.

# License

Éconoris est un projet open-source sous licence [GNU General Public License v3.0](https://opensource.org/licenses/GPL-3.0).
