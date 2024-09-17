import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import IconHome from "./icons/icon-home";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";

type NavMenuPropsType = {
  name: string;
  href: string;
  children: React.ReactNode;
};

export default function NavMenu(props: NavMenuPropsType) {
  const { name, href, children } = props;
  const isMobile = useMediaQuery(`(max-width: 640px)`);

  return (
    <Link href={href} className="link">
      <Flex mx={20} align={"center"} direction={"column"}>
        {children}
        {!isMobile && <Text c={"white"}>{name}</Text>}
      </Flex>
    </Link>
  );
}
