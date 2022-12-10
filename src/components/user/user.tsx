import React from "react";
import { Accordion } from '../accordion/accordion'
import { Repository } from '../repository/repository'

interface UserProps {
  title?: string | "",
  repos: any[],
}

export const User: React.FC<UserProps> = ({ title, repos }) => {
  return (
    <Accordion title={title}>
      <div className='flex flex-wrap justify-center items-center gap-8'>
        {
          repos.map((repo: any, i: number) => {
            return (
              <Repository
                key={i}
                owner={repo.owner.login}
                name={repo.name}
                description={repo.description}
                starCount={repo.stargazers_count}
                htmlUrl={repo.html_url}
              />
            )
          })
        }
      </div>
    </Accordion>
  );
}