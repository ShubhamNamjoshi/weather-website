console.log("client side js loded!")


const weatherForm=document.querySelector('form')
const Search=document.querySelector('input')
const message1=document.querySelector('#p1')
const message2=document.querySelector('#p2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=Search.value;

    message1.textContent="Loading...";

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        
    response.json().then((data)=>{
        if(data.error){
            message1.textContent="";
            message2.textContent=data.error;
            //console.log(data.error)
        }
        else{

            message1.textContent=data.location;
            message2.textContent=data.forecast;
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

})