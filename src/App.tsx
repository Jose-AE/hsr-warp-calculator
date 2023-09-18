import { useState } from "react";

import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Tooltip,
  Image,
  Box,
  FormHelperText,
  Checkbox,
} from "@chakra-ui/react";

function App() {
  const [warps, setWarps] = useState(0);
  const [charecterPity, setCharecterPity] = useState(0);
  const [conePity, setConePity] = useState(0);
  const [coneGuaranteed, setConeGuaranteed] = useState(false);
  const [characterGuaranteed, setCharacterGuaranteed] = useState(false);
  const [characterCopies, setCharacterCopies] = useState(0);
  const [coneCopies, setConeCopies] = useState(0);

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
            <Input
              onChange={(e) => {
                setWarps(parseInt(e.target.value, 10));
              }}
              placeholder="0"
              autoComplete="off"
              type="number"
            />
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
              <Input
                onChange={(e) => {
                  setCharecterPity(parseInt(e.target.value, 10));
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
              <FormHelperText>Banner Pity</FormHelperText>
            </FormControl>
            <FormControl>
              <Input
                onChange={(e) => {
                  setCharacterCopies(parseInt(e.target.value, 10));
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
              <FormHelperText>Wanted Copies</FormHelperText>
            </FormControl>
            <Tooltip
              hasArrow
              label="If your last 5★ wasn't the promotial character"
              fontSize="sm"
            >
              <Box
                p={"5px"}
                h={"40px"}
                borderWidth="1px"
                borderRadius={"md"}
                w={"100%"}
              >
                <Checkbox
                  onChange={() => {
                    setCharacterGuaranteed(!characterGuaranteed);
                  }}
                  ml={"2px"}
                  mt={"2px"}
                >
                  Guaranteed
                </Checkbox>
              </Box>
            </Tooltip>
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
              <Input
                onChange={(e) => {
                  setConePity(parseInt(e.target.value, 10));
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
              <FormHelperText>Banner Pity</FormHelperText>
            </FormControl>
            <FormControl>
              <Input
                onChange={(e) => {
                  setConeCopies(parseInt(e.target.value, 10));
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
              <FormHelperText>Wanted Copies</FormHelperText>
            </FormControl>
            <Tooltip
              hasArrow
              label="If your last 5★ wasn't the promotial light cone"
              fontSize="sm"
            >
              <Box
                p={"5px"}
                h={"40px"}
                borderWidth="1px"
                borderRadius={"md"}
                w={"100%"}
              >
                <Checkbox
                  onChange={() => {
                    setConeGuaranteed(!coneGuaranteed);
                  }}
                  ml={"2px"}
                  mt={"2px"}
                >
                  Guaranteed
                </Checkbox>
              </Box>
            </Tooltip>
          </Flex>

          <Stack spacing={6}>
            <Button
              isDisabled={
                !(
                  warps > 0 &&
                  charecterPity >= 0 &&
                  conePity >= 0 &&
                  (characterCopies > 0 || coneCopies > 0)
                )
              }
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Calculate
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default App;
