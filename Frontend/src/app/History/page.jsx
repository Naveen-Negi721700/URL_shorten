import React from 'react'


const History = () => {
  const [form, setform] = useState(null)

  const 

  return (
    <>
   <h1 className='text-cyan-500 text-5xl ml-15 mt-4'>Link History</h1>

   <table className='w-11/12 ml-15 mt-10 border-2 border-gray-200 rounded-3xl '>
     <thead className='text-white text-2xl pl-10 mt-4 border-2 border-gray-200'>
        <tr>
            <th className='border-2 border-gray-200'>Short URL</th>
            <th className='border-2 border-gray-200'>Original URL</th>
            <th className='border-2 border-gray-200'>Created Data</th>
            <th className='border-2 border-gray-200'>Click</th>
            <th className='border-2 border-gray-200'>Action</th>
        </tr>
     </thead>
      
      <tbody>
        <tr className='border-2 border-gray-200'>
            <td className='pl-4 border-2 border-gray-200'>
              
            </td>
            <td className='pl-4 border-2 border-gray-200'>
          
            </td>
            <td className='pl-4 border-2 border-gray-200'>
               
            </td>
            <td className='pl-4 border-2 border-gray-200'>
                20
            </td>
        </tr>

      </tbody>
   </table>

    </>
  )
}

export default History
