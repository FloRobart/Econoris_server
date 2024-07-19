# Convention de nommage

## Table des matières

- [Convention de nommage](#convention-de-nommage)
  - [Table des matières](#table-des-matières)
  - [Convention de nommage générale des routes](#convention-de-nommage-générale-des-routes)
    - [URLs des routes](#urls-des-routes)
    - [Nommage des routes](#nommage-des-routes)
  - [Convention d'organisation des routes](#convention-dorganisation-des-routes)
    - [Salaires](#salaires)
    - [Épargnes](#épargnes)
    - [Investissements](#investissements)

## Convention de nommage générale des routes

### URLs des routes

- Routes d'affichage : `/categories/<key>/{<value>}`
  - Exemple : `/salaires/date/{date}` --> `/salaires/date/2021-01-01`
- Routes d'action : `/categorie/action`
  - Exemple : `/salaire/add` --> `/salaire/add`

### Nommage des routes

- Routes d'affichage : `categories.<key>`
  - Exemple : `salaires.date`
- Routes d'action : `categorie.<action>`
  - Exemple : `salaire.add`

## Convention d'organisation des routes

**Ordre à respecter pour les routes d'affichage et surtout pour le tableau qui gère le fil d'ariane.**

### Salaires

- Date
- employeur

### Épargnes

- Date
- Banque
- Compte

### Investissements

- Date
- Type (type_investissement)
- Nom (nom_actif)
