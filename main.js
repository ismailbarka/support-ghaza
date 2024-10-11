


const ft_atoi = (n) =>{
    //n is a string
    let i = 0;
    while(n[i])
    {
        if((n[i] >= '0' && n[i] <= '9') || n[i] === '+' || n[i] === '-')
        {
            console.log(n[i], "is number");
        }
        else{
            console.log(n[i], "is not a number");
            return;
        }
        i++;
    }
    let to_return = 0;
    let sign = 1;
    i = 0;
    while(n[i] == '-' || n[i] == '+'){
        if(n[i] == '-')
            sign = -sign;
        i++;
    }
    while(n[i]){
        to_return *= 10;
        to_return += n[i] - '0';
        i++;
        console.log("test" , to_return)
    }
    console.log("number : ", to_return);
    return to_return * sign;

    
}
console.log(ft_atoi("-a12a3"))