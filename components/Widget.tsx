import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import React from "react";

function Widget() {
  return (
    <div className="col-span-2 mt-2 hidden space-x-2 border-4 border-blue-500 lg:inline">
      {/* Search */}
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none"
        />
      </div>
      <div>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="sonnysangha"
          options={{ height: 1000 }}
        />
      </div>
    </div>
  );
}

export default Widget;
