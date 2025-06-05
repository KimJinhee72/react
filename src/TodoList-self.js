import React from "react";

function TodoList() {
  const [task, setTask] = React.useState("");
  console.log("task", task);
  // 할일 목록을 배열저장하는 상태
  const [taskList, setTaskList] = React.useState([]);
  console.log("taskList", taskList);
  // 할일을 추가하는 함수
  function handleAdd() {
    if (task.trim() === "") {
      // 입력된 할일이 없으면 경고창 표시
      alert("할 일을 입력하세요.");
      // 입력이 비어있으면 함수 종료
      return;
    }
    // 할일을 추가하는 로직
    console.log("할일 추가:", task);
    const newTask = {
      id: Date.now(), // 고유 ID 생성
      text: task, // 입력되는 할일 내용
      date: new Date().toLocaleString(), // 현재 날짜 시간을 문자열로 저장
      done: false, // 할일 완료 여부(처음 완료x)
    };
    console.log("새 할일:", newTask);
    // 기존 할일 목록에 새 할일 추가
    setTaskList([...taskList, newTask]);
    setTask(""); // 입력창 초기화
  }
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <h1 style={{ padding: "10px" }}>Todo List</h1>
      {/* 할일을 입력하는 입력창 */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="할 일을 입력하세요."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "70%",
          borderRadius: "5px",
        }}
      />
      {/* 할일 추가 버튼 */}
      <button
        onClick={handleAdd}
        style={{ padding: "10px", marginLeft: "10px", borderRadius: "5px" }}>
        추가
      </button>
      {/* 할일 목록 출력 li를 맵돌려서 추가 하겠다*/}
      <ul style={{
          listStyle: "none", // 기본 ● 없앰
          padding: 0,
          marginTop: "20px",
          textAlign: "left",
        }}>
        {taskList.map(({ id, text, date, done }) => {
          return (
            <li
              key={id}
              style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <div>
                {/* 완료 체크박스 */}
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => {
                    // 체크박스 상태 변경 로직 (완료/미완료 토글)
                    console.log("체크박스 변경:", id, done);
                    // taskList 상태 업데이트
                    // id가 일치하는 할일의 done 상태를 반전시킴
                    // map을 사용하여 새로운 배열 생성
                    // 기존 taskList를 순회하면서 id가 일치하는 할일의 done 상태를 반전시킴(바로 써도 되고)
                    setTaskList(
                      taskList.map((task) =>
                        task.id === id ? { ...task, done: !task.done } : task
                      )
                    );
    //           2.       toggleDone(id); 를 쓰고 위에  function toggleDone(id) {
    //     console.log("체크박스 변경:", id);
    //     // taskList 상태 업데이트(t목록)
    //     setTaskList(
    //       taskList.map((t) =>
    //        { return t.id === id ? { ...t, done: !t.done } : id ; // id가 일치하는 할일의 done 상태를 반전시킴
    // })
    //     );
    // }
                  }}
                />
                {/* 할일 내용과 날짜 텍스트 */}
                <strong
                  style={{ textDecoration: done ? "line-through" : "none" }}>
                  {text}
                </strong>
                {/* 등록날짜/시간 표시 */}
                <small style={{ marginLeft: "10px", color: "#888" }}>
                  {date}
                </small>
              </div>
              {/* 삭제 버튼 */}
                <button
              onClick={() => {
                setTaskList(taskList.filter((task) => task.id !== id));
              }}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}>
              삭제
            </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default TodoList;
