import { RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import TweetBox from "./TweetBox";

function Feed() {
  return (
    <div className="col-span-7 border-4 border-x border-green-500 lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      {/* TweetBox */}
      <div>
        <TweetBox />
      </div>

      {/* Tweets */}
      <div>Tweets</div>
    </div>
  );
}

export default Feed;