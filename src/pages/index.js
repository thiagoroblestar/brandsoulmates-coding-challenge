import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "gatsby";
import * as React from "react";

const IndexPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await axios.get('https://api.github.com/users');
      const data = res.data;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const detail = await axios.get(`https://api.github.com/users/${element.login}`)
        data[index] = detail.data;
      }
      return data;
    }
  })

  return (
    <main className="container mx-auto px-8 py-10">
      {isError && (
        <p className="text-red-800 mb-4">{error?.response?.data?.message}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {
          isLoading && Array.from(Array(9).keys()).map(item => (
            <div key={item} className="shadow-lg p-4 rounded-md flex items-center flex-col animate-pulse bg-white">
              <div className="h-36 w-36 rounded-full bg-slate-300" />
              <div className="h-4 w-[80%] bg-slate-300 mt-2" />
              <div className="h-4 w-[50%] bg-slate-300 mt-1" />
              <div className="h-5 w-[60%] bg-slate-300 mt-5" />

            </div>
          ))
        }
        {
          data?.map(item => (
            <div key={item.login} className="shadow-lg p-4 rounded-md flex items-center flex-col bg-white">
              <img alt={item.name} className="rounded-full h-40 w-36" src={item.avatar_url} />
              <p className="font-medium">{item.name}</p>
              <p>{item.login}</p>
              <Link to={`/profile?id=${item.login}`}>
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md mt-5"
                >
                  VIEW PROFILE
                </button>
              </Link>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Github User Viewer - Coding Challenge</title>
