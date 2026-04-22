export default function ContactPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-white'>
      <div className='max-w-xl text-center'>
        <h1 className='text-3xl font-bold mb-4'>Contact Us</h1>
        <p className='text-gray-400 mb-6'>
          Have questions or feedback? Reach out to us anytime.
        </p>

        <a 
          href='mailto:support@luckyora.live'
          className='text-blue-400 underline'
        >
          support@luckyora.live
        </a>
      </div>
    </div>
  );
}

