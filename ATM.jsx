// Account Component.
let Account = () => {
   let [accountState, setAccountState] = React.useState(0);
   let [transactionState, setTransactionState] = React.useState(0);
   let [isDeposit, setIsDeposit] = React.useState(true);
 
   let {Button} = ReactBootstrap;

   let handleChange = (e) => {
      console.log(`Current Value: ${e.target.value}`);
      setTransactionState(Number(e.target.value));
   };

   let handleSubmit = (e) => {
      console.log(`Transaction: ${transactionState}`);
      let newTotal;
      if (isDeposit) {
         newTotal = accountState + transactionState;
         setAccountState(newTotal);
         console.log(`Deposit: ${transactionState}`);
      }
      if (!isDeposit) {
         if(accountState < transactionState) {
            newTotal = accountState;
            console.log('Insufficient Funds');
            alert('Insufficient Funds');
         }
         else {
            newTotal = accountState - transactionState;
            setAccountState(newTotal);
            console.log(`Withdraw: ${transactionState}`);
         }
      }
      console.log(newTotal);
      e.preventDefault();
   };

   return (
      <form onSubmit={handleSubmit}>
         <h1>ATM Machine</h1>
         <h2>Account Balance: ${accountState}</h2>
         <br/>
         <h3>Select Transaction Type:</h3>
         <Button onClick={() => setIsDeposit(true)}>Deposit</Button>
         <span> </span>
         <Button onClick={() => setIsDeposit(false)}>Withdraw</Button>
         <br/>
         <br/>
         <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
      </form>
   );
};

let ATMDeposit = ({onChange, isDeposit}) => {
   let selection = ['Deposit', 'Withdraw']
   return (
      <label className="label huge">
         <h3>{selection[Number(!isDeposit)]}:</h3>
         <input type="number" onChange={onChange} placeholder="Enter $ Amount"></input>
         <span> </span>
         <input type="submit" value="Submit"></input>
      </label>
   );
};

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Account/>);
