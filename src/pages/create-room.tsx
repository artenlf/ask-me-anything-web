import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import amaLogo from '../assets/logo.svg';
import { createRoom } from '../http/create-room';

export function CreateRoom() {
  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if(!theme) {
      console.error('Theme is required')
      return
    }

  try {
   const { roomId } = await createRoom({ theme })

    navigate(`/room/${roomId}`)
  } catch (error) {
    toast.error("Falha ao criar sala!")
  }
  }

  return (
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={amaLogo} alt="Ask Me Anything Logo" className='h-10' />
        
        <p className='leading-relaxed text-zinc-300 text-center'>
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <form action={handleCreateRoom} className='flex items-center gap-2 bg-zinc-900 p-2 rounde-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'>
          <input type="text" name='theme' placeholder='Nome da Sala' autoComplete='off' className='flex-1 text-zinc-100 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500' required />
          <button type='submit' className='bg-orange-400 text-orange-950 text-sm font-medium px-3 py-1.5 gap-1.5 flex items-center rounded-lg transition-colors hover:bg-orange-500'>
            Criar sala
            <ArrowRight className='size-4' />
          </button>
        </form>
      </div>
    </main>
  )
}