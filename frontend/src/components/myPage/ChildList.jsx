import React, { useEffect } from "react";
import useMemberStore from "../../stores/userStore";
import { Box, Button, Container, Typography } from "@mui/material";
import ReadChildCard from "./ReadChildCard";
import Modal from "@mui/material/Modal";
import AddChild from "./AddChild";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ChildList = () => {
  const userName = useMemberStore((state) => state.userName);
  const babyList = useMemberStore((state) => state.babyList);
  const parentType = useMemberStore((state) => state.parentType);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {}, [babyList]);
  return (
    <Container sx={{ mb: 5, pb: 5 }}>
      <Box sx={{ ml: 2, mt:5, mb:1 }}>
        <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>
          {userName}님의 아기
        </Typography>
      </Box>
      {babyList.map((baby) => {
        return <ReadChildCard baby={baby} />;
      })}
      {parentType !== "FATHER" && (
        <div>
          <Box sx={{ display: "flex" }}>
        <Box sx={{ justifyContent: "right", textAlign:'right' }}>
          <Fab color="#FBBBB8" aria-label="add">
            <AddIcon onClick={handleOpen} />
          </Fab>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddChild setOpen={setOpen} />
        </Box>
      </Modal>
        </div>
      
      )}
    </Container>
  );
};

export default ChildList;
