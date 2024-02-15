import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import icon1 from "../../images/icon1.png";
import { NavLink } from "react-router-dom";
import { Cookies } from "react-cookie";
import useMemberStore, { useFcmStore } from "../../stores/userStore";

const pages = [
  { name: "정보제공", link: "/infomain" },
  { name: "엄마기록", link: "/recordmom" },
  { name: "아기기록", link: "/recordbaby" },
  { name: "병원기록", link: "/hospitalrecord" },
];
// const sub = [
//   { name: "엄마기록", link: "/recordmom" },
//   { name: "아기기록", link: "/recordbaby" },
//   { name: "병원기록", link: "/hospitalrecord" },
// ];
const settings = ["마이페이지", "로그아웃"];

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElSub, setAnchorElSub] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const setUserName = useMemberStore(state => state.setUserName)
  const userName = useMemberStore(state => state.userName);
  const setProfileImage = useMemberStore(state => state.setProfileImage)
  const profileImage = useMemberStore(state => state.profileImage);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const cookies = new Cookies(); // Cookies 객체 생성
  const setBabyList = useMemberStore((state) => state.setBabyList);
  const setUserNum = useMemberStore((state) => state.setUserNum);
  const clearUserStorage = useMemberStore.persist.clearStorage;
  const clearPushStorage = useFcmStore.persist.clearStorage;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSubMenu = (event) => {
    setAnchorElSub(event.currentTarget);
  };
  const handleCloseSubMenu = () => {
    setAnchorElSub(null);
    setAnchorElNav(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleHomeLinkClick = () => {
    setIsLoggedIn(true); // isLoggedIn 값을 true로 설정
  };

  const handleLogoutClick = () => {
    cookies.remove(document.cookie); // 쿠키 삭제
    setUserNum(0);
    setBabyList([]);
    setUserName('')
    setProfileImage('')
    clearUserStorage();
    clearPushStorage();
    window.location.href = "/"; // 로그아웃 시 페이지 이동
  };

  return (
    <AppBar position="sticky" sx={{ background: "#FBBBB8" }} elevation={4}>
      <Container>
        <Toolbar disableGutters sx={{display:'flex', justifyContent:'space-between',}}>
        <Box
            component={NavLink}
            to="/"
            onClick={handleHomeLinkClick}
            sx={{             
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={icon1}
              alt="icon1"
              style={{ width: "50px", height: "50px" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                // page.name !== "기록" ? (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography
                      component={NavLink}
                      to={page.link}
                      textAlign="center"
                      sx={{
                        textDecoration: "none",
                        color: "gray",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
              //   ) : (
              //     <MenuItem key={page.name} onClick={handleOpenSubMenu}>
              //       <Typography
              //         component={NavLink}
              //         to={page.link}
              //         textAlign="center"
              //         sx={{
              //           textDecoration: "none",
              //           color: "gray",
              //         }}
              //       >
              //         {page.name}
              //       </Typography>
              //     </MenuItem>
              //   )
              )}
            </Menu>
            <Menu
              id="submenu-appbar"
              anchorEl={anchorElSub}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElSub)}
              onClose={handleCloseSubMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {sub.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseSubMenu}>
                  <Typography
                    component={NavLink}
                    to={page.link}
                    textAlign="center"
                    sx={{
                      textDecoration: "none",
                      color: "gray",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            component={NavLink}
            to="/"
            onClick={handleHomeLinkClick}
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent:'center',
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              // color: "inherit",
              textDecoration: "none",
            }}
            >
              <img
                src={icon1}
                alt="icon1"
                style={{ width: "50px", height: "50px" }}
              />
            </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page.name !== "기록" ? (
                <Button
                  key={page.name}
                  component={NavLink}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  {page.name}
                </Button>
              ) : (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    {page.name}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {/* {sub.map((page) => (
                      <MenuItem key={page.name} onClick={handleClose}>
                        <Typography
                          component={NavLink}
                          to={page.link}
                          textAlign="center"
                          sx={{
                            textDecoration: "none",
                            color: "gray",
                          }}
                        >
                          {page.name}
                        </Typography>
                      </MenuItem>
                    ))} */}
                  </Menu>
                </>
              )
            )}
          </Box>
          <Box sx={{display:'flex', alignItems:'center'}}>
              <Box sx={{ fontSize: 'x-small', color:'gray' }}>
                {userName} 님 반가워요!&nbsp;
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="마이페이지">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {profileImage ? (
                    <Avatar src={profileImage} />
                  ) : (
                    <Avatar src="/broken-image.jpg" />
                  )}
                </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={setting === "로그아웃" ? handleLogoutClick : (setting === "마이페이지" ? () => { window.location.href = '/mypage' } : handleCloseUserMenu)}
                    >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
