const Card = ({id, name, avatar, income}) => {
  return (
    <div id={id}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK3FhKOC3_Lab8vzlns5_1O8tx8b43slccPg&usqp=CAU" alt="profile picture"/>
      <div>
        <label><strong> Name:</strong></label>
        <span>{name}</span>
      </div>
      <div>
        <label><strong>Income: </strong></label>
        <span>{income}</span>
      </div>
    </div>
  )
}

export default Card
