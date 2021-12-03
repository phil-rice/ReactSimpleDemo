import {Pact} from "@pact-foundation/pact";
import path from "path";

export const provider = new Pact({
    consumer: "Browser",
    provider: "CMSBackend",
    cors: true,
    port: 1234,
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "info",
})