import FirebaseConfig from "./firebase-config"

const configClasses = [
    FirebaseConfig,
]

export async function runAllConfigurations() {
    for (let configClass of configClasses) {
        const config = new configClass()
        await config.configure()
    }
}

export default interface Config {
    configure(): Promise<void> | void
}