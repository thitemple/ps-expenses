import { Injectable } from '@angular/core';
import { ReportItem, ReportItemType } from '../types';

function validateRequired(item: ReportItem): boolean {
    const exclude: (keyof ReportItem)[] = ['hasReceipt']
    return Object.keys(item).reduce((isValid, memberKey: keyof ReportItem) => {
        if (!isValid) {
            return isValid;
        }
        return exclude.includes(memberKey) || !!item[memberKey];
    }, true);
}

function validateFoodItem(item: ReportItem): string {
    if (item.amount >= 50 && !item.hasReceipt) {
        return 'A food item with a value greater than $50 must have a receipt';
    }
    return '';
}

function validateReceipt(item: ReportItem): string {
    return item.hasReceipt ? '' : 'The item must have a receipt';
}

function validateTraining(item: ReportItem) {
    if (item.amount < 50 && !item.hasReceipt) {
        return '';
    }
    return 'A training item with a value greater than $50 must have a receipt';
}

const validateDate = (minDate: Date, maxDate: Date) => (item: ReportItem): string => {
    return +item.date >= +minDate && +item.date <= +maxDate ? '' : 'The date is invalid';
};

@Injectable()
export class ReportItemService {
    private validateDate: (item: ReportItem) => string;

    constructor() {
        const today = new Date();
        const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const minDate = new Date(maxDate);
        minDate.setMonth(-3);
        this.validateDate = validateDate(minDate, maxDate);
    }

    isValid(item: ReportItem): string {
        if(!validateRequired(item)) {
            return 'Some of the required fields where not filled.'
        }
        switch (item.type) {
            case ReportItemType.food: {
                const validatedFood = validateFoodItem(item);
                if (validatedFood) {
                    return validatedFood;
                }
                return this.validateDate(item);
            }
            case ReportItemType.training:
                return validateTraining(item);
            case ReportItemType.officeSupplies:
            case ReportItemType.transport:
            case ReportItemType.travel: {
                const validatedReceipt = validateReceipt(item);
                if (validatedReceipt) {
                    return validatedReceipt;
                }
                return this.validateDate(item);
            }
            case ReportItemType.unselected:
                return 'Please select an item type';
        }
    }
}
