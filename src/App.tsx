import { Bounce, ToastContainer } from "react-toastify";
import Input from "./components/Input";
import LidtTodo from "./components/ListTodo";
import { useSelector } from "react-redux";
import type { Todo } from "./Interface";

const App = () => {
  const todoData = useSelector((state: any) => state.todos.todos);
  console.log(todoData);
  // const toDo = [
  //   {
  //     id: "1",
  //     title: "Learn React",
  //     completed: false,
  //     createdAt: new Date().toISOString(),
  //   },
  //   {
  //     id: "2",
  //     title: "Learn TypeScript",
  //     completed: false,
  //     createdAt: new Date().toISOString(),
  //   },
  // ];
  return (
    <>
      <div className="max-w-screen grid place-items-center h-screen bg-gray-400">
        <div className="max-w-[50vw] bg-gray-100 py-5 px-3 h-125 flex flex-col">
          <Input />
          <LidtTodo data={todoData.map((item : Todo) => item)} />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
