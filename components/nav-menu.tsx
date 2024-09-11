import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import IconHome from "./icons/icon-home";
import React from "react";

type NavMenuPropsType = {
  name: string;
  href: string;
  children: React.ReactNode;
};

export default function NavMenu(props: NavMenuPropsType) {
  const { name, href, children } = props;
  return (
    <Link href={href} className="link">
      <Flex mx={20} align={"center"} direction={"column"}>
        {children}
        <Text c={"white"}>{name}</Text>
      </Flex>
    </Link>
  );
}
