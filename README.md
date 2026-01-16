# 🧪 Projet Automatisation QA - Playwright (Test 1)

**Auteur :** [Votre Nom]  
**Technologie :** Playwright (JavaScript)  
**Cible :** [Saucedemo.com](https://www.saucedemo.com)  
**CI/CD :** GitHub Actions

---

## 📑 1. Vue d'ensemble du Test
**Scénario :** Filtrage des produits et vérification de l'ordre de tri.  
Ce test automatise la validation du tri des produits par prix sur la page d'inventaire. C'est une fonctionnalité critique pour l'expérience utilisateur e-commerce.

### Étapes du scénario (Spec Playwright 1) :
1.  **Connexion** (Via `beforeAll`) avec `standard_user`.
2.  Vérification du tri par défaut (Nom A-Z).
3.  Application du filtre **"Price (low to high)"**.
4.  Extraction et validation mathématique de l'ordre croissant des prix.
5.  Capture d'écran de preuve.
6.  Application du filtre **"Price (high to low)"**.
7.  Vérification des bornes (Premier item = plus cher, Dernier item = moins cher).

---

## ⚙️ 2. Implémentation Technique

### Structure du Projet
```text
├── .github/workflows/   # Configuration CI (GitHub Actions)
├── playwright_tests/    # Scripts de test
│   └── product_sort.spec.js
├── reports/             # Rapports HTML et Screenshots
└── package.json         # Dépendances (Playwright)# automation-project-saucedemo
Projet d'automatisation de tests pour Saucedemo.com
