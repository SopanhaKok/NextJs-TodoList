'use client'
export default function WarningModal({
  closeWarningModal,
}: {
  closeWarningModal: () => void
}) {
  return (
    <div
      onClick={closeWarningModal}
      className='fixed w-full h-screen left-0 top-0 bg-black/25 flex justify-center items-center'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white  w-1/4  p-4  text-gray-700'
      >
        <h1 className='text-red-500'>You can't have duplicate todos</h1>
      </div>
    </div>
  )
}
