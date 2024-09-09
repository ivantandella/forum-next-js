import {
  Button,
  Card,
  Flex,
  Image,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { PRIMARY_COLOR_1, PRIMARY_COLOR_2 } from "../../utils/constants";

export default function LoginPage() {
  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"} bg={"gray"}>
      <Card withBorder radius={"md"} w={"30%"}>
        <form>
          <Flex direction={"column"} gap={"md"} align={"center"}>
            <Image
              src={"/forum-logo.png"}
              alt="Forum Logo"
              w={100}
              h={100}
              radius={"100%"}
            />
            <Title>Login</Title>
            <Text size="sm">Don't have an account? Sign up</Text>
            <TextInput
              label="Email"
              placeholder="example@mail.com"
              w={"100%"}
              size="md"
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              w={"100%"}
              size="md"
            />
            <Button
              variant="gradient"
              gradient={{
                from: PRIMARY_COLOR_1,
                to: PRIMARY_COLOR_2,
                deg: 180,
              }}
              w={"100%"}
            >
              Login
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
