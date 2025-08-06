const Filter = ({ searchItem, handleInputChange }) => {
  return (
    <div>
      filter shown with: <input 
        value={searchItem}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Filter