const Search = ({ searchItem, handleInputChange }) => {
    return (
    <div>
      find countries: <input 
        value={searchItem}
        onChange={handleInputChange}
      />
    </div>
    )
}

export default Search