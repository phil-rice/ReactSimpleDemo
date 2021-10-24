import initStoryshots from '@storybook/addon-storyshots';

if (process.env.NOSNAPSHOTS) {
    describe("behavior of snapshots when disabled", () => {
        it("they don't do anything", () => {
        })
    })
} else {
    initStoryshots();
}