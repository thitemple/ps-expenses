import { ReportDataService } from "./reportData.service";

interface Messenger {
    deliveryMessage(username: string): void;
}

export class MessengerWatcher {
    constructor(private ReportDataService: ReportDataService) { }

    watch() {
        this
            .ReportDataService
            .reportCreated
            .subscribe(x => console.log('New report', x));
    }
}