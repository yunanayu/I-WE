import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ReadRecordCard from "./ReadRecordCard";
import ReadVaccinCard from "./ReadVaccinCard";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { recordContext } from "../../pages/HospitalRecordPage/HospitalRecordMainPage";
import { getEssential } from "../../api/RecordApi";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Option from "@mui/joy/Option";
import useMemberStore from "./../../stores/userStore";
import CheckPanel from "./Check/CheckPanel";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    // boxShadow: 24,
    p: 4,
  };
  // 기록 불러오는거임 병원기록임 헷갈리지 말자 병원기록!!
  const initState = React.useContext(recordContext);
  const [records, setRecords] = React.useState(initState);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    setRecords(initState);
  }, [initState]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        mb:2
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { background: "#f87171" } }} // indicator color
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Tab
              label={
                <Typography
                  sx={{
                    border: "1px solid",
                    borderColor: "#FBBBB8",
                    borderRadius: 3,
                    px: 1,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "#FBBBB8",
                  }}
                >
                  병원기록
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography
                  sx={{
                    border: "1px solid",
                    borderColor: "#FBBBB8",
                    borderRadius: 3,
                    px: 1,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "#FBBBB8",
                  }}
                >
                  접종 검사
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {records.length === 0 ? (
            <div>
              <Button
                onClick={() =>
                  navigate("/addrecord", {
                    state: { selectedDay: props.selectedDay },
                  })
                }
                sx={{ border: 1, borderRadius: 5, color: "#FBBBB8" }}
              >
                기록 추가하기
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflowY: "auto" }}
              >
                <Box sx={style}>
                  <Box></Box>
                </Box>
              </Modal>
            </div>
          ) : (
            <div>
              {records.map((record) => {
                return (
                  <ReadRecordCard value={value} index={0} record={record} />
                );
              })}
              <Button
                onClick={() =>
                  navigate("/addrecord", {
                    state: { selectedDay: props.selectedDay },
                  })
                }
                sx={{ border: 1, borderRadius: 5, color: "#FBBBB8" }}
              >
                기록 추가하기
              </Button>
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* 검진 접종 확인 탭 패널 */}
          <CheckPanel />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
