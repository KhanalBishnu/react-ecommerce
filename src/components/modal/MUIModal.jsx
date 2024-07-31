import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '8px',
  overflow: 'hidden',
};

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 18px',
  backgroundColor: '#1488bfba',
  color: '#fff',
});

const Body = styled('div')({
  padding: '24px',
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '16px 24px',
  borderTop: '1px solid #e9ecef',
  backgroundColor: '#f9f9f9',
});

const CustomBackdrop = styled(Backdrop)({
  backgroundColor: '#8b9ab9cc', // Darker background color when modal is open
});

export default function MUIModal({ showModal, handleCloseModal, modalBody, header, isDelete = false }) {
  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={CustomBackdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isDelete ? '45%' : "70%",
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Header>
              <Typography id="transition-modal-title" variant="h6" component="h5">
                {header}
              </Typography>
              <IconButton onClick={handleCloseModal} sx={{ color: '#fff' }}>
                <CloseIcon />
              </IconButton>
            </Header>
            <Body>
              {modalBody}
            </Body>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
