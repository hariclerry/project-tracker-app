import { trim } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import radioButtonOffOutline from '@iconify/icons-eva/radio-button-off-outline';
import checkmarkCircle2Outline from '@iconify/icons-eva/checkmark-circle-2-outline';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
// material
import {
  Box,
  Paper,
  Stack,
  Tooltip,
  Checkbox,
  OutlinedInput,
  ClickAwayListener
} from '@mui/material';
import { MobileDateRangePicker } from '@mui/lab';
//
import { MIconButton } from 'components/@material-extend';

import TrackerTaskAttachments from './TrackerTaskAttachments';

const defaultTask = {
  attachments: [],
  comments: [],
  description: '',
  due: [null, null],
  assignee: []
};

export function useDatePicker({ date }) {
  const [dueDate, setDueDate] = useState([date[0], date[1]]);
  const [openPicker, setOpenPicker] = useState(false);

  const startTime = dueDate[0] || '';
  const endTime = dueDate[1] || '';

  const isSameDays = isSameDay(new Date(startTime), new Date(endTime));
  const isSameMonths = isSameMonth(new Date(startTime), new Date(endTime));

  const handleChangeDueDate = (newValue) => {
    setDueDate(newValue);
  };

  const handleOpenPicker = () => {
    setOpenPicker(true);
  };

  const handleClosePicker = () => {
    setOpenPicker(false);
  };

  return {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate: handleChangeDueDate,
    openPicker,
    onOpenPicker: handleOpenPicker,
    onClosePicker: handleClosePicker
  };
}

export function DisplayTime({
  startTime,
  endTime,
  isSameDays,
  isSameMonths,
  onOpenPicker,
  sx
}) {
  const style = {
    typography: 'caption',
    cursor: 'pointer',
    '&:hover': { opacity: 0.72 }
  };

  if (isSameMonths) {
    return (
      <Box onClick={onOpenPicker} sx={{ ...style, ...sx }}>
        {isSameDays
          ? format(new Date(endTime), 'dd MMM')
          : `${format(new Date(startTime), 'dd')} - ${format(new Date(endTime), 'dd MMM')}`}
      </Box>
    );
  }
  return (
    <Box onClick={onOpenPicker} sx={{ ...style, ...sx }}>
      {format(new Date(startTime), 'dd MMM')} - {format(new Date(endTime), 'dd MMM')}
    </Box>
  );
}

export default function TrackerTaskAdd({ onAddTask, onCloseAddTask, onHandleChange, defaultAttachmentImage }) {
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState(false);

  const {
    dueDate,
    startTime,
    endTime,
    isSameDays,
    isSameMonths,
    onChangeDueDate,
    openPicker,
    onOpenPicker,
    onClosePicker,
  } = useDatePicker({
    date: [null, null]
  });

  const handleKeyUpAddTask = (event) => {
    if (event.key === 'Enter') {
      if (trim(name) !== '') {
        onAddTask({
          ...defaultTask, id: uuidv4(), name, due: dueDate, completed,
          attachments: [...defaultTask.attachments, defaultAttachmentImage],
        });
      }
    }
  };

  const handleClickAddTask = () => {
    if (name) {
      onAddTask({
        ...defaultTask, id: uuidv4(), name, due: dueDate, completed,
        attachments: [...defaultTask.attachments, defaultAttachmentImage]
      });
    }
    onCloseAddTask();
  };

  const handleChangeCompleted = (event) => {
    setCompleted(event.target.checked);
  };

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <OutlinedInput
            multiline
            size="small"
            placeholder="Task name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              '& input': { p: 0 },
              '& fieldset': { borderColor: 'transparent !important' }
            }}
          />

          <Stack direction="row" justifyContent="space-between">
            <Tooltip title="Mark task complete">
              <Checkbox
                disableRipple
                checked={completed}
                onChange={handleChangeCompleted}
                icon={<Icon icon={radioButtonOffOutline} />}
                checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
              />
            </Tooltip>
            {defaultAttachmentImage &&
              <TrackerTaskAttachments defaultAttachmentImage={defaultAttachmentImage} isAddTask />
            }
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Assign this task">
                <MIconButton size="small">
                  <Icon icon={peopleFill} width={20} height={20} />
                </MIconButton>
              </Tooltip>
              <Tooltip title="Attachment">
                <MIconButton size="small" onClick={handleAttach}>
                  <Icon icon={attach2Fill} width={20} height={20} />
                </MIconButton>
              </Tooltip>
              <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onHandleChange} />
              {startTime && endTime ? (
                <DisplayTime
                  startTime={startTime}
                  endTime={endTime}
                  isSameDays={isSameDays}
                  isSameMonths={isSameMonths}
                  onOpenPicker={onOpenPicker}
                />
              ) : (
                <Tooltip title="Add due date">
                  <MIconButton size="small" onClick={onOpenPicker}>
                    <Icon icon={calendarFill} width={20} height={20} />
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
            </Stack>
          </Stack>
        </Paper>
      </ClickAwayListener>
    </>
  );
}
