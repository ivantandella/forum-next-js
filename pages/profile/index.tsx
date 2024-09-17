import {
  Button,
  Card,
  Flex,
  Group,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import Navbar from "../../components/navbar";
import Link from "next/link";
import {
  DANGER_COLOR,
  LOGIN_PATH,
  PRIMARY_COLOR_1,
  PRIMARY_COLOR_2,
  REGISTER_PATH,
} from "../../utils/constants";
import { modals } from "@mantine/modals";
import { useAuth } from "../../hooks/use-auth";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";
import IconUserCircle from "../../components/icons/icon-user-circle";
import { useGetMe } from "../../api-hooks/auth/query";
import { UserType } from "../../api-hooks/auth/model";
import { useResponsive } from "../../hooks/use-responsive";

export default function ProfilePage() {
  const { handleLogout } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const { data, isLoading } = useGetMe();
  const userData: UserType = data?.data?.user || {};
  const { elemWidth } = useResponsive();

  useEffect(() => {
    if (getToken()) {
      setIsLogin(true);
    }
  }, []);

  function openLogoutModal() {
    modals.openConfirmModal({
      title: "Logout",
      centered: true,
      children: <Text size="sm">Are you sure you want to logout?</Text>,
      labels: { confirm: "Logout", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handleLogout();
      },
    });
  }

  return (
    <>
      <Flex justify={"center"} align={"center"} mih={"100vh"} p={20}>
        {isLoading ? (
          <Loader />
        ) : (
          <Card withBorder w={elemWidth} mb={80} shadow="sm">
            <Flex direction={"column"} align={"center"}>
              {isLogin ? (
                <>
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    w={150}
                    radius={100}
                  />
                  <Title>{userData.name}</Title>
                  <Text mb={20} c={"dimmed"}>
                    {userData.email}
                  </Text>
                  <Button
                    size="xs"
                    color={DANGER_COLOR}
                    onClick={openLogoutModal}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <IconUserCircle />
                  <Group mt={20}>
                    <Link href={LOGIN_PATH}>
                      <Button color={PRIMARY_COLOR_2}>Login</Button>
                    </Link>
                    or
                    <Link href={REGISTER_PATH}>
                      <Button color={PRIMARY_COLOR_1}>Register</Button>
                    </Link>
                  </Group>
                </>
              )}
            </Flex>
          </Card>
        )}
      </Flex>
      <Navbar />
    </>
  );
}
