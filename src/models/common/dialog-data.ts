import { ReactNode } from "react";

export type DialogConfirmationProps ={
    isVisible: boolean,
    isCancelAvailable: boolean,
    dialogTitle: string,
    dialogContentText?: string,
    dialogData?: ReactNode,
    handleAgreeFn: () => void,
}