
const script = "**/*.{js,ts,tsx}";
const style = "**/*.{sass,scss}";
const font = "**/*.{eot,svg,ttf,woff,woff2}";

export interface IPath {
    buildDir: string,
    fonts: string,
    app: {
        html: string,
        scripts: string,
        main: string,
        renderer: string,
        styles: string,
        buildDir: string,
        distRenderer: string,
        distMain: string,
    },
    vrView: {
        base: string;
        html: string,
        styles: string,
        entryPoint: string,
        scripts: string,
        buildDir: string,
    }
}

const paths: IPath = {
    buildDir: "./dist",
    fonts: `src/${font}`,
    app: {
        buildDir: `dist/app`,
        distRenderer: `dist/app/renderer`,
        distMain: `dist/app/main`,
        html: `src/app/**/index.html`,
        scripts: `src/app/${script}`,
        main: `src/app/main/${script}`,
        renderer: `src/app/renderer/${script}`,
        styles: `src/app/${style}`
    },
    vrView: {
        base: `dist/vrView`,
        html: `src/vrView/index.html`,
        styles: `src/vrView/${style}`,
        entryPoint: `src/vrView/index.tsx`,
        scripts: `src/vrView/${script}`,
        buildDir: `dist/vrView`
    }
}

export default paths;