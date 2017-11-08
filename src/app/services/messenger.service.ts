import { ReportDataService, Report } from "./reportData.service";

interface Messenger {
    deliveryMessage(report: Report, user: string): void;
}

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

function getMessenger(event: string): Messenger {
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
                getMessenger(`MessengerReport${report.approved ? 'Approved' : 'Rejected'}`)
                    .deliveryMessage(report, user);
            });
    }
}