import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const cache = {};

export default [
  {
    input: 'dist/out-tsc/es5/umd.js',
    output: {
      name: 'observables',
      file: 'dist/bundles/observables.umd.js',
      format: 'umd',
      globals: {
        'rxjs': 'rxjs',
        'rxjs/operators': 'rxjs.operators',
        'tslib': 'tslib'
      }
    },
    external: name => {
      if (!cache.hasOwnProperty(name)) {
        // assume any imports that start with a dot are internal
        cache[name] = !/^\./.test(name);
        if (cache[name]) {
          console.log('external:', name);
        }
      }
      return cache[name];
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  }
];
