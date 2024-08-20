import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income() {

  //accessing functions made in global context

  const {addIncome,incomes,getIncomes, deleteIncome, totalIncome} = useGlobalContext()
//passing [incomes]- instant update while addition of income
  useEffect(() => {
  getIncomes()
  },[])


  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">Total Income:<span>${totalIncome()}</span></h2>
        <div className="income-content">

            <div className="form-container">
              <Form />
            </div>
            
            <div className="incomes">
{incomes.map((income)=>{
const{_id, title, amount, date, category,description,type} =income;

// to render the item , returning it and passing props as well
return <IncomeItem

key={_id}
id={_id}
title={title}
description={description}
amount={amount}
date={date}
type={type}
category={category}
indicatorColor="var(--color-green)"

deleteItem={deleteIncome}

/>
})}
            </div>

        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`

display: flex;
overflow:auto;

.total-income{

display:flex;
justify-content: center;
align-items:center;
background: #FCF6F9;
border: 2px solid #FFFFFF;
box-shadow: 0px 1px 15px rgba(0,0,0,0.6);
border-radius: 10px;
padding:0.7rem;
margin:1rem 0;
font-size: 1.5rem;
gap:0.5rem;

span{
font-size: 1.8rem;
font-weight:800;
color: var(--color-green);

}
}

.income-content{
display:flex;
gap:1rem;
}

//to fil till end space
.incomes{
flex:1;
}
`;

export default Income;
