
const fetchData = async function () {
  
  // Fetching API where process patterns are hosted.
  const response = fetch('https://api.jsonserve.com/G53rZh')
    .then((res) => res.json())
    .then((data) => {
      console.log('data:', data);
    }).catch((error) => console.log(error))

  return response
};

export {fetchData}

