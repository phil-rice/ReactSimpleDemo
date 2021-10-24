import React from "react";

export const parameters = {
    // docs: {
    //     source: {
    //         state: 'open',
    //     },
    // },
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },

}
export const decorators = [
    (Story) => (
        <div>
            <link rel="stylesheet" type="text/css" href="../index.css" media="screen"/>
            <Story/>
        </div>
    ),
];