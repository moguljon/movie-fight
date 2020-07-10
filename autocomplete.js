const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
            //select the div that will hold the javascript
            root.innerHTML = `
              <label><b>Search</b></label>
              <input class="input" />
              <div class="dropdown">
                <div class="dropdown-menu">
                  <div class="dropdown-content results">
                    
                  </div>
                </div>
              </div>
            `;
        
        
            //select input element
            const input = root.querySelector('input');
        
            //open and close and one to render content
            const dropdown = root.querySelector('.dropdown');
            const resultsWrapper = root.querySelector('.results');
            
          
            
            //add async and await because fetch data is a async 
            const onInput = async event => {
                //connect event listener to our fetch function
                //set it to variable and lets see what it comes out
                const items = await fetchData(event.target.value);
                if(!items.length) {
                  dropdown.classList.remove('is-active');
                  return;
                }
                //clear data out
                resultsWrapper.innerHTML = '';
      
      
                //added a classlist part of bulma
                dropdown.classList.add('is-active');
                for(let item of items) {
                  //create a
                  const option = document.createElement('a');
      
      
                 
    
      
                  //sett what we want in that div
                  //add a classlist to option
                  option.classList.add('dropdown-item');
                  option.innerHTML = renderOption(item);
      
                  //closing
                  option.addEventListener('click', () => {
                    dropdown.classList.remove('is-active');
                    input.value = inputValue(item)
                   onOptionSelect(item);
                  });
                  //updated this to results wrapper
                  resultsWrapper.appendChild(option);
                }
            };
            
            //adding an event listener
            input.addEventListener('input', debounce(onInput, 500));
          
            //selecting the entire page
           document.addEventListener('click', event => {
           if(!root.contains(event.target)) {
             dropdown.classList.remove('is-active');
           }
           });
}