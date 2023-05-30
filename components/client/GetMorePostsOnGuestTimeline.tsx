"use client";

import { useFetchNextApi } from "@/hooks/useFetchNextApi";
import { isAtBottom } from "@/utils/isAtBottom";
import { useEffect, useState, useRef } from "react";
import LoaderSpinner from "./LoaderSpinner";
import PostTemplate from "../PostTemplate";
import { debounce } from "@/utils/debounce";

export default function GetMorePostsOnGuestTimeline() {
  const [page, setPage] = useState<number>(0);
  const [additionalPosts, setAdditionalPosts] = useState<any>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true); // Flag to track data availability

  const { loading, error, data, execute } = useFetchNextApi(
    "/api/get/get-additional-guest-posts",
    {
      method: "POST",
      body: JSON.stringify({ page: page }),
      headers: { "Content-Type": "application/json" },
    }
  );

  const handleScroll = debounce(() => {
    if (loading || !hasMoreData) return; // Check if loading or no more data available
    const scrolledToBottom = isAtBottom();
    if (scrolledToBottom) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 1000);

  useEffect(() => {
    if (page > 0) {
      execute(JSON.stringify({ page }));
    }
  }, [page]);

  useEffect(() => {
    // Reset additionalPosts and page when there is an error
    if (error) {
      console.log("Now there is an error!");
      setAdditionalPosts([]);
      setPage(0);
      setHasMoreData(false); // Update the data availability flag
    }
  }, [error]);

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      console.log("When does returning this handler actually get called?");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreData]); // Update the dependency to reattach listener when data availability changes

  useEffect(() => {
    console.log("OUTSIDE OF DATA.SUCCESS, DATA =>", data.success);
    if (data.success) {
      console.log("INSIDE OF DATA.SUCCESS, DATA =>", data.success);
      setAdditionalPosts((prevPosts) => {
        return [...prevPosts, ...data.success];
      });
    }
  }, [data]);

  if (loading && page === 0) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      {additionalPosts.map((x) => (
        <PostTemplate post={x} key={x.id} />
      ))}
    </div>
  );
}

// "use client";

// import { useFetchNextApi } from "@/hooks/useFetchNextApi";
// import { isAtBottom } from "@/utils/isAtBottom";
// import { useEffect, useState, useRef } from "react";
// import LoaderSpinner from "./loaderSpinner";
// import PostTemplate from "../PostTemplate";
// import { debounce } from "@/utils/debounce";

// export default function GetMorePostsOnGuestTimeline() {
//   const [page, setPage] = useState<number>(0);
//   const [additionalPosts, setAdditionalPosts] = useState<any>([]);

//   const { loading, error, data, execute } = useFetchNextApi(
//     "/api/get/get-additional-guest-posts",
//     {
//       method: "POST",
//       body: JSON.stringify({ page: page }),
//       headers: { "Content-Type": "application/json" },
//     }
//   );

//   //* This runs as soon as the component is mounted
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleScroll = debounce(() => {
//     if (loading) return;
//     const scrolledToBottom = isAtBottom();
//     if (scrolledToBottom) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   }, 1000);

//   useEffect(() => {
//     if (page > 0) {
//       execute(JSON.stringify({ page }));
//     }
//   }, [page]);

//   useEffect(() => {
//     if (data.success) {
//       console.log("After scrolling");
//       setAdditionalPosts((prevPosts) => {
//         return [...prevPosts, ...data.success];
//       });
//     }
//   }, [data]);

//   if (loading && page === 0) {
//     return <LoaderSpinner />;
//   }

//   return (
//     <div>
//       {additionalPosts.map((x) => (
//         <PostTemplate post={x} key={x.id} />
//       ))}
//     </div>
//   );
// }
