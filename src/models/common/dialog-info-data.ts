import { ReactNode } from "react";

export type DialogInfoProps ={
    isVisible: boolean,
    dialogTitle: string,
    dialogContentText?: string,
    dialogData: ReactNode,
    handleCloseFn: () => void,
}