const form = document.querySelector('form');
const namee = document.querySelector('input[search-city]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
const searchData = namee.value;
  
const response = await fetch('', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    }
  });

  const finalResponse = await response.json();
  console.log('dddd', finalResponse)

  });

  
