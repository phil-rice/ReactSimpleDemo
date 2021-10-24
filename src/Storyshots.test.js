import initStoryshots from '@storybook/addon-storyshots';

if (process.env.GITHUB_WORKFLOW) {
    describe("behavior of snapshots in CI/CD", () => {
        it("still needs to be configured", () => {
            console.log("Snapshots are disabled in the CI/CD pipeline.")
            console.log("GITHUB_WORKFLOW", process.env.GITHUB_WORKFLOW)
            console.log("USERNAME", process.env.USERNAME)
            console.log("HOMEPATH", process.env.HOMEPATH)
            console.log("CI", process.env.CI)
        })
    })
} else {
    initStoryshots();
}