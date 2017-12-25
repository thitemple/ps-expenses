import { ReportDataService } from "./reportData.service";
import { Report, Messenger } from "../types";

class ReportCreatedMessenger implements Messenger {
    deliveryMessage(report: Report, user: string): void {
        console.log(`A new report with id ${report.id} was created by the user ${user}`);
    }

}

class ReportApprovedMessenger implements Messenger {
    deliveryMessage(report: Report) {
        console.log(`The report id: ${report.id} is now ${report.approved ? 'approved' : 'rejected'}`);
    }
}
    

class ReportRejectMessenger implements Messenger {
    deliveryMessage(_report: Report, user: string) {
        console.log(`The user ${user} has reject one of your reports`);
    }
}

type MessengerEventsHandled = 
    'MessengerReportCreated' |
    'MessengerReportApproved' |
    'MessengerReportRejected';

function getMessenger(event: MessengerEventsHandled): Messenger {
    switch (event) {
        case 'MessengerReportCreated':
            return new ReportCreatedMessenger();
        case 'MessengerReportApproved':
            return new ReportApprovedMessenger();
        case 'MessengerReportRejected':
            return new ReportRejectMessenger();
    }
}

export class MessengerWatcher {
    constructor(private ReportDataService: ReportDataService) { }

    watch() {
        this
            .ReportDataService
            .reportCreated
            .subscribe(report => getMessenger('MessengerReportCreated')
                .deliveryMessage(report, 'someUser'));

        this
            .ReportDataService
            .reportApprovedReject
            .subscribe(({ report, user }) => {
                const eventType = report.approved ? 
                    'MessengerReportApproved' :
                    'MessengerReportRejected';
                getMessenger(eventType)
                    .deliveryMessage(report, user);
            });
    }
}