const compileModules = [
  'react-sticky-box',
  'rc-tween-one',
  '@babel',
  '@ant-design',
  'countup.js',
  '.pnpm',
];

const ignoreList = [];

// cnpm use `_` as prefix
['', '_'].forEach((prefix) => {
  compileModules.forEach((module) => {
    ignoreList.push(`${prefix}${module}`);
  });
});

const transformIgnorePatterns = [
  // Ignore modules without es dir.
  // Update: @babel/runtime should also be transformed
  `[/\\\\]node_modules[/\\\\](?!${ignoreList.join('|')})[^/\\\\]+?[/\\\\](?!(es)[/\\\\])`,
];

function getTestRegex(libDir) {
  if (['dist', 'lib', 'es', 'dist-min'].includes(libDir)) {
    return 'demo\\.test\\.(j|t)sx?$';
  }
  return '.*\\.test\\.(j|t)sx?$';
}

export default {
  verbose: true,
  testEnvironment: '@happy-dom/jest-environment',
  setupFiles: ['./tests/setup.ts', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  modulePathIgnorePatterns: ['/stories/', '/.storybook/'],
  moduleNameMapper: {
    '/\\.(css|less)$/': 'identity-obj-proxy',
    '^@ant-design/x$': '<rootDir>/components/index',
    '^@ant-design/x/es/(.*)$': '<rootDir>/components/$1',
    '^@ant-design/x/lib/(.*)$': '<rootDir>/components/$1',
    '^@ant-design/x/locale/(.*)$': '<rootDir>/components/locale/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', 'image.test.js', 'image.test.ts'],
  transform: {
    '\\.tsx?$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.(m?)js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './node_modules/@ant-design/tools/lib/jest/imagePreprocessor',
  },
  // eslint-disable-next-line no-undef
  testRegex: getTestRegex(process.env.LIB_DIR),
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/*/style/index.tsx',
    '!src/style/index.tsx',
    '!src/*/locale/index.tsx',
    '!src/*/__tests__/type.test.tsx',
    '!src/**/*/interface.{ts,tsx}',
    '!src/*/__tests__/image.test.{ts,tsx}',
    '!src/__tests__/node.test.tsx',
    '!src/*/demo/*.tsx',
    '!src/*/design/**',
  ],
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  // bail: true,
  maxWorkers: '50%',
};
