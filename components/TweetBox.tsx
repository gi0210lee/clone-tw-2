import React from "react";
import Image from "next/image";

function TweetBox() {
  return (
    <div>
      <div className="relative h-14 w-14 overflow-hidden rounded-full">
        <Image
          src="https://this-person-does-not-exist.com/img/avatar-381a8c9e4cf83297cc23193dc8e3f267.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <form>
          <input type="text" placeholder="What's Happening?" />
          <div>
            <div>Icons</div>
            <button>Tweet</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
