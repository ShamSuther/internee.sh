import React from "react";
import {
  Center,
  Title,
  Text,
  Box,
  Divider,
  Flex,
  Container,
  luminance,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Error = () => {
  const isSM = useMediaQuery("(min-width: 48em)");
  const {colors} = useMantineTheme();

  return (
    <Container>
      <Center h={"100dvh"}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "center" }}
          gap={{ base: ".5rem", sm: "1rem" }}
        >
          <Title c={colors.violet[1]} order={1} size={"3rem"}>
            404
          </Title>
          <Divider color={colors.violet[4]} orientation={"vertical"} />
          <Box
            
            c={colors.violet[3]}
            style={{ textAlign: isSM ? "left" : "center" }}
          >
            <Text >PAGE NOT FOUND</Text>
            <Text>You shouldn't be here!</Text>
          </Box>
        </Flex>
      </Center>
    </Container>
  );
};

export default Error;
