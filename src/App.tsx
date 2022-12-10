import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUsers, fetchRepos } from "./services/github";
import { Search } from './components/search/search'
import { Navbar } from './components/navbar/navbar'
import { Button } from './components/button/button'
import { User } from './components/user/user'

function App() {
  const [username, setUsername] = useState<string>("");
  const [getResult, setGetResult] = useState<[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGetResult(null);
    setUsername(e.target.value);
  };

  async function loadReposFromUser(res: []) {
    if (res.length) {
      let arrPromise: any[] = [];
      res.map((user: any): number => (
        arrPromise.push(fetchRepos(user.login))
      ))
      if (arrPromise.length > 0) {
        Promise.all(arrPromise).then(function(repos) {
          let result = res;
          if (repos.length) {
            result.map((v: any, i: number) => Object.assign(v, {"repos": repos[i]}))
          }
          setGetResult(result)
        }).catch(function(err){
          console.log(err);
        })
      }
    }
  }

  const { isLoading: isSearchUsers, refetch: findUsers } = useQuery(
    ["users"],
    async () => {
      return await fetchUsers(username);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res: any) => {
        loadReposFromUser(res);
      },
      onError: (err: any) => {
        setGetResult(err);
      },
    }
  );

  function getDataSearch() {
    if (username) {
      try {
        findUsers();
      } catch (err: any) {
        setGetResult(err);
      }
    }
  }
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="mx-auto flex w-full grow flex-col px-6 pt-2 pb-8 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
        <Search value={username} onChange={handleChange} placeholder="Enter Username" />
        <Button 
          onClick={getDataSearch}
          variant="primary"
          size="sm"
        >
          Search
        </Button>
        <div className='py-3 overflow-auto'>
          {
            isSearchUsers && <div>Loading...</div>
          }
          {
            !isSearchUsers
            && getResult 
            && <p className='text-md text-gray-500 mb-3'>Showing users of '{username}'</p>
          }
          {
            getResult &&
            getResult.map((user: any, id: number) => (
              <User title={user.login} repos={user.repos} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
