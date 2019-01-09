import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs";
import buildins from "rollup-plugin-node-builtins";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const output = {
    name: "bundle",
    folder: "build"
}

const getRelatedOutput = (subfolder, extension = "js") => `${output.folder}/${subfolder}/${output.name}.${extension}`;


const external = [
    // ...Object.keys(pkg.dependencies || {}),
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
        commonjs({
            namedExports: {
                "node_modules/react-redux/dist/react-redux.min.js": "react-redux",
                "node_modules/redux-thunk/dist/redux-thunk.min.js": ["redux-thunk"],
                "node_modules/react/index.js": [
                    "Component",
                    "Children",
                    "PureComponent",
                    "createElement",
                    "PropTypes"
                ],
                "node_modules/react-is/index.js": ["isValidElementType"]
            }
        }),
        json(),
        buildins(),
        nodeResolve({
            browser: true
        })
    ]
}, /*{
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("es"),
        format: "es",
        indent: false
    },
    external,
    plugins: [babel()]
}, {
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("es", "mjs"),
        format: "es",
        indent: false
    },
    external,
    plugins: [
        nodeResolve({
            jsnext: true
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
}, {
    input: pkg.input,
    output: {
        name: pkg.name,
        file: getRelatedOutput("dist", "min.js"),
        format: "umd",
        // globals: {
        //     "react": "React",
        //     "axios": "axios",
        //     "react-redux": "react-redux"
        // },
        indent: false
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
    ]*/
]