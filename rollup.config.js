import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const output = {
    name: "bundle",
    folder: "build"
}

const getRelatedOutput = (subfolder, extension = "js") => `${output.folder}/${subfolder}/${output.name}.${extension}`;


const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
];

export default [{
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("lib"),
        format: "cjs",
    },
    external,
    plugins: [
        babel(),
        commonjs()
    ]
}, {
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("es"),
        format: "es"
    },
    external,
    plugins: [babel()]
}, {
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("es", "mjs"),
        format: "es"
    },
    external,
    plugins: [
        resolve({ jsnext: true }),
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    ]
}, {
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("dist", "min.js"),
        format: "umd",
        globals: {
            "react": "React",
            "axios": "axios",
            "react-redux": "react-redux",
            "reselect": "reselect"
        }
    },
    external,
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    ]
}]