import { useState } from 'react';

function Todo() {
  const [state, setState] = useState(false);
  console.log(state);
  return (
    <div className="todo">
      <div
        onClick={() => {
          setState((s) => !s);
        }}
      >
        todo!!!
      </div>
    </div>
  );
}

export default Todo;
