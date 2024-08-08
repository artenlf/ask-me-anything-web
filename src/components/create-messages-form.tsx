import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessage } from "../http/create-message";

export function CreateMessagesForm() {
  const { roomId } = useParams()

  if (!roomId) {
   throw new Error('Room ID is required. Messages component must be used inside a Room page.')
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomId) {
      console.error('Message is required')
      return
    }

    try {
      await createMessage({ roomId, message })
    } catch (error) {
      toast.error('Falha ao enviar pergunta! Tente novamente.')
    }
  }

  return (
    <form action={createMessageAction} className='flex items-center gap-2 bg-zinc-900 p-2 rounde-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'>
          <input type="text" name='message' placeholder='Qual a sua pergunta?' autoComplete='off' className='flex-1 text-zinc-100 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500' />
          <button type='submit' className='bg-orange-400 text-orange-950 text-sm font-medium px-3 py-1.5 gap-1.5 flex items-center rounded-lg transition-colors hover:bg-orange-500'>
            Criar pergunta
            <ArrowRight className='size-4' />
          </button>
        </form>
  )
}