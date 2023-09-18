import { useState } from "react";

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormLabel,
  Image,
} from "@chakra-ui/react";

function App() {
  const [warps, setWarps] = useState(0);
  const [charecterPity, setCharecterPity] = useState(0);
  const [conePity, setConePity] = useState(0);
  const [coneGuaranteed, setConeGuaranteed] = useState(false);
  const [characterGuaranteed, setCharacterGuaranteed] = useState(false);

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <FormControl>
            <Image
              h={5}
              w={5}
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <FormLabel>Saved Warps</FormLabel>

            <Input type="number" />
          </FormControl>

          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default App;
