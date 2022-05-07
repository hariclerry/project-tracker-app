import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Droppable, Draggable } from "react-beautiful-dnd";
// material
import { Paper, Stack, Button } from "@mui/material";
// redux
import { useDispatch } from "redux/store";
import {
  deleteColumn,
  updateColumn,
  addTask,
  deleteTask,
} from "redux/slices/tracker";
//
import TrackerTaskCard from "./TrackerTaskCard";
import TrackerColumnToolBar from "./TrackerColumnToolBar";
import TrackerAddTask from "./TrackerTaskAdd";

export default function TrackerColumn({ column, index }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { board } = useSelector((state) => state.tracker);
  const [open, setOpen] = useState(false);
  const [defaultAttachmentImage, setdefaultAttachmentImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { name, cardIds, id } = column;

  // Clean up the selection to avoid memory leak
  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setdefaultAttachmentImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (cardId) => {
    dispatch(deleteTask({ cardId, columnId: id }));
    enqueueSnackbar("Delete success", { variant: "success" });
  };

  const handleUpdateColumn = async (newName) => {
    try {
      if (newName !== name) {
        dispatch(updateColumn(id, { ...column, name: newName }));
        enqueueSnackbar("Update success", { variant: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(id));
      enqueueSnackbar("Delete success", { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = (task) => {
    dispatch(addTask({ card: task, columnId: id }));
    enqueueSnackbar("Add success", { variant: "success" });
    handleCloseAddTask();
  };

  // On each change let user have access to a selected file
  const handleChange = (event) => {
    console.log("event.target.files----", event.target.files)
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  console.log('defaultAttachmentImage-------', defaultAttachmentImage)

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: "grey.5008" }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <TrackerColumnToolBar
              columnName={name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={2}
                  width={280}
                >
                  {cardIds.map((cardId, index) => {
                    const card = board?.cards[cardId];
                    return (
                      <TrackerTaskCard
                        key={cardId}
                        onDeleteTask={handleDeleteTask}
                        card={card}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 3 }}>
              {open && (
                <TrackerAddTask
                  onAddTask={handleAddTask}
                  onCloseAddTask={handleCloseAddTask}
                  onHandleChange={handleChange}
                  defaultAttachmentImage={defaultAttachmentImage}
                />
              )}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Icon icon={plusFill} width={20} height={20} />}
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Task
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
