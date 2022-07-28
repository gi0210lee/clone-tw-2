import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import Image from "next/image"
import {
  SearchCircleIcon,
  EmojiHappyIcon,
  CalendarIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { Tweet, TweetBody } from "../typings.d"
import { fetchTweets } from './../utils/fetchTweets';
import toast from "react-hot-toast"

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("")
  const [image, setImage] = useState<string>("")

  const imageInputRef = useRef<HTMLInputElement>(null)


  const { data: session } = useSession()
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] =
    useState<boolean>(false)

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);

    imageInputRef.current.value = '';
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://picsum.photos/250/250',
      image: image
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST'
    })

    const json = await result.json();

    const netTweets = await fetchTweets();
    setTweets(netTweets);

    toast('Tweet Posted', {
      icon: '🚀'
    })

    return json;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()

    postTweet();

    setInput('');
    setImage('');
    setImageUrlBoxIsOpen(false);
  }

  return (
    <div className="flex space-x-2 p-5 ">
      <div className="relative mt-5 h-14 w-14 overflow-hidden rounded-full">
        <Image src={session?.user?.image || "https://thispersondoesnotexist.com/image"} layout="fill" objectFit="cover" />
      </div>

      <div className="flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's Happening?"
          />

          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className="h-5 w-5 cursor-pointer transition-transform hover:scale-125" />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform hover:scale-125" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform hover:scale-125" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform hover:scale-125" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform hover:scale-125" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
        </form>

        {imageUrlBoxIsOpen && (
          <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
            <input
              ref={imageInputRef}
              className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white" type="text" placeholder="Enter Image URL..." />
            <button type="submit" onClick={addImageToTweet} className="font-bold text-white">Add Image</button>
          </form>
        )}

        {image && (
          <div className="relative h-40 w-full overflow-hidden rounded-xl shadow-lg mt-10">
            <Image src={image} alt="" layout="fill" objectFit="contain" />
          </div>
        )}
      </div>
    </div>
  )
}

export default TweetBox
