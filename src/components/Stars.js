import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {

  const maxStars = 5
  const starsArray = new Array(maxStars)
  // Find all filled stars
  for(let i = 0; i < Math.floor(stars); i++){
    starsArray[i] = 'filled'
  }
  // Check if half star is needed
  if(stars % 1 !== 0){
    starsArray[Math.floor(stars)] = 'half'
  }
  // Rest of stars are empty
  for(let i = Math.ceil(stars); i < maxStars; i++){
    starsArray[i] = 'empty'
  }
  return <Wrapper>
    {
      starsArray.map((star, idx) => {
        return (
          <span key = {idx}>
            {
             star === 'filled' ? <BsStarFill /> : (star === 'half' ? <BsStarHalf /> : <BsStar />)
            }
          </span>

        )
      })
    }
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
