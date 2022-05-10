// material
import { Stack, Paper, Button, OutlinedInput } from "@mui/material";

export default function TrackerTaskCommentInput({ onHandleComments, setComments }) {
  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, backgroundColor: 'rgb(33, 43, 54)', border: '1px solid rgba(145, 158, 171, 0.12)' }}>
        <OutlinedInput
          fullWidth
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ "& fieldset": { display: "none" }, }}
          onChange={(e) => setComments(e.target.value)}
          className="comment-placeholder"
        />

        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
        >

          <Button variant="contained" sx={{ backgroundColor: 'rgb(6 135 6)' }}
            onClick={() => {
              onHandleComments();
              setComments('');
            }}>Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
