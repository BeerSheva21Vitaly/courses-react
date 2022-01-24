import { ReactNode } from "react";

export type DialogConfirmationProps ={
    isVisible: boolean,
    dialogTitle: string,
    dialogContentText: string,
    handleCloseFn: (isOk: boolean) => void,
}