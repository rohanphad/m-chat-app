import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={5}
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      background="purple"
      cursor="pointer"
      onClick={handleFunction}
      color="white"
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
