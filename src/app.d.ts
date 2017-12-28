interface Window {
    psExpenses: string;
}

type CustomDragEvent = {
    posX: number;
    posY: number;
}

type DragStartEvent = Event & { dragStart: CustomDragEvent };
type DragStopEvent = Event & { dragStop: CustomDragEvent };
