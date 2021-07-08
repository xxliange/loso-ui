module.exports = {
    stories: ['../pages/*.storeis.tsx'],
    addons: [
        '@storybook/addon-actions/register',
        '@storybook/addon-viewport/register',
        'storybook-addon-intl/register',
        {
            name: '@storybook/preset-typescript',
            options: {
                tsLoaderOptions: {
                    transpileOnly: true,
                },
            },
        },
    ],
}