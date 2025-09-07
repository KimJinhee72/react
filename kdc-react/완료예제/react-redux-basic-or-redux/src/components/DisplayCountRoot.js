import DisplayCount from "./DisplayCount";

// 부모로 App.js에서 부터 받은 count를 자식DisplayCount에게 전달
const DisplayCountRoot = ({count})=>{
  return (
    <div>
      <h2>Display Counter Root</h2>
      {/* DisplayCount */}
      <DisplayCount count={count} />
    </div>
  );
}
export default DisplayCountRoot;
