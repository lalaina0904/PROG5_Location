## Location de voiture

Cette application console vous permet de simuler la réservation de voiture via une interface simple et intuitive.

Chaque version est implémentée dans un langage différent sur sa propre branche.

---

## Branches disponibles

| Langage    | Branche GitHub                                                      |
| ---------- | ------------------------------------------------------------------- |
| Python     | [python](https://github.com/lalaina0904/PROG5_Location/tree/python) |
| JavaScript | [js](https://github.com/lalaina0904/PROG5_Location/tree/js)         |
| TypeScript | [ts](https://github.com/lalaina0904/PROG5_Location/tree/ts)         |
| Java       | [java](https://github.com/lalaina0904/PROG5_Location/tree/java)     |

### Python

1. Cloner la branche :

    ```bash
    git checkout python
    ```

2. créer un env virtuel :

    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Installer les dépendances :

    ```bash
    pip install colorama
    ```

4. Exécuter :

    ```bash
    python location_app.py
    ```

---

### JavaScript (Node.js)

1. Cloner la branche :

    ```bash
    git checkout js
    ```

2. Exécuter :
    ```bash
    node location.js
    ```
---

### TypeScript

1. Cloner la branche :

    ```bash
    git checkout ts
    ```

2. Compiler et Exécuter :
    ```bash
    npx tsc location.ts
    node location.js
    ```

---

### Java

1. Cloner la branche :

    ```bash
    git checkout java
    ```

2. Compiler depuis le dossier src/ :

    ```bash
     cd src
     javac app/Main.java
    ```

3. Exécuter :
    ```bash
    java app.Main
    ```
