import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

const ImagePreview = ({ file, preview, onRemove }) => {
    return (
        <Box className="border" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
             {preview &&    <div className='position-relative border'>
                        <Box
                            component="img"
                            src={preview}
                            alt="Preview"
                            sx={{ width: '100%', maxWidth: 300, height: 'auto' }}
                        />                    
                        <RestoreFromTrashIcon  onClick={onRemove} sx={{ borderRadius:'50%', backgroundColor:'white',cursor:'pointer'}}
                        className='position-absolute top-0 end-0 text-danger '/>
                </div>
}
        </Box>
    );
};

export default ImagePreview;
