import { Subjects, PaymentCreatedEvent, Publisher } from "@cygnetops/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}