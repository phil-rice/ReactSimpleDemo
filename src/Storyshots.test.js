import initStoryshots from '@storybook/addon-storyshots';

if (process.env.CI) {
    describe("behavior of snapshots in CI/CD", () => {
        it("still needs to be configured", () => {
          console.log("Snapshots are disabled in the CI/CD pipeline.")
        })
    })
} else {
    initStoryshots();
}