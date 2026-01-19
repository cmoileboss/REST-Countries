# Construire une application front-end moderne à partir de données issues d’une API publique
Par *Guillaume PEDRONA* et *Pierre Jannot*.

## COMMENT LANCER LE SITE ?

Se rendre dans le dossier countries-api puis lancer les commandes suivantes :
```npm install vite```
```npm run dev```

## Explication des rôles des différents éléments de l'application

L'application intialisée présente 3 dossiers :
    node_modules qui contient les modules de base de React.js
    public ?
    src qui représente le coeur du programme avec les pages, les composants et les scripts associés

App.js : Script générant la page HTML par défaut de l'application
App.css : Style de App.js
App.test.js : Script de tests sur App.js

Nous avons créé deux dossiers controllers et components.

### Dossier controllers
Ce dossier contient nos controllers qui ont permis de consommer les endpoints de l'API Rest-Countries.
Nous avons utilisé deux fonctions fetch() :
- getAllCountries() permet de récupérer de manière asynchrone la liste des pays de l'API avec certaines informations de base ;
- getCountry(country_name) permet de récupérer un pays en fonction de son nom avec toutes les données qui lui sont associées.

### Qu'est-ce que l'asynchrone ?
Lorsque nous codons de manière synchronisée, chaque tâche doit être finie avant de passer à la suivante.
C'est très limitant pour les appels d'API car ils peuvent prendre du temps et bloquer l'exécution de tout le programme. Pour éviter cela, on passe à l'asynchrone. Une opération asynchrone est représentée par une Promise qui possède trois états :
- un état d'attente de la donnée ;
- un état où la donnée a été reçue ;
- un état s'activant en cas d'erreur.

En JavaScript, la fonction fetch() est asynchrone et nous avons utilisé les états propres à React pour pouvoir utiliser l'asynchrone, enregistrer les données et pouvoir réagir lors du moindre changement de données.

### Dossier components
Notre site possède trois composants jsx ayant un style spécifique écrit dans un fichier css :

**countries-list**
C'est la liste des pays de l'API apparaissant au chargement de la page, elle affiche chaque pays sous forme de cartes (3 par ligne) avec des informations de base (capitale, superficie, population, continent, densité et drapeau).
Il est possible d'ordonner les pays par ordre alphabétique, population, superficie ou densité, et de les filtrer par continent grâce à deux composants Select.
Un champ texte permet de retrouver un pays spécifique.

**country-card**
C'est le composant permettant d'afficher les pays dans countries-list.

**country-details**
C'est le composant qui s'affiche lorsque l'on clique sur un country-card. Elle affiche des informations plus poussées sur le pays sélectionné.