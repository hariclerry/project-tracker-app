import { Icon } from "@iconify/react";
import attach2Fill from "@iconify/icons-eva/attach-2-fill";
import roundAddPhotoAlternate from "@iconify/icons-ic/round-add-photo-alternate";
// material
import { Stack, Paper, Button, Tooltip, OutlinedInput } from "@mui/material";
//
import { MIconButton } from "components/@material-extend";

export default function TrackerTaskCommentInput({ onHandleComments, setComments }) {
  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1 }}>
        <OutlinedInput
          fullWidth
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ "& fieldset": { display: "none" } }}
          onChange={(e) => setComments(e.target.value)}
        />

        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
        >

          <Button variant="contained" onClick={() => {
            onHandleComments();
            setComments('');
          }}>Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
