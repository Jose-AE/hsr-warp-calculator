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
  Box,
  FormHelperText,
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
          {/*---------------------------Warps--------------------------------------*/}
          <Box py={"5px"} borderWidth="1px" borderRadius={"md"} w={"100%"}>
            <Flex alignItems="center" justify={"center"}>
              <Text userSelect={"none"} mr={"5px"}>
                Saved Warps
              </Text>
              <Image
                h={5}
                w={5}
                src="https://i.imgur.com/zeHJj2V.png"
                alt="Cone"
              />
            </Flex>
          </Box>
          <FormControl>
            <Input placeholder="0" autoComplete="off" type="number" />
          </FormControl>

          {/*---------------------------Character --------------------------------------*/}
          <Flex gap={5}>
            <Box py={"5px"} borderWidth="1px" borderRadius={"md"} w={"100%"}>
              <Flex alignItems="center" justify={"center"}>
                <Text userSelect={"none"} mr={"5px"}>
                  Charecter
                </Text>
                <Image
                  h={5}
                  w={5}
                  src="https://i.imgur.com/BHGnYJU.png"
                  alt="Char"
                />
              </Flex>
            </Box>
          </Flex>

          <Flex gap={5}>
            <FormControl>
              <Input placeholder="0" autoComplete="off" type="number" />
              <FormHelperText>Banner Pity</FormHelperText>
            </FormControl>
            <FormControl>
              <Input placeholder="0" autoComplete="off" type="number" />
              <FormHelperText>Wanted Copies</FormHelperText>
            </FormControl>
          </Flex>

          {/*---------------------------Light cone--------------------------------------*/}
          <Box py={"5px"} borderWidth="1px" borderRadius={"md"} w={"100%"}>
            <Flex alignItems="center" justify={"center"}>
              <Text userSelect={"none"} mr={"5px"}>
                Light Cone
              </Text>
              <Image
                h={5}
                w={5}
                src="https://i.imgur.com/fewuoHv.png"
                alt="Cone"
              />
            </Flex>
          </Box>

          <Flex gap={5}>
            <FormControl>
              <Input placeholder="0" autoComplete="off" type="number" />
              <FormHelperText>Banner Pity</FormHelperText>
            </FormControl>
            <FormControl>
              <Input placeholder="0" autoComplete="off" type="number" />
              <FormHelperText>Wanted Copies</FormHelperText>
            </FormControl>
          </Flex>

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
