//  'use client';

import { redirectToSignIn } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/chat-header";


interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await currentProfile();

  const modifiedChannelId = params.channelId.split("%")[0];
  // note: the params.channelId comes in as "650345575a59a99da8d19b9a%7D" instead of "650345575a59a99da8d19b9a" so I had to modify it.

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: modifiedChannelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    }
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex-col h-full">
      <ChatHeader name={channel.name} serverId={channel.serverId} type="channel"/>
    </div>
  );
};

export default ChannelIdPage;