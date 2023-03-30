import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import axios from "axios";
import { Link } from "gatsby";

const Home = ({ location }) => {
  const id = location.search.replace('?id=', '');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: id,
    queryFn: async () => {
      const res = await axios.get(`https://api.github.com/users/${id}`);
      return res.data;
    }
  });

  const item = data || {};

  return (
    <main className="container mx-auto px-8 py-10">
      {isError && (
        <p className="text-red-800 mb-4">{error?.response?.data?.message}</p>
      )}
      <div className={`shadow-lg p-10 rounded-xl flex bg-white gap-20 flex-wrap ${isLoading ? 'animate-pulse' : ''}`}>
        <div className="text-center flex-1 md:flex-initial">
          <img alt={item.name} className="rounded-full h-36 w-36 mx-auto bg-slate-300" src={item.avatar_url} />
          <p className="font-medium mt-4">{item.name}</p>
          <p>{item.login}</p>

          <p className="mt-5">{item.location}</p>
          <a className="text-sm text-blue-700 underline" href={item.blog}>{item.blog}</a>
        </div>
        <div className="flex-1">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4 text-center mt-6">
            {
              [
                { label: 'Public Repos', value: item.public_repos },
                { label: 'Public Gists', value: item.public_gists },
                { label: 'Followers', value: item.followers },
                { label: 'Following', value: item.following },

              ].map(item => (
                <div key={item.label}>
                  <h3 className="text-5xl">{item.value || 0}</h3>
                  <p className="font-medium">{item.label}</p>
                </div>
              ))
            }
          </div>
          <div className="mt-6 text-sm">
            <p><span className="font-medium">Biography:</span> {item.bio}</p>
            <p><span className="font-medium">Company:</span> {item.company}</p>
            <p><span className="font-medium">Twitter:</span> {item.twitter_username}</p>
          </div>
        </div>
      </div>
      <div className="text-white flex justify-center mt-8">
        <Link to={`/profile/?id=${Number(id) - 1}`}>
          <button>
            {'< Back'}
          </button>
        </Link>
        <div className="mx-4">
          |
        </div>
        <Link to={`/profile/?id=${Number(id) + 1}`}>
          <button>
            {'Next >'}
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Home

export const Head = () => <title>Github User Viewer - Profil</title>
