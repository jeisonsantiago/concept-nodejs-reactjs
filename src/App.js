import React, { useState, useEffect} from 'react';

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      // console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/jeisonsantiago",
      title: `Projeto Node ${repositories.length.toString()}`,
      techs: ["React Native","Node.js"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const newRepoList = repositories.filter((repository)=>repository.id != id);
    const response = await api.delete(`repositories/${id}`);
    if(response.status == 204){
      setRepositories(newRepoList);
    }    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}

        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
