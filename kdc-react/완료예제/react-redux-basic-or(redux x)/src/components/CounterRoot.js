import Counter from "./Counter";
// 부모 App.js에서 changeCount 함수를 받아서 Counter에게 전달
const CounterRoot = ({changeCount})=>{
  return (
    <div>
      <h2>Counter Root</h2>
      {/* Counter */}
      <Counter
        changeCount={(count) => {
          changeCount(count);
          console.log(count);
        }}
      ></Counter>
    </div>
  );
}
export default CounterRoot;
