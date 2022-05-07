import { findIndex } from 'lodash';
import { useState } from 'react';
// material
import { Stack, Box, Avatar, Typography } from '@mui/material';
// utils
import { fToNow } from 'helper/formatTime';
import { format, getTime, formatDistanceToNow } from 'date-fns';
//
// import LightboxModal from '../../LightboxModal';

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
            {
              // <Avatar src={comment.avatar} sx={{ width: 32, height: 32 }} />
            }
            <div className='comment-item'>
              <Stack direction="row" alignItems="center" spacing={1}>
                {
                  // <Typography variant="subtitle2"> {comment.name}</Typography>
                  // <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  //   {new Date()}
                  // </Typography>
                }
              </Stack>

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
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
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
