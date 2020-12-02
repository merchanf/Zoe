import { useEffect, useState } from 'react'
import { Input, Button, Icon, Dropdown } from 'semantic-ui-react';
import sortBy from './sortBy';
import { orderByOptions } from './constants';
import PeopleIcon from './PeopleIcon';
import Card from './Card';

import 'semantic-ui-css/semantic.min.css'
import styles from './App.module.scss';
import './App.css';

function App() {
  const [agents, setAgents] = useState();
  const [value, setValue] = useState();
  const [availableAgents, setAvailableAgents] = useState();
  const [showedElements, setShowedElements] = useState(3);
  const [orderBy, setOrderBy] = useState('incomeDesc');

  useEffect(() => {
    fetch('https://run.mocky.io/v3/5bb41d7e-3d2e-4a7c-93b4-c6ff03957e93')
    .then(response => response.json())
    .then(data => setAgents(data));
  }, [])

  useEffect(() => {
    if(availableAgents)
      setAvailableAgents(prevState => [...prevState].sort(sortBy[orderBy]));
  }, [orderBy])

  const handleOnClick = e => {
    const val = parseInt(value, 10);
    const temp = agents.filter(agent => (val - 10000 ) < agent.income && agent.income < (val + 10000))
    setAvailableAgents(temp);
  }

  const handleSeeMore = () => {
    setShowedElements(prevState => prevState + 3);
  }

  const handleSeeLess = () => {
    setShowedElements(prevState => (prevState - 3) <= 3 ? 3 : (prevState - 3));
  }

  const handleOnChange = e => {
    setValue(e.target.value);
  }

  const handleDropdownOnChange = (_, value) => {
    setOrderBy(value.value);
  }

  return (
    <>
      <header class={styles.Header}>
          <img src="https://zoefin.com/wp-content/uploads/2020/01/zoe_logo_primary.svg" alt="Zoe logo" />
      </header>
      { !availableAgents  
        ? <section class={styles.Main}>
            <div class={styles.Main__Container}>
              <PeopleIcon />
              <h1>Find the best agent for you</h1>
              <p>Fill the information to get your matches</p>
              <div class={styles.Main__Container__Input}>
                <label>Current income</label>
                <Input 
                  icon='dollar sign' 
                  iconPosition='left' 
                  onChange={handleOnChange}
                />
              </div>
              <div class={styles.Main__Container__ButtonCont} >
                <Button 
                  labelPosition='right'
                  className={styles.Main__Container__ButtonCont__Button}
                  onClick={handleOnClick}
                >
                  Get matches
                  <Icon name='right arrow' />
                </Button>
              </div>
            </div>
          </section>
        : <section class={styles.Results}>
            <div class={styles.Results__Title}>
              <h1>Your matches</h1>
              <h3>Your Income: <strong>{`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0  }).format(value)}`}</strong></h3>
            </div>
            <div class={styles.Results__Sort}>
              <label>Order agents by</label>
              <Dropdown
                placeholder='Select..'
                fluid
                selection
                onChange={handleDropdownOnChange}
                options={orderByOptions}
              />
            </div>
            <div class={styles.Results__List}>
              { availableAgents
                  .slice(0, showedElements)
                  .map( ({id, name, income}) => 
                    <Card key={id} id={id} name={name} income={income}/>
                  )
              }
            </div>
            <div class={styles.Results__Buttons} >
              <Button 
                labelPosition='right'
                className={styles.Results__Buttons__Button}
                onClick={handleSeeLess}
                disabled={showedElements <= 3}
              >
                See less
                <Icon style={{marginLeft: '12px'}}  name='minus' />
              </Button>
              <Button 
                labelPosition='right'
                className={styles.Results__Buttons__Button}
                onClick={handleSeeMore}
                
              >
                See more
                <Icon style={{marginLeft: '12px'}} name='plus' />
              </Button>
            </div>
          </section>
        }
    </>
  )
}

export default App;

/*

<section>
        <input type="number" min="0" onChange={handleOnChange} autoComplete="off"/>
        <button onClick={handleOnClick}>search</button>
        <button onClick={getAscendentValue}>Asc</button>
        <button onClick={getDescendentValue}>Desc</button>
        <div>
          {availableAgents && availableAgents.slice(0, showedElements).map( ({name, income}) => <Card name={name} income={income}/>)}
          <button onClick={handleSeeMore}>see more</button>
          {showedElements > 3 && <button onClick={handleSeeLess}>see Less</button>} 
        </div>
      </section>
*/ 