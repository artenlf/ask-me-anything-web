import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMessagesWebSockets } from "../hooks/use-messages-web-sockets";
import { getRoomMessages } from "../http/get-room-messages";
import { Message } from "./message";

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
   throw new Error('Room ID is required. Messages component must be used inside a Room page.')
  }

  const { data } = useSuspenseQuery({
    queryKey: ['room-messages', roomId],
    queryFn: () => getRoomMessages({ roomId })
  })

  useMessagesWebSockets({ roomId })

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions
  })

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map(message => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        )
      })}
        </ol>
  )
}