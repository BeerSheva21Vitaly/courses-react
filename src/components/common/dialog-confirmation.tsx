import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { FC } from 'react';
import { DialogConfirmationProps } from '../../models/common/dialog-data';

const DialogConfirmation: FC<DialogConfirmationProps> = (props) => {
    const {isVisible, dialogTitle, dialogContentText, handleCloseFn} = props;
    
    return (
        <Dialog
            open={isVisible}
            onClose={() => handleCloseFn(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseFn(false)}>
                    Cancel
                </Button>
                <Button onClick={() => handleCloseFn(true)} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirmation;