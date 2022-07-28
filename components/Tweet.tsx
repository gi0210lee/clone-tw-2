import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Comment, CommentBody, Tweet } from "../typings"
import TimeAgo from "react-timeago"
import ReactTimeago from "react-timeago";
import { useSession } from 'next-auth/react'
import { fetchComments } from './../utils/fetchComments';
import toast from "react-hot-toast";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon
} from '@heroicons/react/outline'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments);
  }

  useEffect(() => {
    refreshComments();
  }, [])

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://picsum.photos/250/250'
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST'
    })

    const json = await result.json();

    const newComments = await fetchComments(tweet._id);
    setComments(newComments);

    toast('Coments Posted', {
      icon: '🚀'
    })

    return json;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postComment();

    setInput('');
    setCommentBoxVisible(false);
  }

  console.log(comments)

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image className="" src={tweet.profileImg} layout="fill" alt="" objectFit="cover" />
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              0{tweet.username.replace(/\s+/g, "").toLocaleLowerCase()}
            </p>

            <TimeAgo className="text-sm text-gray-500" date={tweet._createdAt} />
          </div>

          <p className="pt-1">{tweet.text}</p>

          <div className="relative m-5 ml-0 mb-1 h-screen max-h-60 overflow-hidden rounded-lg shadow-sm">
            {tweet.image && <Image src={tweet.image} layout="fill" alt="" objectFit="cover" />}
          </div>
        </div>

      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* comment Box logic */}

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            className="rounded-lg flex-1 bg-gray-100 p-2 outline-none"
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            type='submit'
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}
      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll borer-t border-gray-100 p-5 scrollbar-hide">
          {comments.map(comment => (
            <div key={comment._id} className="flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <div className="relative mt-2 w-7 h-7 rounded-full overflow-hidden">
                <Image src={comment.profileImg} alt="" layout="fill" objectFit="cover" />
              </div>

              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\s+/g, '').toLowerCase()}</p>


                  <TimeAgo className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div>
  )
}

export default Tweet
