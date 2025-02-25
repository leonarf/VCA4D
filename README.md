# VCA4D

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Install

- Install [Node.js](https://nodejs.org/en/) (which installs npm in the process)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint and prettier

```sh
npm run lint

npm run prettier
```

## Add a new study

- Navigate to the `/admin-import` url. A link is available in the footer.
- Click the `Browse` button and submit your Excel file.
- In case there is no errors, the page displays some information it retrieved from the excel file. Your study is now available in the `Home` page, you can browse it like any other study.

### Add the study permanently on the website

- Download the two files (using the two blue buttons).
- With the current github hosting, you just need to replace the `data.json` file and add the study file in the correct folder inside /data/ in a Pull Request on the `main` branch.
- Merging on main will automatically deploy [the new website](https://VCA4D.github.io/VCA4D/dist/)
- If you have a 6-page PDF summary, or the full report PDF, you can add them in the same folder previously created. The PDF name should have the same name as the study json file. (For example, if the study file is named `banana-mali-social.json` or `banana-mali-eco.json`, the pdf should be named `banana-mali-brief-report.pdf` or `banana-mali-full-report.pdf`)

### Unknown commodity

If the study you have added has its commodity in the `Unknown` category, you can fix this by modifying the `data.json` file.
In the "categories" section, you will see that your commodity is in the "unknown" section, you can remove it from there and add it in the section of your choice in the "commodities" array.

### Icons

If a commodity doesn't have an icon, you can add one in `src/images/icons/products` (it should be a .svg file).

**Ex**: Let's add the 'peanut' icon

- Add a `peanut.svg` in `src/images/icons/products/peanut.svg`
- Import it in `src/views/HomeView.vue`

```
import PeanutLogo from '@images/icons/products/peanut.svg'
```

- Add a case in this section

```
const getProductLogo = (product) => {
    switch(product) {
        case 'milk':
            return MilkLogo
        case 'groundnut':
            return PeanutLogo
    }
}
```

### Unknown Currency

For now currency rates are hardcoded in `const CHANGE_RATES` in `src/utils/currency.js`. You can add values to cover new currencies. A future version should use an API to automatically retrieve currency rates.
