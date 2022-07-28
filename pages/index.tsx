import type { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import Widget from "../components/Widget"
import { fetchTweets } from "../utils/fetchTweets"
import { Tweet } from "../typings"
import { Toaster } from "react-hot-toast"

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  console.log("home", tweets)
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed tweets={tweets} />
        {/* Widget */}
        <Widget />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()
  return {
    props: { tweets },
  }
}
