import styled from 'styled-components'
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './components/Orb/Orb'
import Navigation from './components/Navigation/Navigation'
import React, {useMemo, useState} from 'react'
import Income from './components/Income/Income'
import Expenses from './components/Expenses/Expenses'
import Dashboard from './components/Dashboard/Dashboard'
import { useGlobalContext } from './context/globalContext'

function App() {

  
    //by clicking on left navigation items, corresponding sections should get open, set state as active therefore
    //default value 1 (1), corresponding ids 1,2,3....
    const [active, setActive] = React.useState(1)

    const global = useGlobalContext()
    console.log(global);

    const displayData= () => {
      switch(active){
        case 1:
          return <Dashboard />
        case 2:
          return <Dashboard />

        case 3:
          return <Income />

        case 4:
          return <Expenses />

        default : 
         return <Dashboard />
      }
    }

    //so that background orb animation doesnot restart on each click 
    const orbMemo = useMemo(() => {
      return <Orb />
    },[])
// [] empty arrays

  //passing {bg} as a prop

  return (
    <AppStyled bg ={bg} className="App">

    { /*main data - comments in children section of tag should be in braces*/}

      {orbMemo}
      <MainLayout>
        {/* <h1>Hello</h1> */}

        {/* render navigation  */}

        <Navigation active={active} setActive={setActive}/>

        <main>
{/* <h1>Hello</h1> */}
{displayData()}
        </main>
        
      </MainLayout>
   
    </AppStyled>
  );
}


const AppStyled = styled.div`
height:100vh;
background-image: url(${props => props.bg}); 
position:relative;

main{
flex:1;
font-size:1rem;
background: rgba(252,246,249,0.78);
border:3px solid #FFFFFF;
backdrop-filter: blur(4.5px);
border-radius: 32px;
overflow: auto;
overflow-x: hidden;

&::-webkit-scrollbar{
width:0;
}

}
`;

export default App;
