function TaskCount({ todos_completed, total_todos }) {
    return (

      <div className="task_count">
      <div>
        Task Done: {todos_completed}/{total_todos}
      </div>
    
      {todos_completed === total_todos && total_todos > 0 && (
        <div>Keep it up! All tasks completed!</div>
      )}
    </div>

    );
  }
  export default TaskCount;