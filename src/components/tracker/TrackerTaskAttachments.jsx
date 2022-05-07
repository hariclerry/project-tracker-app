import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
// utils
import LightboxModal from "components/commons/LightboxModal";

// ----------------------------------------------------------------------

export default function TrackerTaskAttachments({
  attachments, isAddTask, defaultAttachmentImage
}) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesLightbox = attachments;


  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };
  return (
    <>
      {isAddTask ? (
        <Box
          component="img"
          src={defaultAttachmentImage}
          sx={{
            width: 64,
            height: 64,
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: 1,
            m: 0.5,
          }}
        />
      ) :
        attachments.map((attachment) => (
          <Box
            component="img"
            key={attachment}
            src={attachment}
            sx={{
              width: 64,
              height: 64,
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: 1,
              m: 0.5,
            }}
          />
        ))}



      {!!selectedImage && (
        <LightboxModal
          images={imagesLightbox}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  );
}
