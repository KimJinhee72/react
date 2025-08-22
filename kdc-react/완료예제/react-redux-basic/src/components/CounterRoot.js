import Counter from "./Counter";

const CounterRoot = ({changeCount})=>{
  return(
    <div>
      <h2>Counter Root</h2>    
      <Counter changeCount={(count)=>{
        changeCount(count);
        console.log(count);
      }}></Counter>
    </div>
  )
}
export default CounterRoot;