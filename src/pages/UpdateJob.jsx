import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import toast from 'react-hot-toast'

const UpdateJob = () => {
  const{id}=useParams()
   const navigate=useNavigate()
  const{user}=useContext(AuthContext)
  const [startDate, setStartDate] = useState(new Date())
  const [jobs,setjobs]=useState({})

  const handelSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.job_title.value;
    const email = e.target.email.value;
    const dateLine = startDate;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const min_price = parseFloat(e.target.min_price.value);
    const max_price = parseFloat(e.target.max_price.value);
    
    if(!title||
      !category||
      !dateLine||
      !min_price||
      !max_price||
      !description){
      alert("সব ইনপুট ফিল্ড পূরণ করুন!");
      return;
      }
    const formetData = {
      title,
      //user informetion
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      category,
      dateLine,
      min_price,
      max_price,
      description,
      bid_count:jobs?.bid_count,
    };

      // Make a Post Request
    try{
      axios.put(`${import.meta.env.VITE_API_URL}/update-job/${id}`,formetData);
      toast.success("Data Added Successfully")
      e.target.reset()
      navigate("/my-posted-jobs")
    }catch (err){
      console.log(err);
      toast.error("SomeThing Want Wrong")
    }

  };

    useEffect(()=>{
      fetchJobsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])
  
    const fetchJobsData=async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/job/${id}`)
      setjobs(data)
      setStartDate(new Date(data?.dateLine))
    }
  

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <section className=' p-2 md:p-6 mx-auto bg-white rounded-md shadow-md '>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Update a Job
        </h2>

        <form onSubmit={handelSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='job_title'>
                Job Title
              </label>
              <input
                id='job_title'
                name='job_title'
                defaultValue={jobs.title}
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                defaultValue={user?.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>

           {
            jobs.category && <div className='flex flex-col gap-2 '>
            <label className='text-gray-700 ' htmlFor='category'>
              Category
            </label>
            <select
              name='category'
              id='category'
              defaultValue={jobs.category}
              className='border p-2 rounded-md'
            >
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>
           }
            <div>
              <label className='text-gray-700 ' htmlFor='min_price'>
                Minimum Price
              </label>
              <input
                id='min_price'
                name='min_price'
                type='number'
                defaultValue={jobs?.min_price}
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='max_price'>
                Maximum Price
              </label>
              <input
                id='max_price'
                name='max_price'
                defaultValue={jobs?.max_price}
                type='number'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 ' htmlFor='description'>
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              id='description'
              defaultValue={jobs?.description}
              cols='30'
            ></textarea>
          </div>
          <div className='flex justify-end mt-6'>
            <button className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob
