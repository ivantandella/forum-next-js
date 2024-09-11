import { Flex, Loader } from "@mantine/core";
import Navbar from "../components/navbar";
import Header from "../components/header";
import ThreadsCard from "../components/threads-card";
import { useGetAllThreads } from "../api-hooks/threads/query";
import { ThreadType } from "../api-hooks/threads/model";
import { useContext } from "react";
import { SearchContext } from "../contexts/search-context";

export default function IndexPage() {
  const { data, isLoading } = useGetAllThreads();
  const threadsData: ThreadType[] = data?.data?.threads || [];
  const { search } = useContext(SearchContext);

  let filteredThreads = threadsData.filter((thread) =>
    thread.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      {/* <Flex
        direction={"column"}
        gap={"md"}
        justify={"center"}
        align={"center"}
        mt={120}
        mb={20}
      >
        <Title order={3}>Trending🔥</Title>
        <Flex direction={"row"} gap={"md"}>
          {threadsData.map((thread) => (
            <Button variant="outline" color="gray" key={thread.id}>
              #{thread.category}
            </Button>
          ))}
        </Flex>
      </Flex> */}

      <Flex
        direction={"column"}
        gap={"md"}
        justify={"center"}
        align={"center"}
        mb={80}
        mt={130}
      >
        {isLoading && <Loader />}
        {filteredThreads.map((thread) => (
          <ThreadsCard key={thread.id} data={thread} />
        ))}
      </Flex>

      <Navbar />
    </div>
  );
}
