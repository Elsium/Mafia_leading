import Link from 'next/link'
export default function Home() {
  return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Link className='bg-blue-400 p-5 rounded-xl
        font-poppins text-white hover:bg-blue-500' href={'/dashboard'}>
            Go to dashboard
        </Link>
      </div>
  );
}
