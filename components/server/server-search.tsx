'use client';

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }
  }[] | undefined;
}

const ServerSearch = ({
  data
}: ServerSearchProps) => {
  return (
    <div>ServerSearch</div>
  )
}

export default ServerSearch