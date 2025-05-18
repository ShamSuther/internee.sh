import React from "react";
import { Flex, Title, Box, Grid } from "@mantine/core";

const Overview = () => {
  return (
    <Box>
      <Flex
        direction={"row"}
        justify={"space-between"}
        align={"center"}
        mb={".5rem"}
      >
        <Title order={3} mb=".5rem">
          Overview
        </Title>
      </Flex>
      <Grid>
        
      </Grid>
    </Box>
  );
};

export default Overview;
