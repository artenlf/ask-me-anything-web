import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({id: messageId, text, amountOfReactions, answered = false}: MessageProps) {
  const { roomId } = useParams()

  if (!roomId) {
   throw new Error('Room ID is required. Messages component must be used inside a Room page.')
  }

  const [hasReacted, setHasReacted] = useState(false)

  async function createMessageReactionAction() {
    if (!roomId) {
      console.error('Room ID is required')
      return
    }

    try {
      await createMessageReaction({ messageId, roomId })
    } catch (error) {
      toast.error("Falha ao reagir à pergunta! Tente novamente.")
    }

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      console.error('Room ID is required')
      return
    }

    try {
      await removeMessageReaction({ messageId, roomId })
    } catch (error) {
      toast.error("Falha ao remover reação à pergunta! Tente novamente.")
    }

    setHasReacted(false)
  }


  return (
    <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}
        {hasReacted ? (
          <button type="button" onClick={removeMessageReactionAction} className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium transition-colors hover:text-orange-500">
          <ArrowUp className="size-4"/> 
          Curtir pergunta ({amountOfReactions})
        </button>
        ) : (
          <button type="button" onClick={createMessageReactionAction} className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium transition-colors hover:text-zinc-300">
          <ArrowUp className="size-4"/> 
          Curtir pergunta ({amountOfReactions})
        </button>
        )}
    </li>
  )
}