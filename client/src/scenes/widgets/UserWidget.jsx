import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AutoAwesomeOutlined,
  Diversity1Outlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser ] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`./users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      });
      const data = await response.json();
      setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName, 
    location,
    occupation,
    dreamVacation, 
    travelBuddy,
    // viewedProfile,
    // impressions,
    friends,
  } = user

  return (
    <WidgetWrapper className="user-widget-container widget-radius">
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        // onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
          </Box>   
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
      <FlexBetween alignItems="center">
        <Box display="flex" alignItems="center" gap=".5rem">
          <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap=".5rem">
          <WorkOutlineOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </FlexBetween>
       
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Travel Bucket List
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <AutoAwesomeOutlined sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Dream Vacation
              </Typography>
              <Typography color={medium}>
                {dreamVacation ? dreamVacation : " "}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
          <Diversity1Outlined sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500">
                Dream Travel Buddy
              </Typography>
              <Typography color={medium}>
                {travelBuddy ? travelBuddy : " "}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
};

export default UserWidget;