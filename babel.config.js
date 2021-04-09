module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: { version: '3.8', proposals: true },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
          allowDeclareFields: true,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-syntax-dynamic-import',
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    ],
  };
};
