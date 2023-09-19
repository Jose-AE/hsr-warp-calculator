import { useState } from "react";

import { FaGithub } from "react-icons/fa";
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
  Heading,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "@chakra-ui/react";
import { CalculateWarpProbability } from "./utils/CalculateWarpProbability";

function App() {
  const [warps, setWarps] = useState(0);
  const [characterPity, setCharacterPity] = useState(0);
  const [conePity, setConePity] = useState(0);
  const [coneGuaranteed, setConeGuaranteed] = useState(false);
  const [characterGuaranteed, setCharacterGuaranteed] = useState(false);
  const [characterCopies, setCharacterCopies] = useState(0);
  const [coneCopies, setConeCopies] = useState(0);

  const [chance, setChance] = useState(-1);

  const [loading, setLoading] = useState(false);

  localStorage.setItem("chakra-ui-color-mode", "dark"); //set dark mode

  return (
    <>
      <Box
        position="fixed"
        bottom={0} // Position at the bottom
        right={0} // Position at the right
        p={2}
        m="5px"
        borderRadius="100%"
        zIndex={9999}
        bgColor="rgba(0, 0, 0, 0.5)"
      >
        <a
          href="https://github.com/Jose-AE/hsr-warp-calculator"
          target="_blank"
        >
          <FaGithub />
        </a>
      </Box>

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
                Warps
              </Text>
              <Image
                h={5}
                w={5}
                src="https://i.imgur.com/zeHJj2V.png"
                alt="Cone"
              />
            </Flex>
          </Box>

          <Tooltip
            hasArrow
            label="Increasing the number of warps will exponentially extend the simulation time required for pull calculations. To optimize performance, aim to maintain the number of warps within the range of 1 to 10,000"
            fontSize="sm"
          >
            <FormControl>
              <Input
                onChange={(e) => {
                  setChance(-1);
                  setWarps(parseInt(e.target.value, 10));
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
            </FormControl>
          </Tooltip>

          {/*---------------------------Character --------------------------------------*/}
          <Flex gap={5}>
            <Box py={"5px"} borderWidth="1px" borderRadius={"md"} w={"100%"}>
              <Flex alignItems="center" justify={"center"}>
                <Text userSelect={"none"} mr={"5px"}>
                  Character
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
                  setChance(-1);
                  const value = parseInt(e.target.value, 10);
                  setCharacterPity(isNaN(value) ? 0 : value);
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
                  setChance(-1);
                  const value = parseInt(e.target.value, 10);
                  setCharacterCopies(isNaN(value) ? 0 : value);
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
              <Tooltip
                hasArrow
                label="Desired quantity of 5★ Limited Character"
                fontSize="sm"
              >
                <FormHelperText>Wanted Copies</FormHelperText>
              </Tooltip>
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
                    setChance(-1);
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
                  setChance(-1);
                  const value = parseInt(e.target.value, 10);
                  setConePity(isNaN(value) ? 0 : value);
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
                  setChance(-1);
                  const value = parseInt(e.target.value, 10);
                  setConeCopies(isNaN(value) ? 0 : value);
                }}
                placeholder="0"
                autoComplete="off"
                type="number"
              />
              <Tooltip
                hasArrow
                label="Desired quantity of 5★ Limited Light Cone"
                fontSize="sm"
              >
                <FormHelperText>Wanted Copies</FormHelperText>
              </Tooltip>
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
                    setChance(-1);
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

          <Card
            borderColor={"whiteAlpha.300"}
            display={chance < 0 ? "none" : "flex"}
            borderWidth="1px"
            align="center"
          >
            <CardHeader>
              <Badge colorScheme="green">
                <Heading size="lg">
                  {Math.round(chance * 100 * 1000) / 1000}%
                </Heading>
              </Badge>
            </CardHeader>
            <CardBody>
              {coneCopies > 0 && characterCopies > 0 ? (
                <Text>
                  Is the probability of you obtaining{" "}
                  <Badge colorScheme="gray"> {characterCopies}</Badge> copie(s)
                  of the character from the featured banner and{" "}
                  <Badge colorScheme="gray"> {coneCopies}</Badge>
                  copie(s) of the light cone in the featured banner if you were
                  to do <Badge colorScheme="gray"> {warps}</Badge> warp(s),
                  first starting in the character banner until you get all
                  desired copies and then moving to the light cone banner
                </Text>
              ) : coneCopies > 0 ? (
                <Text>
                  Is the probability of you obtaining{" "}
                  <Badge colorScheme="gray"> {coneCopies}</Badge> copie(s) of
                  the light cone in the featured banner if you were to do{" "}
                  <Badge colorScheme="gray"> {warps}</Badge> warp(s),
                </Text>
              ) : (
                <Text>
                  Is the probability of you obtaining{" "}
                  <Badge colorScheme="gray"> {characterCopies}</Badge> copie(s)
                  of the character in the featured banner if you were to do{" "}
                  <Badge colorScheme="gray"> {warps}</Badge> warp(s),
                </Text>
              )}
            </CardBody>
          </Card>

          <Stack spacing={6}>
            <Button
              isDisabled={
                !(
                  warps > 0 &&
                  characterPity >= 0 &&
                  conePity >= 0 &&
                  (characterCopies > 0 || coneCopies > 0)
                )
              }
              isLoading={loading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => {
                //console.log(`warps: ${warps} Waanted coe${coneCopies}`);
                setLoading(true);
                CalculateWarpProbability(
                  warps,
                  characterPity,
                  conePity,
                  coneGuaranteed,
                  characterGuaranteed,
                  characterCopies,
                  coneCopies
                ).then((res) => {
                  setChance(res);
                  setLoading(false);
                });
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
