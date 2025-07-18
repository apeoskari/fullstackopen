const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => 
        <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
    const exers = parts.map(part => part.exercises)
    const total = exers.reduce((a, b) => a + b, 0)
    return (
    <p>
        Total of {total} exercises
    </p>
    )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course