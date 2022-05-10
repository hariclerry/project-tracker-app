import { findIndex } from 'lodash';
import { useState } from 'react';
// material
import { Stack, Box, Avatar, Typography } from '@mui/material';
// utils
import { format } from 'date-fns';

export default function TrackerTaskCommentList({ comments }) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesLightbox = comments
    .filter((comment) => comment.messageType === 'image')
    .map((item) => item.message);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Stack spacing={3} sx={{ py: 3, px: 2.5, bgcolor: 'background.neutral' }}>
        {comments.map((comment, index) => (
          <Stack key={index} direction="row" spacing={2}>
            <div className='comment-item'>
              {comment.messageType === 'image' ? (
                <Box
                  component="img"
                  src={comment.message}
                  onClick={() => handleOpenLightbox(comment.message)}
                  sx={{ mt: 2, borderRadius: 1 }}
                />
              ) : (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {comment}
                </Typography>
              )}
              <Typography variant="caption" sx={{ color: 'rgb(165 159 159 / 60%)' }}>
                {format(new Date(), 'dd MMM yyyy p')}
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>

      {!!selectedImage && (
        <div>    No image</div>

        // <LightboxModal
        //   images={imagesLightbox}
        //   photoIndex={selectedImage}
        //   setPhotoIndex={setSelectedImage}
        //   isOpen={openLightbox}
        //   onClose={() => setOpenLightbox(false)}
        // />
      )}
    </>
  );
}
