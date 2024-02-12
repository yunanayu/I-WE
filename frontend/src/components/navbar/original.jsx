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
  { name: "다이어리", link: "/diary" },
  { name: "서비스찾기", link: "/service" },
  { name: "커뮤니티", link: "/community" },
  { name: "정보제공", link: "/infomain" },
  { name: "엄마기록", link: "/recordmom" },
  { name: "아기기록", link: "/recordbaby" },
  { name: "병원기록", link: "/hospitalrecord" },
  { name: "꿀팁", link: "/tips" },
];
const settings = ["마이페이지", "로그아웃"];

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
    clearUserStorage();
    clearPushStorage();
    window.location.href = "/"; // 로그아웃 시 페이지 이동
  };

  return (
    <AppBar position="sticky" sx={{ background: "#FBBBB8" }} elevation={4}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            onClick={handleHomeLinkClick}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={icon1} alt="icon1" style={{ width: "50px", height: "50px" }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
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
              {pages.map((page) => (
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
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            onClick={handleHomeLinkClick}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={icon1} alt="icon1" style={{ width: "50px", height: "50px" }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
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
                  onClick={
                    setting === "로그아웃"
                      ? handleLogoutClick
                      : setting === "마이페이지"
                      ? () => {
                          window.location.href = "/mypage";
                        }
                      : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
