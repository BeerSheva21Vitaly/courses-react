import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { FC } from 'react';
import { DialogConfirmationProps } from '../../models/common/dialog-data';
import { DialogInfoProps } from '../../models/common/dialog-info-data';

const DialogInfo: FC<DialogInfoProps> = (props) => {
    const {isVisible, dialogTitle, dialogContentText, dialogData, handleCloseFn} = props;
    
    return (
        <Dialog
            open={isVisible}
            onClose={handleCloseFn}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {dialogTitle}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {dialogContentText}
                {dialogData}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseFn} autoFocus>
                OK
            </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogInfo;