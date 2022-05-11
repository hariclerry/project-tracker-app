import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
// material
import { MobileDateRangePicker } from '@mui/lab';
import {
  styled, createTheme,
  ThemeProvider
} from '@mui/material/styles';

import {
  Box,
  Stack,
  Drawer,
  Button,
  Avatar,
  Tooltip,
  Divider,
  MenuItem,
  TextField,
  Typography,
  OutlinedInput
} from '@mui/material';
//
import Scrollbar from '../commons/Scrollbar';
import { MIconButton, MHidden } from 'components/@material-extend';
import TrackerTaskCommentList from './TrackerTaskCommentList';
import TrackerTaskAttachments from './TrackerTaskAttachments';
import TrackerTaskCommentInput from './TrackerTaskCommentInput';
import { useDatePicker, DisplayTime } from './TrackerTaskAdd';

// ----------------------------------------------------------------------

const PRIORITIZES = ['low', 'medium', 'hight'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  width: 140,
  fontSize: 13,
  flexShrink: 0,
  color: theme.palette.text.secondary
}));

export default function TrackerTaskDetails({
  card,
  isOpen,
  onClose,
  onDeleteTask
}) {

  const [taskCompleted, setTaskCompleted] = useState(card.completed);
  const [prioritize, setPrioritize] = useState('low');
  const [commentList, setAddComment] = useState([]);
  const [comment, setComments] = useState('');


  const { name, description, due, assignee, attachments } = card;

  const {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate,
    openPicker,
    onOpenPicker,
    onClosePicker
  } = useDatePicker({
    date: due
  });

  const handleToggleCompleted = () => {
    setTaskCompleted((prev) => !prev);
  };

  const handleChangePrioritize = (event) => {
    setPrioritize(event.target.value);
  };

  const handleComments = () => {
    setAddComment([...commentList, comment]);
    setComments('');
  }

  const theme = createTheme();
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        anchor="right"
        PaperProps={{ sx: { width: { xs: 1, sm: 480 } } }}
      >
        <Stack p={2.5} direction="row" alignItems="center">
          <ThemeProvider theme={theme}>
            <MHidden width="smUp">
              <Tooltip title="Back">
                <MIconButton onClick={onClose} sx={{ mr: 1 }}>
                  <Icon icon={arrowIosBackFill} width={20} height={20} />
                </MIconButton>
              </Tooltip>
            </MHidden>
          </ThemeProvider>
          <Button
            size="small"
            variant="outlined"
            color={taskCompleted ? 'primary' : 'inherit'}
            startIcon={!taskCompleted && <Icon icon={checkmarkFill} width={16} height={16} />}
            onClick={handleToggleCompleted}
          >
            {taskCompleted ? 'Complete' : 'Mark complete'}
          </Button>

          <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>

            <Tooltip title="Delete task" >
              <MIconButton onClick={onDeleteTask} size="small" sx={{ color: 'red !important' }}>
                <Icon icon={trash2Outline} width={20} height={20} />
              </MIconButton>
            </Tooltip>

            <Tooltip title="More actions">
              <MIconButton size="small" sx={{ color: 'white' }}>
                <Icon icon={moreHorizontalFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: 'rgb(246 246 246 / 12%)' }} />

        <Scrollbar>
          <Stack spacing={3} sx={{ px: 2.5, py: 3 }}>
            <OutlinedInput
              fullWidth
              multiline
              size="small"
              placeholder="Task name"
              value={name}
              sx={{
                typography: 'h6',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                color: 'white'
              }}
            />
            <Stack direction="row">
              <LabelStyle sx={{ mt: 1.5, color: 'rgb(145, 158, 171)' }}>Assignee</LabelStyle>
              <Stack direction="row" flexWrap="wrap" alignItems="center">
                {assignee.length > 0 ?
                  assignee.map((user) => (
                    <Avatar
                      key={user.id}
                      alt={user.name}
                      src={user.avatar}
                      sx={{ m: 0.5, width: 36, height: 36 }}
                    />
                  )) : (
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      <Avatar />
                    </Typography>
                  )

                }
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle sx={{ color: 'rgb(145, 158, 171)' }}> Due date</LabelStyle>
              <>
                {startTime && endTime ? (
                  <DisplayTime
                    startTime={startTime}
                    endTime={endTime}
                    isSameDays={isSameDays}
                    isSameMonths={isSameMonths}
                    onOpenPicker={onOpenPicker}
                    sx={{ typography: 'body2', color: 'rgb(145, 158, 171)' }}
                  />
                ) : (
                  <Tooltip title="Add assignee">
                    <MIconButton
                      onClick={onOpenPicker}
                      sx={{
                        p: 1,
                        ml: 0.5,
                        border: (theme) => `dashed 1px ${theme.palette.divider}`,
                        color: 'rgb(145, 158, 171)'
                      }}
                    >
                      <Icon icon={plusFill} width={20} height={20} sx={{ color: 'rgb(145, 158, 171)', border: '1px dashed rgba(145, 158, 171, 0.24)' }} />
                    </MIconButton>
                  </Tooltip>
                )}

                <MobileDateRangePicker
                  open={openPicker}
                  onClose={onClosePicker}
                  onOpen={onOpenPicker}
                  value={dueDate}
                  onChange={onChangeDueDate}
                  // @ts-ignore
                  renderInput={() => { }}
                />
              </>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle sx={{ color: 'rgb(145, 158, 171)' }}>Prioritize</LabelStyle>
              <TextField
                fullWidth
                select
                size="small"
                value={prioritize}
                onChange={handleChangePrioritize}
                sx={{
                  '& svg': { display: 'none' },
                  '& fieldset': { display: 'none' },
                  '& .MuiSelect-select': {
                    p: 0, display: 'flex', alignItems: 'center',
                  }
                }}
              >
                {PRIORITIZES.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Box
                      sx={{
                        mr: 1,
                        width: 14,
                        height: 14,
                        borderRadius: 0.5,
                        bgcolor: 'error.main',
                        ...(option === 'low' && { bgcolor: 'info.main' }),
                        ...(option === 'medium' && { bgcolor: 'warning.main' })
                      }}
                    />
                    <Typography variant="body2" sx={{ textTransform: 'capitalize', color: 'rgb(145, 158, 171)' }}>
                      {option}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2, color: 'rgb(145, 158, 171)' }}>Description</LabelStyle>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Task Description"
                value={description}
                sx={{ typography: 'body2', color: 'white' }}
              />
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2, color: 'rgb(145, 158, 171)' }}>Attachments</LabelStyle>
              <Stack direction="row" flexWrap="wrap">
                {
                  attachments.length === 0 ?
                    <Typography variant="body2" sx={{ marginTop: '16px', color: 'rgb(145, 158, 171)' }}>
                      Attachment placeholder
                    </Typography>

                    :
                    <TrackerTaskAttachments
                      attachments={attachments}
                    />

                }
              </Stack>
            </Stack>
          </Stack>

          {commentList.length > 0 && <TrackerTaskCommentList comments={commentList} />}
        </Scrollbar>

        <Divider sx={{ borderColor: 'rgb(246 246 246 / 12%)' }} />

        <TrackerTaskCommentInput onHandleComments={handleComments} setComments={setComments} />
      </Drawer>
    </>
  );
}
