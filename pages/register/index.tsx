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
import {
  DANGER_COLOR,
  HOME_PATH,
  LOGIN_PATH,
  PRIMARY_COLOR_1,
  PRIMARY_COLOR_2,
  SUCCESS_COLOR,
} from "../../utils/constants";
import Link from "next/link";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { RegisterDataType } from "../../api-hooks/auth/model";
import { useRegister } from "../../api-hooks/auth/mutation";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useResponsive } from "../../hooks/use-responsive";

export default function RegisterPage() {
  const { elemWidth } = useResponsive();
  const { mutateAsync, isPending } = useRegister();
  const { push } = useRouter();

  const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  async function handleSubmitRegister(values: RegisterDataType) {
    try {
      const response = await mutateAsync(values);
      form.reset();
      push(LOGIN_PATH);

      notifications.show({
        title: response.status.toUpperCase(),
        message: `${response.message}, please login`,
        position: "top-right",
        autoClose: 5000,
        color: SUCCESS_COLOR,
      });
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: error.response.data.status.toUpperCase(),
        message: error.response.data.message,
        position: "top-right",
        autoClose: 5000,
        color: DANGER_COLOR,
      });
    }
  }

  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"} bg={"gray"}>
      <Card withBorder radius={"md"} w={elemWidth} my={10}>
        <form
          onSubmit={form.onSubmit((values) => handleSubmitRegister(values))}
        >
          <Flex direction={"column"} gap={"md"} align={"center"}>
            <Image
              src={"/forum-logo.png"}
              alt="Forum Logo"
              w={100}
              h={100}
              radius={"100%"}
            />
            <Title>Register</Title>
            <Text size="sm">
              Already have an account?{" "}
              <Link href={LOGIN_PATH} className="link">
                Login
              </Link>
            </Text>
            <TextInput
              label="Name"
              placeholder="John Doe"
              w={"100%"}
              size="md"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="example@mail.com"
              w={"100%"}
              size="md"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              w={"100%"}
              size="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button
              type="submit"
              variant="gradient"
              gradient={{
                from: PRIMARY_COLOR_1,
                to: PRIMARY_COLOR_2,
                deg: 180,
              }}
              w={"100%"}
            >
              Register
            </Button>
            <Link href={HOME_PATH} style={{ width: "100%" }}>
              <Button variant="outline" color={PRIMARY_COLOR_1} w={"100%"}>
                Continue without account
              </Button>
            </Link>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}
