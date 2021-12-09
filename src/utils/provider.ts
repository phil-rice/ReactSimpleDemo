import {Pact, PactOptionsComplete} from "@pact-foundation/pact";
import path from "path";
import wrapper from "@pact-foundation/pact-node";

export const pactProvider: Pact = new Pact({
    consumer: "Browser",
    provider: "CMSBackend",
    cors: true,
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "info",
})

var count = 0

export async function provider(): Promise<Pact> {
    count += 1
    if (count != 1) {
        process.on("SIGINT", () => {
            wrapper.removeAllServers()
        })
        await pactProvider.setup()
        return pactProvider
    }
    return Promise.resolve(pactProvider)
}
