import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part, exercises }) => {
  return <p>{part} {exercises}</p>
}

const Content = ({ part1, part2, part3 }) => {
  return (
    <div>
      <Part part={part1.name} exercise={part1.exercises}/>
      <Part part={part2.name} exercise={part2.exercises}/>
      <Part part={part3.name} exercise={part3.exercises}/>
    </div>
  )
}

const Total = ({part1, part2, part3}) => {
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

export default App