export class ApplicationLogger {
    static Error(Message: string) {
        console.error("[ ! ] " + Message);
    }

    static Info(Message: string) {
        console.info("[ I ] " + Message);
    }

    static Log(Message: string) {
        console.log("[ # ] " + Message);
    }

    static Message(Message: string) {
        console.info(" * "+Message);
    }

    static ServiceEntry(ServiceName: string, Message) {
        console.info(" * " + ServiceName + ": " + Message);
    }
}
