import { Flex } from "@mantine/core";
import { PRIMARY_COLOR_1, PRIMARY_COLOR_2 } from "../utils/constants";
import IconHome from "./icons/icon-home";
import NavMenu from "./nav-menu";
import IconUser from "./icons/icon-user";
import IconSocial from "./icons/icon-social";
import IconAward from "./icons/icon-award";
import IconPlus from "./icons/icon-plus";

export default function Navbar() {
  return (
    <Flex
      style={{
        backgroundImage: `linear-gradient(to top, ${PRIMARY_COLOR_1}, ${PRIMARY_COLOR_2})`,
      }}
      w={"100%"}
      h={70}
      pos={"fixed"}
      bottom={0}
      direction={"row"}
      gap={"lg"}
      justify={"center"}
      align={"center"}
    >
      <NavMenu name="Home" href="/">
        <IconHome />
      </NavMenu>
      <NavMenu name="Community" href="/community">
        <IconSocial />
      </NavMenu>
      <NavMenu name="Add Thread" href="/">
        <IconPlus />
      </NavMenu>
      <NavMenu name="Leaderboard" href="/leaderboard">
        <IconAward />
      </NavMenu>
      <NavMenu name="Account" href="/">
        <IconUser />
      </NavMenu>
    </Flex>
  );
}
