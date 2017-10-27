import { Injectable } from '@angular/core';

export enum ReportItemType {
    food = 'Food',
    travel = 'Travel',
    training = 'Training',
    transport = 'Transport',
    unselected = ''
}

export type ReportItem = {
    description: string;
    amount: number;
    hasReceipt: boolean;
    type: ReportItemType;
    date: Date;
};

function validateFoodItem(item: ReportItem): [boolean, string] {
    if (item.amount >= 50 && !item.hasReceipt) {
        return [false, 'A food item with a value greater than $50 must have a receipt'];
    }
    return [true, ''];
}

function validateReceipt(item: ReportItem): [boolean, string] {
    const message = item.hasReceipt ? '' : 'The item must have a receipt';
    return [item.hasReceipt, message];
}

const validateDate = (minDate: Date, maxDate: Date) => (item): [boolean, string] => {
    const message = +item.date >= +minDate && +item.date <= +maxDate ? '' : 'The date is invalid';
    return [message === '', message];
};

@Injectable()
export class ReportItemService {

    private maxDate: Date;
    private minDate: Date;
    private validateDate: (item: ReportItem) => [boolean, string];

    constructor() {
        const today = new Date();
        this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.minDate = new Date(this.maxDate);
        this.minDate.setMonth(-3);
        this.validateDate = validateDate(this.minDate, this.maxDate);
    }

    isValid(item: ReportItem): [boolean, string] {
        switch (item.type) {
            case ReportItemType.food: {
                const validatedFood = validateFoodItem(item);
                if (!validatedFood[0]) {
                    return validatedFood;
                }
                return this.validateDate(item);
            }
            case ReportItemType.training:
                const validatedFood = validateFoodItem(item);
                if (!validatedFood[0]) {
                    return validatedFood;
                }
            case ReportItemType.transport:
            case ReportItemType.travel: {
                const validatedReceipt = validateReceipt(item);
                if (!validatedReceipt[0]) {
                    return validatedReceipt;
                }
                return this.validateDate(item);
            }
            case ReportItemType.unselected:
            default:
                return [false, 'The item type is not supported'];
        }
    }
}
