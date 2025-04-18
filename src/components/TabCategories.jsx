/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const TabCategories = () => {
  // const [jobs, setjobs] = useState([]);
  // useEffect(() => {
  //   fetchAllJobs();
  // }, []);

  // const fetchAllJobs = async () => {
  //   const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
  //   setjobs(data);
  // };

  const {data:jobs,isLoading}= useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
      return data;
    },
  });

  // console.log(data,isLoading);
  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  // Category Data Filter
  const webDevelopment = jobs.filter(
    (job) => job.category === "Web Development"
  );
  const graphicDesign = jobs.filter(
    (job) => job.category === "Graphics Design"
  );
  const digitalMarketing = jobs.filter(
    (job) => job.category === "Digital Marketing"
  );

  return (
    <Tabs>
      <div className=" container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {webDevelopment.map((job) => (
              <JobCard job={job} key={job._id}></JobCard>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {graphicDesign.map((job) => (
              <JobCard job={job} key={job._id}></JobCard>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {digitalMarketing.map((job) => (
              <JobCard job={job} key={job._id}></JobCard>
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
