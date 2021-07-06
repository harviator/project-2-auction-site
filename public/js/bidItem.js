

const bidAmount = document.querySelector('#bid-amount')
const placeBidBtn = document.querySelector('#place-bid-btn');
const changeBidBtn = document.querySelector('#update-bid-btn');
const formSubmit = document.querySelector('formHandler');

// const formHandler = async (event) => {
//   event.preventDefault();

// }


changeBidBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const current_bid = document.querySelector('.bid-amount')
  const prev_bidEl = document.querySelector('#curr_bid')
  let prev_bid = prev_bidEl.innerHTML
  let newBid = {
    current_bid: current_bid.value.trim()
  };
  
  let newList = prev_bid.split(" ")
  prev_bid = newList[2]

  if (Number(current_bid.value) > Number(prev_bid)) {
    const response = await fetch(`/api/postings/${current_bid.id}`, {
      method: 'PUT',
      body: JSON.stringify(newBid),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      console.log('success')
      location.replace(`/posting/${current_bid.id}`)
    }
  }


})

// placeBidBtn.addEventListener("click", async(e) => {
//   e.preventDefault();
// const starting_bid = document.querySelector('.bid-amount')
//   let placeBid = {
//     starting_bid: starting_bid.value.trim()
//   }
//   const response = await fetch(`/api/postings/${starting_bid.id}`, {
//     method: 'POST',
//     body: JSON.stringify(placeBid),
//     headers: {
//       'Content-Type': 'application/json'},
//   });

//   if(response.ok){
//     console.log('success')
//     location.replace(`/posting/${starting_bid.id}`)
//   }

// })