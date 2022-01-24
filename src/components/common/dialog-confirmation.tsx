import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { FC } from 'react';
import { DialogConfirmationProps } from '../../models/common/dialog-data';

const DialogConfirmation: FC<DialogConfirmationProps> = (props) => {
    const {isVisible, isCancelAvailable, dialogTitle, dialogContentText, dialogData, handleAgreeFn} = props;

    const handleClose = (isOk: boolean) => {
        if(isOk) {
            handleAgreeFn();
        }
    };
    
    return (
        <Dialog
            open={isVisible}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {dialogTitle}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {!!dialogContentText ? dialogContentText : dialogData}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            {isCancelAvailable && <Button onClick={() => handleClose(false)}>Cancel</Button>}
            <Button onClick={() => handleClose(true)} autoFocus>
                OK
            </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirmation;