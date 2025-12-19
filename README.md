# Partiel_Git_Calculator

Calculette simple réalisée en **HTML / CSS / JavaScript** dans le cadre d’un exercice Git (branches, PR, conflits et merges).

## Fonctionnalités

- [x] Addition (`feature/addition`)
- [x] Soustraction (`feature/substraction`)
- [x] Multiplication (`feature/multiplication`)

## Utilisation

1. Ouvrir `index.html` dans un navigateur.
2. Utiliser les boutons de l’interface ou le clavier :
    - Chiffres : `0` à `9`
    - Décimal : `.`
    - Opérations : `+`, `-`, `*` (multiplication)
    - Calcul : `Entrée` ou `=`
    - Effacer : `C` ou `Échap`
    - Retour : `Backspace`

## Structure du projet

- `index.html` : structure de la page et boutons de la calculette
- `style.css` : style de l’interface
- `calculator.js` : logique de calcul et gestion des événements
- `.gitignore` : fichiers/dossiers exclus du dépôt Git
- `README.md` : documentation

## Workflow Git (résumé)

- Branche d’intégration : `develop`
- Branches de fonctionnalités :
    - `feature/addition`
    - `feature/substraction`
    - `feature/multiplication`

Merges effectués dans l’ordre imposé :
1. `feature/addition` → `develop`
2. `feature/substraction` → `develop` (résolution de conflit)
3. `feature/multiplication` → `develop`
