import { useEffect, useState } from 'react'
import Card from './Card';
import './App.css';

function App() {
  const [agents, setAgents] = useState();
  const [value, setValue] = useState();
  const [availableAgents, setAvailableAgents] = useState();
  const [showedElements, setShowedElements] = useState(3);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/5bb41d7e-3d2e-4a7c-93b4-c6ff03957e93')
    .then(response => response.json())
    .then(data => setAgents(data));
  }, [])

  useEffect(() => {

  }, [])

  const handleOnClick = e => {
    const val = parseInt(value, 10);
    console.log(val)
    const temp = agents.filter(agent => {
      return (val - 10000 ) < agent.income && agent.income < (val + 10000);
    })
    setAvailableAgents(temp);
  }

  const getAscendentValue = () => {
    setAvailableAgents(prevState => {
      return [...prevState].sort((a, b) => {
        const a_ = parseInt(a.income, 10);
        const b_ = parseInt(b.income, 10);
        if (a_ < b_) {
          return -1;
        }
        if (a_ > b_) {
          return 1;
        }

        return 0;
      })
    })
  }

  const getDescendentValue = () => {
    setAvailableAgents(prevState => {
      return [...prevState].sort((a, b) => {
        const a_ = parseInt(a.income, 10);
        const b_ = parseInt(b.income, 10);
        if (a_ > b_) {
          return -1;
        }
        if (a_ < b_) {
          return 1;
        }

        return 0;
      })
    });
  }

  const handleSeeMore = () => {
    setShowedElements(prevState => prevState + 3);
  }

  const handleSeeLess = () => {
    setShowedElements(prevState => {
      let ret = prevState - 3;
      console.log(ret);
      return ret <= 3 ? 3 : ret;
    });
  }

  const handleOnChange = e => {
    setValue(e.target.value);
  }

  return (
    <div>
      <input type="number" min="0" onChange={handleOnChange}/>
      <button onClick={handleOnClick}>search</button>
      <button onClick={getAscendentValue}>Asc</button>
      <button onClick={getDescendentValue}>Desc</button>
      <div>
        {availableAgents && availableAgents.slice(0, showedElements).map( ({name, income}) => <Card name={name} income={income}/>)}
        <button onClick={handleSeeMore}>see more</button>
        {showedElements > 3 && <button onClick={handleSeeLess}>see Less</button>} 
      </div>
    </div>
  )
}

export default App;