import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./gitusers.css";

const GitUsers = () => {
  const [user, setUser] = useState(null);
  const [Repos, setRepos] = useState(null);
  const FocusInputOnRender = useRef(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const APIURL = "https://api.github.com/users/";
    const getUsers = async (User) => {
      try {
        const fetchUser = await fetch(APIURL + User);
        const data = await fetchUser.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      const getRepos = async (users) => {
        const fetchRepos = await fetch(`${APIURL}${users}/repos`);
        const DeRespositories = await fetchRepos.json();
        console.log(DeRespositories);
        setRepos(DeRespositories);
      };
      getRepos(User);
    };
    getUsers("prokelly");

    user && FocusInputOnRender.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const APIURL = "https://api.github.com/users/";
    const searchUsers = async (fetcheduser) => {
      try {
        const fetchUser = await fetch(APIURL + fetcheduser);
        const data = await fetchUser.json();

        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      getRepos(fetcheduser);
    };

    const getRepos = async (users) => {
      const fetchRepos = await fetch(`${APIURL}${users}/repos`);
      const DeRespositories = await fetchRepos.json();
      setRepos(DeRespositories);
      console.log(DeRespositories);
    };
    searchUsers(input);
  };

  console.log(user);
  console.log(Repos);

  if (user) {
    return (
      <div className="gitUsers">
        Note: Input Valid Github Username
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="input">Search For Github Users</label>
          <input
            type="search"
            ref={FocusInputOnRender}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            id="search"
            placeholder={user.login}
          />
        </form>
        <main id="main">
          <div className="card">
            <div className="img_container">
              <img className="avatar" src={user.avatar_url} alt={user.name} />
            </div>
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
              <ul className="info">
                <li>
                  {user.followers}
                  <strong>Followers</strong>
                </li>
                <li>
                  {user.following}
                  <strong>Following</strong>
                </li>
                <li>
                  {user.public_repos}
                  <strong>Repositories</strong>
                </li>
              </ul>
              <div className="userlinks">
                <span>Username:</span>
                <a
                  className="user"
                  href={user.html_url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {user.login}
                </a>
                <a href={user.blog}>Website</a>
              </div>
              <div>
                <ul>
                  <div>
                    {Repos &&
                      Repos.sort(
                        (repo, reduceRepo) =>
                          reduceRepo.stargazers_count - repo.stargazers_count
                      )
                        .slice(15, 0)
                        .map((element) => (
                          <a
                            className="repo"
                            key={element.id}
                            href={`https://github.com/${element.full_name}`}
                          >
                            {element.name}
                          </a>
                        ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <>
        <div className="errorPage">
          <h2 className="errorPageHeader">
            Error Fetching users Check your internet connection
          </h2>
        </div>
      </>
    );
  }
};

export default GitUsers;
